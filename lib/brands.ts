export interface BrandPartner {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  specialization: string;
  logo: string;
  badge: string;
  badgeColor: string;
  description: string;
  equipment: string[];
}

export const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: "rohitkrishi",
    name: "ROHITKRISHI",
    slug: "rohitkrishi",
    tagline: "Precision Agriculture & Sowing Machinery",
    specialization: "Multi-Crop Planters, Seed Drills, Vibro Sub-Soilers",
    logo: "/brands/rohitkrishi.png",
    badge: "Authorized Dealer",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    description:
      "Pioneering manufacturer of multi-crop precision planters, tractor-drawn seed drills, and high-efficiency vibro sub-soilers engineered for Indian soils.",
    equipment: ["Multi-Crop Precision Planters", "Zero-Till Seed Drills", "Vibro Sub-Soilers", "Maize Planters"],
  },
  {
    id: "really",
    name: "REALLY",
    slug: "really",
    tagline: "Power Equipment & Agricultural Machinery",
    specialization: "Power Sprayers, Brush Cutters, Engines & Tillers",
    logo: "/brands/really.png",
    badge: "Authorized Dealer",
    badgeColor: "bg-stone-100 text-stone-800 border-stone-300",
    description:
      "Durable, cost-effective agricultural power machinery, high-pressure sprayers, portable brush cutters, and 2-stroke/4-stroke utility engines.",
    equipment: ["HTP Power Sprayers", "Backpack Brush Cutters", "Mini Power Weeders", "Earth Augers"],
  },
  {
    id: "honda",
    name: "HONDA",
    slug: "honda",
    tagline: "Honda India Power Products",
    specialization: "4-Stroke Engines, Backpack Brush Cutters & Sprayers",
    logo: "/brands/honda.png",
    badge: "OEM Authorized Dealership",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    description:
      "Official dealership for genuine Honda GX35 & GX50 4-stroke engines, heavy-duty backpack brush cutters, water pumps, and high-pressure knapsack sprayers.",
    equipment: ["Honda GX35/GX50 Engines", "UMK435T Brush Cutters", "WJR4025 Sprayers", "Portable Tiller Engines"],
  },
  {
    id: "agrimate",
    name: "AGRIMATE",
    slug: "agrimate",
    tagline: "Maximum Power • Super Economy",
    specialization: "Knapsack Mist Blowers, HTP Sprayers & Power Tools",
    logo: "/brands/agrimate.png",
    badge: "Authorized Partner",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description:
      "High-power crop protection sprayers, motorized mist blowers, farm weeders, and garden power tools delivering maximum field output with superior fuel economy.",
    equipment: ["Motorised Mist Blowers", "2-Stroke/4-Stroke Knapsacks", "Battery Sprayers", "Tea Harvesters & Pruners"],
  },
  {
    id: "maschio-gaspardo",
    name: "MASCHIO GASPARDO",
    slug: "maschio-gaspardo",
    tagline: "World Leader in Tillage & Seeding Equipment",
    specialization: "Rotary Tillers, Vacuum Precision Planters & Mulchers",
    logo: "/brands/maschio-gaspardo.png",
    badge: "Authorized Partner",
    badgeColor: "bg-red-50 text-red-800 border-red-200",
    description:
      "Global manufacturer of premium heavy-duty agricultural equipment, world-renowned rotary tillers (rotavators), precision pneumatic vacuum planters, and heavy crop mulchers.",
    equipment: ["Heavy Duty Rotavators", "SP Pneumatic Vacuum Planters", "Crop Residue Mulchers", "Power Harrows"],
  },
  {
    id: "shrachi",
    name: "SHRACHI",
    slug: "shrachi",
    tagline: "Shrachi Agrimech • Khushali Hamesha",
    specialization: "15HP Power Tillers, Walking Tractors & Harvesters",
    logo: "/brands/shrachi.png",
    badge: "ISO 9001:2015 Authorized OEM",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    description:
      "Official dealership for Shrachi BTL EPC power tillers, diesel water-cooled walking tractors, mini combine harvesters, and mechanical weeders.",
    equipment: ["15HP Water-Cooled Power Tillers", "Diesel Walking Tractors", "Paddy Power Reapers", "Track Combine Harvesters"],
  },
];

export const SECONDARY_PARTNERS = [
  { name: "JAYSAN", category: "Agricultural Implements" },
  { name: "NIPHA ONEHORN", category: "Rotavators & Balers" },
  { name: "ENOCHS", category: "Farm Machinery" },
  { name: "ANNAPURNA", category: "Agricultural Equipment" },
  { name: "AMMA INDIA", category: "Manufacturers Association Member" },
];
