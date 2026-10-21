import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating category and adding products for Solar Sprayers...");

  // 1. Update Solar Sprayers Category Image
  const solarSprayersCat = await prisma.category.update({
    where: { slug: "solar-sprayers" },
    data: { image: "/uploads/solar-knapsack-sprayer-16l-panel.jpeg" }
  });
  console.log("✓ Updated Solar Sprayers category image:", solarSprayersCat.image);

  // 2. Product 1: Solar-Powered 16L Knapsack Sprayer (12V Battery + Solar Panel)
  const product1 = await prisma.product.upsert({
    where: { slug: "solar-powered-16l-knapsack-battery-sprayer" },
    update: {
      name: "Solar-Powered 16L Knapsack Battery Sprayer (12V SLA / Solar Panel)",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-16L",
      shortDescription: "16-litre heavy-duty knapsack crop sprayer with built-in 12V 8Ah battery and continuous solar trickle charging panel.",
      description: "Dual-powered 16-litre solar knapsack sprayer designed for farmers requiring extended field runtime without relying solely on grid power. Combines a sealed 12V 8Ah maintenance-free rechargeable battery with an attached high-efficiency monocrystalline solar panel for continuous daytime trickle charging in the field. Equipped with a high-pressure 12V micro-diaphragm pump delivering up to 95 PSI with auto cut-off regulator. Includes stainless steel telescopic lance with 4 interchangeable spray nozzles.",
      categoryId: solarSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      seoTitle: "Solar-Powered 16L Knapsack Battery Sprayer | Prakash Agri Tools Hyderabad",
      seoDescription: "Buy 16L solar knapsack sprayer with 12V battery, high-efficiency solar panel, and telescopic lance from Prakash Agri Tools Hyderabad.",
      applications: "Cotton, Chilli, Paddy, Vegetables, Horticultural Orchards, Weedicide & Foliar Spraying",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "16 Litres Heavy-Duty Virgin Polypropylene",
        "Solar Panel": "10W / 12V High-Efficiency Photovoltaic Monocrystalline Panel",
        "Battery": "12V 8Ah Rechargeable Sealed Lead-Acid (SLA) / Solar Compatible",
        "Pump Type": "12V DC Micro Diaphragm Pump with Auto Cut-Off Pressure Switch",
        "Working Pressure": "4.0 to 6.5 Bar (60 - 95 PSI)",
        "Discharge Rate": "3.1 to 3.6 Litres / Minute",
        "Continuous Run Time": "4 to 6 Hours on Full Battery + Extended with Daytime Solar Charging",
        "Spray Lance": "Stainless Steel Telescopic Lance with Brass Connector & Trigger Lock",
        "Nozzles Included": "4 Multi-Spray Nozzles (Single Cone, Dual Mist, Fan Jet, 4-Hole)",
        "Dry Weight": "5.5 kg"
      })
    },
    create: {
      name: "Solar-Powered 16L Knapsack Battery Sprayer (12V SLA / Solar Panel)",
      slug: "solar-powered-16l-knapsack-battery-sprayer",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-16L",
      shortDescription: "16-litre heavy-duty knapsack crop sprayer with built-in 12V 8Ah battery and continuous solar trickle charging panel.",
      description: "Dual-powered 16-litre solar knapsack sprayer designed for farmers requiring extended field runtime without relying solely on grid power. Combines a sealed 12V 8Ah maintenance-free rechargeable battery with an attached high-efficiency monocrystalline solar panel for continuous daytime trickle charging in the field. Equipped with a high-pressure 12V micro-diaphragm pump delivering up to 95 PSI with auto cut-off regulator. Includes stainless steel telescopic lance with 4 interchangeable spray nozzles.",
      categoryId: solarSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      seoTitle: "Solar-Powered 16L Knapsack Battery Sprayer | Prakash Agri Tools Hyderabad",
      seoDescription: "Buy 16L solar knapsack sprayer with 12V battery, high-efficiency solar panel, and telescopic lance from Prakash Agri Tools Hyderabad.",
      applications: "Cotton, Chilli, Paddy, Vegetables, Horticultural Orchards, Weedicide & Foliar Spraying",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "16 Litres Heavy-Duty Virgin Polypropylene",
        "Solar Panel": "10W / 12V High-Efficiency Photovoltaic Monocrystalline Panel",
        "Battery": "12V 8Ah Rechargeable Sealed Lead-Acid (SLA) / Solar Compatible",
        "Pump Type": "12V DC Micro Diaphragm Pump with Auto Cut-Off Pressure Switch",
        "Working Pressure": "4.0 to 6.5 Bar (60 - 95 PSI)",
        "Discharge Rate": "3.1 to 3.6 Litres / Minute",
        "Continuous Run Time": "4 to 6 Hours on Full Battery + Extended with Daytime Solar Charging",
        "Spray Lance": "Stainless Steel Telescopic Lance with Brass Connector & Trigger Lock",
        "Nozzles Included": "4 Multi-Spray Nozzles (Single Cone, Dual Mist, Fan Jet, 4-Hole)",
        "Dry Weight": "5.5 kg"
      })
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: product1.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: product1.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/solar-knapsack-sprayer-16l-panel.jpeg",
        altText: "16-Litre Solar Powered Knapsack Sprayer with Solar Panel",
        displayOrder: 0
      },
      {
        productId: product1.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/farmer-spraying-cotton-solar-knapsack-sprayer.jpeg",
        altText: "Farmer Operating Solar Knapsack Sprayer in Cotton Field",
        displayOrder: 1
      },
      {
        productId: product1.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/solar-knapsack-power-sprayer-side.jpeg",
        altText: "Solar Knapsack Sprayer Side Angle with Solar Bracket and Lance",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Added Product 1: Solar-Powered 16L Knapsack Sprayer with 3 authentic media photos");

  // 3. Product 2: 2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L)
  const product2 = await prisma.product.upsert({
    where: { slug: "2-in-1-solar-and-manual-dual-function-knapsack-sprayer-16l" },
    update: {
      name: "2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L)",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-2IN1",
      shortDescription: "Hybrid 16L crop sprayer featuring both solar electric motor operation and emergency manual hand lever pumping.",
      description: "Versatile 2-in-1 hybrid knapsack sprayer combining solar battery operation with an emergency manual hand lever pump. Ensures uninterrupted pesticide and liquid fertilizer spraying even in cloudy conditions or remote farmland without electrical charging infrastructure. Built with a 16-litre thick UV-stabilized tank, high-efficiency solar panel, ergonomic padded shoulder straps, and a long-life micro-diaphragm pump.",
      categoryId: solarSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      seoTitle: "2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L) | Prakash Agri Tools",
      seoDescription: "Hybrid 16L solar and manual hand pump knapsack sprayer with 12V battery and solar panel from Prakash Agri Tools Hyderabad.",
      applications: "Cotton, Maize, Turmeric, Tomato, Mango & Sweet Lime Groves, Remote Farmlands without Grid Power",
      technicalSpecifications: JSON.stringify({
        "Operation Mode": "Dual Mode (Solar Electric Motor & Manual Piston Lever)",
        "Tank Capacity": "16 Litres High-Density Chemical-Resistant Plastic",
        "Solar Panel": "10W Monocrystalline Photovoltaic Solar Panel",
        "Battery": "12V 8Ah Maintenance-Free Rechargeable Battery",
        "Pump": "Heavy-Duty 12V DC Diaphragm Motor with Auto Pressure Cut-Off",
        "Maximum Pressure": "0.45 - 0.55 MPa (65 - 80 PSI)",
        "Discharge Rate": "2.8 - 3.2 L/min (Electric) / 1.5 - 2.0 L/min (Manual)",
        "Dual Charging": "Solar Panel Daytime Charging + 220V AC Smart Wall Charger Included",
        "Lance & Hose": "Stainless Steel Extendable Lance + 1.2m Heavy-Duty PVC Hose",
        "Weight": "6.2 kg (with battery and solar panel)"
      })
    },
    create: {
      name: "2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L)",
      slug: "2-in-1-solar-and-manual-dual-function-knapsack-sprayer-16l",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-2IN1",
      shortDescription: "Hybrid 16L crop sprayer featuring both solar electric motor operation and emergency manual hand lever pumping.",
      description: "Versatile 2-in-1 hybrid knapsack sprayer combining solar battery operation with an emergency manual hand lever pump. Ensures uninterrupted pesticide and liquid fertilizer spraying even in cloudy conditions or remote farmland without electrical charging infrastructure. Built with a 16-litre thick UV-stabilized tank, high-efficiency solar panel, ergonomic padded shoulder straps, and a long-life micro-diaphragm pump.",
      categoryId: solarSprayersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      seoTitle: "2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L) | Prakash Agri Tools",
      seoDescription: "Hybrid 16L solar and manual hand pump knapsack sprayer with 12V battery and solar panel from Prakash Agri Tools Hyderabad.",
      applications: "Cotton, Maize, Turmeric, Tomato, Mango & Sweet Lime Groves, Remote Farmlands without Grid Power",
      technicalSpecifications: JSON.stringify({
        "Operation Mode": "Dual Mode (Solar Electric Motor & Manual Piston Lever)",
        "Tank Capacity": "16 Litres High-Density Chemical-Resistant Plastic",
        "Solar Panel": "10W Monocrystalline Photovoltaic Solar Panel",
        "Battery": "12V 8Ah Maintenance-Free Rechargeable Battery",
        "Pump": "Heavy-Duty 12V DC Diaphragm Motor with Auto Pressure Cut-Off",
        "Maximum Pressure": "0.45 - 0.55 MPa (65 - 80 PSI)",
        "Discharge Rate": "2.8 - 3.2 L/min (Electric) / 1.5 - 2.0 L/min (Manual)",
        "Dual Charging": "Solar Panel Daytime Charging + 220V AC Smart Wall Charger Included",
        "Lance & Hose": "Stainless Steel Extendable Lance + 1.2m Heavy-Duty PVC Hose",
        "Weight": "6.2 kg (with battery and solar panel)"
      })
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: product2.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: product2.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/solar-hybrid-knapsack-sprayer-front.jpeg",
        altText: "2-in-1 Solar & Manual Knapsack Sprayer Front View with Hand Lever",
        displayOrder: 0
      },
      {
        productId: product2.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/solar-knapsack-power-sprayer-side.jpeg",
        altText: "Solar Knapsack Sprayer with Solar Panel Bracket and Pressure Hose",
        displayOrder: 1
      },
      {
        productId: product2.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/farmer-spraying-cotton-solar-knapsack-sprayer.jpeg",
        altText: "Demonstration of Solar Sprayer in Field Crop Operation",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Added Product 2: 2-in-1 Solar & Manual Knapsack Sprayer with 3 authentic media photos");

  const totalProducts = await prisma.product.count();
  console.log(`✓ Migration completed! Total catalog products in DB: ${totalProducts}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
