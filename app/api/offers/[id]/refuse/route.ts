import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { conflict, forbidden, notFound, unauthorized } from "@/lib/api-error";

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

  const updated = await prisma.offer.update({
    where: { id },
    data: { status: "REFUSED" },
  });
  return NextResponse.json(updated);
}
