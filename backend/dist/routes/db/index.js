"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
if (!global.cachedPrisma) {
    global.cachedPrisma = new client_1.PrismaClient();
}
let prisma = global.cachedPrisma;
exports.db = prisma;
