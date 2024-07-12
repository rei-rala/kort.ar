import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";
import { generateAlphanumericalId } from "@/utils/text";

import { NextRequest, NextResponse } from "next/server";

type routeParams = {
  params: {
    link: string;
  };
};

export async function GET(req: NextRequest, { params: { link } }: routeParams) {
  if (!link) {
    return NextResponse.json(
      {
        data: null,
        message: "No link provided",
      },
      { status: 400 }
    );
  }

  const linkFound = await prisma.redirectLink.findFirst({ where: { from: link } });

  auth().then((session) => {
    prisma.hit.create({
      data: {
        ip:
          String(req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || req.ip) ||
          null,
        referer: req.headers.get("referer"),
        userAgent: req.headers.get("user-agent"),
        loggedUserEmail: session?.user?.email || null,
        redirectLinkId: link,
        visitedLink: link,
      },
    });
  });

  return NextResponse.json({ data: linkFound });
}
