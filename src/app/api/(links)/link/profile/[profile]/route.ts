import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
  const session = await auth();

  console.log({ req, params });

  //const { username } = req.body;

  const links: RedirectLink[] = await prisma.redirectLink.findMany({
    where: {
      username: ""// username,
    },
  });

  return NextResponse.json({ data: links });
}
