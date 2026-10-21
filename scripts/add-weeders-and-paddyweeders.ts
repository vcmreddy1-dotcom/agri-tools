import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Weeders and Paddy Weeders...");

  // 1. Update Categories
  const weedersCat = await prisma.category.update({
    where: { slug: "weeders" },
    data: { image: "/uploads/heavy-duty-7hp-power-weeder.jpeg" }
  });
  console.log("✓ Updated Weeders category image:", weedersCat.image);

  const paddyWeedersCat = await prisma.category.update({
    where: { slug: "paddy-weeders" },
    data: { image: "/uploads/multi-row-power-paddy-weeder.jpeg" }
  });
  console.log("✓ Updated Paddy Weeders category image:", paddyWeedersCat.image);

  // 2. Upsert 7HP Power Weeder Product
  const powerWeeder7hp = await prisma.product.upsert({
    where: { slug: "7hp-heavy-duty-multi-speed-petrol-power-weeder" },
    update: {
      name: "7HP Heavy-Duty Multi-Speed Petrol Power Weeder / Tiller",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-7HP",
      shortDescription: "7HP 212cc 4-stroke gear-driven inter-cultivation power weeder with 24 curved tilling blades and side protection discs.",
      description: "Heavy-duty commercial agricultural power weeder engineered for intensive soil cultivation and weed eradication in row crops such as cotton, sugarcane, chilly, groundnut, and vegetables. Features a robust 212cc 4-stroke engine, heavy cast-iron gearbox with 2 forward and 1 reverse speed, adjustable working width from 600mm to 1000mm, side mudguards, and crop protection discs.",
      categoryId: weedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Cotton & Sugarcane Inter-Cultivation, Vegetable Bed Preparation, Orchard De-weeding, Hardpan Loosening",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "212 cc 4-Stroke OHV Single Cylinder",
        "Engine Power": "7.0 HP (5.2 kW) @ 3600 RPM",
        "Transmission": "Direct Gear Drive (2 Forward + 1 Reverse Gears)",
        "Tilling Width": "600 mm - 1000 mm (Adjustable Blades)",
        "Tilling Depth": "150 mm - 200 mm (6 - 8 Inches)",
        "Number of Blades": "24 Curved Heat-Treated Boron Blades + 2 Crop Protection Discs",
        "Handlebar": "360° Horizontal & Height Adjustable Comfort Handlebar",
        "Fuel Tank Capacity": "3.6 Litres (Pure Petrol)",
        "Weight": "85 kg"
      }),
      seoTitle: "7HP Multi-Speed Petrol Power Weeder / Tiller | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty 7HP gear-driven power weeder and inter-cultivator for cotton, sugarcane, and vegetables from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "7HP Heavy-Duty Multi-Speed Petrol Power Weeder / Tiller",
      slug: "7hp-heavy-duty-multi-speed-petrol-power-weeder",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-7HP",
      shortDescription: "7HP 212cc 4-stroke gear-driven inter-cultivation power weeder with 24 curved tilling blades and side protection discs.",
      description: "Heavy-duty commercial agricultural power weeder engineered for intensive soil cultivation and weed eradication in row crops such as cotton, sugarcane, chilly, groundnut, and vegetables. Features a robust 212cc 4-stroke engine, heavy cast-iron gearbox with 2 forward and 1 reverse speed, adjustable working width from 600mm to 1000mm, side mudguards, and crop protection discs.",
      categoryId: weedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Cotton & Sugarcane Inter-Cultivation, Vegetable Bed Preparation, Orchard De-weeding, Hardpan Loosening",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "212 cc 4-Stroke OHV Single Cylinder",
        "Engine Power": "7.0 HP (5.2 kW) @ 3600 RPM",
        "Transmission": "Direct Gear Drive (2 Forward + 1 Reverse Gears)",
        "Tilling Width": "600 mm - 1000 mm (Adjustable Blades)",
        "Tilling Depth": "150 mm - 200 mm (6 - 8 Inches)",
        "Number of Blades": "24 Curved Heat-Treated Boron Blades + 2 Crop Protection Discs",
        "Handlebar": "360° Horizontal & Height Adjustable Comfort Handlebar",
        "Fuel Tank Capacity": "3.6 Litres (Pure Petrol)",
        "Weight": "85 kg"
      }),
      seoTitle: "7HP Multi-Speed Petrol Power Weeder / Tiller | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty 7HP gear-driven power weeder and inter-cultivator for cotton, sugarcane, and vegetables from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: powerWeeder7hp.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: powerWeeder7hp.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/heavy-duty-7hp-power-weeder.jpeg",
        altText: "7HP Heavy-Duty Multi-Speed Petrol Power Weeder with Side Discs",
        displayOrder: 0
      }
    ]
  });
  console.log("✓ Created/Updated 7HP Power Weeder product:", powerWeeder7hp.name);

  // 3. Upsert Portable 2-Stroke Power Weeder Product (PW-210)
  const powerWeederPw210 = await prisma.product.upsert({
    where: { slug: "portable-2-stroke-mini-power-weeder-pw210" },
    update: {
      name: "Portable 2-Stroke Mini Power Weeder (Model PW-210)",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-210",
      shortDescription: "Lightweight 52cc 2-stroke portable mini weeder with star-rotor weeding tines for narrow vegetable rows.",
      description: "Compact and agile 52cc portable power weeder designed for effortless weed removal in dense, narrow crop rows. Features star-wheel high-carbon weeding tines that aerate topsoil while uprooting weeds, an ergonomic dual-grip handlebar with throttle lockout, and low fuel consumption for cost-effective farm maintenance.",
      categoryId: weedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Vegetable Garden De-weeding, Narrow Row Cultivation, Nursery Beds, Flower Farm Soil Aeration",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "52 cc 2-Stroke Single Cylinder Air-Cooled",
        "Rated Power": "2.2 HP @ 7000 RPM",
        "Weeding Width": "250 mm - 350 mm",
        "Weeding Depth": "50 mm - 100 mm",
        "Tine Configuration": "Multi-Point Star Weeding Rotors",
        "Fuel Tank Capacity": "1.0 Litres (Petrol + 2T Oil 25:1)",
        "Weight": "12.5 kg"
      }),
      seoTitle: "Portable 2-Stroke Mini Power Weeder (Model PW-210) | Prakash Agri Tools",
      seoDescription: "Lightweight 52cc mini power weeder PW-210 for narrow row vegetable and horticulture weeding from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Portable 2-Stroke Mini Power Weeder (Model PW-210)",
      slug: "portable-2-stroke-mini-power-weeder-pw210",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-210",
      shortDescription: "Lightweight 52cc 2-stroke portable mini weeder with star-rotor weeding tines for narrow vegetable rows.",
      description: "Compact and agile 52cc portable power weeder designed for effortless weed removal in dense, narrow crop rows. Features star-wheel high-carbon weeding tines that aerate topsoil while uprooting weeds, an ergonomic dual-grip handlebar with throttle lockout, and low fuel consumption for cost-effective farm maintenance.",
      categoryId: weedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Vegetable Garden De-weeding, Narrow Row Cultivation, Nursery Beds, Flower Farm Soil Aeration",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "52 cc 2-Stroke Single Cylinder Air-Cooled",
        "Rated Power": "2.2 HP @ 7000 RPM",
        "Weeding Width": "250 mm - 350 mm",
        "Weeding Depth": "50 mm - 100 mm",
        "Tine Configuration": "Multi-Point Star Weeding Rotors",
        "Fuel Tank Capacity": "1.0 Litres (Petrol + 2T Oil 25:1)",
        "Weight": "12.5 kg"
      }),
      seoTitle: "Portable 2-Stroke Mini Power Weeder (Model PW-210) | Prakash Agri Tools",
      seoDescription: "Lightweight 52cc mini power weeder PW-210 for narrow row vegetable and horticulture weeding from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: powerWeederPw210.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: powerWeederPw210.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/portable-2-stroke-power-weeder-pw210.jpeg",
        altText: "Portable 2-Stroke Mini Power Weeder Model PW-210",
        displayOrder: 0
      }
    ]
  });
  console.log("✓ Created/Updated PW-210 Mini Power Weeder product:", powerWeederPw210.name);

  // 4. Upsert Motorised Multi-Row Paddy Weeder Product
  const paddyWeederProduct = await prisma.product.upsert({
    where: { slug: "motorised-multi-row-wet-field-paddy-weeder" },
    update: {
      name: "Motorised Multi-Row Wet Field Paddy Weeder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MPW-02",
      shortDescription: "Engine-driven rotary cono weeder designed for effortless weed management and root aeration in standing water paddy fields.",
      description: "Specialized mechanical weed management tool for SRI (System of Rice Intensification) and conventional wetland paddy crops. Powered by a fuel-efficient 4-stroke petrol engine with cylindrical rotary weeding drums that uproot and bury weeds into the mud to act as green manure, while simultaneously aerating the soil around rice roots to boost tillering.",
      categoryId: paddyWeedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Wetland Paddy Field Weeding, SRI Method Cultivation, Rice Root Aeration & Tillering Enhancement",
      technicalSpecifications: JSON.stringify({
        "Engine Type": "35 cc 4-Stroke Air-Cooled Petrol Engine",
        "Power Rating": "1.3 HP @ 6500 RPM",
        "Row Capacity": "2-Row Simultaneous Weeding",
        "Operating Row Spacing": "20 cm to 25 cm Standard Rice Rows",
        "Weeding Rotors": "Dual Cylindrical High-Carbon Steel Tined Drums",
        "Floatation": "Reinforced Anti-Sink Mud Ski for Smooth Gliding",
        "Fuel Type": "Pure Petrol (Low Smoke & Emission)",
        "Weight": "16.8 kg approx"
      }),
      seoTitle: "Motorised Multi-Row Wet Field Paddy Weeder | Prakash Agri Tools",
      seoDescription: "Buy motorized multi-row wet paddy weeder for rice fields. Boosts tillering and buries weeds cleanly. Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Motorised Multi-Row Wet Field Paddy Weeder",
      slug: "motorised-multi-row-wet-field-paddy-weeder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MPW-02",
      shortDescription: "Engine-driven rotary cono weeder designed for effortless weed management and root aeration in standing water paddy fields.",
      description: "Specialized mechanical weed management tool for SRI (System of Rice Intensification) and conventional wetland paddy crops. Powered by a fuel-efficient 4-stroke petrol engine with cylindrical rotary weeding drums that uproot and bury weeds into the mud to act as green manure, while simultaneously aerating the soil around rice roots to boost tillering.",
      categoryId: paddyWeedersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Wetland Paddy Field Weeding, SRI Method Cultivation, Rice Root Aeration & Tillering Enhancement",
      technicalSpecifications: JSON.stringify({
        "Engine Type": "35 cc 4-Stroke Air-Cooled Petrol Engine",
        "Power Rating": "1.3 HP @ 6500 RPM",
        "Row Capacity": "2-Row Simultaneous Weeding",
        "Operating Row Spacing": "20 cm to 25 cm Standard Rice Rows",
        "Weeding Rotors": "Dual Cylindrical High-Carbon Steel Tined Drums",
        "Floatation": "Reinforced Anti-Sink Mud Ski for Smooth Gliding",
        "Fuel Type": "Pure Petrol (Low Smoke & Emission)",
        "Weight": "16.8 kg approx"
      }),
      seoTitle: "Motorised Multi-Row Wet Field Paddy Weeder | Prakash Agri Tools",
      seoDescription: "Buy motorized multi-row wet paddy weeder for rice fields. Boosts tillering and buries weeds cleanly. Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: paddyWeederProduct.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: paddyWeederProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/multi-row-power-paddy-weeder.jpeg",
        altText: "Farmer Operating Multi-Row Power Paddy Weeder in Rice Field",
        displayOrder: 0
      },
      {
        productId: paddyWeederProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/motorised-wet-paddy-weeder-field.jpeg",
        altText: "Motorised Paddy Weeder Operating in Flooded Crop Field",
        displayOrder: 1
      }
    ]
  });
  console.log("✓ Created/Updated Motorised Paddy Weeder with 2 photos:", paddyWeederProduct.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
