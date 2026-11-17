import "server-only";
import { PrismaClient } from "@/lib/generated/prisma/client";

// DATABASE_URL is a prisma+postgres:// (Accelerate) URL, so no driver adapter.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ accelerateUrl: process.env.DATABASE_URL! });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
