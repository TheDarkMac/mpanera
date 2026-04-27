import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { conflict, forbidden, notFound, unauthorized } from "@/lib/api-error";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser(req);
  if (!user || !user.provider) return unauthorized();
  const { id } = await params;

  const offer = await prisma.offer.findUnique({ where: { id } });
  if (!offer) return notFound("Offer");
  if (offer.providerId !== user.provider.id) return forbidden("Not your offer");
  if (offer.status !== "PENDING") return conflict("Offer is not pending");

  const updated = await prisma.offer.update({
    where: { id },
    data: { status: "WITHDRAWN" },
  });
  return NextResponse.json(updated);
}
