import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database for Prakash Agri Tools...");

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash("Admin@Prakash2026!", 10);
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@prakashagri.com" },
    update: { passwordHash },
    create: {
      name: "Prakash Agri Tools Admin",
      email: "admin@prakashagri.com",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin user created: ${admin.email}`);

  // 2. Main Categories and their 34 Subcategories
  const categoriesData = [
    {
      name: "Agricultural Implements",
      slug: "agricultural-implements",
      description: "Heavy-duty tractor attachments and implements engineered for robust field preparation, primary and secondary tillage, seeding, and crop residue management.",
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 1,
      subcategories: [
        { name: "Seed Drills", slug: "seed-drills", description: "Precision seed drilling and simultaneous fertilizer dispensing equipment." },
        { name: "Turbo Seeder", slug: "turbo-seeder", description: "Advanced roto-till seeding implements for sowing in standing paddy stubbles." },
        { name: "Rotavators", slug: "rotavators", description: "High-performance rotary tillers for efficient soil pulverization and seedbed preparation." },
        { name: "Disc Harrows", slug: "disc-harrows", description: "Heavy-duty mounted, trailed, and hydraulic disc harrows for breaking clods." },
        { name: "Disc Ploughs", slug: "disc-ploughs", description: "Robust primary tillage implements for deep ploughing in hard, trashy, and stony soils." },
        { name: "Cultivators", slug: "cultivators", description: "Rigid and spring-loaded cultivators for aeration, weed eradication, and field preparation." },
        { name: "Laser Land Levelers", slug: "laser-land-levelers", description: "High-precision laser guided grading implements for uniform water distribution and soil conservation." },
        { name: "Disc Ridgers / Bund Makers", slug: "disc-ridgers-bund-makers", description: "Precision bund making and ridge formation equipment for systematic irrigation." },
        { name: "Reversible Ploughs", slug: "reversible-ploughs", description: "Hydraulic and mechanical reversible mould board ploughs for smooth level ploughing." },
        { name: "Mulchers", slug: "mulchers", description: "High-speed shredders for cutting and chopping agricultural crop residues.", image: "/uploads/paddy-straw-mulcher-field.jpeg" },
        { name: "Slashers", slug: "slashers", description: "Heavy-duty rotary slashers for clearing thick shrubs, pastures, and grasslands.", image: "/uploads/heavy-duty-rotary-slasher-deck.jpeg" },
        { name: "Paddy Weeders", slug: "paddy-weeders", description: "Specialized mechanical and power weeders for wet paddy fields.", image: "/uploads/multi-row-power-paddy-weeder.jpeg" },
        { name: "Mini Tillers", slug: "mini-tillers", description: "Compact, agile power tillers for inter-cultivation, orchards, and horticulture.", image: "/uploads/mini-power-tiller-cultivator-63cc.jpeg" },
        { name: "Weeders", slug: "weeders", description: "Motorised and manual weed management tools for inter-row clearing.", image: "/uploads/heavy-duty-7hp-power-weeder.jpeg" }
      ]
    },
    {
      name: "Spraying Equipment",
      slug: "spraying-equipment",
      description: "Comprehensive crop protection solutions ranging from portable battery sprayers to high-capacity tractor-mounted sprayer units.",
      image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 2,
      subcategories: [
        { name: "Battery Sprayers", slug: "battery-sprayers", description: "Rechargeable 12V knapsack sprayers with dual-purpose manual backup and high pressure." },
        { name: "Power Sprayers", slug: "power-sprayers", description: "2-stroke and 4-stroke engine-driven high pressure sprayers for tall trees and vast farms.", image: "/uploads/royal-kissan-knapsack-power-sprayer-768.jpeg" },
        { name: "Solar Sprayers", slug: "solar-sprayers", description: "Eco-friendly solar panel assisted knapsack sprayers for continuous remote spraying.", image: "/uploads/solar-knapsack-sprayer-16l-panel.jpeg" },
        { name: "300L Sprayers", slug: "300l-sprayers", description: "Tractor-mounted high-volume 300 Litre boom sprayers with heavy-duty PTO pumps.", image: "/uploads/tractor-mounted-boom-sprayer-300l.jpeg" }
      ]
    },
    {
      name: "Garden & Power Equipment",
      slug: "garden-power-equipment",
      description: "Commercial and landscaping power tools for weed clearing, hedge trimming, tree management, soil sampling, and water transfer.",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 3,
      subcategories: [
        { name: "Brush Cutters", slug: "brush-cutters", description: "Multi-functional 2-stroke and 4-stroke brush cutters with crop harvesting attachments.", image: "/uploads/honda-umr435t-backpack-brush-cutter.jpeg" },
        { name: "Grass Cutters", slug: "grass-cutters", description: "Hand-push and electric grass trimmers for neat lawn and perimeter maintenance." },
        { name: "Chain Saws", slug: "chain-saws", description: "Heavy-duty petrol chainsaws with guide bars from 18 to 24 inches for orchard pruning and woodcutting.", image: "/uploads/neptune-petrol-chainsaw.jpeg" },
        { name: "Hedge Trimmers", slug: "hedge-trimmers", description: "Double-sided reciprocating blade trimmers for neat hedge and bush shaping.", image: "/uploads/petrol-hedge-trimmer-double-sided.jpeg" },
        { name: "Lawn Mowers", slug: "lawn-mowers", description: "Push-type and self-propelled rotary petrol lawn mowers with grass collection bags.", image: "/uploads/red-rotary-petrol-lawn-mower.jpeg" },
        { name: "Earth Augers", slug: "earth-augers", description: "One-man and two-man post hole diggers with 6, 8, 10, and 12-inch auger drill bits.", image: "/uploads/handheld-petrol-earth-auger-drill.jpeg" },
        { name: "Water Pumps", slug: "water-pumps", description: "Self-priming portable petrol and diesel water pumps for agricultural irrigation." }
      ]
    },
    {
      name: "Fodder Equipment",
      slug: "fodder-equipment",
      description: "High-capacity fodder and silage cutting machinery essential for dairy farms and livestock nutrition.",
      image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 4,
      subcategories: [
        { name: "Chaff Cutters", slug: "chaff-cutters", description: "Motorised, tractor-PTO driven, and manual high-output chaff cutters for green and dry fodder.", image: "/uploads/amar-electric-motorised-chaff-cutter.jpeg" }
      ]
    },
    {
      name: "Spare Parts",
      slug: "spare-parts",
      description: "Authentic, high-wear resistant replacement components, blades, bearings, belts, and accessories for agricultural machinery.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 5,
      subcategories: [
        { name: "Rotavator Blades", slug: "rotavator-blades", description: "Boron steel L-type, C-type, and J-type blades for all major rotavator brands." },
        { name: "Seed Drill Parts", slug: "seed-drill-parts", description: "Seed metering discs, fluted rollers, boots, seed tubes, and tyne assemblies." },
        { name: "Sprayer Parts", slug: "sprayer-parts", description: "Brass spray guns, lance extensions, nozzles, pressure regulators, and piston packs." },
        { name: "Brush Cutter Parts", slug: "brush-cutter-parts", description: "Paddy cutting blades, nylon trimmer heads, clutch assemblies, and drive shafts." },
        { name: "Bearings", slug: "bearings", description: "Heavy-duty sealed spherical and taper roller bearings for harrows and implements." },
        { name: "Belts", slug: "belts", description: "High-torque V-belts and cogged industrial drive belts for agricultural machinery." },
        { name: "Chains", slug: "chains", description: "Heavy-duty drive roller chains and offset links for harvesters and tillers." },
        { name: "Other Machinery Parts", slug: "other-machinery-parts", description: "Pins, linchpins, PTO yokes, universal joints, bolts, and miscellaneous farm hardware." }
      ]
    }
  ];

  let totalSubcats = 0;
  const subcategoryMap: Record<string, string> = {};

  for (const catData of categoriesData) {
    const parent = await prisma.category.upsert({
      where: { slug: catData.slug },
      update: {
        name: catData.name,
        description: catData.description,
        image: catData.image,
        displayOrder: catData.displayOrder,
        isActive: true,
      },
      create: {
        name: catData.name,
        slug: catData.slug,
        description: catData.description,
        image: catData.image,
        displayOrder: catData.displayOrder,
        isActive: true,
      },
    });

    console.log(`Category: ${parent.name}`);

    for (let i = 0; i < catData.subcategories.length; i++) {
      const sub = catData.subcategories[i];
      const subcat = await prisma.category.upsert({
        where: { slug: sub.slug },
        update: {
          name: sub.name,
          description: sub.description,
          image: (sub as { image?: string }).image || null,
          parentCategoryId: parent.id,
          displayOrder: i + 1,
          isActive: true,
        },
        create: {
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
          image: (sub as { image?: string }).image || null,
          parentCategoryId: parent.id,
          displayOrder: i + 1,
          isActive: true,
        },
      });
      subcategoryMap[sub.slug] = subcat.id;
      totalSubcats++;
    }
  }

  console.log(`✓ Seeded 5 main categories and all ${totalSubcats} subcategories.`);

  // 3. Seed Realistic Verified Sample Products
  const sampleProducts = [
    {
      name: "Rotary Tiller — Robusto Heavy Duty",
      slug: "rotary-tiller-robusto-heavy-duty",
      brand: "Prakash Agro",
      modelNumber: "PAT-ROB-6FT",
      shortDescription: "Heavy-duty multi-speed gearbox rotavator designed for intensive tillage in tough soil conditions.",
      description: "The Robusto Heavy Duty Rotary Tiller provides superior soil pulverization and moisture retention. Built with a reinforced chassis, Boron steel L-type blades, and heavy-duty side gear drive, it delivers exceptional durability in demanding agricultural operations across dry and wetland farming.",
      subcatSlug: "rotavators",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Primary & Secondary Tillage, Puddling, Seedbed Preparation, Crop Residue Incorporation",
      technicalSpecifications: JSON.stringify({
        "Model": "PAT-ROB-6FT",
        "Working Width": "180 cm (6 Feet)",
        "Tractor HP Requirement": "45 - 55 HP",
        "Number of Blades": "54 Boron Steel Blades",
        "Blade Configuration": "L-Type",
        "Gearbox Type": "Multi-Speed Heavy Duty Gear Drive",
        "Total Weight": "445 kg approx",
        "Side Transmission": "Gear Driven in Oil Bath",
        "Three-Point Hitch": "Cat-II"
      }),
      images: [
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "9 Tyne Zero-Till Seed Drill",
      slug: "9-tyne-zero-till-seed-drill",
      brand: "Prakash Agro",
      modelNumber: "PAT-SD-9T",
      shortDescription: "Precision dual-box seed and fertilizer drill with adjustable inverted-T tynes for optimal germination.",
      description: "Engineered for accurate seed placement and balanced fertilizer distribution. The 9 Tyne Seed Drill reduces fuel consumption and field preparation time while ensuring uniform plant emergence across wheat, pulses, maize, and mustard crops.",
      subcatSlug: "seed-drills",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Zero-Tillage Sowing, Conventional Seeding, Fertilizer Placement",
      technicalSpecifications: JSON.stringify({
        "Number of Tynes": "9 Tynes (Adjustable Spacing)",
        "Seed Capacity": "65 kg",
        "Fertilizer Capacity": "70 kg",
        "Working Width": "185 cm",
        "Tractor HP Requirement": "35 - 45 HP",
        "Row Spacing": "17.5 cm to 22.5 cm adjustable",
        "Suitable Crops": "Wheat, Soyabean, Gram, Mustard, Pulses",
        "Metering Mechanism": "Fluted Roller & Agitator Drive"
      }),
      images: [
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Turbo Seeder / Roto-Till Drill",
      slug: "turbo-seeder-roto-till-drill",
      brand: "Prakash Agro",
      modelNumber: "PAT-TS-600",
      shortDescription: "Eco-friendly eco-tillage implement designed to sow directly into heavy paddy stubble without burning.",
      description: "The Turbo Seeder manages paddy crop residue efficiently by clearing a narrow slot in front of the seed furrows, placing seed and fertilizer with depth control. Eliminates the need for stubble burning and protects soil organic matter.",
      subcatSlug: "turbo-seeder",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Direct Seeding in Paddy Stubble, Conservation Agriculture",
      technicalSpecifications: JSON.stringify({
        "Working Width": "190 cm",
        "Tractor HP Requirement": "50 - 65 HP",
        "Seed Hopper Capacity": "75 kg",
        "Fertilizer Hopper Capacity": "80 kg",
        "Row Spacing": "20 cm standard",
        "Rotor Speed": "210 - 240 RPM",
        "Weight": "580 kg approx"
      }),
      images: [
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Disc Harrow Mounted — Heavy Duty",
      slug: "disc-harrow-mounted-heavy-duty",
      brand: "Prakash Agro",
      modelNumber: "PAT-DH-16D",
      shortDescription: "Robust 16-disc mounted offset harrow engineered for secondary tillage and clod shattering.",
      description: "Equipped with high-carbon boron steel notched discs in the front gang and plain discs in the rear gang. Heavy tubular steel frame ensures maximum penetration in hard ground and effortless tractor linkage maneuvering.",
      subcatSlug: "disc-harrows",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Clod Breaking, Stubble Cutting, Seedbed Conditioning",
      technicalSpecifications: JSON.stringify({
        "Type": "Offset Mounted Harrow",
        "Number of Discs": "16 Discs (8 Front Notched, 8 Rear Plain)",
        "Disc Diameter": "560 mm (22 Inches)",
        "Disc Spacing": "228 mm (9 Inches)",
        "Working Width": "180 cm",
        "Tractor HP Requirement": "45 - 55 HP",
        "Weight": "420 kg"
      }),
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Hydraulic Reversible Mould Board Plough (2-Bottom)",
      slug: "hydraulic-reversible-mould-board-plough",
      brand: "Prakash Agro",
      modelNumber: "PAT-MBP-2B",
      shortDescription: "Heavy-duty 2-bottom hydraulic reversible MB plough for deep soil inversion with minimal furrow dead-ends.",
      description: "Designed for tough hardpan inversion, burying weeds and crop residue deep under the soil. High-tensile frame and heavy-duty turnover hydraulic cylinder provide effortless left-and-right reversing directly from the tractor operator seat.",
      subcatSlug: "reversible-ploughs",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Deep Primary Ploughing, Weed Control, Subsoil Inversion",
      technicalSpecifications: JSON.stringify({
        "Number of Bottoms": "2 Bottom Reversible",
        "Working Depth": "250 mm - 350 mm",
        "Working Width": "600 mm - 700 mm",
        "Tractor HP Requirement": "50 - 65 HP",
        "Underframe Clearance": "680 mm",
        "Weight": "395 kg",
        "Reversing Mechanism": "Single-acting hydraulic cylinder"
      }),
      images: [
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Cultivator — Rigid 9 Tyne Heavy Duty",
      slug: "cultivator-rigid-9-tyne-heavy-duty",
      brand: "Prakash Agro",
      modelNumber: "PAT-CUL-9R",
      shortDescription: "Reinforced rigid box-channel cultivator for deep soil aeration and root weeding in tough terrain.",
      description: "Engineered with high tensile reversible shovels and heavy box channel cross bars. Ideal for inter-crop tillage, breaking dry crusted earth, and preparing fields for seeding with low draft demand.",
      subcatSlug: "cultivators",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: false,
      published: true,
      applications: "Soil Aeration, Inter-cultivation, Weed Eradication",
      technicalSpecifications: JSON.stringify({
        "Number of Tynes": "9 Rigid Tynes",
        "Working Width": "200 cm",
        "Working Depth": "Up to 220 mm",
        "Tractor HP Requirement": "35 - 45 HP",
        "Shovels": "Reversible High Carbon Steel Points",
        "Weight": "260 kg"
      }),
      images: [
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Laser Land Leveler Precision Transmitter & Bucket System",
      slug: "laser-land-leveler-precision-transmitter-bucket",
      brand: "Prakash Agro",
      modelNumber: "PAT-LLL-7FT",
      shortDescription: "Ultra-precise laser grade control system for level field preparation, conserving up to 30% irrigation water.",
      description: "Includes high-accuracy dual-grade transmitter, mast receiver, digital control box, and 7-foot heavy curved blade bucket. Delivers uniform grading accuracy down to millimeters, ensuring equal crop maturity and maximum fertilizer efficacy.",
      subcatSlug: "laser-land-levelers",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Precision Field Leveling, Water Conservation, Seedbed Uniformity",
      technicalSpecifications: JSON.stringify({
        "Bucket Width": "2.1 Meters (7 Feet)",
        "Operating Radius": "400 - 500 Meters",
        "Laser Accuracy": "±1.5 mm per 30m",
        "Hydraulic Valve": "High-response proportional solenoid valve",
        "Tractor HP Requirement": "50 HP & above",
        "Bucket Capacity": "1.5 cubic meters"
      }),
      images: [
        "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Tractor Mounted 300L Boom Sprayer",
      slug: "tractor-mounted-300l-boom-sprayer",
      brand: "Prakash Agro",
      modelNumber: "PAT-SP-300B",
      shortDescription: "Tractor 3-point hitch mounted 300-litre chemical sprayer with folding 24-nozzle boom.",
      description: "Designed for rapid, uniform pesticide and liquid fertilizer application over extensive crops. Features heavy-duty UV-stabilised polyethylene tank, PTO-driven ceramic triplex plunger pump, and adjustable height boom with anti-drip nozzles.",
      subcatSlug: "300l-sprayers",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Cotton, Paddy, Sugarcane, Chilly, Orchard Field Spraying",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "300 Litres (Heavy UV Polyethylene)",
        "Pump Type": "Triplex Plunger Ceramic HTP Pump",
        "Boom Width": "8.5 Meters (Folding 24-nozzle)",
        "Operating Pressure": "20 - 45 Bar",
        "Tractor HP Requirement": "25 HP & above (PTO 540 RPM)",
        "Delivery Rate": "35 - 50 Litres/min"
      }),
      images: [
        "/uploads/tractor-mounted-boom-sprayer-300l.jpeg",
        "/uploads/tractor-boom-sprayer-field.jpeg"
      ]
    },
    {
      name: "25L 4-Stroke Heavy Duty Knapsack Power Sprayer",
      slug: "25l-4-stroke-petrol-knapsack-power-sprayer",
      brand: "Neptune / Royal Kissan",
      modelNumber: "PAT-PS-768",
      shortDescription: "31cc 4-stroke commercial engine knapsack sprayer with brass double-acting high pressure piston pump.",
      description: "Commercial grade portable knapsack power sprayer designed for high-reach orchards, cotton, chilly, and horticulture fields. Powered by a fuel-efficient 4-stroke petrol engine that eliminates messy 2T oil pre-mixing and delivers continuous 10–35 kg/cm² operating pressure with a 3-nozzle brass spray lance.",
      subcatSlug: "power-sprayers",
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
      images: [
        "/uploads/royal-kissan-knapsack-power-sprayer-768.jpeg",
        "/uploads/neptune-4-stroke-knapsack-power-sprayer-767.jpeg"
      ]
    },
    {
      name: "16L Dual-Switch Battery Knapsack Sprayer",
      slug: "16l-dual-switch-battery-knapsack-sprayer",
      brand: "Prakash Agro",
      modelNumber: "PAT-BS-16L",
      shortDescription: "High-density 16-litre ergonomic knapsack sprayer with 12V 12Ah long-lasting battery.",
      description: "Delivers effortless, fatigue-free spraying for small to mid-scale farmers and horticulturists. Equipped with an auto-cut pressure regulator, stainless steel telescopic lance, and 4 interchangeable nozzles for broad misting or directed jets.",
      subcatSlug: "battery-sprayers",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Vegetable Farming, Horticulture, Pest Control, Sanitization",
      technicalSpecifications: JSON.stringify({
        "Tank Capacity": "16 Litres",
        "Battery": "12V 12Ah Sealed Lead-Acid / Lithium Ready",
        "Working Pressure": "0.2 - 0.45 MPa",
        "Spray Output": "1.8 - 3.2 L/min",
        "Operating Time per Charge": "6 - 8 Hours",
        "Lance": "Stainless Steel Telescopic (60cm - 100cm)",
        "Weight": "5.4 kg dry"
      }),
      images: [
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "4-Stroke Heavy Duty Side-Pack Brush Cutter",
      slug: "4-stroke-heavy-duty-side-pack-brush-cutter",
      brand: "Prakash Agro",
      modelNumber: "PAT-BC-35GX",
      shortDescription: "35.8cc 4-stroke low-vibration petrol brush cutter with 3-tooth blade and paddy harvesting attachment.",
      description: "Provides commercial grade grass clearing, shrub removal, and cereal crop harvesting. Features an easy-recoil start 4-stroke overhead cam engine that requires no oil mixing, saving fuel and dramatically reducing exhaust smoke.",
      subcatSlug: "brush-cutters",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Weed Trimming, Paddy & Wheat Harvesting, Grass Clearing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "35.8 cc (4-Stroke OHV)",
        "Power Rating": "1.5 HP (1.1 kW) @ 7000 RPM",
        "Fuel Tank Capacity": "0.65 L (Pure Petrol)",
        "Drive Shaft": "28 mm Solid Steel Shaft with 9-Spline Drive",
        "Standard Accessories": "3T Metal Blade, Nylon Tap-and-Go Head, 80T Paddy Guard Guard Attachment",
        "Weight": "7.8 kg"
      }),
      images: [
        "/uploads/brush-cutter-paddy-harvesting.jpeg",
        "/uploads/brush-cutter-wheat-harvesting.jpeg"
      ]
    },
    {
      name: "Honda UMR435T 4-Stroke Backpack Brush Cutter & Paddy Harvester",
      slug: "honda-umr435t-4-stroke-backpack-brush-cutter",
      brand: "Honda Genuine",
      modelNumber: "PAT-BC-UMR435T",
      shortDescription: "35cc 4-stroke Honda GX35 backpack brush cutter with flexible drive shaft and paddy/wheat crop harvester attachment.",
      description: "Original Honda UMR435T backpack brush cutter engineered for fatigue-free harvesting and agricultural weed clearing. Features Honda's legendary ultra-lightweight GX35 4-stroke mini engine that operates at any angle (360° inclinable). Includes an ergonomic padded backpack frame, heavy-duty flexible shaft, 80T circular paddy harvester attachment with collection deflector, and 2-tooth brush blade.",
      subcatSlug: "brush-cutters",
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
      images: [
        "/uploads/honda-umr435t-backpack-brush-cutter.jpeg",
        "/uploads/brush-cutter-wheat-harvesting.jpeg",
        "/uploads/brush-cutter-paddy-harvesting.jpeg"
      ]
    },
    {
      name: "Heavy-Duty 58cc Commercial Petrol Chain Saw (22\" Bar)",
      slug: "heavy-duty-58cc-commercial-petrol-chainsaw",
      brand: "Neptune / Prakash Agro",
      modelNumber: "PAT-CS-58CC",
      shortDescription: "58cc 2-stroke commercial grade woodcutting chainsaw with 22-inch guide bar and automatic chain lubrication.",
      description: "Industrial strength 58cc petrol chainsaw built for forestry, orchard pruning, firebreak management, and agricultural timber cutting. Equipped with a high-torque 2-stroke engine, automatic inertial chain safety brake, anti-vibration rubber damper handles, and a 22-inch hardened sprocket-nose guide bar.",
      subcatSlug: "chain-saws",
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
      images: [
        "/uploads/neptune-petrol-chainsaw.jpeg",
        "/uploads/agripro-58cc-petrol-chainsaw.jpeg",
        "/uploads/heavy-duty-petrol-chainsaw-58cc.jpeg"
      ]
    },
    {
      name: "Heavy Duty 63cc Earth Auger with 8\" Bit",
      slug: "heavy-duty-63cc-earth-auger-8-inch",
      brand: "Prakash Agro",
      modelNumber: "PAT-EA-63CC",
      shortDescription: "Powerful 63cc post-hole digger for effortless plantation pits and fencing post holes.",
      description: "Cuts through tough soil and clay with high-torque gear reduction and durable hardened steel fish-tail drill bits. Includes ergonomic anti-vibration handlebar controls for safe single-operator and dual-operator use.",
      subcatSlug: "earth-augers",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: false,
      published: true,
      applications: "Tree Sapling Plantation, Solar Structure Piling, Farm Fencing",
      technicalSpecifications: JSON.stringify({
        "Engine Displacement": "63 cc 2-Stroke Single Cylinder",
        "Max Power": "2.8 HP @ 7500 RPM",
        "Gear Ratio": "30:1 Heavy Reduction Gearbox",
        "Included Drill Bit": "8 Inch Diameter x 800 mm Length",
        "Compatible Bits": "4\", 6\", 8\", 10\", 12\" Bits Supported",
        "Fuel Mixture": "Petrol + 2T Oil (25:1)"
      }),
      images: [
        "/uploads/handheld-petrol-earth-auger-drill.jpeg",
        "/uploads/operator-field-earth-auger.jpeg"
      ]
    },
    {
      name: "Tractor-Mounted Heavy-Duty PTO Post Hole Digger / Earth Auger",
      slug: "tractor-mounted-heavy-duty-pto-post-hole-digger",
      brand: "Prakash Agro",
      modelNumber: "PAT-PHD-PTO",
      shortDescription: "Tractor 3-point hitch PTO driven post hole digger for high-volume plantation, fencing, and solar piling.",
      description: "Heavy-duty agricultural post hole digger designed for tractors 35 HP and above. Features a reinforced tubular boom mast, heavy-duty 540 RPM PTO bevel gearbox with shear-bolt overload protection, and high-tensile spiral auger bits with replaceable tungsten-carbide cutting teeth and pilot point for fast digging in hard and stony soils.",
      subcatSlug: "earth-augers",
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
      images: [
        "/uploads/tractor-mounted-pto-earth-auger.jpeg"
      ]
    },
    {
      name: "26cc 2-Stroke Commercial Petrol Hedge Trimmer (600mm Blade)",
      slug: "26cc-2-stroke-commercial-petrol-hedge-trimmer",
      brand: "Prakash Agro",
      modelNumber: "PAT-HT-260",
      shortDescription: "26cc commercial engine hedge trimmer with 600mm double-sided reciprocating hardened steel blades and 180° rotatable handle.",
      description: "Designed for professional landscaping, tea garden pruning, and decorative shrub shaping. Features a high-power low-vibration 2-stroke engine, dual reciprocating precision-ground cutting blades that cleanly slice branches up to 20mm, and a 180-degree multi-angle rear handle for effortless vertical and horizontal sculpting.",
      subcatSlug: "hedge-trimmers",
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
      images: [
        "/uploads/petrol-hedge-trimmer-double-sided.jpeg",
        "/uploads/petrol-hedge-trimmer-rear-view.jpeg",
        "/uploads/orange-petrol-hedge-trimmer-profile.jpeg"
      ]
    },
    {
      name: "Self-Propelled 4-Stroke Rotary Petrol Lawn Mower (18\" Steel Deck)",
      slug: "self-propelled-4-stroke-rotary-petrol-lawn-mower",
      brand: "Prakash Agro",
      modelNumber: "PAT-LM-18SP",
      shortDescription: "140cc 4-stroke self-propelled lawn mower with 18-inch reinforced steel deck and 60L grass catcher.",
      description: "Engineered for golf courses, resort lawns, farmhouse perimeters, and municipal landscaping. Powered by a fuel-efficient 140cc 4-stroke OHV engine with easy pull-start. Features rear-wheel drive self-propulsion that glides over uneven terrain, 8-stage central height adjustment, and a high-capacity 60L hybrid grass collection catcher with dust-blocking hard top.",
      subcatSlug: "lawn-mowers",
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
      images: [
        "/uploads/red-rotary-petrol-lawn-mower.jpeg",
        "/uploads/petrol-lawn-mower-garden-operation.jpeg",
        "/uploads/petrol-lawn-mower-backyard.jpeg"
      ]
    },
    {
      name: "3HP Heavy Duty Motorised Chaff Cutter",
      slug: "3hp-heavy-duty-motorised-chaff-cutter",
      brand: "Prakash Agro",
      modelNumber: "PAT-CC-3HP",
      shortDescription: "High-output electric fodder cutter with 3-blade flywheel for uniform cutting of green and dry fodder.",
      description: "Essential for modern dairy and goat farms. Finely chops maize, sorghum, napier grass, and dry straw into digestible sizes, minimizing fodder wastage by up to 40% and boosting milk yield through better feed conversion.",
      subcatSlug: "chaff-cutters",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Dairy Fodder Preparation, Silage Cutting, Livestock Feed",
      technicalSpecifications: JSON.stringify({
        "Motor Power": "3 HP Single Phase 100% Copper Winding Motor",
        "Cutting Capacity": "800 - 1000 kg/hour (Green Fodder)",
        "Number of Blades": "3 High-Carbon Hardened Steel Blades",
        "Feed Roller": "Reverse & Forward Dual Gear Safety Roller",
        "Cut Length": "10 mm - 25 mm adjustable",
        "Chassis": "Heavy Angle Iron Frame with Wheels"
      }),
      images: [
        "/uploads/amar-electric-motorised-chaff-cutter.jpeg",
        "/uploads/flywheel-green-fodder-chaff-cutter.jpeg"
      ]
    },
    {
      name: "Tractor PTO-Driven Heavy Duty Chaff Cutter / Silage Chopper",
      slug: "tractor-pto-driven-heavy-duty-chaff-cutter",
      brand: "Captain / Prakash Agro",
      modelNumber: "PAT-CC-PTO",
      shortDescription: "Tractor PTO operated high-capacity fodder cutter on transport wheels for large dairy farms and silage making.",
      description: "Heavy-duty commercial fodder cutter powered directly by tractor 540 RPM PTO shaft. Built on a reinforced 4-wheel mobile trolley with tow hitch, making it easy to position anywhere across the farm. Capable of processing up to 3500 kg of green maize, sorghum, napier grass, and dry straw per hour with dual forward-neutral-reverse feeding rollers.",
      subcatSlug: "chaff-cutters",
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
      images: [
        "/uploads/tractor-pto-chaff-cutter-field.jpeg"
      ]
    },
    {
      name: "63cc 2-Stroke Portable Mini Power Tiller / Cultivator",
      slug: "63cc-2-stroke-portable-mini-power-tiller",
      brand: "Prakash Agro",
      modelNumber: "PAT-MT-63CC",
      shortDescription: "63cc high-torque portable mini power tiller with 16 heat-treated rotary blades for inter-cultivation and weeding.",
      description: "Compact, highly maneuverable petrol mini power tiller designed for vegetable farming, polyhouses, horticulture orchards, and inter-row weed management in cotton and sugarcane crops. Equipped with 16 heavy-duty curved tilling blades that thoroughly pulverize dry and loamy soil up to 15cm depth, an ergonomic adjustable handlebar with thumb throttle, and a front transport wheel.",
      subcatSlug: "mini-tillers",
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
      images: [
        "/uploads/mini-power-tiller-cultivator-63cc.jpeg",
        "/uploads/farmer-mini-power-tiller-field.jpeg"
      ]
    },
    {
      name: "7HP Heavy-Duty Multi-Speed Petrol Power Weeder / Tiller",
      slug: "7hp-heavy-duty-multi-speed-petrol-power-weeder",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-7HP",
      shortDescription: "7HP 212cc 4-stroke gear-driven inter-cultivation power weeder with 24 curved tilling blades and side protection discs.",
      description: "Heavy-duty commercial agricultural power weeder engineered for intensive soil cultivation and weed eradication in row crops such as cotton, sugarcane, chilly, groundnut, and vegetables. Features a robust 212cc 4-stroke engine, heavy cast-iron gearbox with 2 forward and 1 reverse speed, adjustable working width from 600mm to 1000mm, side mudguards, and crop protection discs.",
      subcatSlug: "weeders",
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
      images: [
        "/uploads/heavy-duty-7hp-power-weeder.jpeg"
      ]
    },
    {
      name: "Portable 2-Stroke Mini Power Weeder (Model PW-210)",
      slug: "portable-2-stroke-mini-power-weeder-pw210",
      brand: "Prakash Agro",
      modelNumber: "PAT-PW-210",
      shortDescription: "Lightweight 52cc 2-stroke portable mini weeder with star-rotor weeding tines for narrow vegetable rows.",
      description: "Compact and agile 52cc portable power weeder designed for effortless weed removal in dense, narrow crop rows. Features star-wheel high-carbon weeding tines that aerate topsoil while uprooting weeds, an ergonomic dual-grip handlebar with throttle lockout, and low fuel consumption for cost-effective farm maintenance.",
      subcatSlug: "weeders",
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
      images: [
        "/uploads/portable-2-stroke-power-weeder-pw210.jpeg"
      ]
    },
    {
      name: "Motorised Multi-Row Wet Field Paddy Weeder",
      slug: "motorised-multi-row-wet-field-paddy-weeder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MPW-02",
      shortDescription: "Engine-driven rotary cono weeder designed for effortless weed management and root aeration in standing water paddy fields.",
      description: "Specialized mechanical weed management tool for SRI (System of Rice Intensification) and conventional wetland paddy crops. Powered by a fuel-efficient 4-stroke petrol engine with cylindrical rotary weeding drums that uproot and bury weeds into the mud to act as green manure, while simultaneously aerating the soil around rice roots to boost tillering.",
      subcatSlug: "paddy-weeders",
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
      images: [
        "/uploads/multi-row-power-paddy-weeder.jpeg",
        "/uploads/motorised-wet-paddy-weeder-field.jpeg"
      ]
    },
    {
      name: "Boron Steel Rotavator Blades (L-Type & C-Type)",
      slug: "boron-steel-rotavator-blades-l-c-type",
      brand: "Prakash Genuine Spares",
      modelNumber: "PAT-SP-BLD-01",
      shortDescription: "Wear-resistant Italian quality boron steel replacement blades for all major rotavator brands.",
      description: "Manufactured from certified boron steel and induction heat-treated to 48-52 HRC. Delivers up to 2x longer operating life in abrasive sandy, black cotton, and gravel-rich soils.",
      subcatSlug: "rotavator-blades",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
      applications: "Direct replacement blade for 5ft, 6ft, 7ft, and 8ft rotavators",
      technicalSpecifications: JSON.stringify({
        "Material": "Boron Steel (30MnB5)",
        "Hardness": "48 - 52 HRC Heat Treated",
        "Blade Type": "L-Shape / C-Shape Available",
        "Hole Spacing": "46 mm / 57 mm standard centers",
        "Thickness": "7 mm / 8 mm reinforced",
        "Compatibility": "Universal fit for major Indian and imported tillers"
      }),
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Seed Drill Fluted Roller & Seed Cup Assembly",
      slug: "seed-drill-fluted-roller-seed-cup-assembly",
      brand: "Prakash Genuine Spares",
      modelNumber: "PAT-SP-SDR-04",
      shortDescription: "Precision nylon and aluminum fluted seed metering rollers for zero-till drills.",
      description: "High-durability fluted rollers ensure zero grain breakage during seed dispensing. Resistant to fertilizer corrosion and UV exposure.",
      subcatSlug: "seed-drill-parts",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: false,
      published: true,
      applications: "Replacement seed meters for automatic and manual seed drills",
      technicalSpecifications: JSON.stringify({
        "Material": "Virgin Nylon / Aluminium Alloy",
        "Inner Hex Bore": "19 mm / 22 mm",
        "Outer Diameter": "48 mm",
        "Corrosion Resistance": "High fertilizer resistance"
      }),
      images: [
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
      ]
    },
    {
      name: "Heavy-Duty Paddy Straw Mulcher & Crop Residue Shredder",
      slug: "heavy-duty-paddy-straw-mulcher-crop-residue-shredder",
      brand: "Prakash Agro",
      modelNumber: "PAT-MUL-7FT",
      shortDescription: "High-speed tractor PTO driven crop residue mulcher for in-situ shredding of paddy stubble, cotton stalks, and sugarcane trash.",
      description: "The Prakash Agro Heavy-Duty Paddy Straw Mulcher is an eco-friendly residue management implement designed to eliminate stubble burning. Powered by tractor 540 RPM PTO, it chops standing and lodged crop stubble into fine pieces and spreads them uniformly across the soil to form organic mulch, improving soil aeration, moisture retention, and organic matter.",
      subcatSlug: "mulchers",
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
      images: [
        "/uploads/paddy-straw-mulcher-field.jpeg",
        "/uploads/heavy-duty-straw-mulcher.jpeg",
        "/uploads/tractor-stalk-chopper-shredder.jpeg"
      ]
    },
    {
      name: "Heavy-Duty Tractor Rotary Slasher / Pasture Topper",
      slug: "heavy-duty-tractor-rotary-slasher-pasture-topper",
      brand: "Prakash Agro",
      modelNumber: "PAT-SLS-6FT",
      shortDescription: "Rugged rotary slasher engineered for cutting tall wild grass, shrubs, pasture topping, and orchard boundary clearing.",
      description: "Built with a reinforced steel deck, high-torque heavy-duty bevel gearbox, and reversible heat-treated swinging blades. The Prakash Agro Rotary Slasher handles heavy brush, dense shrubs, and tough grasslands effortlessly, preventing weed spread and keeping farm boundaries neat and fire-safe.",
      subcatSlug: "slashers",
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
      images: [
        "/uploads/heavy-duty-rotary-slasher-deck.jpeg",
        "/uploads/tractor-slasher-depth-wheel.jpeg",
        "/uploads/tractor-rotary-slasher-grass.jpeg"
      ]
    },
    {
      name: "Solar-Powered 16L Knapsack Battery Sprayer (12V SLA / Solar Panel)",
      slug: "solar-powered-16l-knapsack-battery-sprayer",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-16L",
      subcatSlug: "solar-sprayers",
      shortDescription: "16-litre heavy-duty knapsack crop sprayer with built-in 12V 8Ah battery and continuous solar trickle charging panel.",
      description: "Dual-powered 16-litre solar knapsack sprayer designed for farmers requiring extended field runtime without relying solely on grid power. Combines a sealed 12V 8Ah maintenance-free rechargeable battery with an attached high-efficiency monocrystalline solar panel for continuous daytime trickle charging in the field. Equipped with a high-pressure 12V micro-diaphragm pump delivering up to 95 PSI with auto cut-off regulator. Includes stainless steel telescopic lance with 4 interchangeable spray nozzles.",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
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
      }),
      images: [
        "/uploads/solar-knapsack-sprayer-16l-panel.jpeg",
        "/uploads/farmer-spraying-cotton-solar-knapsack-sprayer.jpeg",
        "/uploads/solar-knapsack-power-sprayer-side.jpeg"
      ]
    },
    {
      name: "2-in-1 Dual Function Solar & Manual Knapsack Sprayer (16L)",
      slug: "2-in-1-solar-and-manual-dual-function-knapsack-sprayer-16l",
      brand: "Prakash Agro",
      modelNumber: "PAT-SS-2IN1",
      subcatSlug: "solar-sprayers",
      shortDescription: "Hybrid 16L crop sprayer featuring both solar electric motor operation and emergency manual hand lever pumping.",
      description: "Versatile 2-in-1 hybrid knapsack sprayer combining solar battery operation with an emergency manual hand lever pump. Ensures uninterrupted pesticide and liquid fertilizer spraying even in cloudy conditions or remote farmland without electrical charging infrastructure. Built with a 16-litre thick UV-stabilized tank, high-efficiency solar panel, ergonomic padded shoulder straps, and a long-life micro-diaphragm pump.",
      priceType: "ENQUIRY_ONLY",
      availabilityStatus: "AVAILABLE",
      featured: true,
      published: true,
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
      }),
      images: [
        "/uploads/solar-hybrid-knapsack-sprayer-front.jpeg",
        "/uploads/solar-knapsack-power-sprayer-side.jpeg",
        "/uploads/farmer-spraying-cotton-solar-knapsack-sprayer.jpeg"
      ]
    }
  ];

  for (const prod of sampleProducts) {
    const categoryId = subcategoryMap[prod.subcatSlug];
    if (!categoryId) {
      console.warn(`Subcategory ${prod.subcatSlug} not found for product ${prod.name}`);
      continue;
    }

    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        brand: prod.brand,
        modelNumber: prod.modelNumber,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId: categoryId,
        priceType: prod.priceType,
        availabilityStatus: prod.availabilityStatus,
        technicalSpecifications: prod.technicalSpecifications,
        applications: prod.applications,
        featured: prod.featured,
        published: prod.published,
        seoTitle: `${prod.name} | Prakash Agri Tools Hyderabad`,
        seoDescription: prod.shortDescription,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        brand: prod.brand,
        modelNumber: prod.modelNumber,
        shortDescription: prod.shortDescription,
        description: prod.description,
        categoryId: categoryId,
        priceType: prod.priceType,
        availabilityStatus: prod.availabilityStatus,
        technicalSpecifications: prod.technicalSpecifications,
        applications: prod.applications,
        featured: prod.featured,
        published: prod.published,
        seoTitle: `${prod.name} | Prakash Agri Tools Hyderabad`,
        seoDescription: prod.shortDescription,
      },
    });

    // Remove existing media and re-add
    await prisma.productMedia.deleteMany({
      where: { productId: createdProduct.id },
    });

    for (let i = 0; i < prod.images.length; i++) {
      await prisma.productMedia.create({
        data: {
          productId: createdProduct.id,
          mediaType: "IMAGE",
          mediaUrl: prod.images[i],
          altText: `${prod.name} - View ${i + 1}`,
          displayOrder: i,
        },
      });
    }
  }

  console.log(`✓ Seeded ${sampleProducts.length} verified products with media & technical specifications.`);
  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
