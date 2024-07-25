import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextRequest, NextResponse } from "next/server";

type pageParams = {
  params: {
    username: string;
  };
};

export async function GET(req: NextRequest, { params: { username } }: pageParams) {
  const links = await prisma.redirectLink.findMany({
    where: {
      owner: {
        username,
      },
    },
    include: {
      owner: true,
    },
  });

  // save the hit to the visited profile if more than 0 links are found
  if (links.length > 0) {
    await auth().then((session) => {
      const ip =
        String(req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || req.ip) ||
        null;
      const visitingUserEmail =
        session?.user?.email && session.user.email !== links[0].owner.email
          ? session.user.email
          : null;

      prisma.hit.create({
        data: {
          ip,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
          visitingUserEmail,
          visitedUserId: links[0].owner.id,
        },
      });
    });
  }

  return NextResponse.json({ data: links });
}
