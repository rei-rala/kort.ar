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

  console.log("asdasdasdasd!!");

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

  // save the hit if more than 0 links are found
  if (links.length > 0) {
    auth().then((session) => {
      prisma.hit.create({
        data: {
          ip:
            String(req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for") || req.ip) ||
            null,
          referer: req.headers.get("referer"),
          userAgent: req.headers.get("user-agent"),
          loggedUserEmail: session?.user?.email || null,
          visitedProfile: links[0].owner?.email || null,
        },
      });
    });
  }
  console.log({ links });

  return NextResponse.json({ data: links });
}
