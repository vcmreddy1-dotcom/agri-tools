import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Power Sprayers, 300L Sprayers, and Slasher...");

  // 1. Update Power Sprayers Category image
  const powerSprayersCat = await prisma.category.update({
    where: { slug: "power-sprayers" },
    data: { image: "/uploads/royal-kissan-knapsack-power-sprayer-768.jpeg" },
  });
  console.log("✓ Updated Power Sprayers category image:", powerSprayersCat.image);

  // 2. Update 300L Sprayers Category image
  const boomSprayersCat = await prisma.category.update({
    where: { slug: "300l-sprayers" },
    data: { image: "/uploads/tractor-mounted-boom-sprayer-300l.jpeg" },
  });
  console.log("✓ Updated 300L Sprayers category image:", boomSprayersCat.image);

  // 3. Upsert Power Sprayer Product
  const powerSprayerProd = await prisma.product.upsert({
    where: { slug: "25l-4-stroke-petrol-knapsack-power-sprayer" },
    update: {
      name: "25L 4-Stroke Heavy Duty Knapsack Power Sprayer",
      brand: "Neptune / Royal Kissan",
      modelNumber: "PAT-PS-768",
      shortDescription: "31cc 4-stroke commercial engine knapsack sprayer with brass double-acting high pressure piston pump.",
      description: "Commercial grade portable knapsack power sprayer designed for high-reach orchards, cotton, chilly, and horticulture fields. Powered by a fuel-efficient 4-stroke petrol engine that eliminates messy 2T oil pre-mixing and delivers continuous 10–35 kg/cm² operating pressure with a 3-nozzle brass spray lance.",
      categoryId: powerSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Orchard Spraying, Cotton, Vegetables, Tea & Coffee Plantations, Pest Control",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "25 Litres (Heavy Virgin HDPE)",
        "Engine Type": "31 cc 4-Stroke Overhead Cam Petrol Engine",
        "Power Output": "1.0 HP @ 6500 RPM",
        "Fuel Type": "Pure Petrol (No 2T Oil Pre-mixing required)",
        "Pump Type": "Heavy Duty Brass Double-Acting Piston Pump",
        "Working Pressure": "1.5 - 3.5 MPa (15 - 35 Bar / 150 - 350 PSI)",
        "Discharge Rate": "6 - 8 Litres/minute",
        "Hose & Lance": "8.5 mm Heavy Pressure Hose with 3-Nozzle Brass Lance",
        "Dry Weight": "9.5 kg approx"
      }),
      seoTitle: "25L 4-Stroke Knapsack Power Sprayer | Prakash Agri Tools Hyderabad",
      seoDescription: "Commercial 25L 4-stroke petrol knapsack power sprayer with brass pump. High-pressure crop protection equipment by Prakash Agri Tools."
    },
    create: {
      name: "25L 4-Stroke Heavy Duty Knapsack Power Sprayer",
      slug: "25l-4-stroke-petrol-knapsack-power-sprayer",
      brand: "Neptune / Royal Kissan",
      modelNumber: "PAT-PS-768",
      shortDescription: "31cc 4-stroke commercial engine knapsack sprayer with brass double-acting high pressure piston pump.",
      description: "Commercial grade portable knapsack power sprayer designed for high-reach orchards, cotton, chilly, and horticulture fields. Powered by a fuel-efficient 4-stroke petrol engine that eliminates messy 2T oil pre-mixing and delivers continuous 10–35 kg/cm² operating pressure with a 3-nozzle brass spray lance.",
      categoryId: powerSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Orchard Spraying, Cotton, Vegetables, Tea & Coffee Plantations, Pest Control",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "25 Litres (Heavy Virgin HDPE)",
        "Engine Type": "31 cc 4-Stroke Overhead Cam Petrol Engine",
        "Power Output": "1.0 HP @ 6500 RPM",
        "Fuel Type": "Pure Petrol (No 2T Oil Pre-mixing required)",
        "Pump Type": "Heavy Duty Brass Double-Acting Piston Pump",
        "Working Pressure": "1.5 - 3.5 MPa (15 - 35 Bar / 150 - 350 PSI)",
        "Discharge Rate": "6 - 8 Litres/minute",
        "Hose & Lance": "8.5 mm Heavy Pressure Hose with 3-Nozzle Brass Lance",
        "Dry Weight": "9.5 kg approx"
      }),
      seoTitle: "25L 4-Stroke Knapsack Power Sprayer | Prakash Agri Tools Hyderabad",
      seoDescription: "Commercial 25L 4-stroke petrol knapsack power sprayer with brass pump. High-pressure crop protection equipment by Prakash Agri Tools."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: powerSprayerProd.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: powerSprayerProd.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/royal-kissan-knapsack-power-sprayer-768.jpeg",
        altText: "Royal Kissan 25L Knapsack Power Sprayer",
        displayOrder: 0
      },
      {
        productId: powerSprayerProd.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/neptune-4-stroke-knapsack-power-sprayer-767.jpeg",
        altText: "Neptune 4-Stroke NF-767 Knapsack Power Sprayer",
        displayOrder: 1
      }
    ]
  });
  console.log("✓ Created/Updated Power Sprayer product:", powerSprayerProd.name);

  // 4. Update 300L Boom Sprayer Product Media with new clean photos
  const boomProduct = await prisma.product.findUnique({
    where: { slug: "tractor-mounted-300l-boom-sprayer" }
  });
  if (boomProduct) {
    await prisma.productMedia.deleteMany({ where: { productId: boomProduct.id } });
    await prisma.productMedia.createMany({
      data: [
        {
          productId: boomProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/tractor-mounted-boom-sprayer-300l.jpeg",
          altText: "Tractor Mounted 300L Boom Sprayer Unit with Folding Arms",
          displayOrder: 0
        },
        {
          productId: boomProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/tractor-boom-sprayer-field.jpeg",
          altText: "300L Boom Sprayer Attached to Tractor 3-Point Linkage",
          displayOrder: 1
        }
      ]
    });
    console.log("✓ Updated Tractor Mounted 300L Boom Sprayer media gallery with authentic photos");
  }

  // 5. Update Slasher Product with 3rd photo (depth wheel version)
  const slasherProduct = await prisma.product.findUnique({
    where: { slug: "heavy-duty-tractor-rotary-slasher-pasture-topper" }
  });
  if (slasherProduct) {
    await prisma.productMedia.deleteMany({ where: { productId: slasherProduct.id } });
    await prisma.productMedia.createMany({
      data: [
        {
          productId: slasherProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/heavy-duty-rotary-slasher-deck.jpeg",
          altText: "Heavy-Duty Rotary Slasher Deck with Skid Shoes",
          displayOrder: 0
        },
        {
          productId: slasherProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/tractor-slasher-depth-wheel.jpeg",
          altText: "Tractor Rotary Slasher with Rear Depth Control Wheel and Chains",
          displayOrder: 1
        },
        {
          productId: slasherProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/tractor-rotary-slasher-grass.jpeg",
          altText: "Tractor Rotary Slasher Clearing Field Edge and Tall Grass",
          displayOrder: 2
        }
      ]
    });
    console.log("✓ Updated Heavy-Duty Rotary Slasher product with 3rd photo (depth wheel)");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
