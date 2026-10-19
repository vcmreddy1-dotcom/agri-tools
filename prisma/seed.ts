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
        { name: "Mulchers", slug: "mulchers", description: "High-speed shredders for cutting and chopping agricultural crop residues." },
        { name: "Slashers", slug: "slashers", description: "Heavy-duty rotary slashers for clearing thick shrubs, pastures, and grasslands." },
        { name: "Paddy Weeders", slug: "paddy-weeders", description: "Specialized mechanical and power weeders for wet paddy fields." },
        { name: "Mini Tillers", slug: "mini-tillers", description: "Compact, agile power tillers for inter-cultivation, orchards, and horticulture." },
        { name: "Weeders", slug: "weeders", description: "Motorised and manual weed management tools for inter-row clearing." }
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
        { name: "Power Sprayers", slug: "power-sprayers", description: "2-stroke and 4-stroke engine-driven high pressure sprayers for tall trees and vast farms." },
        { name: "Solar Sprayers", slug: "solar-sprayers", description: "Eco-friendly solar panel assisted knapsack sprayers for continuous remote spraying." },
        { name: "300L Sprayers", slug: "300l-sprayers", description: "Tractor-mounted high-volume 300 Litre boom sprayers with heavy-duty PTO pumps." }
      ]
    },
    {
      name: "Garden & Power Equipment",
      slug: "garden-power-equipment",
      description: "Commercial and landscaping power tools for weed clearing, hedge trimming, tree management, soil sampling, and water transfer.",
      image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1000&q=80",
      displayOrder: 3,
      subcategories: [
        { name: "Brush Cutters", slug: "brush-cutters", description: "Multi-functional 2-stroke and 4-stroke brush cutters with crop harvesting attachments." },
        { name: "Grass Cutters", slug: "grass-cutters", description: "Hand-push and electric grass trimmers for neat lawn and perimeter maintenance." },
        { name: "Chain Saws", slug: "chain-saws", description: "Heavy-duty petrol chainsaws with guide bars from 18 to 24 inches for orchard pruning and woodcutting." },
        { name: "Hedge Trimmers", slug: "hedge-trimmers", description: "Double-sided reciprocating blade trimmers for neat hedge and bush shaping." },
        { name: "Lawn Mowers", slug: "lawn-mowers", description: "Push-type and self-propelled rotary petrol lawn mowers with grass collection bags." },
        { name: "Earth Augers", slug: "earth-augers", description: "One-man and two-man post hole diggers with 6, 8, 10, and 12-inch auger drill bits." },
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
        { name: "Chaff Cutters", slug: "chaff-cutters", description: "Motorised, tractor-PTO driven, and manual high-output chaff cutters for green and dry fodder." }
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
          parentCategoryId: parent.id,
          displayOrder: i + 1,
          isActive: true,
        },
        create: {
          name: sub.name,
          slug: sub.slug,
          description: sub.description,
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
        "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
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
        "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1200&q=80"
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
        "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1200&q=80"
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
        "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
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
