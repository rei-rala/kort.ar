import { NextResponse } from "next/server";

const profile = null;

export function GET(request: Request) {
  return NextResponse.json({ profile });
}
