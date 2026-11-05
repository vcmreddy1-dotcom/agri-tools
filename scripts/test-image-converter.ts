import fs from "fs";
import path from "path";
import { optimizeAndConvertImage, formatBytes } from "../lib/image-converter";

async function runTest() {
  console.log("=================================================");
  console.log(" TESTING IMAGE CONVERTER & OPTIMIZATION PIPELINE  ");
  console.log("=================================================\n");

  const sampleDir = path.join(process.cwd(), "public", "uploads");
  const files = fs.readdirSync(sampleDir).filter((f) => f.endsWith(".jpeg") || f.endsWith(".jpg") || f.endsWith(".png"));

  if (files.length === 0) {
    console.log("No test images found in public/uploads");
    return;
  }

  const testFile = files[0];
  const inputBuffer = fs.readFileSync(path.join(sampleDir, testFile));

  console.log(`Testing image conversion on: ${testFile}`);
  console.log(`Original file size: ${formatBytes(inputBuffer.length)} (${inputBuffer.length} bytes)`);

  const result = await optimizeAndConvertImage(inputBuffer, testFile, {
    maxWidth: 1920,
    maxHeight: 1920,
    quality: 80,
  });

  console.log(`\nResults:`);
  console.log(`Output Extension: ${result.extension}`);
  console.log(`Output MIME:      ${result.mimeType}`);
  console.log(`Dimensions:       ${result.width}x${result.height}px`);
  console.log(`Optimized Size:   ${formatBytes(result.optimizedSize)} (${result.optimizedSize} bytes)`);
  console.log(`Saved:            ${formatBytes(result.savingsBytes)} (${result.savingsPercent}% reduction)`);

  if (result.extension !== ".webp") {
    throw new Error(`Expected .webp extension, got ${result.extension}`);
  }

  if (result.optimizedSize >= result.originalSize && inputBuffer.length > 50000) {
    console.warn("Warning: Expected size reduction for large image");
  } else {
    console.log(`\n✓ SUCCESS: Image converted to WebP with ${result.savingsPercent}% storage reduction!`);
  }
}

runTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
