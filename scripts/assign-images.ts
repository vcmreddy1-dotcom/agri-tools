import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Map product slug -> local image filenames from public/uploads/
const productImageMap: Record<string, string[]> = {
  "disc-harrow-mounted-heavy-duty": [
    "WhatsApp Image 2026-10-13 at 16.44.01.jpeg",
    "WhatsApp Image 2026-10-13 at 16.44.08.jpeg",
  ],
  "rotary-tiller-robusto-heavy-duty": [
    "WhatsApp Image 2026-10-13 at 16.44.15.jpeg",
    "WhatsApp Image 2026-10-13 at 16.44.16.jpeg",
    "WhatsApp Image 2026-10-13 at 16.44.03.jpeg",
  ],
  "9-tyne-zero-till-seed-drill": [
    "WhatsApp Image 2026-10-13 at 16.44.12.jpeg",
    "WhatsApp Image 2026-10-13 at 16.44.14.jpeg",
  ],
  "turbo-seeder-roto-till-drill": [
    "WhatsApp Image 2026-10-13 at 16.44.13.jpeg",
    "WhatsApp Image 2026-10-13 at 16.44.13 (1).jpeg",
  ],
  "cultivator-rigid-9-tyne-heavy-duty": [
    "WhatsApp Image 2026-10-13 at 16.44.06 (1).jpeg",
  ],
  "hydraulic-reversible-mould-board-plough": [
    "WhatsApp Image 2026-10-13 at 17.18.23.jpeg",
    "WhatsApp Image 2026-10-13 at 17.18.24.jpeg",
  ],
  "laser-land-leveler-precision-transmitter-bucket": [
    "WhatsApp Image 2026-10-13 at 16.44.11.jpeg",
  ],
  "tractor-mounted-300l-boom-sprayer": [
    "WhatsApp Image 2026-10-13 at 17.51.53.jpeg",
    "WhatsApp Image 2026-10-13 at 17.51.53 (1).jpeg",
    "WhatsApp Image 2026-10-13 at 17.51.53 (2).jpeg",
  ],
  "16l-dual-switch-battery-knapsack-sprayer": [
    "WhatsApp Image 2026-10-13 at 17.51.53 (3).jpeg",
    "WhatsApp Image 2026-10-13 at 17.51.55.jpeg",
    "WhatsApp Image 2026-10-13 at 17.51.55 (1).jpeg",
  ],
  "4-stroke-heavy-duty-side-pack-brush-cutter": [
    "WhatsApp Image 2026-10-13 at 17.51.56.jpeg",
    "WhatsApp Image 2026-10-13 at 17.51.56 (1).jpeg",
  ],
  "heavy-duty-63cc-earth-auger-8-inch": [
    "WhatsApp Image 2026-10-13 at 17.52.09.jpeg",
    "WhatsApp Image 2026-10-13 at 17.52.09 (1).jpeg",
  ],
  "3hp-heavy-duty-motorised-chaff-cutter": [
    "WhatsApp Image 2026-10-13 at 17.52.09 (2).jpeg",
    "WhatsApp Image 2026-10-13 at 17.52.09 (3).jpeg",
  ],
  "boron-steel-rotavator-blades-l-c-type": [
    "WhatsApp Image 2026-10-13 at 17.52.10.jpeg",
    "WhatsApp Image 2026-10-13 at 17.52.10 (1).jpeg",
  ],
  "seed-drill-fluted-roller-seed-cup-assembly": [
    "WhatsApp Image 2026-10-13 at 17.18.26.jpeg",
    "WhatsApp Image 2026-10-13 at 17.18.26 (1).jpeg",
  ],
};

const categoryImageMap: Record<string, string> = {
  "agricultural-implements": "WhatsApp Image 2026-10-13 at 16.44.06.jpeg",
  "spraying-equipment": "WhatsApp Image 2026-10-13 at 17.51.53.jpeg",
  "garden-power-equipment": "WhatsApp Image 2026-10-13 at 17.51.56.jpeg",
  "fodder-equipment": "WhatsApp Image 2026-10-13 at 17.52.09 (2).jpeg",
  "spare-parts": "WhatsApp Image 2026-10-13 at 17.52.09.jpeg",
};

async function main() {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  console.log("Updating product images with real uploaded photos...\n");

  let updatedCount = 0;
  for (const [slug, imageFiles] of Object.entries(productImageMap)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) { console.warn(`  ⚠ Product not found: ${slug}`); continue; }

    const validFiles = imageFiles.filter((file) =>
      fs.existsSync(path.join(uploadsDir, file))
    );
    if (validFiles.length === 0) { console.warn(`  ⚠ No valid images for ${slug}`); continue; }

    await prisma.productMedia.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < validFiles.length; i++) {
      const encodedName = encodeURIComponent(validFiles[i]);
      await prisma.productMedia.create({
        data: {
          productId: product.id, mediaType: "IMAGE",
          mediaUrl: `/uploads/${encodedName}`,
          altText: `${product.name} - View ${i + 1}`,
          displayOrder: i,
        },
      });
    }
    console.log(`  ✓ ${slug} → ${validFiles.length} images`);
    updatedCount++;
  }

  console.log("\nUpdating category images...");
  for (const [slug, imageFile] of Object.entries(categoryImageMap)) {
    if (!fs.existsSync(path.join(uploadsDir, imageFile))) {
      console.warn(`  ⚠ Not found: ${imageFile}`); continue;
    }
    const encodedName = encodeURIComponent(imageFile);
    await prisma.category.update({ where: { slug }, data: { image: `/uploads/${encodedName}` } });
    console.log(`  ✓ ${slug}`);
  }

  console.log(`\n✅ Updated ${updatedCount} products with real photos.`);
}

main().catch((e) => { console.error("Error:", e); process.exit(1); }).finally(() => prisma.$disconnect());
