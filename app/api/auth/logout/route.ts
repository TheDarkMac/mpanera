import { NextResponse } from "next/server";

export async function POST() {
  // Stateless JWT — client discards the token. No server-side invalidation.
  return new NextResponse(null, { status: 204 });
}
