import { NEXTAUTH_URL } from "@/constants";
import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";
import { redirect } from "next/navigation";

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
    where: {
      from: link,
      active: true,
      deletedAt: null,
    },
    select: {
      id: true,
      from: true,
      to: true,
      hitCount: true,
      color: true,
      canReturnToProfile: true,
      owner: {
        select: {
          username: true,
          name: true,
          image: true,
        },
      },
    },
  });

  if (!linkFound) {
    return NextResponse.json(
      {
        data: null,
        message: "Link not found",
      },
      { status: 404 }
    );
  }

  await auth()
    .then((session) => {
      const forwarded = req.headers.get("x-forwarded-for");
      const realIp = req.headers.get("x-real-ip");
      const referer = req.headers.get("referer");
      const userAgent = req.headers.get("user-agent");

      return Promise.all([
        prisma.hit.create({
          data: {
            ip: forwarded || realIp || null,
            referer,
            userAgent,
            originalFrom: linkFound.from,
            originalTo: linkFound.to,
            visitedRedirectLink: { connect: { id: linkFound.id } },
            user: session?.user?.email ? { connect: { id: session.user.email } } : undefined,
          },
        }),
        prisma.redirectLink.update({
          where: { id: linkFound.id },
          data: { hitCount: { increment: 1 } },
        }),
      ]);
    })
    .catch((err) => {
      console.error("Error trying to create hit or update hitCount in redirectLink");
      console.error(JSON.stringify(err, null, 2));
    })

  if (!linkFound.canReturnToProfile) return redirect(linkFound.to);

  return NextResponse.json({ data: linkFound });
}
