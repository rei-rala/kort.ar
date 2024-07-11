import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";
import { generateAlphanumericalId } from "@/utils/text";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth();

  console.warn({ session });
  const links = await prisma.redirectLink.findMany();
  return NextResponse.json(links);
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const json = await req.json();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id: inputId,
      userId,
      owner,

      flaggedAt,
      createdAt,
      updatedAt,
      deletedAt,

      from: fromInput,
      ...redirectLink // only the redirectLink object
    } = json;

    const totalRedirectLinks = await prisma.redirectLink.count();
    let from: string;

    if (fromInput) {
      from = fromInput;
    } else {
      do {
        from = generateAlphanumericalId(totalRedirectLinks);
      } while (await prisma.redirectLink.findFirst({ where: { from } }));
    }

    const savedRedirectLink = await prisma.redirectLink.create({
      data: {
        owner: { connect: { email: session.user.email } },
        from,
        ...redirectLink,
      },
    });

    // We don't want to expose these
    for (let key of ["id", "ownerId", "deletedAt", "updatedAt", "flaggedAt"]) {
      delete (savedRedirectLink as Partial<typeof savedRedirectLink>)[
        key as keyof typeof savedRedirectLink
      ];
    }

    return NextResponse.json({ data: savedRedirectLink });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
