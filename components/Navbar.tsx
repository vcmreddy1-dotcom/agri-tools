"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MessageSquare,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Tractor,
  Layers,
  Wrench,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  Lock,
  Users,
} from "lucide-react";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export interface CategoryNavItem {
  name: string;
  slug: string;
  tagline?: string;
  subcategories: { name: string; slug: string }[];
}

export const RANGE_NAV_ITEMS: CategoryNavItem[] = [
  {
    name: "LAND PREPARATION",
    slug: "land-preparation",
    tagline: "Primary & secondary tillage, deep ploughing, and laser leveling implements",
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
    tagline: "Precision seed drilling, multicrop planters, pneumatic and zero-till DSR equipment",
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
    tagline: "Crop protection sprayers, battery knapsacks, solar units, and tractor boom sprayers",
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
    tagline: "Mechanical & motorized weed management, cycle weeders, power tillers, and shredders",
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
    tagline: "Reaping & harvesting machinery: sickles, palm chisels, carbon poles, and rippers",
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
    tagline: "Threshing, grain cleaning, balers, winnowers, and fodder chaff cutting machines",
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
    tagline: "Authentic replacement components: boron steel blades, spray nozzles, belts, and bearings",
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

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<string | null>(null);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const pathname = usePathname();

  // If in admin dashboard, render simplified or none
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const activeCategory = RANGE_NAV_ITEMS[selectedCategoryIndex] || RANGE_NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Bar */}
      <div className="bg-[#11341c] text-stone-100 py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#1b4d2e]">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 font-medium text-emerald-300">
              <Sparkles className="w-3 h-3 text-[#c5a059] shrink-0" />
              <span>Estd. {BUSINESS_INFO.establishedYear}</span>
              <span className="hidden sm:inline">• Hyderabad, Telangana</span>
            </span>
            <span className="text-stone-500">|</span>
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors font-semibold"
            >
              <Phone className="w-3 h-3 text-[#c5a059] shrink-0" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-[#1b4d2e]">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-white transition-colors p-0.5"
                title="Follow us on Facebook"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-white transition-colors p-0.5"
                title="Follow us on Instagram"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
            </div>

            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-semibold text-stone-300 hover:text-white uppercase tracking-wider transition-colors pr-2 border-r border-[#1b4d2e]"
              title="Admin Portal Login"
            >
              <Lock className="w-3 h-3 text-[#F97316]" />
              <span>PORTAL LOGIN</span>
            </Link>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#F97316] hover:bg-[#EA580C] text-white px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-sm border border-stone-200/90 group-hover:scale-105 group-hover:border-[#11341c]/40 transition-all shrink-0">
              <Image
                src="/logo-icon.png"
                alt="Prakash Agri Tools Logo"
                width={44}
                height={44}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-base sm:text-2xl font-black tracking-tight text-[#11341c] leading-none">
                PRAKASH <span className="text-[#F97316]">AGRI TOOLS</span>
              </span>
              <span className="block text-[9px] sm:text-[11px] tracking-wider uppercase font-bold text-stone-500 mt-0.5">
                Powering Agriculture • Estd. 2009
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors ${
                pathname === "/"
                  ? "text-[#F97316] font-semibold bg-orange-50/70"
                  : "text-[#1F1F1F] hover:text-[#F97316] hover:bg-stone-50"
              }`}
            >
              HOME
            </Link>

            {/* Landforce-style "OUR RANGE" Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveCategoryDropdown(true)}
              onMouseLeave={() => setActiveCategoryDropdown(false)}
            >
              <Link
                href="/products"
                className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors ${
                  pathname.startsWith("/products") || activeCategoryDropdown
                    ? "text-[#F97316] font-semibold bg-orange-50/70"
                    : "text-[#1F1F1F] hover:text-[#F97316] hover:bg-stone-50"
                }`}
              >
                <Layers className="w-4 h-4 text-[#F97316]" />
                <span>OUR RANGE</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeCategoryDropdown ? "rotate-180 text-[#F97316]" : "text-stone-400"
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel matching Landforce style */}
              {activeCategoryDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[960px] xl:w-[1040px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="flex min-h-[420px]">
                    {/* LEFT COLUMN: Main Categories List matching Landforce */}
                    <div className="w-72 bg-[#f7f5ed] border-r border-stone-200/90 p-3 space-y-1 shrink-0">
                      <div className="px-3 py-2 border-b border-stone-200/80 mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-stone-500">
                          OUR RANGE
                        </span>
                        <span className="text-[10px] text-[#F97316] font-bold">
                          {RANGE_NAV_ITEMS.length} SECTORS
                        </span>
                      </div>
                      {RANGE_NAV_ITEMS.map((cat, idx) => {
                        const isSelected = selectedCategoryIndex === idx;
                        return (
                          <button
                            key={cat.slug}
                            type="button"
                            onMouseEnter={() => setSelectedCategoryIndex(idx)}
                            onClick={() => setSelectedCategoryIndex(idx)}
                            className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#11341c] text-white shadow-md font-bold translate-x-1"
                                : "text-stone-800 hover:bg-stone-200/80 hover:text-stone-900 font-semibold"
                            }`}
                          >
                            <span>{cat.name}</span>
                            <ChevronRight
                              className={`w-4 h-4 transition-transform ${
                                isSelected ? "text-[#F97316] translate-x-0.5" : "text-stone-400"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>

                    {/* RIGHT COLUMN: Active Category Subcategories */}
                    <div className="flex-1 p-6 bg-white flex flex-col justify-between">
                      <div>
                        {/* Subcategory Header */}
                        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                          <div>
                            <h3 className="text-base font-bold text-[#1F1F1F] uppercase tracking-wider">
                              {activeCategory.name}
                            </h3>
                            {activeCategory.tagline && (
                              <p className="text-xs text-stone-500 mt-0.5">
                                {activeCategory.tagline}
                              </p>
                            )}
                          </div>
                          <Link
                            href={`/products/${activeCategory.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#F97316] hover:text-[#EA580C] hover:underline shrink-0"
                          >
                            <span>View All in {activeCategory.name}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* Subcategories Grid with `>` bullets matching Landforce Screenshot 5 */}
                        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-2.5 max-h-[300px] overflow-y-auto pr-2">
                          {activeCategory.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/products?category=${sub.slug}`}
                              className="group flex items-start gap-1.5 py-1 text-xs font-semibold text-[#1F1F1F] hover:text-[#F97316] transition-colors"
                            >
                              <span className="text-[#F97316] font-bold group-hover:translate-x-1 transition-transform select-none">
                                &gt;
                              </span>
                              <span className="leading-snug uppercase tracking-tight group-hover:underline">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Info snippet */}
                      <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Direct Showroom Stock • Warranty & Genuine Spare Parts Support
                        </span>
                        <Link
                          href="/products"
                          className="font-semibold text-[#F97316] hover:underline"
                        >
                          Complete Catalogue ({RANGE_NAV_ITEMS.reduce((acc, c) => acc + c.subcategories.length, 0)} Implements) →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR matching Landforce Screenshot 4 & 5 */}
                  <div className="bg-[#f2efe6] border-t border-stone-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                    {/* Dealer Finder Box (Red/Orange block like Landforce) */}
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all group"
                    >
                      <MapPin className="w-4 h-4 text-white shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="block text-[11px] font-extrabold uppercase leading-none tracking-wide">
                          Dealer & Showroom Finder
                        </span>
                        <span className="block text-[10px] text-orange-100 font-normal leading-none mt-1">
                          Find your nearest showroom • Hyderabad
                        </span>
                      </div>
                    </Link>

                    {/* Quick navigation links */}
                    <div className="flex items-center gap-6 text-xs font-semibold text-stone-700">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
                      >
                        <Users className="w-4 h-4 text-[#F97316]" />
                        <span>Become a Dealer</span>
                      </Link>

                      <span className="text-stone-300">|</span>

                      <Link
                        href="/certifications"
                        className="inline-flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
                      >
                        <Award className="w-4 h-4 text-[#F97316]" />
                        <span>Official Certifications</span>
                      </Link>

                      <span className="text-stone-300">|</span>

                      <a
                        href={getGeneralWhatsAppUrl(`Hello Prakash Agri Tools, I would like to request a quotation and catalogue for ${activeCategory.name}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#F97316] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 text-[#F97316]" />
                        <span>Request Quotation</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/certifications"
              className={`px-3 py-2 text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors flex items-center gap-1.5 ${
                pathname === "/certifications"
                  ? "text-[#F97316] font-semibold bg-orange-50/70"
                  : "text-[#1F1F1F] hover:text-[#F97316] hover:bg-stone-50"
              }`}
            >
              <Award className="w-4 h-4 text-[#F97316]" />
              <span>CERTIFICATIONS</span>
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors ${
                pathname === "/about"
                  ? "text-[#F97316] font-semibold bg-orange-50/70"
                  : "text-[#1F1F1F] hover:text-[#F97316] hover:bg-stone-50"
              }`}
            >
              ABOUT US
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 text-[13px] font-medium tracking-wide uppercase rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "text-[#F97316] font-semibold bg-orange-50/70"
                  : "text-[#1F1F1F] hover:text-[#F97316] hover:bg-stone-50"
              }`}
            >
              CONTACT US
            </Link>
          </nav>

          {/* Desktop Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-stone-200 text-[#1F1F1F] hover:border-[#F97316] hover:text-[#F97316] hover:bg-orange-50/40 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-2xs"
            >
              <Phone className="w-4 h-4 text-[#F97316]" />
              <span>Call Showroom</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-orange-950/20 hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#11341c] text-white rounded-lg shadow-xs hover:bg-[#1f6133] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4 text-[#d4b672]" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 border border-stone-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            HOME
          </Link>

          <div>
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#11341c] bg-stone-100 rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#c5a059]" />
                OUR RANGE (CATEGORIES)
              </span>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] text-[#1f6133] font-bold underline"
              >
                All Products
              </Link>
            </div>

            <div className="space-y-1 mt-2">
              {RANGE_NAV_ITEMS.map((cat) => {
                const isOpen = mobileCategoryOpen === cat.slug;
                return (
                  <div key={cat.slug} className="border border-stone-100 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setMobileCategoryOpen(isOpen ? null : cat.slug)}
                      className="w-full flex items-center justify-between p-3 text-left font-bold text-xs uppercase text-stone-900 hover:bg-stone-50 bg-stone-50/50"
                    >
                      <span>{cat.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform text-stone-500 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-white space-y-2 border-t border-stone-100">
                        <Link
                          href={`/products/${cat.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-extrabold text-[#11341c] pb-1 border-b border-stone-100"
                        >
                          View All in {cat.name} →
                        </Link>
                        <div className="grid grid-cols-1 gap-1.5 pt-1">
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.slug}
                              href={`/products?category=${sub.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-xs text-stone-700 hover:text-[#11341c] py-1 flex items-center gap-1 font-medium"
                            >
                              <span className="text-stone-400">&gt;</span>
                              <span>{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            <Award className="w-4 h-4 text-[#c5a059]" />
            <span>CERTIFICATIONS</span>
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            ABOUT US
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            CONTACT US
          </Link>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-1.5 border border-stone-200 py-2.5 px-2 rounded-xl text-xs font-semibold text-stone-900 hover:bg-stone-50"
              >
                <Phone className="w-3.5 h-3.5 text-[#11341c]" />
                <span>Call Us</span>
              </a>
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-[#11341c] py-2.5 px-2 rounded-xl text-xs font-bold text-white shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#d4b672]" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-1 flex items-center justify-center gap-2">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 text-[11px] text-stone-700 hover:text-[#1877F2] py-2 px-2 rounded-lg bg-stone-100 font-medium transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1 text-[11px] text-stone-700 hover:text-[#E1306C] py-2 px-2 rounded-lg bg-stone-100 font-medium transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
