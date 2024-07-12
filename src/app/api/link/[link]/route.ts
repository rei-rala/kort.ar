import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextRequest, NextResponse } from "next/server";

type routeParams = {
  params: {
    link: string;
  };
};

export async function GET(req: NextRequest, { params: { link } }: routeParams) {
  const originURL = req.headers.get("origin");

  if (originURL !== process.env.NEXTAUTH_URL) {
    return NextResponse.json(
      {
        data: null,
        message: "Error inesperado. Por favor, intenta de nuevo.",
      },
      { status: 500 }
    );
  }

  if (!link) {
    return NextResponse.json(
      {
        data: null,
        message: "No link provided",
      },
      { status: 400 }
    );
  }

  const linkFound = await prisma.redirectLink.findFirst({
    where: { from: link },
    include: {
      owner: true,
    },
  });

  auth().then((session) => {
    const forwarded = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const referer = req.headers.get("referer");
    const userAgent = req.headers.get("user-agent");

    return prisma.hit.create({
      data: {
        ip: forwarded || realIp || null,
        referer,
        userAgent,
        loggedUserEmail: session?.user?.email || null,
        redirectLinkId: linkFound?.id || null,
        visitedLink: link,
        originalFrom: linkFound?.from || null,
        originalDestiny: linkFound?.to || null,
      },
    });
  });

  return NextResponse.json({ data: linkFound });
}
