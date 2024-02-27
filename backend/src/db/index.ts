import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}

if (!global.cachedPrisma) {
  global.cachedPrisma = new PrismaClient();
}
let prisma = global.cachedPrisma;

export const db = prisma;
