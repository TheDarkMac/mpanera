import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { issueTokens, verifyRefreshToken } from "@/lib/auth";
import { parseJson, unauthorized } from "@/lib/api-error";
import { refreshSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const result = await parseJson(req, refreshSchema);
  if ("response" in result) return result.response;

  const userId = verifyRefreshToken(result.data.refreshToken);
  if (!userId) return unauthorized();

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.active) return unauthorized();

  return NextResponse.json({ ...issueTokens(user.id), user });
}
