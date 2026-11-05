import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { optimizeAndConvertImage, formatBytes } from "@/lib/image-converter";
import { prisma } from "@/lib/db";

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB limit before conversion
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/svg+xml",
  "image/avif",
  "image/tiff",
  "image/gif",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File exceeds ${formatBytes(MAX_FILE_SIZE)} limit` },
        { status: 400 }
      );
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid image format. Supported formats: JPEG, PNG, WebP, AVIF, TIFF, GIF, SVG",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);

    // 1. Optimize and convert to modern WebP format (or retain SVG)
    const converted = await optimizeAndConvertImage(inputBuffer, file.name, {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 80,
    });

    const baseName = path.parse(file.name).name.replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${Date.now()}-${baseName}${converted.extension}`;

    // 2. Persist image to PostgreSQL database so it is guaranteed to work on Vercel
    const imageRecord = await prisma.uploadedImage.create({
      data: {
        filename: uniqueFilename,
        mimeType: converted.mimeType,
        data: Uint8Array.from(converted.buffer),
        size: converted.optimizedSize,
        width: converted.width || null,
        height: converted.height || null,
      },
    });

    // 3. Optional local disk cache (only if filesystem is writable; ignored on Vercel EROFS)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, uniqueFilename);
      await writeFile(filepath, converted.buffer);
    } catch {
      // Ignored: On serverless platforms like Vercel, the local filesystem is read-only.
      // Images are reliably served directly from PostgreSQL via Edge-cached /api/images/[id].
    }

    // Edge-cached public URL backed by database
    const publicUrl = `/api/images/${imageRecord.id}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: uniqueFilename,
      id: imageRecord.id,
      format: converted.extension.replace(".", ""),
      originalSize: formatBytes(converted.originalSize),
      optimizedSize: formatBytes(converted.optimizedSize),
      savingsBytes: formatBytes(converted.savingsBytes),
      savingsPercent: converted.savingsPercent,
      width: converted.width,
      height: converted.height,
    });
  } catch (err: any) {
    console.error("Upload & conversion error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process and optimize image" },
      { status: 500 }
    );
  }
}
