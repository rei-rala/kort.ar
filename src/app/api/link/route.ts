import prisma from "@/db/prisma";
import { auth } from "@/libs/auth";
import utils from "@/utils";

import { NextResponse } from "next/server";

const sensitiveKeys: (keyof RedirectLink)[] = [
  //"id",
  "userEmail",
  "owner",
  "flaggedAt",
  //"createdAt",
  //"updatedAt",
  "deletedAt",
  "hitCount",
];

function buildResponse<T>(
  statusCode: number,
  data: T | null,
  action?: "update" | "delete",
  overrideMessage?: string
): NextResponse<ApiResponse<T>> {
  let message: string;
  let error: string | undefined;

  const isPlural = Array.isArray(data) && data.length > 1;

  const statusMessages: { [key: number]: any } = {
    200: {
      update: isPlural ? "RedirectLinks actualizados" : "RedirectLink actualizado" + " con exito",
      delete: isPlural ? "RedirectLinks eliminados" : "RedirectLink eliminado" + " con exito",
      default: isPlural ? "Mostrando links" : "Mostrando link",
    },
    201: isPlural ? "RedirectLinks creados" : "RedirectLink creado" + " con exito",
    400: "Error en la petición, revise los datos enviados",
    401: "Para continuar con esta acción, inicia sesión",
    404: "No se encontro el RedirectLink solicitado",
    500: "Error interno del servidor",
  };

  message = overrideMessage
    ? overrideMessage
    : action === undefined
    ? statusMessages[statusCode] || "Error desconocido"
    : statusMessages[statusCode][action ?? "default"] || "Error desconocido";

  const success = statusCode < 400; // XD

  return NextResponse.json(
    { data, message, error, status: statusCode, success },
    { status: statusCode }
  );
}

async function generateFrom(fromInput?: string, totalRedirectLinks = 10000, maxAttempts = 10) {
  const getByFromAndNotDeleted = async (from: string) =>
    await prisma.redirectLink.findFirst({
      where: {
        AND: [{ from }, { deletedAt: null }],
      },
    });

  let from;

  if (fromInput) {
    const exists = await getByFromAndNotDeleted(fromInput);

    if (exists) {
      throw new Error(`'${fromInput}' ya fue tomado, intente con otro origen`);
    }
    from = fromInput;
  } else {
    let attempts = 0;
    do {
      from = utils.generateAlphanumericalId(totalRedirectLinks);
      attempts++;
    } while ((await getByFromAndNotDeleted(from)) && attempts < maxAttempts);

    if (attempts === maxAttempts) {
      throw new Error(
        `Failed to generate unique "from" value after maximum attempts (${maxAttempts})`
      );
    }
  }

  return from;
}

export async function GET(_: Request) {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return buildResponse(401, null);
  }

  const linksRaw = await prisma.redirectLink.findMany({
    where: {
      owner: {
        email: session.user.email, // Filter by email matching the provided value
      },
      deletedAt: null,
    },
  });

  const sanitizedRedirectLinks = linksRaw.map((link) => {
    const { hitCount } = link;

    utils.removeKeysFromObject(link, sensitiveKeys); // remueve claves del mismo obj
    link.hitCount = hitCount;

    return link;
  });

  return buildResponse(200, sanitizedRedirectLinks);
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return buildResponse(401, null);
    }

    const redirectLinkJson: RedirectLink = await req.json();
    const redirectLink = utils.removeKeysFromObject(redirectLinkJson, sensitiveKeys);
    const totalRedirectLinks = await prisma.redirectLink.count();
    try {
      redirectLink.from = await generateFrom(redirectLink.from, totalRedirectLinks);
    } catch (error: any) {
      return buildResponse(400, null, undefined, error.message);
    }

    const savedRedirectLink = await prisma.redirectLink.create({
      data: {
        ...(redirectLink as any), // TODO: any, hoy te convertis en heroe
        owner: {
          connect: {
            email: session.user.email,
          },
        },
        deletedAt: null,
      },
    });

    const newRedirectLink = utils.removeKeysFromObject(savedRedirectLink, sensitiveKeys);

    return buildResponse(201, newRedirectLink);
  } catch (error: any) {
    return buildResponse(500, null, error.message);
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    const json = await req.json();

    if (!session || !session.user || !session.user.email) {
      return buildResponse(401, null);
    }

    const {
      userId,
      owner,
      flaggedAt,
      createdAt,
      updatedAt,
      deletedAt,
      hits,

      from: inputFrom, // descartamos lo anterior a esto
      id: inputId,
      ...redirectLink
    } = json;

    // primero, buscamos que el id coincida con el usuario dueño y no este eliminado
    const redirectLinkFound = await prisma.redirectLink.findUnique({
      where: {
        id: inputId,
        owner: {
          email: session.user.email,
        },
        deletedAt: null,
      },
      include: {
        owner: true,
      },
    });

    // si no coincide el id con el usuario dueño, se retorna un error
    if (!redirectLinkFound) {
      return buildResponse(404, null);
    }

    // avanzamos a la siguiente validación
    const totalRedirectLinks = await prisma.redirectLink.count();
    let from: string;

    if (inputFrom) {
      // si existe origen, se valida que no pertenezca a otro usuario y que no este eliminado
      const redirectLinkWithDifferentIdSameFrom = await prisma.redirectLink.findFirst({
        where: {
          from: inputFrom,
          id: {
            not: inputId,
          },
          deletedAt: null,
        },
      });

      // si el origen ya pertenece a otro usuario, se retorna un error
      if (redirectLinkWithDifferentIdSameFrom) {
        return buildResponse(
          400,
          null,
          undefined,
          `El origen "${inputFrom}" ya fue tomado, intente con otro`
        );
      }

      // al no pertenecer a otro usuario, se asigna el origen
      from = inputFrom;
    } else {
      // y esto en caso de que no exista origen o se haya removido, se genera uno nuevo aleartorio
      from = await generateFrom(inputFrom, totalRedirectLinks);
    }

    // se actualiza el registro con los nuevos valores
    const updatedRedirectLink = await prisma.redirectLink.update({
      where: { id: inputId },
      data: {
        ...redirectLink, // valores nuevos
        from, // from personalizado o aleatorio
      },
    });

    const newRedirectLink = utils.removeKeysFromObject(updatedRedirectLink, sensitiveKeys);

    return buildResponse(200, newRedirectLink, "update");
  } catch (error: any) {
    return buildResponse(500, null, undefined, error.message);
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.email) {
      return buildResponse(401, null);
    }

    const json = await req.json();
    const { id } = json;

    // verifico que el id a eliminar le pertenezca al usuario y que no este eliminado
    const redirectLinkFound = await prisma.redirectLink.findUnique({
      where: {
        id,
        owner: {
          email: session.user.email,
        },
        deletedAt: null,
      },
    });

    // si el id no le pertenece al usuario, se retorna un error
    if (!redirectLinkFound) return buildResponse(404, null);

    // si el id le pertenece al usuario, se realiza soft delete
    const deletedRedirectLink = await prisma.redirectLink.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return buildResponse(200, deletedRedirectLink, "delete");
  } catch (error: any) {
    console.log(error);
    return buildResponse(500, null, undefined);
  }
}
