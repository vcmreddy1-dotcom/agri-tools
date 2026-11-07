import { prisma } from "../lib/db";
import fs from "fs";
import path from "path";

interface ProductSeedDef {
  name: string;
  slug: string;
  brand: string;
  modelNumber: string;
  shortDescription: string;
  description: string;
  subCategorySlug: string;
  photos: string[]; // clean filenames in public/website-photos/
  featured?: boolean;
}

const PRODUCTS_TO_SEED: ProductSeedDef[] = [
  // ==========================================
  // LAND PREPARATION
  // ==========================================
  {
    name: "Heavy Duty Tractor Reversible Mouldboard Plough",
    slug: "heavy-duty-tractor-reversible-mouldboard-plough",
    brand: "Prakash Agro",
    modelNumber: "PAT-RMBP-2B",
    shortDescription: "Tractor mounted reversible mouldboard plough for deep tillage and inversion of heavy trash soil.",
    description: "Designed for heavy-duty primary tillage in tough soil conditions. Features high-tensile steel frames, wear-resistant boron steel bar points, and smooth mechanical flipping mechanism for two-way furrow turnover without dead furrows.",
    subCategorySlug: "reversible-plough",
    photos: ["reversable-plow.jpeg", "reverse-forward.jpeg"],
    featured: true,
  },
  {
    name: "Hydraulic Reversible 2-Bottom & 3-Bottom MB Plough",
    slug: "hydraulic-reversible-mould-board-plough",
    brand: "Prakash Agro",
    modelNumber: "PAT-HRMB-3B",
    shortDescription: "Automatic hydraulic roll-over reversible plough with dual double-acting hydraulic cylinders.",
    description: "Equipped with heavy-duty hydraulic turnover system operable directly from tractor hydraulic remote valves. Ensures effortless changeover at headlands, uniform furrow depth, and optimum fuel efficiency.",
    subCategorySlug: "hydraulic-reversible-plough",
    photos: ["hydraulic-reversible-plough.avif"],
    featured: true,
  },
  {
    name: "Tractor-Mounted Manual Reversible Plough",
    slug: "tractor-mounted-manual-reversible-plough",
    brand: "Prakash Agro",
    modelNumber: "PAT-MRP-2B",
    shortDescription: "Mechanical lever-locking reversible plough for 35HP - 55HP tractors.",
    description: "Cost-effective reversible tillage implement with manual spring-loaded rollover latch mechanism. Boron steel shares provide long-lasting cutting performance in hard dry soils.",
    subCategorySlug: "manual-reversible-plough",
    photos: ["manual-reversable-plow.jpeg", "tractor-mounted-manual-plough.jpg"],
  },
  {
    name: "Tractor-Mounted Heavy Duty Offset Disc Harrow",
    slug: "disc-harrow-mounted-heavy-duty",
    brand: "Prakash Agro",
    modelNumber: "PAT-MDH-16D",
    shortDescription: "Mounted offset disc harrow with 16 to 20 boron steel notched and plain discs.",
    description: "Engineered for chopping crop residue, breaking hard clods, and preparing fine seedbeds in secondary tillage. Features oil-bath bearing spools with multi-lip seals for dust protection.",
    subCategorySlug: "disc-harrows",
    photos: ["disk-harrow.jpeg"],
    featured: true,
  },
  {
    name: "Tractor-Mounted 2-Disc & 3-Disc Heavy Duty Plough",
    slug: "tractor-mounted-heavy-duty-disc-plough",
    brand: "Prakash Agro",
    modelNumber: "PAT-DP-2D",
    shortDescription: "Direct tractor-mounted heavy disc plough for rocky, root-infested, and abrasive soils.",
    description: "Constructed with seamless tubular frame and heavy-duty 26-inch boron steel discs. Discs roll over underground obstacles without damage, ensuring smooth deep ploughing in difficult terrains.",
    subCategorySlug: "disc-ploughs",
    photos: ["2-disk-plow.jpg", "disc-disk-plow-3.avif", "tractor-mounted-2-disc-plough.jpg"],
    featured: true,
  },
  {
    name: "Heavy Duty 9-Tyne Spring Loaded Cultivator / Tiller",
    slug: "cultivator-rigid-9-tyne-heavy-duty",
    brand: "Prakash Agro",
    modelNumber: "PAT-SLC-9T",
    shortDescription: "Spring loaded heavy-duty 9 tyne cultivator designed for high penetration and root weed clearance.",
    description: "Heavy-duty channel frame with dual spring-tensioned tynes that deflect over buried boulders and roots, snapping back instantly. High-carbon reversible shovel points.",
    subCategorySlug: "cultivators",
    photos: ["9-tyne-tractor-rigid-loaded-cultivator.jpg", "rigid-cultivator-orange-green-11-tyne.avif"],
  },
  {
    name: "Robusto Multi-Speed Gear Drive Rotavator / Rotary Tiller",
    slug: "rotary-tiller-robusto-heavy-duty",
    brand: "Prakash Agro",
    modelNumber: "PAT-RT-6FT",
    shortDescription: "Heavy duty 6ft & 7ft multi-speed rotary tiller with boron steel L & C blades.",
    description: "Heavy-duty side gear drive, multi-speed gearbox for varying rotor RPM, oil-lubricated bearing hubs, and spring-loaded trailing board for a pulverized, level seedbed in single pass.",
    subCategorySlug: "rotavators",
    photos: ["agricultural-machinery-rotary-tiller-tractor-rotovator.avif", "agriculture-rotovator-1.jpg"],
    featured: true,
  },
  {
    name: "Mini Tractor Rotavator / Rotary Tiller (3ft - 4ft)",
    slug: "mini-tractor-rotavator-rotary-tiller",
    brand: "Prakash Agro",
    modelNumber: "PAT-MRT-4FT",
    shortDescription: "Compact rotary tiller designed for 15HP to 30HP orchard and compact tractors.",
    description: "Ideal for inter-row weeding and soil tilling in sugarcane, banana, cotton, vineyards, and greenhouse horticulture. Lightweight yet rigid chassis with premium boron steel blades.",
    subCategorySlug: "rotavators",
    photos: ["mini-rotovator.jpeg"],
  },
  {
    name: "Heavy Duty Deep Tillage Chisel Plough / Sizzle Plough",
    slug: "heavy-duty-chisel-plough-sizzle",
    brand: "Prakash Agro",
    modelNumber: "PAT-CP-3S",
    shortDescription: "Deep soil sub-shattering chisel implement to break hardpan without turning topsoil.",
    description: "Breaks impervious hard subsoil layers down to 400mm depth to enhance rainwater permeability, root aeration, and moisture retention during dry spells. Heavy heat-treated shanks.",
    subCategorySlug: "chisel-plough",
    photos: ["sizzle.jpeg", "mild-steel-chisel-plough.jpg"],
  },
  {
    name: "Tractor Land Leveller Blade & Hydraulic Bucket",
    slug: "tractor-land-leveller-blade-hydraulic-bucket",
    brand: "Prakash Agro",
    modelNumber: "PAT-LL-8FT",
    shortDescription: "8ft heavy structural steel land leveller with reversible carbon steel cutting edge.",
    description: "Used for rough and medium field levelling, bund making, and soil scraping. Robust box-section structure with high wear-resistant cutting blade that can be flipped for double life.",
    subCategorySlug: "levelers",
    photos: ["agricultural-land-leveller-525.jpg", "hydralic-bucket.png"],
  },
  {
    name: "Precision Laser Land Leveler Transmitter & Scraper Bucket",
    slug: "laser-land-leveler-precision-transmitter-bucket",
    brand: "Prakash Agro",
    modelNumber: "PAT-LLL-PRO",
    shortDescription: "Precision grade laser transmitter, digital receiver, solenoid control box & heavy bucket.",
    description: "Saves up to 30% irrigation water, increases crop yields, and ensures uniform fertilizer distribution. Features rotary laser diode transmitter, hydraulic proportional mast receiver, and heavy laser bucket.",
    subCategorySlug: "laser-land-levelers",
    photos: ["laser-land-leveler-11.jpg", "laser-land-leveller.png"],
    featured: true,
  },
  {
    name: "Tractor Bund Farmer & Jaysan Ridge Plastering Machine",
    slug: "tractor-bund-farmer-disc-ridger-ridge-plasterer",
    brand: "Jaysan / Prakash Agro",
    modelNumber: "PAT-BF-DISC",
    shortDescription: "Dual disc bund former and automatic tractor-mounted ridge plastering machine.",
    description: "Creates solid water-retention field boundary bunds and irrigation canal ridges. Forms smooth, compressed, weed-free mud ridges in paddy and wetland plots automatically.",
    subCategorySlug: "disc-ridgers-bund-makers",
    photos: ["bund-farmer.jpg", "jaysan-ridge-plaster-2216986520-8us8fnwi.avif", "ridge-plastering-machine-250x250.webp"],
    featured: true,
  },
  {
    name: "Rohit Krushi Vibro Sub-Soiler (1 & 3 Shank)",
    slug: "rohit-krushi-vibro-sub-soiler",
    brand: "Rohit Krushi",
    modelNumber: "RK-VSS-3S",
    shortDescription: "Heavy-duty vibration-assisted sub-soiler for deep subsoil pan fracturing.",
    description: "Engineered by Rohit Krushi Industries to pulverize compaction layers up to 60cm underground with minimal tractor draft force. Reversible boron steel shanks with replaceable wear points.",
    subCategorySlug: "sub-soiler",
    photos: ["rohit-krushi-industries-vibro-subsoiler-9nzkfq8o.avif", "sub-soiler-3-row.webp"],
  },

  // ==========================================
  // SOWING & PLANTING
  // ==========================================
  {
    name: "Manual Push-Type Precision Vegetable & Grain Seeder",
    slug: "manual-push-type-precision-vegetable-seeder",
    brand: "Prakash Agro",
    modelNumber: "PAT-MS-VEG",
    shortDescription: "Walk-behind manual push seeder with interchangeable metering rollers for small seeds.",
    description: "Allows single seed dibbling for onion, carrot, radish, cabbage, sesame, and mustard. Includes furrow opener, metering roller, seed covering wheel, and adjustable row-marker arm.",
    subCategorySlug: "manual-seeder",
    photos: ["manual-seeder-1.webp", "manual-seeder.jpeg", "veg-seeder.jpeg", "vegitable-seed.jpeg", "vegitable-seeder.jpeg"],
  },
  {
    name: "Paddy Drum Seeder / Wet Seeder Barrel",
    slug: "paddy-drum-seeder-barrel-wetland",
    brand: "Prakash Agro",
    modelNumber: "PAT-PDS-8R",
    shortDescription: "8-row direct wetland paddy drum seeder manufactured with durable UV-stabilized plastic.",
    description: "Saves labor and seedling nursery costs by direct seeding pre-germinated paddy seeds into puddled wetlands. Ensures uniform plant spacing of 20cm row-to-row with minimal pulling effort.",
    subCategorySlug: "manual-seeder",
    photos: ["barrel-seeder.webp"],
  },
  {
    name: "Animal Drawn Multi-Tyne Seed Drill",
    slug: "animal-drawn-multi-tyne-seed-drill",
    brand: "Prakash Agro",
    modelNumber: "PAT-ADSD-3T",
    shortDescription: "Traditional bullock-drawn 3-tyne seed and fertilizer drill with fluted cups.",
    description: "Traditional implement with wooden beam and steel frame. Equipped with seed and fertilizer hoppers, gravity drop tubes, and reversible furrow opener tynes.",
    subCategorySlug: "animal-drawn-seed-drill",
    photos: ["animal-dran-seed.jpeg", "animal-drawn-seed-drill.jpeg"],
  },
  {
    name: "Mini Tractor Seed Drill & Planter (5 & 7 Tyne)",
    slug: "mini-tractor-seed-drill-planter",
    brand: "Prakash Agro",
    modelNumber: "PAT-MTSD-7T",
    shortDescription: "Compact seed cum fertilizer drill designed for 15HP - 30HP orchard and compact tractors.",
    description: "Engineered specifically for mini tractors. Separate seed and fertilizer boxes with metering fluted rollers driven by ground traction wheel. Ideal for soybean, wheat, grams, and maize.",
    subCategorySlug: "mini-tractor-seed-drill-planters",
    photos: ["min-rractpor-planter.jpg", "mini-tractor-seede-planter.jpeg"],
  },
  {
    name: "Tractor Drawn Automatic Seed Cum Fertilizer Drill (9 & 11 Tyne)",
    slug: "tractor-drawn-automatic-seed-drill-planter",
    brand: "Prakash Agro",
    modelNumber: "PAT-TSD-9T",
    shortDescription: "Heavy-duty 9 & 11 tyne tractor drawn seed drill with individual depth adjustment.",
    description: "Dual hopper seed cum fertilizer drill with transparent drop pipes, heavy chain drive, and adjustable seed rate control levers. Ensures exact seeding depth and uniform germination.",
    subCategorySlug: "tractor-drawn-seed-drill-planters",
    photos: ["planter-in.jpeg", "planter-inside.jpeg", "tractor-drawn-seed-planter.jpeg", "seed-drill-9-tyne.jpeg"],
    featured: true,
  },
  {
    name: "Automatic 2-Row Potato & Ginger/Turmeric Planter",
    slug: "automatic-2-row-potato-turmeric-planter",
    brand: "Prakash Agro",
    modelNumber: "PAT-PTP-2R",
    shortDescription: "Tractor mounted automatic cup-chain potato and rhizome planter with ridging discs.",
    description: "Combines furrow opening, cup-elevator seed placement, fertilizer dropping, and ridge bed closing in one continuous pass. Prevents seed tuber damage with rubberized pickup cups.",
    subCategorySlug: "potato-turmeric-planters",
    photos: ["potato-planter-automatic.jpg", "ginger-termaric-planter.jpg"],
    featured: true,
  },
  {
    name: "Rohit 4-Row Tractor Drawn Inclined Plate Maize Planter",
    slug: "rohit-4-row-drawn-maize-planter",
    brand: "Rohit Krushi",
    modelNumber: "RK-MP-4R",
    shortDescription: "Precision inclined-plate maize and corn planter for perfect seed-to-seed spacing.",
    description: "Features inclined cell plates calibrated for maize, cotton, and groundnut seeds. Delivers zero seed breakage, accurate spacing, and uniform plant population per acre.",
    subCategorySlug: "maize-planters",
    photos: ["rohit-4-row-drawn-maze-planter.jpg"],
    featured: true,
  },
  {
    name: "Special Multi-Row Precision Onion Planter",
    slug: "special-multi-row-precision-onion-planter",
    brand: "Prakash Agro",
    modelNumber: "PAT-OP-6R",
    shortDescription: "Specialized precision planter for onion sets, garlic cloves, and pelleted onion seeds.",
    description: "Features multi-row high-density planting mechanism designed to meet the precise shallow depth and close spacing requirements of onion bulbs and garlic cloves.",
    subCategorySlug: "onion-planters",
    photos: ["special-onion-planter.webp"],
  },
  {
    name: "4-Row Tractor Drawn BBF (Broad Bed Furrow) Planter",
    slug: "4-row-tractor-drawn-bbf-planter",
    brand: "Prakash Agro",
    modelNumber: "PAT-BBF-4R",
    shortDescription: "Broad Bed and Furrow (BBF) machine for in-situ soil moisture conservation in rainfed crops.",
    description: "Forms raised broad beds with side drainage furrows while planting 4 rows of seeds simultaneously. Prevents waterlogging during heavy rains and conserves moisture during drought.",
    subCategorySlug: "broad-bed-furrow-planters",
    photos: ["4-row-tractor-drawn-bbf-planter.png", "bbf-planter.jpg"],
    featured: true,
  },
  {
    name: "Kishan High-Speed Multi-Crop Precision Seed Cum Fertilizer Planter",
    slug: "kishan-high-speed-multicrop-precision-planter",
    brand: "Kishan / Prakash Agro",
    modelNumber: "KSH-HSP-9T",
    shortDescription: "High-speed multicrop planter with precision ground-drive metering system.",
    description: "Engineered for rapid field coverage up to 8 km/h without skipping seeds. Capable of sowing soybean, wheat, chickpea, mustard, groundnut, and sunflower with unmatched accuracy.",
    subCategorySlug: "multicrop-precision-seed-cum-fertilizer-planter",
    photos: ["hi-speed-seed-planter.jpg", "kishan-seed-cum-fertilizer-drill-machine-500x500.webp", "agricultural-seed-drill-high-speed.png"],
    featured: true,
  },
  {
    name: "Zero-Till Direct Seeded Rice (DSR) & Wheat Drill",
    slug: "zero-till-dsr-seed-drill",
    brand: "Prakash Agro",
    modelNumber: "PAT-ZTD-9T",
    shortDescription: "Inverted T-type opener zero-till drill for direct sowing into crop stubble without tillage.",
    description: "Directly sows rice, wheat, and pulses into untilled fields with standing crop residue. Saves up to ₹3,000 per acre in tillage fuel costs and conserves natural soil moisture.",
    subCategorySlug: "zero-till-drill-dsr",
    photos: ["zero-till-drill.png", "agricultural-zero-dsr-drill-500x500.webp", "agricultural-seed-drill-dsr.jpg"],
    featured: true,
  },
  {
    name: "Maschio Gaspardo SP 2-Row & 4-Row Vacuum Precision Pneumatic Planter",
    slug: "maschio-gaspardo-sp-vacuum-precision-pneumatic-planter",
    brand: "Maschio Gaspardo",
    modelNumber: "MG-SP-4R",
    shortDescription: "World-class Italian pneumatic vacuum precision planter for maize, cotton, sunflower, and soybean.",
    description: "Features PTO-driven vacuum fan creating negative pressure in the seed selector disc. Delivers singulation of every single seed with zero double drops and zero skips even at higher operating speeds.",
    subCategorySlug: "pneumatic-planter",
    photos: [
      "maschiogaspardopneumaticplantervacuumprecisionsp4rows.webp",
      "maschio-sp-2-rows-vacuum-precision-planter.jpg",
      "maschio-sp-2-rows-vacuum-precision-planter-1.jpg",
      "pneumatic-planter-4-row.webp",
      "pneumatic-planter-mg.jpg"
    ],
    featured: true,
  },
  {
    name: "Multi-Crop Raised Bed Planter with Shaper Attachment",
    slug: "multi-crop-raised-bed-planter-shaper",
    brand: "Prakash Agro",
    modelNumber: "PAT-RBP-3R",
    shortDescription: "Form, fertilize, and seed on raised beds in a single fuel-efficient pass.",
    description: "Equipped with front bedding wings, top soil shaper, seed hopper with fluted rollers, and press wheels. Ideal for maize, soybean, groundnut, and vegetable crops.",
    subCategorySlug: "raised-bed-planters",
    photos: ["multi-crop-raised-bed-planter.jpg"],
  },

  // ==========================================
  // PLANT PROTECTION
  // ==========================================
  {
    name: "16L Manual Knapsack Continuous Pressure Sprayer",
    slug: "16l-manual-knapsack-continuous-pressure-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-KS-16M",
    shortDescription: "High-grade virgin polypropylene 16L manual knapsack sprayer with brass lance.",
    description: "Ergonomic tank with leak-proof internal piston pump, comfortable shoulder straps, and stainless steel lance with adjustable brass spray nozzle.",
    subCategorySlug: "manual-sprayers",
    photos: ["manual-sprayer.jpeg", "manual-spry.jpeg", "manual-spry1.webp"],
  },
  {
    name: "16L Solar-Powered Hybrid Knapsack Battery Sprayer",
    slug: "solar-powered-16l-knapsack-battery-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-SLS-16L",
    shortDescription: "12V 12Ah battery sprayer with detachable 40W monocrystalline solar panel charger.",
    description: "Recharges in the field using natural sunlight or standard AC adapter. High pressure 100 PSI auto-cutoff micro diaphragm pump provides up to 8 hours of uninterrupted spraying.",
    subCategorySlug: "solar-sprayers",
    photos: [
      "agriculture-solar-sprayer-2019290065-mg6ohs9r.avif",
      "solar-agriculture-sprayer-500x500.webp",
      "solar-sprayer-500x500.webp"
    ],
    featured: true,
  },
  {
    name: "2-Stroke & 4-Stroke Heavy-Duty Petrol Knapsack Power Sprayer (25L)",
    slug: "25l-petrol-engine-knapsack-power-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-PS-25L",
    shortDescription: "25L petrol engine power sprayer delivering 30 bar pressure for tall crop orchards.",
    description: "Equipped with brass heavy-duty reciprocating plunger pump and 26cc / 35cc engine. Produces fine atomized mist reaching up to 35 feet high for fruit trees, cotton, and plantations.",
    subCategorySlug: "knapsack-sprayers",
    photos: ["2-stroke-knapsack-sprayer.jpeg", "4-stroke-knapsack-sprayer.webp"],
    featured: true,
  },
  {
    name: "20L Dual-Motor High-Pressure Battery Knapsack Sprayer",
    slug: "20l-dual-motor-high-pressure-battery-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-BS-20DM",
    shortDescription: "Double motor 12V 14Ah heavy duty battery sprayer delivering up to 130 PSI pressure.",
    description: "Dual motor control switches allow single motor operation for low spray or dual motor engagement for massive high-volume misting. Includes telescopic lance and 4 nozzle set.",
    subCategorySlug: "battery-sprayers",
    photos: ["20-liters-battery-sprayer.webp", "duble-battery-sprayer.webp"],
    featured: true,
  },
  {
    name: "KisanKraft / Prakash Agro Petrol Mist Duster & Blower Sprayer",
    slug: "petrol-engine-mist-duster-blower-sprayer",
    brand: "KisanKraft / Prakash Agro",
    modelNumber: "KK-MDS-11L",
    shortDescription: "High-volume air-assisted mist blower and chemical powder duster (14L / 20L tank).",
    description: "Combines powerful 2-stroke engine with high-velocity blower fan. Blows ultra-fine liquid droplets or dry sulfur powder up to 12 meters horizontal distance for pest outbreak control.",
    subCategorySlug: "mist-blowers",
    photos: [
      "agriculture-mist-duster-sprayer-kk-mds-11-l.png",
      "mist-blowers-1.jpeg",
      "mist-blowers22.png",
      "mist-blower.jpg"
    ],
    featured: true,
  },
  {
    name: "Honda H3520 GX35 4-Stroke 25L Motorised Knapsack Sprayer",
    slug: "honda-h3520-motorised-knapsack-sprayer-gx35",
    brand: "Honda",
    modelNumber: "H3520-GX35",
    shortDescription: "Genuine Honda GX35 OHC 4-stroke engine power sprayer with heavy brass plunger pump.",
    description: "Powered by legendary Honda GX35 commercial mini 4-stroke engine. Super quiet, easy recoil pull start, zero petrol-oil mixing hassle, and high reliability for commercial spraying contractors.",
    subCategorySlug: "knapsack-sprayer-honda-engine",
    photos: ["honda-h3520-motorised-knapsack-sprayer.png", "honda-backpack-sprayer.jpg"],
    featured: true,
  },
  {
    name: "Heavy Duty Triplex HTP Horizontal Power Sprayer Unit",
    slug: "heavy-duty-triplex-htp-power-sprayer-honda",
    brand: "Prakash Agro / Honda",
    modelNumber: "PAT-HTP-50",
    shortDescription: "Triple piston ceramic-coated HTP power sprayer pump with engine / motor mount.",
    description: "Delivers up to 50 L/min discharge and 40 bar pressure for orchards, mango groves, coconut palms, and long-hose field spraying. Can run up to 4 spray guns simultaneously.",
    subCategorySlug: "htp-sprayers",
    photos: ["htp-sprayers-honda.png", "htp-sprayers-1.jpeg", "htp-sprayers-hon1.png"],
    featured: true,
  },
  {
    name: "Tractor 3-Point Linkage Mounted PTO Sprayer (400L - 600L)",
    slug: "tractor-3-point-mounted-pto-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-TMS-400L",
    shortDescription: "Tractor PTO-driven heavy polyethylene tank sprayer with multi-way chemical filter.",
    description: "Features PTO shaft drive, heavy-duty suction filter, bypass agitator to keep chemicals suspended, and high-pressure hose reel mounting. Ideal for cotton, chilli, and orchard spraying.",
    subCategorySlug: "tractor-mounted-sprayers",
    photos: ["tractor-mounted-sprayers-1.jpeg", "tractor-mounted-sprayers-boom.jpeg"],
  },
  {
    name: "Tractor Mounted 300L - 500L Folding Boom Sprayer",
    slug: "tractor-mounted-300l-boom-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-BS-300L",
    shortDescription: "10-meter folding boom sprayer with anti-drip nozzle bodies and high-volume diaphragm pump.",
    description: "Covers large acreage quickly and uniformly. Features spring-loaded breakaway boom ends, height-adjustable boom rack, and Italian anti-drip teejet nozzle assemblies.",
    subCategorySlug: "300l-sprayers",
    photos: ["boomtractor-mounted-sprayers.jpeg", "tractor-mounted-sprayers-boom.jpeg"],
    featured: true,
  },
  {
    name: "High Ground Clearance Self-Propelled 4WD Boom Sprayer (50HP)",
    slug: "high-ground-clearance-self-propelled-boom-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-SPBS-50HP",
    shortDescription: "Commercial self-propelled boom sprayer with 1.2m crop clearance and hydraulic boom lift.",
    description: "State-of-the-art agricultural spraying technology with high ground clearance to drive over mature cotton, sugarcane, maize, and paddy without damaging crops. 12m wide hydraulic boom.",
    subCategorySlug: "self-propelled-boom-sprayers",
    photos: ["high-ground-clearance-self-propelled-boom-sprayer-with-50hp-engine.avif"],
    featured: true,
  },
  {
    name: "Tractor Trailed 1000L - 2000L Field & Orchard Tank Sprayer",
    slug: "tractor-trailed-field-orchard-tank-sprayer",
    brand: "Prakash Agro",
    modelNumber: "PAT-TTS-1000L",
    shortDescription: "Heavy-duty trailer chassis sprayer with high-capacity polyethylene chemical tank.",
    description: "Heavy axle and flotation agricultural tyres for wet soil conditions. Equipped with PTO driven diaphragm pump and twin hose reel assemblies for commercial orchard spraying.",
    subCategorySlug: "tank-sprayers",
    photos: ["tractor-trailer-sprayers.jpg", "tractor-mounted-sprayer-tanks-512.jpg"],
  },
  {
    name: "Tractor PTO Cone Fertilizer Broadcaster (400 Litres)",
    slug: "tractor-pto-fertilizer-broadcaster-spreader",
    brand: "Prakash Agro",
    modelNumber: "PAT-FB-400L",
    shortDescription: "Cone-type tractor PTO fertilizer spreader with adjustable spread pattern (12 - 14 meters).",
    description: "Spreads granular urea, DAP, potash, and grass seeds evenly. High-density UV-proof poly hopper with stainless steel spreading disc and directional broadcast vanes.",
    subCategorySlug: "fertilizer-spreaders",
    photos: ["fertilizer-broadcaster-400-ltr-image-7.png", "fertilizer-spreaders-1.webp", "fertilizer-spreaders-11.jpeg"],
  },

  // ==========================================
  // WEEDING
  // ==========================================
  {
    name: "Manual Wheel Hoe Single & Double Wheel Farm Weeder",
    slug: "manual-wheel-hoe-single-double-wheel-weeder",
    brand: "Prakash Agro",
    modelNumber: "PAT-WH-02",
    shortDescription: "Ergonomic manual push wheel hoe with reversible V-blade, trenching plough, and rake tines.",
    description: "Lightweight and easy to push between crop rows. Uproots weeds and loosens soil crust for aerating vegetable beds without bending or back strain.",
    subCategorySlug: "manual-weeders",
    photos: [
      "baby-weed.webp",
      "baby-weeder.jpeg",
      "manual-weeders-1.jpg",
      "manual-weeders-2.webp",
      "manual-weeders-3.webp",
      "manual-wheel-hoe-weeder-3.avif"
    ],
  },
  {
    name: "Single Wheel Heavy Duty Cycle Weeder",
    slug: "single-wheel-heavy-duty-cycle-weeder",
    brand: "Prakash Agro",
    modelNumber: "PAT-CW-01",
    shortDescription: "Cycle wheel push weeder with height-adjustable handlebars and hardened sweep blade.",
    description: "Designed for Indian smallholders. Uses standard bicycle wheel geometry with adjustable ground clearance to eliminate weeds between cotton, chilli, turmeric, and vegetable lines.",
    subCategorySlug: "cycle-weeders",
    photos: ["cycle-weeder.jpeg"],
  },
  {
    name: "Twin Rotor Cono Weeder for SRI Wetland Paddy",
    slug: "twin-rotor-cono-weeder-paddy",
    brand: "Prakash Agro",
    modelNumber: "PAT-CW-PADDY",
    shortDescription: "Twin serrated conical rollers that churn weeds into wetland mud as green manure.",
    description: "Indispensable tool for the System of Rice Intensification (SRI). Incorporates weeds beneath the soil surface, aerates roots, and promotes extensive tillering in wetland paddy fields.",
    subCategorySlug: "kono-weeders",
    photos: ["cono-weeders.webp"],
  },
  {
    name: "2-Row Motorised Wetland Paddy Weeder",
    slug: "motorised-multi-row-wet-field-paddy-weeder",
    brand: "Prakash Agro",
    modelNumber: "PAT-PW-2R",
    shortDescription: "Engine-powered 2-row wetland paddy weeder with float ski and rotary weeding fingers.",
    description: "Powered by lightweight 2-stroke petrol engine. Skims effortlessly across waterlogged paddy mud, weeding 2 rows simultaneously and completing 1 acre in less than 3 hours.",
    subCategorySlug: "paddy-weeders",
    photos: ["paddy-weeders-2-row.avif"],
    featured: true,
  },
  {
    name: "Honda FJ500 5.5HP Multi-Speed Petrol Power Weeder",
    slug: "honda-fj500-multi-speed-petrol-power-weeder",
    brand: "Honda",
    modelNumber: "FJ500",
    shortDescription: "Premium Honda GX160 engine power tiller with 2 forward + 1 reverse gears.",
    description: "Equipped with adjustable rotary blades, steering clutch, and sturdy oil-bath transmission. Widely acclaimed for effortless maneuverability in sugarcane, orchards, and vegetable plots.",
    subCategorySlug: "weeders",
    photos: ["honda-fj500-power-weeder-500x500.webp", "power-weeder-hon.jpg"],
    featured: true,
  },
  {
    name: "7HP Heavy-Duty Multi-Speed Petrol / Diesel Power Weeder",
    slug: "7hp-heavy-duty-multi-speed-petrol-power-weeder",
    brand: "Prakash Agro",
    modelNumber: "PAT-PW-7HP",
    shortDescription: "Commercial 7HP power weeder with PTO shaft, heavy rotor tines, and ditcher blade.",
    description: "Robust gear-driven powertrain with heavy cast iron gearbox, pneumatic traction tyres, and multi-width tilling blades (24 to 36 inches). Compatible with ditchers and water pumps.",
    subCategorySlug: "weeders",
    photos: ["power-weeder-1.jpeg", "power-weeder-3.webp", "power-weeder-300.jpg", "power-weeder-650.jpeg", "power-weeder.jpg"],
    featured: true,
  },
  {
    name: "Shrachi 15HP Water-Cooled Diesel Power Tiller / Walking Tractor",
    slug: "shrachi-15hp-water-cooled-diesel-power-tiller",
    brand: "Shrachi",
    modelNumber: "SHR-15HP",
    shortDescription: "Heavy-duty 15HP diesel walking tractor with rotary tiller and operator ride seat.",
    description: "Water-cooled single cylinder direct injection diesel engine. Handles wetland puddling, dryland ploughing, ridging, and trailer haulage. Built for continuous multi-hour farm duties.",
    subCategorySlug: "mini-tillers",
    photos: [
      "shrachi-15hp-power-tiller-diesel-water-cooled-walking-tractor-2235948398-27kb26xn.avif",
      "shrachi-power-tiller15.jpg",
      "power-tiller-13.jpeg",
      "mini-tillers-baby-weeder.jpg"
    ],
    featured: true,
  },
  {
    name: "Honda 4-Stroke Backpack Brush Cutter & Multi-Crop Harvester",
    slug: "honda-umr435t-4-stroke-backpack-brush-cutter",
    brand: "Honda",
    modelNumber: "UMR435T",
    shortDescription: "Genuine Honda GX35 4-stroke backpack brush cutter with 80T crop harvesting blade.",
    description: "Comfortable backpack vibration-isolated harness. Slices cleanly through dense brush, grass, and standing crops like paddy, wheat, pulses, and fodder with zero back fatigue.",
    subCategorySlug: "brush-cutters",
    photos: ["honda-brush-cutters.jpeg", "brush-cutters-honda.jpg"],
    featured: true,
  },
  {
    name: "Heavy-Duty 2-Stroke Side-Pack Commercial Brush Cutter (45cc)",
    slug: "4-stroke-heavy-duty-side-pack-brush-cutter",
    brand: "Prakash Agro",
    modelNumber: "PAT-BC-450",
    shortDescription: "High-torque 45cc commercial brush cutter with heavy-duty solid drive shaft and alloy head.",
    description: "Delivers maximum cutting speed for overgrown pastures, roadside vegetation, and thorny weeds. Includes 3T grass blade, 80T carbide saw blade, and nylon tap-and-go head.",
    subCategorySlug: "brush-cutters",
    photos: ["brush-cutters-2st.png", "brush-cutters-450.png"],
  },
  {
    name: "Heavy-Duty Tractor Rotary Slasher / Pasture Topper (5ft - 6ft)",
    slug: "heavy-duty-tractor-rotary-slasher-pasture-topper",
    brand: "Prakash Agro",
    modelNumber: "PAT-RS-6FT",
    shortDescription: "PTO driven pasture topper and heavy weed slasher with forged swinging steel blades.",
    description: "Cuts down dense shrubs, thorny bushes, elephant grass, and stubble. Features heavy-duty bevel gearbox, slip clutch PTO protection, and rear safety chain curtains.",
    subCategorySlug: "slashers",
    photos: ["slashers-1.jpeg"],
  },
  {
    name: "Maschio Gaspardo Terminator 160 Heavy-Duty Flail Mulcher",
    slug: "maschio-gaspardo-terminator-160-mulcher",
    brand: "Maschio Gaspardo",
    modelNumber: "MG-TERM-160",
    shortDescription: "Italian engineering flail mulcher for shredding heavy crop residue, orchard prunings, and grass.",
    description: "Equipped with heavy hammer flails that shred maize stalks, cotton stalks, sugarcane trash, and orchard clippings into organic ground mulch, returning organic carbon back to the soil.",
    subCategorySlug: "mulchers",
    photos: [
      "maschio-gaspardo-terminator-160-mulcher.jpg",
      "rotary-mulcherjaysan.jpg",
      "mulcher-500x500.webp",
      "mulchers-mg.jpeg",
      "mulchers.webp"
    ],
    featured: true,
  },

  // ==========================================
  // CROP HARVESTING
  // ==========================================
  {
    name: "High-Carbon Manganese Steel Oil Palm & Crop Harvesting Sickle",
    slug: "high-carbon-manganese-oil-palm-sickle",
    brand: "Prakash Agro",
    modelNumber: "PAT-OPS-M7",
    shortDescription: "Razor-sharp curved sickle blade forged from premium manganese spring steel.",
    description: "Maintains razor sharpness under continuous cutting of tough oil palm fruit bunch stems and tall crops. Fits standard aluminium and carbon fiber telescopic extension poles.",
    subCategorySlug: "sickle",
    photos: [
      "harvesting-oil-palm-sickle-e1529937594488.jpg",
      "sickle-palm-1.jpg",
      "sickle-palm-11.jpg",
      "sickle-palm-cutter.avif",
      "sickle-palm.jpg"
    ],
  },
  {
    name: "Forged Steel Oil Palm Chisel Harvester",
    slug: "forged-steel-oil-palm-chisel-harvester",
    brand: "Prakash Agro",
    modelNumber: "PAT-OPC-01",
    shortDescription: "Ultra-durable straight-edge chisel for harvesting young palms and pruning fronds.",
    description: "Heat-treated heavy socket chisel designed for forceful upward thrusting cuts. Makes clean cuts without bruising palm trunks or frond bases.",
    subCategorySlug: "chisels-for-palm-oil",
    photos: ["sickle-palm-cutter.avif", "sickle-palm-1.jpg"],
  },
  {
    name: "Ultra-Light 50FT / 60FT / 70FT Rigid Carbon Fiber Harvesting Pole",
    slug: "ultra-light-carbon-fiber-telescopic-harvesting-pole",
    brand: "Prakash Agro",
    modelNumber: "PAT-CFP-60FT",
    shortDescription: "High-modulus carbon fiber extension pole for harvesting tall oil palms without bending.",
    description: "Weighs up to 60% less than aluminium poles while maintaining rigid stiffness at extreme heights of up to 70 feet. Quick-lock clamps permit swift length adjustment in seconds.",
    subCategorySlug: "telescopic-pole-carbon",
    photos: ["buy-70ft-60ft-50ft-rigid-carbon-fiber-extension-pole.avif", "teliscopics-pole-carbon.jpeg"],
    featured: true,
  },
  {
    name: "3-Stage Heavy Duty Aluminium Telescopic Extension Pole (15FT - 30FT)",
    slug: "3-stage-heavy-duty-aluminium-telescopic-pole",
    brand: "Prakash Agro",
    modelNumber: "PAT-ATP-30FT",
    shortDescription: "Anodized corrosion-resistant ribbed aluminium pole with secure cam-lock collars.",
    description: "Durable telescopic pole designed for daily plantation use. Compatible with pruning saws, fruit pickers, and oil palm sickles.",
    subCategorySlug: "aluminium-poles",
    photos: ["3-stage-telescopic-poles-211.jpg", "aluminium-poles-1.jpeg", "aluminium-poles.jpeg"],
  },
  {
    name: "Compact Diesel Walking Mini Combine Harvester",
    slug: "compact-diesel-walking-mini-combine-harvester",
    brand: "Prakash Agro",
    modelNumber: "PAT-MCH-DIESEL",
    shortDescription: "Single-cylinder diesel walking mini combine harvester for small terraced plots.",
    description: "Performs reaping, threshing, and grain bagging in a single pass. Ideal for hilly terrains, small paddy holdings, and areas inaccessible to large tractor combines.",
    subCategorySlug: "mini-harvesters",
    photos: ["diesel-multi-crop-harvesting-machine.webp", "mini-harvesters.webp"],
    featured: true,
  },
  {
    name: "Self-Propelled Walk-Behind Crop Reaper & Binder",
    slug: "self-propelled-walk-behind-crop-reaper-binder",
    brand: "Prakash Agro",
    modelNumber: "PAT-RB-880",
    shortDescription: "Cuts and automatically binds paddy, wheat, and sesame crops into neat bundles.",
    description: "Powered by 6HP petrol/diesel engine with cutter bar and automatic twine knotting mechanism. Reaps up to 1 acre per hour, eliminating manual sickle harvesting labor.",
    subCategorySlug: "rippers",
    photos: ["power-reaper-880.jpg", "rippers-cam.jpeg"],
    featured: true,
  },
  {
    name: "Tractor Front-Mounted Multi-Row Crop Reaper",
    slug: "tractor-front-mounted-crop-reaper",
    brand: "Prakash Agro",
    modelNumber: "PAT-TMR-4R",
    shortDescription: "Tractor front-mounted crop reaper with side conveyor belt delivery.",
    description: "Mounts directly to front tractor bumper with PTO drive pulley. Gently lays reaped cereal crops in uniform windrows for easy bundling and gathering.",
    subCategorySlug: "tractor-mounted-rippers",
    photos: ["tractor-mounted-rieppers.webp"],
  },
  {
    name: "Multi-Row Tractor PTO Silage & Green Forage Harvester",
    slug: "multi-row-tractor-pto-silage-forage-harvester",
    brand: "Prakash Agro",
    modelNumber: "PAT-SFH-MULTI",
    shortDescription: "High-capacity silage chopper and forage harvester with 360-degree discharge chute.",
    description: "Harvests maize, sorghum, and Napier grass directly into trailing silage wagons. Heavy flywheel with hardened tungsten blades delivers uniform fine chop length for high-quality silage.",
    subCategorySlug: "tractor-mounted-harvesters",
    photos: ["forage-harvester-1.jpeg", "forage-harvester.jpeg", "silage-forage-harvesters-multirow-376475353-n41lh.avif", "shedders-forage-harvester.jpg"],
    featured: true,
  },
  {
    name: "Full-Feed Rubber Track Crawler Combine Harvester with HST",
    slug: "rubber-track-crawler-combine-harvester-hst",
    brand: "GAM / Prakash Agro",
    modelNumber: "GAM-CCH-2200",
    shortDescription: "2.2m cutting width rubber-track combine harvester with hydrostatic (HST) transmission.",
    description: "Traverses marshy, waterlogged, and lodged wetland paddy fields without sinking. Features high-capacity threshing cylinder, vibrating clean screen, and high unloading grain auger.",
    subCategorySlug: "track-harvesters",
    photos: [
      "gam-crawler-combine-harvester-2200mm-cutting-width-hst-transmission-rubber-tracked-2242206656-mus3n4bw.avif",
      "track-harvesters.png"
    ],
    featured: true,
  },

  // ==========================================
  // POST HARVESTING
  // ==========================================
  {
    name: "Continuous Grain & Paddy Cleaner with Winnowing Blower",
    slug: "continuous-grain-paddy-cleaner-winnowing-fan",
    brand: "Prakash Agro",
    modelNumber: "PAT-WFC-192",
    shortDescription: "Dual-sieve motorized winnower and grain cleaner for paddy, wheat, pulses, and millets.",
    description: "Separates chaff, dust, immature grains, and heavy stones. Fitted with adjustable air-flow blower fan, vibrating deck sieves, and electric motor / hand crank drive options.",
    subCategorySlug: "winnowing-fan",
    photos: ["agriculture-winnowing-fan-192.jpg", "winnowing-fan.jpg", "paddy-cl.jpeg", "paddy-clean.jpeg"],
  },
  {
    name: "Tractor PTO Multi-Crop High-Yield Thresher",
    slug: "tractor-pto-multi-crop-high-yield-thresher",
    brand: "Prakash Agro",
    modelNumber: "PAT-MCT-PRO",
    shortDescription: "Multi-crop thresher for wheat, paddy, soybean, mustard, grams, and millets.",
    description: "High-capacity spike-tooth and beater cylinder system. Delivers clean grain output with zero cracking and throws clean straw (bhusa) directly into tractor trailers or storage heaps.",
    subCategorySlug: "multi-threshers",
    photos: ["multi-threshers.webp", "mobile-dryer-resize.jpg", "mobile-paddy-dryer-emd-200-500x500.webp", "mobile-paddy.jpg"],
    featured: true,
  },
  {
    name: "Heavy-Duty Electric & PTO Maize Corn Sheller",
    slug: "heavy-duty-electric-pto-maize-corn-sheller",
    brand: "Prakash Agro",
    modelNumber: "PAT-MCS-5T",
    shortDescription: "High-output maize cob sheller separating kernels with zero seed damage.",
    description: "Capable of shelling up to 5 tons of maize cobs per hour. Features high-speed threshing rotor, blower fan for husk removal, and dual discharge chutes.",
    subCategorySlug: "maize-shellers",
    photos: ["maize-dehuskar-cum-sheller.jpg", "mobile-maize-dryer-500x500.webp"],
  },
  {
    name: "Amar Heavy-Duty Maize Dehusker & Thresher with Conveyor Lift",
    slug: "amar-maize-dehusker-thresher-conveyor-lift",
    brand: "Amar",
    modelNumber: "AMAR-MDT-ELEV",
    shortDescription: "Complete maize dehusking and threshing unit with continuous hydraulic elevator conveyor.",
    description: "Feeds whole unshelled maize cobs directly with husk intact. Automatically strips outer husks, threshes clean kernels, and elevates grain into bulk transport bags.",
    subCategorySlug: "maize-dehusker",
    photos: ["amar-maize-dehusker-thresher-conveyor-lift-model-500x500.webp", "maize-dehusker-cum-sheller-elevator-model-500x500.webp"],
    featured: true,
  },
  {
    name: "Mahindra / Commercial High-Output Groundnut Pod Thresher",
    slug: "mahindra-commercial-groundnut-pod-thresher",
    brand: "Mahindra / Prakash Agro",
    modelNumber: "MHD-GNT-170",
    shortDescription: "Commercial groundnut pod thresher and cleaner with gentle stripping drums.",
    description: "Specially engineered rubberized beaters strip groundnut pods from dried haulms without cracking delicate shells. Leaves clean fodder vines and clean bagged groundnut pods.",
    subCategorySlug: "groundnut-thresher",
    photos: ["1705918775groundnut-thresher.jpg", "mahindra-groundnut-thresher.jpg"],
    featured: true,
  },
  {
    name: "Commercial Tractor PTO Organic Compost & Manure Spreader",
    slug: "commercial-tractor-pto-compost-manure-spreader",
    brand: "Prakash Agro",
    modelNumber: "PAT-CMS-4T",
    shortDescription: "Heavy-duty farmyard manure (FYM), compost, and lime spreader trailer.",
    description: "Floor chain conveyor feeds manure to rear twin high-speed shredding beaters. Provides wide, even coverage of organic amendments across open fields and orchards.",
    subCategorySlug: "spreaders",
    photos: ["compost-spreaders.jpg"],
  },
  {
    name: "Jaysan JRB-310 / JRB-312 Heavy-Duty Tractor Round Straw Baler",
    slug: "jaysan-heavy-duty-tractor-round-straw-baler",
    brand: "Jaysan",
    modelNumber: "JRB-310",
    shortDescription: "High-density tractor mini round baler for paddy straw, wheat stubble, and hay.",
    description: "Picks up loose crop residue directly from windrows, compresses it into dense cylindrical bales, and wraps it tightly with twine. Solves stubble burning while generating fodder revenue.",
    subCategorySlug: "round-balers",
    photos: ["round-straw-baler-jrb310.jpg", "jaysan-round-baler.jpg", "round-straw-baler-jrb312.jpg"],
    featured: true,
  },
  {
    name: "Shaktiman 4-Wheel Trailed Finger Wheel Hay Rake",
    slug: "shaktiman-4-wheel-trailed-hay-rake",
    brand: "Shaktiman",
    modelNumber: "SHAKTI-HR-4W",
    shortDescription: "Ground-driven 4-wheel finger rake for gently inverting and windrowing hay and straw.",
    description: "Floating finger wheels follow ground contours without digging dirt into fodder. Gathers wide swaths of sun-dried hay or straw into tidy, uniform windrows for rapid baling.",
    subCategorySlug: "hay-rake",
    photos: ["shaktiman-hay-rake-wheel-type-4-image-2.png", "hay-rake-jaysan.webp", "hey-rake.jpeg"],
    featured: true,
  },
  {
    name: "Mahindra / Jaysan Tractor PTO Crop Residue Shredder & Pulverizer",
    slug: "tractor-pto-crop-residue-shredder-pulverizer",
    brand: "Mahindra / Jaysan",
    modelNumber: "MHD-SHRED-PRO",
    shortDescription: "Heavy duty tractor PTO shredder with high-speed rotor and reversible cutting hammers.",
    description: "Rapidly shreds tough cotton stalks, coconut fronds, maize stubble, and sugarcane trash into fine organic mulch directly in the field for fast natural decomposition.",
    subCategorySlug: "shredders",
    photos: ["jaysan-shredder-2216986991-u4ejs5tg.avif", "mahindra-shredder-500x500.webp", "static-shredder-12-blade-19-1754902111.webp", "shedders.jpeg"],
    featured: true,
  },

  // ==========================================
  // GARDEN / EARTH AUGERS
  // ==========================================
  {
    name: "Commercial Heavy-Duty Trolley Stand Earth Auger (63cc)",
    slug: "commercial-heavy-duty-trolley-stand-earth-auger",
    brand: "Prakash Agro",
    modelNumber: "PAT-BE-63T",
    shortDescription: "63cc petrol earth auger mounted on two-wheel mobility trolley with 8\" & 10\" bits.",
    description: "Wheel trolley design eliminates operator lifting strain. Drills clean post holes for fencing, tree plantation, vineyard stakes, and solar panel foundation pillars in seconds.",
    subCategorySlug: "earth-augers",
    photos: ["earth-augar.webp", "trolly-earth-auger-machine-be-63t.jpg", "trolley-stand-auger-173.webp"],
    featured: true,
  },
];

// Main Category Banner Image Mapping
const MAIN_CATEGORY_BANNERS: Record<string, string> = {
  "land-preparation": "/website-photos/agricultural-machinery-rotary-tiller-tractor-rotovator.avif",
  "sowing-planting": "/website-photos/maschiogaspardopneumaticplantervacuumprecisionsp4rows.webp",
  "plant-protection": "/website-photos/high-ground-clearance-self-propelled-boom-sprayer-with-50hp-engine.avif",
  "weeding": "/website-photos/honda-fj500-power-weeder-500x500.webp",
  "crop-harvesting": "/website-photos/gam-crawler-combine-harvester-2200mm-cutting-width-hst-transmission-rubber-tracked-2242206656-mus3n4bw.avif",
  "post-harvesting": "/website-photos/round-straw-baler-jrb310.jpg",
  "spare-parts": "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.52.09.jpeg",
};

async function main() {
  console.log("Starting database synchronization for website photos and products...");

  // 1. Fetch all categories to map slugs to IDs
  const allCategories = await prisma.category.findMany();
  const categoryMap = new Map<string, typeof allCategories[0]>();
  for (const cat of allCategories) {
    categoryMap.set(cat.slug, cat);
  }

  // 2. Update main category banner images
  for (const [mainSlug, imagePath] of Object.entries(MAIN_CATEGORY_BANNERS)) {
    const cat = categoryMap.get(mainSlug);
    if (cat) {
      await prisma.category.update({
        where: { id: cat.id },
        data: { image: imagePath },
      });
      console.log(`Updated main category banner for: ${cat.name} -> ${imagePath}`);
    }
  }

  let createdCount = 0;
  let updatedCount = 0;
  let mediaCount = 0;

  // 3. Seed / Update products with real photos
  for (const p of PRODUCTS_TO_SEED) {
    const subCat = categoryMap.get(p.subCategorySlug);
    if (!subCat) {
      console.warn(`Subcategory not found for slug: ${p.subCategorySlug} (skipping ${p.name})`);
      continue;
    }

    // Set subcategory image if currently null
    if (!subCat.image && p.photos.length > 0) {
      const primaryPhoto = `/website-photos/${p.photos[0]}`;
      await prisma.category.update({
        where: { id: subCat.id },
        data: { image: primaryPhoto },
      });
      subCat.image = primaryPhoto;
      console.log(`Set subcategory image for: ${subCat.name} -> ${primaryPhoto}`);
    }

    // Check if product exists by slug
    const existingProduct = await prisma.product.findUnique({
      where: { slug: p.slug },
      include: { media: true },
    });

    let productId: string;

    if (existingProduct) {
      // Update existing product
      await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          name: p.name,
          brand: p.brand,
          modelNumber: p.modelNumber,
          shortDescription: p.shortDescription,
          description: p.description,
          categoryId: subCat.id,
          featured: p.featured ?? false,
          published: true,
          availabilityStatus: "AVAILABLE",
          priceType: "ENQUIRY_ONLY",
        },
      });
      productId = existingProduct.id;
      updatedCount++;
      console.log(`Updated product: ${p.name}`);

      // Delete old media and replace with genuine photos
      await prisma.productMedia.deleteMany({
        where: { productId: existingProduct.id },
      });
    } else {
      // Create new product
      const newProduct = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          brand: p.brand,
          modelNumber: p.modelNumber,
          shortDescription: p.shortDescription,
          description: p.description,
          categoryId: subCat.id,
          featured: p.featured ?? false,
          published: true,
          availabilityStatus: "AVAILABLE",
          priceType: "ENQUIRY_ONLY",
          currency: "INR",
        },
      });
      productId = newProduct.id;
      createdCount++;
      console.log(`Created product: ${p.name}`);
    }

    // Create ProductMedia entries for each photo
    for (let i = 0; i < p.photos.length; i++) {
      const photoName = p.photos[i];
      const photoUrl = `/website-photos/${photoName}`;
      await prisma.productMedia.create({
        data: {
          productId,
          mediaType: "IMAGE",
          mediaUrl: photoUrl,
          altText: `${p.name} - Prakash Agri Tools LB Nagar Hyderabad`,
          displayOrder: i,
        },
      });
      mediaCount++;
    }
  }

  console.log("\n==========================================");
  console.log(`SUCCESS!`);
  console.log(`Products Created: ${createdCount}`);
  console.log(`Products Updated: ${updatedCount}`);
  console.log(`Product Media Records Attached: ${mediaCount}`);
  console.log("==========================================");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

