import { PrismaClient } from "@prisma/client";

function getSanitizedDatabaseUrl(): string | undefined {
  let url = process.env.DATABASE_URL?.trim();
  if (!url) return undefined;

  // Strip surrounding quotes if accidentally copied into Vercel env
  if (
    (url.startsWith('"') && url.endsWith('"')) ||
    (url.startsWith("'") && url.endsWith("'"))
  ) {
    url = url.slice(1, -1).trim();
  }

  // Strip accidental trailing text like "1. Connection string"
  url = url.replace(/1\.\s*Connection\s*string.*$/i, "").trim();

  // For Supabase connection poolers, ensure resilient timeouts & pooling flags
  if (url.includes("pooler.supabase.com")) {
    if (!url.includes("connect_timeout")) {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}connect_timeout=15`;
    }
    if (url.includes(":6543") && !url.includes("pgbouncer=true")) {
      url = `${url}&pgbouncer=true`;
    }
  }

  return url;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const sanitizedUrl = getSanitizedDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: sanitizedUrl,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
