import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface WebhookPayload {
  apiReference?: string;
  status?: "success" | "failed" | "refunded";
}

export async function POST(req: Request) {
  let payload: WebhookPayload = {};
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return new NextResponse(null, { status: 200 });
  }

  if (!payload.apiReference || !payload.status) {
    return new NextResponse(null, { status: 200 });
  }

  const payment = await prisma.payment.findUnique({
    where: { apiReference: payload.apiReference },
  });
  if (!payment) return new NextResponse(null, { status: 200 });

  const map = { success: "SUCCESS", failed: "FAILED", refunded: "REFUNDED" } as const;
  const newStatus = map[payload.status];

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: { id: payment.id },
      data: {
        status: newStatus,
        rawPayload: JSON.stringify(payload),
        paidAt: newStatus === "SUCCESS" ? new Date() : payment.paidAt,
      },
    });
    if (newStatus === "SUCCESS") {
      await tx.job.update({
        where: { id: payment.jobId },
        data: { status: "PAID" },
      });
    }
  });

  return new NextResponse(null, { status: 200 });
}
