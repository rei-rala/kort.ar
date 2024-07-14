import { EXPIRATION_CACHED_DAYS_FEATURED, NEXTAUTH_URL } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

import { createClient } from "@vercel/kv";
import utils from "@/utils";

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
    const featuredLinkFound: RedirectLink | null = (await prisma.redirectLink.findFirst({
      where: {
        active: true,
        public: true,
        deletedAt: null,
        flaggedAt: null,
      },
      orderBy: {
        hitCount: "desc",
      },
    })) as unknown as RedirectLink;

    const featuredUserFound: User | null = (await prisma.user.findFirst({
      where: {
        public: true,
        deletedAt: null,
        flaggedAt: null,
      },
      orderBy: { hitCount: "desc" },
    })) as unknown as User;

    const featuredLink = utils.getObjectWithSomeKeys(featuredLinkFound, [
      "alias",
      "from",
      "to",
      "hitCount",
    ]);
    const featuredUser = utils.getObjectWithSomeKeys(featuredUserFound, [
      "username",
      "image",
      "hitCount",
    ]);

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
  if (req.headers.get("origin") !== NEXTAUTH_URL) {
    return NextResponse.json(
      {
        data: null,
        message: "Error inesperado. Por favor, intenta de nuevo.",
      },
      { status: 500 }
    );
  }
  
  let { featuredLink, featuredUser } = await featuredUserAndLink();

  return NextResponse.json({
    data: {
      featuredLink,
      featuredUser,
    },
  });
}
