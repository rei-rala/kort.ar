import { NextResponse } from "next/server";

export function makeNextResponse(response: any, statusCode = 200) {
  return new NextResponse(JSON.stringify(response), {
    status: statusCode,
    headers: { "content-type": "application/json" },
  });
}
