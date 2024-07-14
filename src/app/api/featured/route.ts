import { EXPIRATION_CACHED_DAYS_FEATURED, NEXTAUTH_URL } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

import { createClient } from "@vercel/kv";
import utils from "@/utils";
import { redirectLinkSensitiveKeys } from "@/db/schemas";
//TODO Añadir un "SELF-COUNT" a HIT que obtenga el hitcount de redirectLink o de user segun corresponda
type FeaturedResponse = { featuredLink: RedirectLink; featuredUser: User };

async function featuredUserAndLink() {
  const featured = createClient({
    url: process.env.KV_redis_REST_API_URL,
    token: process.env.KV_redis_REST_API_TOKEN,
  });

  const featuredUserAndLinkFound = await featured.get<FeaturedResponse>("featured:UserAndLink");
  console.warn({ featuredUserAndLinkFound });
  if (featuredUserAndLinkFound?.featuredLink && featuredUserAndLinkFound.featuredUser) {
    console.log("OBTENIDO REDIS");
    return featuredUserAndLinkFound;
  }

  const featuredLink: Omit<RedirectLink, "owner"> | null = await prisma.redirectLink.findFirst({
    where: {
      active: true,
      public: true,

      deletedAt: null,
      flaggedAt: null,
    },
    orderBy: {
      hitCount: "desc",
    },
    include: {
      owner: true,
    },
  });

  const featuredUser: User | null | any = await prisma.user.findFirst({
    where: {
      public: true,
      deletedAt: null,
      flaggedAt: null,
    },
    orderBy: { hitCount: "desc" },
  });

  console.log(
    "OBTENIDO MONGO",
    {
      featuredLink,
      featuredUser,
    },
    "OBTENIDO MONGO"
  );

  if (featuredLink && featuredUser) {
    const expirationTtl = EXPIRATION_CACHED_DAYS_FEATURED * 60 * 60 * 24;
    await featured.set("featured:UserAndLink", [{ featuredLink, featuredUser }], {
      ex: expirationTtl,
    });
    console.warn("GUARDADO REDIS");
  }
  return {
    featuredLink,
    featuredUser,
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

  let featuredLinkNotSensitive = utils.removeKeysFromObject(
    featuredLink,
    redirectLinkSensitiveKeys
  );
  let featuredUserNotSensitive = utils.removeKeysFromObject(featuredUser, [
    "name",
    "email",
    "emailVerified",
  ]);

  return NextResponse.json({
    data: {
      featuredLink: featuredLinkNotSensitive,
      featuredUser: featuredUserNotSensitive,
    },
  });
}
