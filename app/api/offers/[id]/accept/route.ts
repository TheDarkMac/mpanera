import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { conflict, forbidden, notFound, parseJson, unauthorized } from "@/lib/api-error";
import { acceptOfferSchema } from "@/lib/validation";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser(req);
  if (!user || !user.client) return unauthorized();
  const { id } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { serviceRequest: true },
  });
  if (!offer) return notFound("Offer");
  if (offer.serviceRequest.clientId !== user.client.id) return forbidden("Not your request");
  if (offer.status !== "PENDING") return conflict("Offer is not pending");

  const result = await parseJson(req, acceptOfferSchema);
  if ("response" in result) return result.response;
  const { chosenSlotStart, chosenSlotEnd } = result.data;

  const job = await prisma.$transaction(async (tx) => {
    const newJob = await tx.job.create({
      data: {
        serviceRequestId: offer.serviceRequestId,
        clientId: user.client!.id,
        providerId: offer.providerId,
        acceptedOfferId: offer.id,
        finalPrice: offer.proposedPrice,
        chosenSlotStart,
        chosenSlotEnd,
      },
    });
    await tx.offer.update({ where: { id }, data: { status: "ACCEPTED" } });
    await tx.offer.updateMany({
      where: {
        serviceRequestId: offer.serviceRequestId,
        id: { not: id },
        status: "PENDING",
      },
      data: { status: "REFUSED" },
    });
    await tx.serviceRequest.update({
      where: { id: offer.serviceRequestId },
      data: { status: "ASSIGNED" },
    });
    return newJob;
  });

  return NextResponse.json(job, { status: 201 });
}
