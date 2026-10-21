import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Chaff Cutters and Mini Tillers...");

  // 1. Update Categories
  const chaffCuttersCat = await prisma.category.update({
    where: { slug: "chaff-cutters" },
    data: { image: "/uploads/amar-electric-motorised-chaff-cutter.jpeg" }
  });
  console.log("✓ Updated Chaff Cutters category image:", chaffCuttersCat.image);

  const miniTillersCat = await prisma.category.update({
    where: { slug: "mini-tillers" },
    data: { image: "/uploads/mini-power-tiller-cultivator-63cc.jpeg" }
  });
  console.log("✓ Updated Mini Tillers category image:", miniTillersCat.image);

  // 2. Update existing Motorised Chaff Cutter Product with authentic Amar & Flywheel photos
  const motorisedChaffCutter = await prisma.product.findUnique({
    where: { slug: "3hp-heavy-duty-motorised-chaff-cutter" }
  });
  if (motorisedChaffCutter) {
    await prisma.productMedia.deleteMany({ where: { productId: motorisedChaffCutter.id } });
    await prisma.productMedia.createMany({
      data: [
        {
          productId: motorisedChaffCutter.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/amar-electric-motorised-chaff-cutter.jpeg",
          altText: "Amar 3HP Electric Motorised Chaff Cutter Unit",
          displayOrder: 0
        },
        {
          productId: motorisedChaffCutter.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/flywheel-green-fodder-chaff-cutter.jpeg",
          altText: "Flywheel Chaff Cutter Chopping Green Napier Grass and Fodder",
          displayOrder: 1
        }
      ]
    });
    console.log("✓ Updated Motorised Chaff Cutter with authentic photos");
  }

  // 3. Upsert Tractor PTO Chaff Cutter Product
  const tractorChaffCutter = await prisma.product.upsert({
    where: { slug: "tractor-pto-driven-heavy-duty-chaff-cutter" },
    update: {
      name: "Tractor PTO-Driven Heavy Duty Chaff Cutter / Silage Chopper",
      brand: "Captain / Prakash Agro",
      modelNumber: "PAT-CC-PTO",
      shortDescription: "Tractor PTO operated high-capacity fodder cutter on transport wheels for large dairy farms and silage making.",
      description: "Heavy-duty commercial fodder cutter powered directly by tractor 540 RPM PTO shaft. Built on a reinforced 4-wheel mobile trolley with tow hitch, making it easy to position anywhere across the farm. Capable of processing up to 3500 kg of green maize, sorghum, napier grass, and dry straw per hour with dual forward-neutral-reverse feeding rollers.",
      categoryId: chaffCuttersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Dairy Farm Fodder Chopping, Silage Bunker Preparation, Commercial Livestock Feed Processing",
      technicalSpecifications: JSON.stringify({
        "Power Source": "Tractor PTO Driven (540 RPM, 18 - 45 HP)",
        "Chopping Capacity": "2500 - 3500 kg/hour (Green Fodder)",
        "Cutting Mechanism": "3 Heavy High-Carbon Heat-Treated Curved Knives",
        "Chassis": "Heavy Angle-Iron Trolley with 4 Solid Transport Wheels & Tow Bar",
        "Feeding System": "Gearbox-Driven Dual Feed Rollers with Reverse/Forward Safety Lever",
        "Cut Length": "10 mm to 25 mm adjustable",
        "Weight": "195 kg approx"
      }),
      seoTitle: "Tractor PTO-Driven Heavy Duty Chaff Cutter | Prakash Agri Tools",
      seoDescription: "High-capacity tractor PTO driven chaff cutter and silage chopper for dairy farms. Quality agricultural equipment from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Tractor PTO-Driven Heavy Duty Chaff Cutter / Silage Chopper",
      slug: "tractor-pto-driven-heavy-duty-chaff-cutter",
      brand: "Captain / Prakash Agro",
      modelNumber: "PAT-CC-PTO",
      shortDescription: "Tractor PTO operated high-capacity fodder cutter on transport wheels for large dairy farms and silage making.",
      description: "Heavy-duty commercial fodder cutter powered directly by tractor 540 RPM PTO shaft. Built on a reinforced 4-wheel mobile trolley with tow hitch, making it easy to position anywhere across the farm. Capable of processing up to 3500 kg of green maize, sorghum, napier grass, and dry straw per hour with dual forward-neutral-reverse feeding rollers.",
      categoryId: chaffCuttersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Dairy Farm Fodder Chopping, Silage Bunker Preparation, Commercial Livestock Feed Processing",
      technicalSpecifications: JSON.stringify({
        "Power Source": "Tractor PTO Driven (540 RPM, 18 - 45 HP)",
        "Chopping Capacity": "2500 - 3500 kg/hour (Green Fodder)",
        "Cutting Mechanism": "3 Heavy High-Carbon Heat-Treated Curved Knives",
        "Chassis": "Heavy Angle-Iron Trolley with 4 Solid Transport Wheels & Tow Bar",
        "Feeding System": "Gearbox-Driven Dual Feed Rollers with Reverse/Forward Safety Lever",
        "Cut Length": "10 mm to 25 mm adjustable",
        "Weight": "195 kg approx"
      }),
      seoTitle: "Tractor PTO-Driven Heavy Duty Chaff Cutter | Prakash Agri Tools",
      seoDescription: "High-capacity tractor PTO driven chaff cutter and silage chopper for dairy farms. Quality agricultural equipment from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: tractorChaffCutter.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: tractorChaffCutter.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/tractor-pto-chaff-cutter-field.jpeg",
        altText: "Tractor PTO-Driven Chaff Cutter Operating in Field",
        displayOrder: 0
      }
    ]
  });
  console.log("✓ Created/Updated Tractor PTO Chaff Cutter product:", tractorChaffCutter.name);

  // 4. Upsert 63cc Mini Power Tiller Product
  const miniTiller = await prisma.product.upsert({
    where: { slug: "63cc-2-stroke-portable-mini-power-tiller" },
    update: {
      name: "63cc 2-Stroke Portable Mini Power Tiller / Cultivator",
      brand: "Prakash Agro",
      modelNumber: "PAT-MT-63CC",
      shortDescription: "63cc high-torque portable mini power tiller with 16 heat-treated rotary blades for inter-cultivation and weeding.",
      description: "Compact, highly maneuverable petrol mini power tiller designed for vegetable farming, polyhouses, horticulture orchards, and inter-row weed management in cotton and sugarcane crops. Equipped with 16 heavy-duty curved tilling blades that thoroughly pulverize dry and loamy soil up to 15cm depth, an ergonomic adjustable handlebar with thumb throttle, and a front transport wheel.",
      categoryId: miniTillersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Vegetable Inter-Cultivation, Polyhouse Tillage, Orchard De-weeding, Soil Aeration & Furrow Loosening",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "63 cc 2-Stroke Single Cylinder Air-Cooled",
        "Engine Power": "2.8 HP (2.1 kW) @ 7500 RPM",
        "Tilling Width": "300 mm - 450 mm (Adjustable Gangs)",
        "Tilling Depth": "100 mm - 150 mm (4 - 6 Inches)",
        "Number of Blades": "16 Curved Boron Steel Tilling Knives (4 Gangs of 4)",
        "Transmission": "Centrifugal Clutch with Worm Gear Reducer",
        "Fuel Tank Capacity": "1.2 Litres (Petrol + 2T Oil 25:1)",
        "Transport Wheel": "Foldable Front Rubber Transport Wheel",
        "Dry Weight": "16.5 kg"
      }),
      seoTitle: "63cc Portable Mini Power Tiller & Weeder | Prakash Agri Tools",
      seoDescription: "Buy compact 63cc 2-stroke mini power tiller and cultivator for horticulture and vegetable inter-cultivation from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "63cc 2-Stroke Portable Mini Power Tiller / Cultivator",
      slug: "63cc-2-stroke-portable-mini-power-tiller",
      brand: "Prakash Agro",
      modelNumber: "PAT-MT-63CC",
      shortDescription: "63cc high-torque portable mini power tiller with 16 heat-treated rotary blades for inter-cultivation and weeding.",
      description: "Compact, highly maneuverable petrol mini power tiller designed for vegetable farming, polyhouses, horticulture orchards, and inter-row weed management in cotton and sugarcane crops. Equipped with 16 heavy-duty curved tilling blades that thoroughly pulverize dry and loamy soil up to 15cm depth, an ergonomic adjustable handlebar with thumb throttle, and a front transport wheel.",
      categoryId: miniTillersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Vegetable Inter-Cultivation, Polyhouse Tillage, Orchard De-weeding, Soil Aeration & Furrow Loosening",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "63 cc 2-Stroke Single Cylinder Air-Cooled",
        "Engine Power": "2.8 HP (2.1 kW) @ 7500 RPM",
        "Tilling Width": "300 mm - 450 mm (Adjustable Gangs)",
        "Tilling Depth": "100 mm - 150 mm (4 - 6 Inches)",
        "Number of Blades": "16 Curved Boron Steel Tilling Knives (4 Gangs of 4)",
        "Transmission": "Centrifugal Clutch with Worm Gear Reducer",
        "Fuel Tank Capacity": "1.2 Litres (Petrol + 2T Oil 25:1)",
        "Transport Wheel": "Foldable Front Rubber Transport Wheel",
        "Dry Weight": "16.5 kg"
      }),
      seoTitle: "63cc Portable Mini Power Tiller & Weeder | Prakash Agri Tools",
      seoDescription: "Buy compact 63cc 2-stroke mini power tiller and cultivator for horticulture and vegetable inter-cultivation from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: miniTiller.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: miniTiller.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/mini-power-tiller-cultivator-63cc.jpeg",
        altText: "63cc Portable Mini Power Tiller and Weeder Unit",
        displayOrder: 0
      },
      {
        productId: miniTiller.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/farmer-mini-power-tiller-field.jpeg",
        altText: "Farmer Operating Red Mini Power Tiller in Agricultural Field",
        displayOrder: 1
      }
    ]
  });
  console.log("✓ Created/Updated Mini Power Tiller with 2 photos:", miniTiller.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
