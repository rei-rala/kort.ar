import { NEXTAUTH_URL } from "@/constants";
import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextRequest, NextResponse } from "next/server";

type routeParams = {
  params: {
    link: string;
  };
};

export async function GET(req: NextRequest, { params: { link } }: routeParams) {
  // rechazando conexiones que no provengan de la app
  if (req.headers.get("origin") !== NEXTAUTH_URL) {
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

  auth()
    .then((session) => {
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
    })
    .then(() => {
      return prisma.redirectLink.update({
        where: { from: link },
        data: { hitCount: { increment: 1 } },
      });
    })
    .catch((err) => {
      console.error("Error trying to create hit or update hitCount in redirectLink");
      console.error(err);
    });

  return NextResponse.json({ data: linkFound });
}
