import "server-only";
import { PrismaClient } from "@prisma/client";
import { NODE_ENV } from "@/constants";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export default prisma;
