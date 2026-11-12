import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Award,
  Sparkles,
  ExternalLink,
  Wrench,
  FileCheck,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BRAND_PARTNERS, SECONDARY_PARTNERS } from "@/lib/brands";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Authorized Brands & OEM Manufacturers | Prakash Agri Tools",
  description:
    "Official dealership and authorized sales for industry-leading agricultural machinery brands including Rohitkrishi, Really, Honda Power Products, Agrimate, Maschio Gaspardo, and Shrachi.",
};

export default function BrandsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Authorized Brands" },
        ]}
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-linear-to-br from-[#0e2c17] via-[#11341c] to-[#1c4d29] p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-[#F97316]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F97316] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#F97316]" />
              <span>Direct OEM Authorized Dealerships</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.1]">
              AUTHORIZED BRANDS <br />
              <span className="text-[#F97316]">&amp; MANUFACTURERS</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
              Prakash Agri Tools is the authorized distributor, dealer, and service partner for world-class farm machinery manufacturers. Every machine is sourced directly from certified factories with official manufacturer warranty and genuine spare parts availability.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I would like to inquire about machinery from your authorized brands.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire On WhatsApp</span>
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all uppercase tracking-wider"
              >
                <span>Browse Entire Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Dealership Card Preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-4 shadow-2xl border-4 border-white/20 rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-50 border border-stone-200">
                <Image
                  src="/brands/card-upright.jpg"
                  alt="Official Dealership Brands Card"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-2"
                  priority
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1 text-xs">
                <span className="font-bold text-stone-900 uppercase tracking-tight">
                  Official Dealership Directory
                </span>
                <span className="text-[11px] text-[#F97316] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified OEM Partners</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Authorized Brand Partners Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              Primary Machinery Lineup
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
              Authorized Manufacturer Partners
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            Showing 6 authorized OEM brands
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#F97316] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Brand Logo Container */}
                <div className="relative h-32 w-full rounded-xl bg-stone-50/80 border border-stone-100 flex items-center justify-center p-4">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={260}
                    height={130}
                    className="max-h-24 w-auto object-contain"
                  />
                </div>

                {/* Brand Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-extrabold text-xl text-stone-900 uppercase tracking-tight">
                      {brand.name}
                    </h3>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${brand.badgeColor}`}>
                      {brand.badge}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[#F97316] uppercase tracking-wide">
                    {brand.tagline}
                  </p>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    {brand.specialization}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {brand.description}
                </p>

                {/* Equipment List */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Supported Machinery &amp; Implements:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <Link
                  href={`/products?search=${encodeURIComponent(brand.name)}`}
                  className="flex-1 text-center bg-stone-900 hover:bg-[#F97316] text-white py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>View Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={getGeneralWhatsAppUrl(`Hello Prakash Agri Tools, please share price list and stock availability for ${brand.name} machines.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1"
                  title="WhatsApp Enquiry"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Quote</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Associated Brands */}
      <section className="bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4">
        <div>
          <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
            Broader Network
          </span>
          <h3 className="text-xl font-bold uppercase tracking-tight text-stone-900 mt-0.5">
            Additional Associated Brands &amp; Industry Affiliations
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            We also supply genuine implements, spares, and accessories compatible with or manufactured by these prestigious bodies.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SECONDARY_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs hover:border-[#F97316] transition-colors"
            >
              <h4 className="font-extrabold text-sm text-stone-900 uppercase">
                {partner.name}
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                {partner.category}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cross-Link Banner to Statutory Certifications */}
      <div className="bg-linear-to-r from-stone-900 to-stone-800 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-700">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[#F97316] text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Statutory Verification</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
            Need Government MSME &amp; Subsidy Certifications?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Browse our full registry of 13 official documents including Government of India MSME (Udyam), AMMA India Life Membership, and Trademark Registration.
          </p>
        </div>

        <Link
          href="/certifications"
          className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg transition-all shrink-0"
        >
          <FileCheck className="w-4 h-4" />
          <span>View All 13 Certificates</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
