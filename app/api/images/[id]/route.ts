import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Image ID required", { status: 400 });
    }

    const image = await prisma.uploadedImage.findUnique({
      where: { id },
    });

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(image.data, {
      status: 200,
      headers: {
        "Content-Type": image.mimeType || "image/webp",
        "Content-Length": String(image.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Error serving image:", err);
    return new NextResponse("Failed to retrieve image", { status: 500 });
  }
}
