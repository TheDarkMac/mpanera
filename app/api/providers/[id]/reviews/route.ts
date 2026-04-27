import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseQuery } from "@/lib/api-error";
import { pagination } from "@/lib/validation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = parseQuery(new URL(req.url), pagination);
  if ("response" in result) return result.response;
  const { page, perPage } = result.data;

  const where = { providerId: id, published: true };
  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where,
      skip: (page - 1) * perPage,
      take: perPage,
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.count({ where }),
  ]);
  return NextResponse.json({ data, page, perPage, total });
}
