import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";

// prisma+postgres:// (Prisma Postgres / Accelerate) goes over HTTP; plain postgres:// uses the pg driver.
export function createPrisma(url = process.env.DATABASE_URL!) {
  return url.startsWith("prisma+")
    ? new PrismaClient({ accelerateUrl: url })
    : new PrismaClient({
        adapter: new PrismaPg({
          connectionString: url,
          max: Number(new URL(url).searchParams.get("connection_limit")) || undefined,
        }),
      });
}
