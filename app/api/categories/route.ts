import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseQuery } from "@/lib/api-error";
import { categoryListSchema } from "@/lib/validation";

export async function GET(req: Request) {
  const result = parseQuery(new URL(req.url), categoryListSchema);
  if ("response" in result) return result.response;
  const { parentId, rootOnly } = result.data;

  const where = parentId ? { parentId } : rootOnly ? { parentId: null } : {};
  const categories = await prisma.category.findMany({
    where,
    include: { children: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(categories);
}
