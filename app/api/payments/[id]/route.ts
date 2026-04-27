import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { forbidden, notFound, unauthorized } from "@/lib/api-error";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getAuthUser(req);
  if (!user) return unauthorized();
  const { id } = await params;

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { job: true },
  });
  if (!payment) return notFound("Payment");
  const allowed =
    (user.client && payment.clientId === user.client.id) ||
    (user.provider && payment.job.providerId === user.provider.id);
  if (!allowed) return forbidden("Not part of this payment");

  return NextResponse.json(payment);
}
