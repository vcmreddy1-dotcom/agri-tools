import { prisma } from "../lib/db";

export const RANGE_CATEGORIES_DATA = [
  {
    name: "LAND PREPARATION",
    slug: "land-preparation",
    description: "Heavy-duty primary & secondary tillage machinery: Reversible ploughs, disc harrows, cultivators, rotavators, and laser levelers.",
    displayOrder: 1,
    subcategories: [
      { name: "Reversible Plough", slug: "reversible-plough" },
      { name: "Hydraulic Reversible Plough", slug: "hydraulic-reversible-plough" },
      { name: "Manual Reversible Plough", slug: "manual-reversible-plough" },
      { name: "Harrow Mounted", slug: "harrow-mounted" },
      { name: "Disc Harrow", slug: "disc-harrows" },
      { name: "Disc Plough", slug: "disc-ploughs" },
      { name: "MB Plough", slug: "mb-plough" },
      { name: "Cultivator", slug: "cultivators" },
      { name: "Rotavator", slug: "rotavators" },
      { name: "Chisel Plough / Sizzle", slug: "chisel-plough" },
      { name: "Levelers", slug: "levelers" },
      { name: "Laser Land Levelers", slug: "laser-land-levelers" },
      { name: "Bund Farmers / Bund Makers", slug: "disc-ridgers-bund-makers" },
      { name: "Sub Soiler", slug: "sub-soiler" },
    ],
  },
  {
    name: "SOWING & PLANTING",
    slug: "sowing-planting",
    description: "Precision planting, zero-till drills, multicrop seeders, pneumatic planters, and furrow planters.",
    displayOrder: 2,
    subcategories: [
      { name: "Manual Seeder", slug: "manual-seeder" },
      { name: "Seed Doubler", slug: "seed-doubler" },
      { name: "Manual Seed Drill", slug: "manual-seed-drill" },
      { name: "Animal Drawn Seed Drill", slug: "animal-drawn-seed-drill" },
      { name: "Mini Tractor Seed Drill / Planters", slug: "mini-tractor-seed-drill-planters" },
      { name: "Tractor Drawn Seed Drill / Planters", slug: "tractor-drawn-seed-drill-planters" },
      { name: "Seed Drills", slug: "seed-drills" },
      { name: "Turbo Seeder", slug: "turbo-seeder" },
      { name: "Potato / Turmeric Planters", slug: "potato-turmeric-planters" },
      { name: "Maize Planters", slug: "maize-planters" },
      { name: "Onion Planters", slug: "onion-planters" },
      { name: "Broad Bed Furrow Planters", slug: "broad-bed-furrow-planters" },
      { name: "Multicrop Precision Seed cum Fertilizer Planter", slug: "multicrop-precision-seed-cum-fertilizer-planter" },
      { name: "Zero Till Drill / DSR", slug: "zero-till-drill-dsr" },
      { name: "Pneumatic Planter", slug: "pneumatic-planter" },
      { name: "Raised Bed Planters", slug: "raised-bed-planters" },
    ],
  },
  {
    name: "PLANT PROTECTION",
    slug: "plant-protection",
    description: "Crop spraying, battery knapsacks, solar sprayers, HTP pump units, boom sprayers, and fertilizer spreaders.",
    displayOrder: 3,
    subcategories: [
      { name: "Manual Sprayers", slug: "manual-sprayers" },
      { name: "Solar Sprayer", slug: "solar-sprayers" },
      { name: "Knapsack Sprayer", slug: "knapsack-sprayers" },
      { name: "Battery Sprayer", slug: "battery-sprayers" },
      { name: "Motorised Sprayers", slug: "power-sprayers" },
      { name: "Mist Blowers", slug: "mist-blowers" },
      { name: "Knapsack Sprayer with Honda Engine", slug: "knapsack-sprayer-honda-engine" },
      { name: "HTP Sprayers", slug: "htp-sprayers" },
      { name: "Tractor Mounted Sprayers", slug: "tractor-mounted-sprayers" },
      { name: "Boom Sprayers", slug: "300l-sprayers" },
      { name: "Self Propelled Boom Sprayers", slug: "self-propelled-boom-sprayers" },
      { name: "Tank Sprayers", slug: "tank-sprayers" },
      { name: "Fertilizer Spreaders", slug: "fertilizer-spreaders" },
    ],
  },
  {
    name: "WEEDING",
    slug: "weeding",
    description: "Mechanical weeders, cycle weeders, multi-row paddy weeders, power tillers, brush cutters, and crop residue shredders.",
    displayOrder: 4,
    subcategories: [
      { name: "Manual Weeders", slug: "manual-weeders" },
      { name: "Cycle Weeders", slug: "cycle-weeders" },
      { name: "Kono Weeders", slug: "kono-weeders" },
      { name: "Paddy Weeders 2 Row", slug: "paddy-weeders" },
      { name: "Power Weeder", slug: "weeders" },
      { name: "Power Tiller / Mini Tillers", slug: "mini-tillers" },
      { name: "Brush Cutters", slug: "brush-cutters" },
      { name: "Slashers", slug: "slashers" },
      { name: "Mulchers", slug: "mulchers" },
    ],
  },
  {
    name: "CROP HARVESTING",
    slug: "crop-harvesting",
    description: "Grain rippers, oil palm chisels, telescopic harvesting poles, tractor-mounted rippers, and combine harvesters.",
    displayOrder: 5,
    subcategories: [
      { name: "Sickle", slug: "sickle" },
      { name: "Chisels for Palm Oil", slug: "chisels-for-palm-oil" },
      { name: "Telescopic Pole Carbon", slug: "telescopic-pole-carbon" },
      { name: "Aluminium Poles", slug: "aluminium-poles" },
      { name: "Mini Harvesters", slug: "mini-harvesters" },
      { name: "Rippers", slug: "rippers" },
      { name: "Tractor Mounted Rippers", slug: "tractor-mounted-rippers" },
      { name: "Tractor Mounted Harvesters", slug: "tractor-mounted-harvesters" },
      { name: "Track Harvesters", slug: "track-harvesters" },
    ],
  },
  {
    name: "POST HARVESTING",
    slug: "post-harvesting",
    description: "Grain processing, winnowing fans, multi-crop threshers, maize shellers, balers, and chaff cutters.",
    displayOrder: 6,
    subcategories: [
      { name: "Winnowing Fan", slug: "winnowing-fan" },
      { name: "Multi Threshers", slug: "multi-threshers" },
      { name: "Maize Shellers", slug: "maize-shellers" },
      { name: "Maize Dehusker", slug: "maize-dehusker" },
      { name: "Groundnut Thresher", slug: "groundnut-thresher" },
      { name: "Spreaders", slug: "spreaders" },
      { name: "Round Balers", slug: "round-balers" },
      { name: "Square Balers", slug: "square-balers" },
      { name: "Hay Rake", slug: "hay-rake" },
      { name: "Shredders", slug: "shredders" },
      { name: "Chaff Cutters", slug: "chaff-cutters" },
    ],
  },
  {
    name: "SPARE PARTS",
    slug: "spare-parts",
    description: "High-wear resistant replacement components: boron steel blades, spray guns, bearings, and heavy-duty drive belts.",
    displayOrder: 7,
    subcategories: [
      { name: "Rotavator Blades", slug: "rotavator-blades" },
      { name: "Seed Drill Parts", slug: "seed-drill-parts" },
      { name: "Sprayer Parts", slug: "sprayer-parts" },
      { name: "Brush Cutter Parts", slug: "brush-cutter-parts" },
      { name: "Bearings", slug: "bearings" },
      { name: "Belts", slug: "belts" },
      { name: "Chains", slug: "chains" },
      { name: "Other Machinery Parts", slug: "other-machinery-parts" },
    ],
  },
];

async function seedRangeCategories() {
  console.log("Seeding Landforce-style 'OUR RANGE' categories...");

  for (const catData of RANGE_CATEGORIES_DATA) {
    // 1. Upsert Main Category
    const parent = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {
        name: catData.name,
        description: catData.description,
        displayOrder: catData.displayOrder,
        isActive: true,
      },
      create: {
        name: catData.name,
        slug: catData.slug,
        description: catData.description,
        displayOrder: catData.displayOrder,
        isActive: true,
      },
    });
    console.log(`✓ Main Category: ${parent.name} (${parent.slug})`);

    // 2. Upsert Subcategories
    for (let i = 0; i < catData.subcategories.length; i++) {
      const sub = catData.subcategories[i];
      await prisma.category.upsert({
        where: { slug: sub.slug },
        update: {
          name: sub.name,
          parentCategoryId: parent.id,
          displayOrder: i + 1,
          isActive: true,
        },
        create: {
          name: sub.name,
          slug: sub.slug,
          parentCategoryId: parent.id,
          displayOrder: i + 1,
          isActive: true,
        },
      });
    }
    console.log(`  └─ Synced ${catData.subcategories.length} subcategories.`);
  }

  // Deactivate old legacy parents if any (e.g. "agricultural-implements", "garden-power-equipment", "fodder-equipment")
  // so they don't duplicate on the homepage
  const legacySlugs = ["agricultural-implements", "spraying-equipment", "garden-power-equipment", "fodder-equipment"];
  for (const legSlug of legacySlugs) {
    try {
      await prisma.category.update({
        where: { slug: legSlug },
        data: { isActive: false },
      });
      console.log(`  (Deactivated legacy parent ${legSlug})`);
    } catch {
      // ignore
    }
  }

  console.log("\n✓ All Landforce-style categories & subcategories seeded successfully!");
}

seedRangeCategories()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

