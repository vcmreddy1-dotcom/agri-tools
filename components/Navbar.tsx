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
  Tractor,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

interface CategoryNavItem {
  name: string;
  slug: string;
  subcategories?: { name: string; slug: string }[];
}

const CATEGORY_ITEMS: CategoryNavItem[] = [
  {
    name: "Agricultural Implements",
    slug: "agricultural-implements",
    subcategories: [
      { name: "Seed Drills", slug: "seed-drills" },
      { name: "Turbo Seeder", slug: "turbo-seeder" },
      { name: "Rotavators", slug: "rotavators" },
      { name: "Disc Harrows", slug: "disc-harrows" },
      { name: "Disc Ploughs", slug: "disc-ploughs" },
      { name: "Cultivators", slug: "cultivators" },
      { name: "Laser Land Levelers", slug: "laser-land-levelers" },
      { name: "Disc Ridgers / Bund Makers", slug: "disc-ridgers-bund-makers" },
      { name: "Reversible Ploughs", slug: "reversible-ploughs" },
      { name: "Mulchers", slug: "mulchers" },
      { name: "Slashers", slug: "slashers" },
      { name: "Paddy Weeders", slug: "paddy-weeders" },
      { name: "Mini Tillers", slug: "mini-tillers" },
      { name: "Weeders", slug: "weeders" },
    ],
  },
  {
    name: "Spraying Equipment",
    slug: "spraying-equipment",
    subcategories: [
      { name: "Battery Sprayers", slug: "battery-sprayers" },
      { name: "Power Sprayers", slug: "power-sprayers" },
      { name: "Solar Sprayers", slug: "solar-sprayers" },
      { name: "300L Sprayers", slug: "300l-sprayers" },
    ],
  },
  {
    name: "Garden & Power Equipment",
    slug: "garden-power-equipment",
    subcategories: [
      { name: "Brush Cutters", slug: "brush-cutters" },
      { name: "Grass Cutters", slug: "grass-cutters" },
      { name: "Chain Saws", slug: "chain-saws" },
      { name: "Hedge Trimmers", slug: "hedge-trimmers" },
      { name: "Lawn Mowers", slug: "lawn-mowers" },
      { name: "Earth Augers", slug: "earth-augers" },
      { name: "Water Pumps", slug: "water-pumps" },
    ],
  },
  {
    name: "Fodder Equipment",
    slug: "fodder-equipment",
    subcategories: [
      { name: "Chaff Cutters", slug: "chaff-cutters" },
    ],
  },
  {
    name: "Spare Parts",
    slug: "spare-parts",
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
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [activeCategoryDropdown, setActiveCategoryDropdown] = useState(false);
  const pathname = usePathname();

  // If in admin dashboard, render simplified or none
  if (pathname.startsWith("/admin")) {
    return null;
  }

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
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-[#1f6133] hover:bg-[#287a41] text-white px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-emerald-300" />
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
              <span className="block text-base sm:text-2xl font-black tracking-tight text-[#11341c] leading-none font-serif">
                PRAKASH <span className="text-[#e26d0a]">AGRI TOOLS</span>
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
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname === "/"
                  ? "text-[#11341c] bg-stone-100/90 font-bold"
                  : "text-stone-700 hover:text-[#11341c] hover:bg-stone-50"
              }`}
            >
              Home
            </Link>

            {/* Products Dropdown / Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveCategoryDropdown(true)}
              onMouseLeave={() => setActiveCategoryDropdown(false)}
            >
              <Link
                href="/products"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  pathname.startsWith("/products")
                    ? "text-[#11341c] bg-stone-100/90 font-bold"
                    : "text-stone-700 hover:text-[#11341c] hover:bg-stone-50"
                }`}
              >
                <Layers className="w-4 h-4 text-[#c5a059]" />
                Products
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeCategoryDropdown ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {/* Mega Dropdown Panel */}
              {activeCategoryDropdown && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full w-[820px] bg-white rounded-2xl shadow-2xl border border-stone-200/90 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 pb-3 border-b border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#11341c]">
                        Product Categories
                      </span>
                      <span className="text-xs text-stone-400">• 5 Main Categories & 34 Subcategories</span>
                    </div>
                    <Link
                      href="/products"
                      className="text-xs font-semibold text-[#1f6133] hover:text-[#11341c] hover:underline"
                    >
                      View All Products →
                    </Link>
                  </div>

                  {CATEGORY_ITEMS.map((cat) => (
                    <div key={cat.slug} className="space-y-2">
                      <Link
                        href={`/products/${cat.slug}`}
                        className="block font-bold text-sm text-[#11341c] hover:text-[#c5a059] transition-colors"
                      >
                        {cat.name}
                      </Link>
                      <ul className="space-y-1 text-xs text-stone-600">
                        {cat.subcategories?.slice(0, 5).map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/products?category=${sub.slug}`}
                              className="hover:text-[#11341c] hover:translate-x-1 transition-all inline-block py-0.5 text-stone-600"
                            >
                              • {sub.name}
                            </Link>
                          </li>
                        ))}
                        {(cat.subcategories?.length ?? 0) > 5 && (
                          <li>
                            <Link
                              href={`/products/${cat.slug}`}
                              className="text-[#1f6133] font-medium hover:underline text-[11px]"
                            >
                              +{(cat.subcategories?.length ?? 0) - 5} more...
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname === "/about"
                  ? "text-[#11341c] bg-stone-100/90 font-bold"
                  : "text-stone-700 hover:text-[#11341c] hover:bg-stone-50"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "text-[#11341c] bg-stone-100/90 font-bold"
                  : "text-stone-700 hover:text-[#11341c] hover:bg-stone-50"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Call to Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 border border-stone-200 text-stone-800 hover:bg-stone-100/80 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#11341c]" />
              <span>Call Us</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#d4b672]" />
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
            Home
          </Link>

          <div>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#11341c]" />
                Products & Categories
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileProductsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileProductsOpen && (
              <div className="pl-4 pr-2 py-2 space-y-3 bg-stone-50/70 rounded-xl mt-1 border border-stone-100">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-bold text-[#11341c] hover:underline pb-1 border-b border-stone-200"
                >
                  View All Products & Search →
                </Link>

                {CATEGORY_ITEMS.map((cat) => (
                  <div key={cat.slug} className="space-y-1">
                    <Link
                      href={`/products/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-bold text-stone-900 hover:text-[#11341c]"
                    >
                      {cat.name}
                    </Link>
                    <div className="pl-2 grid grid-cols-2 gap-1 text-xs text-stone-600">
                      {cat.subcategories?.slice(0, 4).map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/products?category=${sub.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-0.5 hover:text-[#11341c]"
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-base font-semibold text-stone-900 hover:bg-stone-50"
          >
            Contact Us
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
