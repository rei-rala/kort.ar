import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";
import { NextResponse } from "next/server";

const getRedirectLinks = async () => {
  return await prisma.redirectLink.findMany({});
};

// Función para construir la respuesta
const createResponse = (links: RedirectLink[]) => {
  const linksFound = links.length > 0;
  const message = linksFound ? "Mostrando links" : "No hay links";
  const data = linksFound ? links : [];

  return NextResponse.json({ message, data }, { status: 200 });
};

export const GET = auth(async function GET(req) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  try {
    const links = await getRedirectLinks();
    return createResponse(links as RedirectLink[]);
  } catch (error) {
    console.error("Error fetching redirect links:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
});
