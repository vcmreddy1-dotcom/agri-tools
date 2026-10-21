import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Brush Cutters and Chain Saws...");

  // 1. Update Brush Cutters Category Image
  const brushCuttersCat = await prisma.category.update({
    where: { slug: "brush-cutters" },
    data: { image: "/uploads/honda-umr435t-backpack-brush-cutter.jpeg" }
  });
  console.log("✓ Updated Brush Cutters category image:", brushCuttersCat.image);

  // 2. Update Chain Saws Category Image
  const chainSawsCat = await prisma.category.update({
    where: { slug: "chain-saws" },
    data: { image: "/uploads/neptune-petrol-chainsaw.jpeg" }
  });
  console.log("✓ Updated Chain Saws category image:", chainSawsCat.image);

  // 3. Upsert Honda Backpack Brush Cutter Product
  const hondaBrushCutter = await prisma.product.upsert({
    where: { slug: "honda-umr435t-4-stroke-backpack-brush-cutter" },
    update: {
      name: "Honda UMR435T 4-Stroke Backpack Brush Cutter & Paddy Harvester",
      brand: "Honda Genuine",
      modelNumber: "PAT-BC-UMR435T",
      shortDescription: "35cc 4-stroke Honda GX35 backpack brush cutter with flexible drive shaft and paddy/wheat crop harvester attachment.",
      description: "Original Honda UMR435T backpack brush cutter engineered for fatigue-free harvesting and agricultural weed clearing. Features Honda's legendary ultra-lightweight GX35 4-stroke mini engine that operates at any angle (360° inclinable). Includes an ergonomic padded backpack frame, heavy-duty flexible shaft, 80T circular paddy harvester attachment with collection deflector, and 2-tooth brush blade.",
      categoryId: brushCuttersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Paddy & Wheat Crop Harvesting, Weed Management, Grass Cutting, Orchard Maintenance",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "35.8 cc (Honda GX35 OHC 4-Stroke)",
        "Engine Power": "1.3 HP (1.0 kW) @ 7000 RPM",
        "Fuel Tank Capacity": "0.63 Litres (Pure Petrol)",
        "Engine Mounting": "Ergonomic Padded Backpack Frame with Vibration Dampers",
        "Drive Type": "Heavy-Duty Flexible Steel Shaft with Loop Handle",
        "Carburetor": "Diaphragm Type (360° Inclinable Operation)",
        "Attachments Included": "80T Crop Harvesting Blade with Deflector, 2T Metal Blade, Tap-and-Go Nylon Trimmer",
        "Dry Weight": "10.0 kg"
      }),
      seoTitle: "Honda UMR435T 4-Stroke Backpack Brush Cutter & Harvester | Prakash Agri Tools",
      seoDescription: "Buy authentic Honda UMR435T 4-stroke backpack brush cutter with paddy harvester attachment from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Honda UMR435T 4-Stroke Backpack Brush Cutter & Paddy Harvester",
      slug: "honda-umr435t-4-stroke-backpack-brush-cutter",
      brand: "Honda Genuine",
      modelNumber: "PAT-BC-UMR435T",
      shortDescription: "35cc 4-stroke Honda GX35 backpack brush cutter with flexible drive shaft and paddy/wheat crop harvester attachment.",
      description: "Original Honda UMR435T backpack brush cutter engineered for fatigue-free harvesting and agricultural weed clearing. Features Honda's legendary ultra-lightweight GX35 4-stroke mini engine that operates at any angle (360° inclinable). Includes an ergonomic padded backpack frame, heavy-duty flexible shaft, 80T circular paddy harvester attachment with collection deflector, and 2-tooth brush blade.",
      categoryId: brushCuttersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Paddy & Wheat Crop Harvesting, Weed Management, Grass Cutting, Orchard Maintenance",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "35.8 cc (Honda GX35 OHC 4-Stroke)",
        "Engine Power": "1.3 HP (1.0 kW) @ 7000 RPM",
        "Fuel Tank Capacity": "0.63 Litres (Pure Petrol)",
        "Engine Mounting": "Ergonomic Padded Backpack Frame with Vibration Dampers",
        "Drive Type": "Heavy-Duty Flexible Steel Shaft with Loop Handle",
        "Carburetor": "Diaphragm Type (360° Inclinable Operation)",
        "Attachments Included": "80T Crop Harvesting Blade with Deflector, 2T Metal Blade, Tap-and-Go Nylon Trimmer",
        "Dry Weight": "10.0 kg"
      }),
      seoTitle: "Honda UMR435T 4-Stroke Backpack Brush Cutter & Harvester | Prakash Agri Tools",
      seoDescription: "Buy authentic Honda UMR435T 4-stroke backpack brush cutter with paddy harvester attachment from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: hondaBrushCutter.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: hondaBrushCutter.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/honda-umr435t-backpack-brush-cutter.jpeg",
        altText: "Honda UMR435T 4-Stroke Backpack Brush Cutter Unit",
        displayOrder: 0
      },
      {
        productId: hondaBrushCutter.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/brush-cutter-wheat-harvesting.jpeg",
        altText: "Farmer Harvesting Wheat Field with Backpack Brush Cutter Attachment",
        displayOrder: 1
      },
      {
        productId: hondaBrushCutter.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/brush-cutter-paddy-harvesting.jpeg",
        altText: "Paddy Harvesting in Golden Crop Field with Brush Cutter",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Created/Updated Honda Backpack Brush Cutter with 3 photos:", hondaBrushCutter.name);

  // 4. Update Existing Side-pack Brush Cutter Product media to link field photos as well
  const sidepackBrushCutter = await prisma.product.findUnique({
    where: { slug: "4-stroke-heavy-duty-side-pack-brush-cutter" }
  });
  if (sidepackBrushCutter) {
    await prisma.productMedia.deleteMany({ where: { productId: sidepackBrushCutter.id } });
    await prisma.productMedia.createMany({
      data: [
        {
          productId: sidepackBrushCutter.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/brush-cutter-paddy-harvesting.jpeg",
          altText: "4-Stroke Side-Pack Brush Cutter Paddy Harvesting",
          displayOrder: 0
        },
        {
          productId: sidepackBrushCutter.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/brush-cutter-wheat-harvesting.jpeg",
          altText: "Wheat Crop Cutting Operation with Harvester Attachment",
          displayOrder: 1
        }
      ]
    });
    console.log("✓ Updated Side-Pack Brush Cutter with field action photos");
  }

  // 5. Upsert Chain Saw Product
  const chainsawProduct = await prisma.product.upsert({
    where: { slug: "heavy-duty-58cc-commercial-petrol-chainsaw" },
    update: {
      name: "Heavy-Duty 58cc Commercial Petrol Chain Saw (22\" Bar)",
      brand: "Neptune / Prakash Agro",
      modelNumber: "PAT-CS-58CC",
      shortDescription: "58cc 2-stroke commercial grade woodcutting chainsaw with 22-inch guide bar and automatic chain lubrication.",
      description: "Industrial strength 58cc petrol chainsaw built for forestry, orchard pruning, firebreak management, and agricultural timber cutting. Equipped with a high-torque 2-stroke engine, automatic inertial chain safety brake, anti-vibration rubber damper handles, and a 22-inch hardened sprocket-nose guide bar.",
      categoryId: chainSawsCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Tree Pruning, Timber Logging, Orchard Maintenance, Firewood Cutting, Farm Perimeter Clearing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "58 cc (2-Stroke Single Cylinder Air-Cooled)",
        "Rated Power": "2.4 kW (3.2 HP) @ 8500 RPM",
        "Guide Bar Length": "22 Inches (55 cm) Sprocket Nose Bar",
        "Chain Pitch & Gauge": "0.325\" Pitch, 0.058\" Gauge Heavy-Duty Chain",
        "Fuel Tank Capacity": "550 ml (Petrol + 2T Oil 25:1)",
        "Oil Tank Capacity": "260 ml Automatic Adjustable Chain Lubricator",
        "Safety System": "Inertia Activated Quick-Stop Chain Brake & Hand Guard",
        "Starting System": "Easy-Pull Recoil Starter with Primer Bulb",
        "Net Weight": "6.8 kg (with bar and chain)"
      }),
      seoTitle: "Heavy-Duty 58cc Commercial Petrol Chain Saw (22\" Bar) | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty 58cc petrol chainsaw with 22 inch bar for timber cutting and tree pruning from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Heavy-Duty 58cc Commercial Petrol Chain Saw (22\" Bar)",
      slug: "heavy-duty-58cc-commercial-petrol-chainsaw",
      brand: "Neptune / Prakash Agro",
      modelNumber: "PAT-CS-58CC",
      shortDescription: "58cc 2-stroke commercial grade woodcutting chainsaw with 22-inch guide bar and automatic chain lubrication.",
      description: "Industrial strength 58cc petrol chainsaw built for forestry, orchard pruning, firebreak management, and agricultural timber cutting. Equipped with a high-torque 2-stroke engine, automatic inertial chain safety brake, anti-vibration rubber damper handles, and a 22-inch hardened sprocket-nose guide bar.",
      categoryId: chainSawsCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Tree Pruning, Timber Logging, Orchard Maintenance, Firewood Cutting, Farm Perimeter Clearing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "58 cc (2-Stroke Single Cylinder Air-Cooled)",
        "Rated Power": "2.4 kW (3.2 HP) @ 8500 RPM",
        "Guide Bar Length": "22 Inches (55 cm) Sprocket Nose Bar",
        "Chain Pitch & Gauge": "0.325\" Pitch, 0.058\" Gauge Heavy-Duty Chain",
        "Fuel Tank Capacity": "550 ml (Petrol + 2T Oil 25:1)",
        "Oil Tank Capacity": "260 ml Automatic Adjustable Chain Lubricator",
        "Safety System": "Inertia Activated Quick-Stop Chain Brake & Hand Guard",
        "Starting System": "Easy-Pull Recoil Starter with Primer Bulb",
        "Net Weight": "6.8 kg (with bar and chain)"
      }),
      seoTitle: "Heavy-Duty 58cc Commercial Petrol Chain Saw (22\" Bar) | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty 58cc petrol chainsaw with 22 inch bar for timber cutting and tree pruning from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: chainsawProduct.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: chainsawProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/neptune-petrol-chainsaw.jpeg",
        altText: "Neptune 58cc Commercial Petrol Chainsaw Unit",
        displayOrder: 0
      },
      {
        productId: chainsawProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/heavy-duty-petrol-chainsaw-58cc.jpeg",
        altText: "Heavy-Duty 58cc Petrol Chainsaw 22-inch Bar Side View",
        displayOrder: 1
      }
    ]
  });
  console.log("✓ Created/Updated Chainsaw product with 2 photos:", chainsawProduct.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
