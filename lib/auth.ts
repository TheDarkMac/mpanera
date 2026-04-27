import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
import { prisma } from "./prisma";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET ?? "dev-access-secret-change-me";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? "dev-refresh-secret-change-me";
const ACCESS_TTL: SignOptions["expiresIn"] = "15m";
const REFRESH_TTL: SignOptions["expiresIn"] = "30d";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAccessToken(userId: string): string {
  return jwt.sign({ sub: userId, type: "access" }, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}

export function signRefreshToken(userId: string): string {
  return jwt.sign({ sub: userId, type: "refresh" }, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

function verifyToken(token: string, secret: string, expectedType: "access" | "refresh"): string | null {
  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload & { type?: string };
    if (payload.type !== expectedType || typeof payload.sub !== "string") return null;
    return payload.sub;
  } catch {
    return null;
  }
}

export const verifyAccessToken = (token: string) => verifyToken(token, ACCESS_SECRET, "access");
export const verifyRefreshToken = (token: string) => verifyToken(token, REFRESH_SECRET, "refresh");

export function issueTokens(userId: string) {
  return {
    accessToken: signAccessToken(userId),
    refreshToken: signRefreshToken(userId),
  };
}

export async function getAuthUser(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  const userId = verifyAccessToken(auth.slice(7));
  if (!userId) return null;
  return prisma.user.findUnique({
    where: { id: userId },
    include: { client: true, provider: true },
  });
}
