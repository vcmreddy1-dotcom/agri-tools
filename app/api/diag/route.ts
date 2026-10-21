import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const rawDbUrl = process.env.DATABASE_URL || "";
  let sanitizedHost = "none";
  let sanitizedUser = "none";
  let port = "none";
  try {
    if (rawDbUrl) {
      const u = new URL(rawDbUrl.replace(/^postgresql:\/\//, "http://"));
      sanitizedHost = u.hostname;
      sanitizedUser = u.username;
      port = u.port;
    }
  } catch {
    sanitizedHost = "parse_error";
  }

  try {
    const [catCount, prodCount] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      connectedHost: sanitizedHost,
      connectedUser: sanitizedUser,
      port,
      categoriesCount: catCount,
      productsCount: prodCount,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      {
        status: "error",
        connectedHost: sanitizedHost,
        connectedUser: sanitizedUser,
        port,
        errorMessage: error?.message || String(err),
        errorName: error?.name,
      },
      { status: 500 }
    );
  }
}
