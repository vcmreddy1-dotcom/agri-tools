import sharp from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  extension: string;
  mimeType: string;
  originalSize: number;
  optimizedSize: number;
  savingsBytes: number;
  savingsPercent: number;
  width?: number;
  height?: number;
}

export interface ImageOptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * Optimizes and converts input image buffer to modern, high-efficiency WebP format.
 * - Automatically rotates based on EXIF orientation and strips heavy metadata.
 * - Scales down excessively large dimensions (e.g. >1920px) preserving aspect ratio.
 * - Leaves vector SVG files untouched.
 */
export async function optimizeAndConvertImage(
  inputBuffer: Buffer,
  originalFilename: string,
  options: ImageOptimizationOptions = {}
): Promise<ProcessedImageResult> {
  const { maxWidth = 1920, maxHeight = 1920, quality = 80 } = options;
  const originalSize = inputBuffer.length;

  const isSvg =
    originalFilename.toLowerCase().endsWith(".svg") ||
    inputBuffer.slice(0, 100).toString("utf-8").toLowerCase().includes("<svg");

  if (isSvg) {
    return {
      buffer: inputBuffer,
      extension: ".svg",
      mimeType: "image/svg+xml",
      originalSize,
      optimizedSize: originalSize,
      savingsBytes: 0,
      savingsPercent: 0,
    };
  }

  // Process raster image using sharp
  const image = sharp(inputBuffer, { failOn: "none" });
  const metadata = await image.metadata();

  // Resize only if larger than target dimensions, preserving aspect ratio
  const processed = image
    .rotate() // auto-orient based on EXIF
    .resize({
      width: maxWidth,
      height: maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality,
      effort: 4, // 0-6 effort level (4 balances speed and compression ratio)
    });

  const outputBuffer = await processed.toBuffer();
  const outputMetadata = await sharp(outputBuffer).metadata();
  const optimizedSize = outputBuffer.length;
  const savingsBytes = Math.max(0, originalSize - optimizedSize);
  const savingsPercent =
    originalSize > 0
      ? Math.round(((originalSize - optimizedSize) / originalSize) * 100)
      : 0;

  return {
    buffer: outputBuffer,
    extension: ".webp",
    mimeType: "image/webp",
    originalSize,
    optimizedSize,
    savingsBytes,
    savingsPercent,
    width: outputMetadata.width,
    height: outputMetadata.height,
  };
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

