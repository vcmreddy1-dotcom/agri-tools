import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating categories and products for Mulchers and Slashers...");

  // 1. Update Category images
  const mulchersCat = await prisma.category.update({
    where: { slug: "mulchers" },
    data: { image: "/uploads/paddy-straw-mulcher-field.jpeg" }
  });
  console.log("✓ Updated Mulchers category image:", mulchersCat.image);

  const slashersCat = await prisma.category.update({
    where: { slug: "slashers" },
    data: { image: "/uploads/heavy-duty-rotary-slasher-deck.jpeg" }
  });
  console.log("✓ Updated Slashers category image:", slashersCat.image);

  // 2. Upsert Mulcher Product
  const mulcherProduct = await prisma.product.upsert({
    where: { slug: "heavy-duty-paddy-straw-mulcher-crop-residue-shredder" },
    update: {
      categoryId: mulchersCat.id,
      name: "Heavy-Duty Paddy Straw Mulcher & Crop Residue Shredder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MUL-7FT",
      shortDescription: "High-speed tractor PTO driven crop residue mulcher for in-situ shredding of paddy stubble, cotton stalks, and sugarcane trash.",
      description: "The Prakash Agro Heavy-Duty Paddy Straw Mulcher is an eco-friendly residue management implement designed to eliminate stubble burning. Powered by tractor 540 RPM PTO, it chops standing and lodged crop stubble into fine pieces and spreads them uniformly across the soil to form organic mulch, improving soil aeration, moisture retention, and organic matter.",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Paddy Stubble Management, Cotton Stalk Shredding, Sugarcane Trash Chopping, Maize Stalk Mulching",
      technicalSpecifications: JSON.stringify({
        "Working Width": "210 cm (7 Feet)",
        "Tractor HP Requirement": "50 - 65 HP",
        "PTO Speed": "540 RPM",
        "Blade Type": "Heat Treated Reversible Flail Blades",
        "Number of Blades": "54 Flail Knives",
        "Side Transmission": "4-Band Heavy-Duty V-Belts with Tensioner",
        "Rear Roller": "Adjustable Depth Control Heavy Roller",
        "Hitch": "Category-II 3-Point Linkage",
        "Approx Weight": "520 kg"
      }),
      seoTitle: "Heavy-Duty Paddy Straw Mulcher & Crop Residue Shredder | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty tractor paddy straw mulcher and crop residue shredder. 7ft working width, 50-65 HP PTO driven for in-situ stubble management in Hyderabad, Telangana."
    },
    create: {
      name: "Heavy-Duty Paddy Straw Mulcher & Crop Residue Shredder",
      slug: "heavy-duty-paddy-straw-mulcher-crop-residue-shredder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MUL-7FT",
      shortDescription: "High-speed tractor PTO driven crop residue mulcher for in-situ shredding of paddy stubble, cotton stalks, and sugarcane trash.",
      description: "The Prakash Agro Heavy-Duty Paddy Straw Mulcher is an eco-friendly residue management implement designed to eliminate stubble burning. Powered by tractor 540 RPM PTO, it chops standing and lodged crop stubble into fine pieces and spreads them uniformly across the soil to form organic mulch, improving soil aeration, moisture retention, and organic matter.",
      categoryId: mulchersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Paddy Stubble Management, Cotton Stalk Shredding, Sugarcane Trash Chopping, Maize Stalk Mulching",
      technicalSpecifications: JSON.stringify({
        "Working Width": "210 cm (7 Feet)",
        "Tractor HP Requirement": "50 - 65 HP",
        "PTO Speed": "540 RPM",
        "Blade Type": "Heat Treated Reversible Flail Blades",
        "Number of Blades": "54 Flail Knives",
        "Side Transmission": "4-Band Heavy-Duty V-Belts with Tensioner",
        "Rear Roller": "Adjustable Depth Control Heavy Roller",
        "Hitch": "Category-II 3-Point Linkage",
        "Approx Weight": "520 kg"
      }),
      seoTitle: "Heavy-Duty Paddy Straw Mulcher & Crop Residue Shredder | Prakash Agri Tools",
      seoDescription: "Buy heavy-duty tractor paddy straw mulcher and crop residue shredder. 7ft working width, 50-65 HP PTO driven for in-situ stubble management in Hyderabad, Telangana."
    }
  });

  // Clear existing media and re-insert
  await prisma.productMedia.deleteMany({ where: { productId: mulcherProduct.id } });
  await prisma.productMedia.createMany({
    data: [
      {
        productId: mulcherProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/paddy-straw-mulcher-field.jpeg",
        altText: "Prakash Agro Heavy-Duty Paddy Straw Mulcher in Field Operation",
        displayOrder: 0
      },
      {
        productId: mulcherProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/heavy-duty-straw-mulcher.jpeg",
        altText: "Prakash Agro Straw Mulcher PTO Driven 3-Point Hitch",
        displayOrder: 1
      },
      {
        productId: mulcherProduct.id,
        mediaType: "IMAGE",
        mediaUrl: "/uploads/tractor-stalk-chopper-shredder.jpeg",
        altText: "Tractor Stalk Chopper and Shredder Chute Discharge",
        displayOrder: 2
      }
    ]
  });
  console.log("✓ Created/Updated Mulcher product with 3 media photos:", mulcherProduct.name);

  // 3. Upsert Slasher Product
  const slasherProduct = await prisma.product.upsert({
    where: { slug: "heavy-duty-tractor-rotary-slasher-pasture-topper" },
    update: {
      categoryId: slashersCat.id,
      name: "Heavy-Duty Tractor Rotary Slasher / Pasture Topper",
      brand: "Prakash Agro",
      modelNumber: "PAT-SLS-6FT",
      shortDescription: "Rugged rotary slasher engineered for cutting tall wild grass, shrubs, pasture topping, and orchard boundary clearing.",
      description: "Built with a reinforced steel deck, high-torque heavy-duty bevel gearbox, and reversible heat-treated swinging blades. The Prakash Agro Rotary Slasher handles heavy brush, dense shrubs, and tough grasslands effortlessly, preventing weed spread and keeping farm boundaries neat and fire-safe.",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Wild Grass Clearing, Pasture Topping, Orchard Inter-Row Slashing, Farm Road & Border Maintenance",
      technicalSpecifications: JSON.stringify({
        "Cutting Width": "180 cm (6 Feet)",
        "Tractor HP Requirement": "45 - 60 HP",
        "Gearbox": "Heavy Duty 60 HP Bevel Gearbox (Oil Lubricated)",
        "Blades": "2 Reversible High-Carbon Heat-Treated Free-Swinging Blades",
        "Cutting Height": "25 mm to 150 mm (Adjustable Skid Shoes)",
        "Deck Thickness": "6 mm Heavy Reinforced Steel Plate",
        "PTO Shaft": "Shear Bolt Protected PTO Drive Shaft",
        "Safety Protection": "Heavy Front & Rear Rubber Deflector Flaps",
        "Approx Weight": "385 kg"
      }),
      seoTitle: "Heavy-Duty Tractor Rotary Slasher & Pasture Topper | Prakash Agri Tools",
      seoDescription: "Industrial grade 6ft rotary slasher for tractors 45-60 HP. Heavy deck, swinging blades for shrub and pasture clearing from Prakash Agri Tools Hyderabad."
    },
    create: {
      name: "Heavy-Duty Tractor Rotary Slasher / Pasture Topper",
      slug: "heavy-duty-tractor-rotary-slasher-pasture-topper",
      brand: "Prakash Agro",
      modelNumber: "PAT-SLS-6FT",
      shortDescription: "Rugged rotary slasher engineered for cutting tall wild grass, shrubs, pasture topping, and orchard boundary clearing.",
      description: "Built with a reinforced steel deck, high-torque heavy-duty bevel gearbox, and reversible heat-treated swinging blades. The Prakash Agro Rotary Slasher handles heavy brush, dense shrubs, and tough grasslands effortlessly, preventing weed spread and keeping farm boundaries neat and fire-safe.",
      categoryId: slashersCat.id,
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Wild Grass Clearing, Pasture Topping, Orchard Inter-Row Slashing, Farm Road & Border Maintenance",
      technicalSpecifications: JSON.stringify({
        "Cutting Width": "180 cm (6 Feet)",
        "Tractor HP Requirement": "45 - 60 HP",
        "Gearbox": "Heavy Duty 60 HP Bevel Gearbox (Oil Lubricated)",
        "Blades": "2 Reversible High-Carbon Heat-Treated Free-Swinging Blades",
        "Cutting Height": "25 mm to 150 mm (Adjustable Skid Shoes)",
        "Deck Thickness": "6 mm Heavy Reinforced Steel Plate",
        "PTO Shaft": "Shear Bolt Protected PTO Drive Shaft",
        "Safety Protection": "Heavy Front & Rear Rubber Deflector Flaps",
        "Approx Weight": "385 kg"
      }),
      seoTitle: "Heavy-Duty Tractor Rotary Slasher & Pasture Topper | Prakash Agri Tools",
      seoDescription: "Industrial grade 6ft rotary slasher for tractors 45-60 HP. Heavy deck, swinging blades for shrub and pasture clearing from Prakash Agri Tools Hyderabad."
    }
  });

  // Clear existing media and re-insert
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
        mediaUrl: "/uploads/tractor-rotary-slasher-grass.jpeg",
        altText: "Tractor Rotary Slasher Clearing Field Edge and Tall Grass",
        displayOrder: 1
      }
    ]
  });
  console.log("✓ Created/Updated Slasher product with 2 media photos:", slasherProduct.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
