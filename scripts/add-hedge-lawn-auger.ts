import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Hedge Trimmers, Lawn Mowers, Earth Augers, and Chainsaw...");

  // 1. Update Categories
  const hedgeTrimmersCat = await prisma.category.update({
    where: { slug: "hedge-trimmers" },
    data: { image: "/uploads/petrol-hedge-trimmer-double-sided.jpeg" }
  });
  console.log("✓ Updated Hedge Trimmers category image:", hedgeTrimmersCat.image);

  const lawnMowersCat = await prisma.category.update({
    where: { slug: "lawn-mowers" },
    data: { image: "/uploads/red-rotary-petrol-lawn-mower.jpeg" }
  });
  console.log("✓ Updated Lawn Mowers category image:", lawnMowersCat.image);

  const earthAugersCat = await prisma.category.update({
    where: { slug: "earth-augers" },
    data: { image: "/uploads/handheld-petrol-earth-auger-drill.jpeg" }
  });
  console.log("✓ Updated Earth Augers category image:", earthAugersCat.image);

  // 2. Upsert Hedge Trimmer Product
  const hedgeTrimmerProduct = await prisma.product.upsert({
    where: { slug: "26cc-2-stroke-commercial-petrol-hedge-trimmer" },
    update: {
      name: "26cc 2-Stroke Commercial Petrol Hedge Trimmer (600mm Blade)",
      brand: "Prakash Agro",
      modelNumber: "PAT-HT-260",
      shortDescription: "26cc commercial engine hedge trimmer with 600mm double-sided reciprocating hardened steel blades and 180° rotatable handle.",
      description: "Designed for professional landscaping, tea garden pruning, and decorative shrub shaping. Features a high-power low-vibration 2-stroke engine, dual reciprocating precision-ground cutting blades that cleanly slice branches up to 20mm, and a 180-degree multi-angle rear handle for effortless vertical and horizontal sculpting.",
      categoryId: hedgeTrimmersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Tea Garden Pruning, Hedge Sculpting, Decorative Shrub Shaping, Orchard Border Trimming",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "25.4 cc 2-Stroke Air-Cooled",
        "Power Rating": "0.75 kW (1.0 HP) @ 7500 RPM",
        "Blade Length": "600 mm (24 Inches) Double-Sided Reciprocating",
        "Blade Material": "Induction Hardened High Carbon Spring Steel",
        "Handle Type": "180° Rotatable 5-Position Ergonomic Handle",
        "Cutting Capacity": "Up to 20 mm branch thickness",
        "Fuel Tank Capacity": "600 ml (Petrol + 2T Oil 25:1)",
        "Weight": "5.6 kg"
      }),
      seoTitle: "26cc Commercial Petrol Hedge Trimmer (600mm Blade) | Prakash Agri Tools",
      seoDescription: "Buy professional 26cc petrol hedge trimmer with 600mm double-sided blade from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "26cc 2-Stroke Commercial Petrol Hedge Trimmer (600mm Blade)",
      slug: "26cc-2-stroke-commercial-petrol-hedge-trimmer",
      brand: "Prakash Agro",
      modelNumber: "PAT-HT-260",
      shortDescription: "26cc commercial engine hedge trimmer with 600mm double-sided reciprocating hardened steel blades and 180° rotatable handle.",
      description: "Designed for professional landscaping, tea garden pruning, and decorative shrub shaping. Features a high-power low-vibration 2-stroke engine, dual reciprocating precision-ground cutting blades that cleanly slice branches up to 20mm, and a 180-degree multi-angle rear handle for effortless vertical and horizontal sculpting.",
      categoryId: hedgeTrimmersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Tea Garden Pruning, Hedge Sculpting, Decorative Shrub Shaping, Orchard Border Trimming",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "25.4 cc 2-Stroke Air-Cooled",
        "Power Rating": "0.75 kW (1.0 HP) @ 7500 RPM",
        "Blade Length": "600 mm (24 Inches) Double-Sided Reciprocating",
        "Blade Material": "Induction Hardened High Carbon Spring Steel",
        "Handle Type": "180° Rotatable 5-Position Ergonomic Handle",
        "Cutting Capacity": "Up to 20 mm branch thickness",
        "Fuel Tank Capacity": "600 ml (Petrol + 2T Oil 25:1)",
        "Weight": "5.6 kg"
      }),
      seoTitle: "26cc Commercial Petrol Hedge Trimmer (600mm Blade) | Prakash Agri Tools",
      seoDescription: "Buy professional 26cc petrol hedge trimmer with 600mm double-sided blade from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: hedgeTrimmerProduct.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: hedgeTrimmerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/petrol-hedge-trimmer-double-sided.jpeg",
        altText: "26cc Commercial Petrol Hedge Trimmer Unit",
        displayOrder: 0
      },
      {
        productId: hedgeTrimmerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/petrol-hedge-trimmer-rear-view.jpeg",
        altText: "Hedge Trimmer Rear View with Throttle Controls",
        displayOrder: 1
      },
      {
        productId: hedgeTrimmerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/orange-petrol-hedge-trimmer-profile.jpeg",
        altText: "Heavy-Duty Petrol Hedge Trimmer Reciprocating Blade Profile",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Created/Updated Hedge Trimmer product with 3 photos:", hedgeTrimmerProduct.name);

  // 3. Upsert Lawn Mower Product
  const lawnMowerProduct = await prisma.product.upsert({
    where: { slug: "self-propelled-4-stroke-rotary-petrol-lawn-mower" },
    update: {
      name: "Self-Propelled 4-Stroke Rotary Petrol Lawn Mower (18\" Steel Deck)",
      brand: "Prakash Agro",
      modelNumber: "PAT-LM-18SP",
      shortDescription: "140cc 4-stroke self-propelled lawn mower with 18-inch reinforced steel deck and 60L grass catcher.",
      description: "Engineered for golf courses, resort lawns, farmhouse perimeters, and municipal landscaping. Powered by a fuel-efficient 140cc 4-stroke OHV engine with easy pull-start. Features rear-wheel drive self-propulsion that glides over uneven terrain, 8-stage central height adjustment, and a high-capacity 60L hybrid grass collection catcher with dust-blocking hard top.",
      categoryId: lawnMowersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Farmhouse Lawn Maintenance, Commercial Landscaping, Sports Grounds, Garden Turf Mowing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "140 cc 4-Stroke OHV Engine",
        "Rated Power": "3.5 HP @ 3000 RPM",
        "Cutting Width": "460 mm (18 Inches)",
        "Deck Construction": "Heavy Gauge Pressed Steel Deck",
        "Drive System": "Rear-Wheel Self-Propelled Gear Drive",
        "Height Adjustment": "Single Lever 8-Stage Adjustment (25 mm - 75 mm)",
        "Grass Catcher Capacity": "60 Litres Hybrid Bag with Hard Cover",
        "Wheels": "Heavy-Duty Bearings (7\" Front, 8\" Rear Wheels)",
        "Weight": "31 kg"
      }),
      seoTitle: "Self-Propelled 4-Stroke Rotary Petrol Lawn Mower (18\" Deck) | Prakash Agri Tools",
      seoDescription: "Commercial 18-inch self-propelled petrol lawn mower with 140cc 4-stroke engine and 60L grass bag from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Self-Propelled 4-Stroke Rotary Petrol Lawn Mower (18\" Steel Deck)",
      slug: "self-propelled-4-stroke-rotary-petrol-lawn-mower",
      brand: "Prakash Agro",
      modelNumber: "PAT-LM-18SP",
      shortDescription: "140cc 4-stroke self-propelled lawn mower with 18-inch reinforced steel deck and 60L grass catcher.",
      description: "Engineered for golf courses, resort lawns, farmhouse perimeters, and municipal landscaping. Powered by a fuel-efficient 140cc 4-stroke OHV engine with easy pull-start. Features rear-wheel drive self-propulsion that glides over uneven terrain, 8-stage central height adjustment, and a high-capacity 60L hybrid grass collection catcher with dust-blocking hard top.",
      categoryId: lawnMowersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Farmhouse Lawn Maintenance, Commercial Landscaping, Sports Grounds, Garden Turf Mowing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "140 cc 4-Stroke OHV Engine",
        "Rated Power": "3.5 HP @ 3000 RPM",
        "Cutting Width": "460 mm (18 Inches)",
        "Deck Construction": "Heavy Gauge Pressed Steel Deck",
        "Drive System": "Rear-Wheel Self-Propelled Gear Drive",
        "Height Adjustment": "Single Lever 8-Stage Adjustment (25 mm - 75 mm)",
        "Grass Catcher Capacity": "60 Litres Hybrid Bag with Hard Cover",
        "Wheels": "Heavy-Duty Bearings (7\" Front, 8\" Rear Wheels)",
        "Weight": "31 kg"
      }),
      seoTitle: "Self-Propelled 4-Stroke Rotary Petrol Lawn Mower (18\" Deck) | Prakash Agri Tools",
      seoDescription: "Commercial 18-inch self-propelled petrol lawn mower with 140cc 4-stroke engine and 60L grass bag from Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: lawnMowerProduct.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: lawnMowerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/red-rotary-petrol-lawn-mower.jpeg",
        altText: "18-inch Self-Propelled Petrol Rotary Lawn Mower",
        displayOrder: 0
      },
      {
        productId: lawnMowerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/petrol-lawn-mower-garden-operation.jpeg",
        altText: "Homeowner Operating Petrol Lawn Mower on Green Lawn",
        displayOrder: 1
      },
      {
        productId: lawnMowerProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/petrol-lawn-mower-backyard.jpeg",
        altText: "Red Petrol Lawn Mower with Grass Bag in Backyard Garden",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Created/Updated Lawn Mower product with 3 photos:", lawnMowerProduct.name);

  // 4. Update Handheld Earth Auger Media
  const handheldAuger = await prisma.product.findUnique({
    where: { slug: "heavy-duty-63cc-earth-auger-8-inch" }
  });
  if (handheldAuger) {
    await prisma.productMedia.deleteMany({ where: { productId: handheldAuger.id } });
    await prisma.productMedia.createMany({
      data: [
        {
          productId: handheldAuger.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/handheld-petrol-earth-auger-drill.jpeg",
          altText: "63cc Handheld Petrol Earth Auger with 8-inch Drill Bit",
          displayOrder: 0
        },
        {
          productId: handheldAuger.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/operator-field-earth-auger.jpeg",
          altText: "Operator Drilling Post Hole with Earth Auger in Field",
          displayOrder: 1
        }
      ]
    });
    console.log("✓ Updated Handheld Earth Auger with authentic field photos");
  }

  // 5. Upsert Tractor-Mounted PTO Earth Auger
  const tractorAuger = await prisma.product.upsert({
    where: { slug: "tractor-mounted-heavy-duty-pto-post-hole-digger" },
    update: {
      name: "Tractor-Mounted Heavy-Duty PTO Post Hole Digger / Earth Auger",
      brand: "Prakash Agro",
      modelNumber: "PAT-PHD-PTO",
      shortDescription: "Tractor 3-point hitch PTO driven post hole digger for high-volume plantation, fencing, and solar piling.",
      description: "Heavy-duty agricultural post hole digger designed for tractors 35 HP and above. Features a reinforced tubular boom mast, heavy-duty 540 RPM PTO bevel gearbox with shear-bolt overload protection, and high-tensile spiral auger bits with replaceable tungsten-carbide cutting teeth and pilot point for fast digging in hard and stony soils.",
      categoryId: earthAugersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Horticulture Tree Plantation, Farm Perimeter Fencing, Solar Panel Piling, Telegraph Poles",
      technicalSpecifications: JSON.stringify({
        "Tractor HP Requirement": "35 - 55 HP (PTO 540 RPM)",
        "Mounting": "Category-II 3-Point Linkage with Tubular Steel Mast",
        "Gearbox": "Heavy Duty 50 HP Bevel Gearbox (Oil Lubricated)",
        "Drilling Depth": "Up to 900 mm (3 Feet)",
        "Compatible Auger Diameters": "9 Inches, 12 Inches, 18 Inches supported",
        "Cutting Teeth": "Replaceable Hardened High Carbon Steel Teeth & Fishtail Pilot",
        "Weight": "165 kg (excluding auger bit)"
      }),
      seoTitle: "Tractor-Mounted Heavy-Duty PTO Post Hole Digger | Prakash Agri Tools",
      seoDescription: "Tractor 3-point hitch PTO post hole digger for tree plantation and farm fencing. Quality farm implements by Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Tractor-Mounted Heavy-Duty PTO Post Hole Digger / Earth Auger",
      slug: "tractor-mounted-heavy-duty-pto-post-hole-digger",
      brand: "Prakash Agro",
      modelNumber: "PAT-PHD-PTO",
      shortDescription: "Tractor 3-point hitch PTO driven post hole digger for high-volume plantation, fencing, and solar piling.",
      description: "Heavy-duty agricultural post hole digger designed for tractors 35 HP and above. Features a reinforced tubular boom mast, heavy-duty 540 RPM PTO bevel gearbox with shear-bolt overload protection, and high-tensile spiral auger bits with replaceable tungsten-carbide cutting teeth and pilot point for fast digging in hard and stony soils.",
      categoryId: earthAugersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Horticulture Tree Plantation, Farm Perimeter Fencing, Solar Panel Piling, Telegraph Poles",
      technicalSpecifications: JSON.stringify({
        "Tractor HP Requirement": "35 - 55 HP (PTO 540 RPM)",
        "Mounting": "Category-II 3-Point Linkage with Tubular Steel Mast",
        "Gearbox": "Heavy Duty 50 HP Bevel Gearbox (Oil Lubricated)",
        "Drilling Depth": "Up to 900 mm (3 Feet)",
        "Compatible Auger Diameters": "9 Inches, 12 Inches, 18 Inches supported",
        "Cutting Teeth": "Replaceable Hardened High Carbon Steel Teeth & Fishtail Pilot",
        "Weight": "165 kg (excluding auger bit)"
      }),
      seoTitle: "Tractor-Mounted Heavy-Duty PTO Post Hole Digger | Prakash Agri Tools",
      seoDescription: "Tractor 3-point hitch PTO post hole digger for tree plantation and farm fencing. Quality farm implements by Prakash Agri Tools Hyderabad."
    }
  });

  await prisma.productMedia.deleteMany({ where: { productId: tractorAuger.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: tractorAuger.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/tractor-mounted-pto-earth-auger.jpeg",
        altText: "Tractor-Mounted Heavy-Duty PTO Earth Auger in Field Operation",
        displayOrder: 0
      }
    ]
  });
  console.log("✓ Created/Updated Tractor PTO Earth Auger product:", tractorAuger.name);

  // 6. Update Chainsaw product to include AgriPro photo as well
  const chainsawProduct = await prisma.product.findUnique({
    where: { slug: "heavy-duty-58cc-commercial-petrol-chainsaw" }
  });
  if (chainsawProduct) {
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
          mediaUrl: "/uploads/agripro-58cc-petrol-chainsaw.jpeg",
          altText: "AgriPro 58cc Commercial Petrol Chainsaw",
          displayOrder: 1
        },
        {
          productId: chainsawProduct.id,
          mediaType: "IMAGE",
          mediaUrl: "/uploads/heavy-duty-petrol-chainsaw-58cc.jpeg",
          altText: "Heavy-Duty 58cc Petrol Chainsaw 22-inch Bar Side View",
          displayOrder: 2
        }
      ]
    });
    console.log("✓ Updated Chainsaw product with 3 photos (including AgriPro)");
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
