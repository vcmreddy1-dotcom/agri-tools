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
    // Automatically rewrite port 5432 to transaction pooler port 6543 (required for serverless/Vercel)
    if (url.includes(":5432")) {
      url = url.replace(":5432", ":6543");
    }

    if (!url.includes("connect_timeout")) {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}connect_timeout=15`;
    }
    if (url.includes(":6543") && !url.includes("pgbouncer=true")) {
      const sep = url.includes("?") ? "&" : "?";
      url = `${url}${sep}pgbouncer=true`;
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
