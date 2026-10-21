"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tractor, Phone, MapPin, MessageSquare, ShieldCheck, Mail } from "lucide-react";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export default function Footer() {
  const pathname = usePathname();
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#091a0e] text-stone-300 border-t border-stone-800">
      {/* Top Banner inside Footer */}
      <div className="border-b border-stone-800/80 bg-[#11341c]/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-md border border-stone-200">
              <Image
                src="/logo-icon.png"
                alt="Prakash Agri Tools Emblem"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-serif">
                Prakash <span className="text-[#f58220]">Agri Tools</span>
              </h3>
              <p className="text-xs text-stone-400">
                Powering Agriculture • Agricultural Machinery & Spares Showroom • Estd. 2009
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-stone-800/90 hover:bg-stone-700 text-stone-200 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors border border-stone-700"
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#287a41] hover:bg-[#329651] text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-stone-200">
                <Image
                  src="/logo-icon.png"
                  alt="Prakash Agri Tools"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                PRAKASH <span className="text-[#f58220]">AGRI TOOLS</span>
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-md">
              Established in 2009 in LB Nagar, Hyderabad. We provide farmers, contractors, and horticulturists with reliable agricultural implements, sprayers, fodder machines, and genuine replacement spare parts.
            </p>
            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <span>LB Nagar, Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>+91 96660 39444</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
                <span>Registered Agricultural Equipment Supplier</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3">
              <span className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5 flex-wrap">
                <a
                  href={BUSINESS_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-[#1877F2] text-stone-300 hover:text-white text-xs font-medium border border-stone-700/80 transition-all group"
                  aria-label="Facebook Page"
                >
                  <FacebookIcon className="w-4 h-4 text-[#1877F2] group-hover:text-white transition-colors" />
                  <span>Facebook</span>
                </a>
                <a
                  href={BUSINESS_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/90 hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-stone-300 hover:text-white text-xs font-medium border border-stone-700/80 transition-all group"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="w-4 h-4 text-[#E1306C] group-hover:text-white transition-colors" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#d4b672]">
              Implements & Machinery
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/agricultural-implements"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Agricultural Implements
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=seed-drills"
                  className="hover:text-emerald-400 transition-colors text-stone-400 text-xs"
                >
                  • Seed Drills & Planters
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=rotavators"
                  className="hover:text-emerald-400 transition-colors text-stone-400 text-xs"
                >
                  • Rotavators & Tillers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=disc-harrows"
                  className="hover:text-emerald-400 transition-colors text-stone-400 text-xs"
                >
                  • Disc Harrows
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=laser-land-levelers"
                  className="hover:text-emerald-400 transition-colors text-stone-400 text-xs"
                >
                  • Laser Land Levelers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Sprayers & Power */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#d4b672]">
              Sprayers & Power
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products/spraying-equipment"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Spraying Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products/garden-power-equipment"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Garden & Power Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products/fodder-equipment"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fodder Equipment (Chaff Cutters)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/spare-parts"
                  className="hover:text-emerald-400 transition-colors"
                >
                  Genuine Spare Parts
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-[#d4b672]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">
                  All Products Catalogue
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Our Business
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors text-xs text-stone-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors text-xs text-stone-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-amber-400 transition-colors text-xs text-stone-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} Prakash Agri Tools, LB Nagar, Hyderabad. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 pr-2 border-r border-stone-800">
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-[#E1306C] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
            <Link href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms & Conditions
            </Link>
            <span className="hidden sm:inline">Telangana, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
