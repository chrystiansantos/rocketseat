import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  // a cada operação que o prisma faca ele ira printar a query
  log: ['query']
});