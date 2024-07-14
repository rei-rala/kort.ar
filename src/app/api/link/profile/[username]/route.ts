import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";

import { NextRequest, NextResponse } from "next/server";

type pageParams = {
  params: {
    username: string;
  };
};

export async function GET(req: NextRequest, { params: { username } }: pageParams) {
  let links: RedirectLink[] = [];

  links = (await prisma.redirectLink.findMany({
    where: {
      owner: {
        username,
      },
    },
    include: {
      owner: true,
    },
  })) as any;

  // save the hit to the visited profile if more than 0 links are found
  if (links.length > 0) {
    auth().then((session) => {
      prisma.hit.create({
        data: {
          ip:
            String(req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || req.ip) ||
            null,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
          visitingUserEmail: session?.user?.email || null,
          visitedUserId: links[0].owner?.id || null,
        },
      });
    });
  }

  return NextResponse.json({ data: links });
}
