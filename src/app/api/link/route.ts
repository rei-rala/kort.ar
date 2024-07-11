import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextResponse } from "next/server";

export async function GET(_req: Request, _res: Response) {
  const links = await prisma.redirectLink.findMany();
  return NextResponse.json(links);
}

export async function POST(req: Request, res: Response) {
  try {
    const session = await auth();
    const json = await req.json();

    const { userId, alias, from, to, icon, color, canReturnToProfile, active } = json;

    return NextResponse.json({ res: json, session });

    const redirectLink = await prisma.redirectLink.create({
      data: {
        userId,
        alias,
        from,
        to,
        icon,
        color,
        canReturnToProfile,
        active,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
