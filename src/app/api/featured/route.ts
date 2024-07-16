import { EXPIRATION_CACHED_DAYS_FEATURED, NEXTAUTH_URL } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

import { createClient } from "@vercel/kv";

type FeaturedResponse = { featuredLink: RedirectLink; featuredUser: User };

async function featuredUserAndLink() {
  const featured = createClient({
    url: process.env.KV_redis_REST_API_URL,
    token: process.env.KV_redis_REST_API_TOKEN,
  });

  const featuredUserAndLinkFound = await featured.get<FeaturedResponse>("featured:UserAndLink");

  if (featuredUserAndLinkFound?.featuredLink && featuredUserAndLinkFound.featuredUser) {
    return featuredUserAndLinkFound;
  }

  try {
    const featuredLink: FeaturedLink | null = await prisma.redirectLink.findFirst({
      where: {
        active: true,
        public: true,
        deletedAt: null,
        flaggedAt: null,
      },
      orderBy: {
        hitCount: "desc",
      },
      select: {
        alias: true,
        from: true,
        to: true,
        color: true,
        hitCount: true,
      },
    });

    const featuredUser: FeaturedUser | null = await prisma.user.findFirst({
      where: {
        public: true,
        deletedAt: null,
        flaggedAt: null,
      },
      orderBy: { hitCount: "desc" },
      select: {
        username: true,
        image: true,
        hitCount: true,
      },
    });

    if (
      featuredLink &&
      featuredUser &&
      [featuredLink, featuredUser].every((x) => JSON.stringify(x) !== "{}")
    ) {
      const expirationTtl = EXPIRATION_CACHED_DAYS_FEATURED * 60 * 60 * 24;
      await featured.set("featured:UserAndLink", [{ featuredLink, featuredUser }], {
        ex: expirationTtl,
      });
    }

    return {
      featuredLink,
      featuredUser,
    };
  } catch (error) {
    console.error("Error trying to get featured link and user");
    console.error(JSON.stringify(error, null, 2));
  }

  return {
    featuredLink: null,
    featuredUser: null,
  };
}

export async function GET(req: NextRequest) {
  const featured = await featuredUserAndLink();
  return NextResponse.json({
    data: featured,
  });
}
