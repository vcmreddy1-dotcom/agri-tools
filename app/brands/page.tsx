import React from "react";
import Link from "next/link";
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
import ProductCard from "@/components/ProductCard";
import { BRAND_PARTNERS, SECONDARY_PARTNERS } from "@/lib/brands";
import { getFeaturedProducts } from "@/lib/data";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Authorized Brands & OEM Manufacturers | Prakash Agri Tools",
  description:
    "Official dealership and authorized sales for industry-leading agricultural machinery brands including Rohitkrishi, Really, Honda Power Products, Agrimate, Maschio Gaspardo, and Shrachi.",
};

export default async function BrandsPage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Authorized Brands" }]} />

      {/* Main Brands Showcase (Matching Agrimart Reference) */}
      <div className="bg-[#f5f6f8] rounded-3xl p-6 sm:p-12 lg:p-16 border border-stone-200/80">
        {/* Header: Our Brands */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef7ee] border border-[#d2ecd2] text-[#1e7e34] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e7e34]" />
            <span>AUTHORIZED GLOBAL &amp; IN-HOUSE BRANDS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] tracking-tight">
            Our Brands
          </h1>

          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed font-normal">
            Prakash Agri Tools works with world-class manufacturers, experienced engineers, and trusted in-house brands to improve productivity for farmers and profitability for our partners.
          </p>
        </div>

        {/* 6 Clean Brand Names (No photos, pure typography) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          {BRAND_PARTNERS.map((brand) => (
            <Link
              key={brand.id}
              href={`/products?search=${encodeURIComponent(brand.name)}`}
              className="group flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-[#F97316] shadow-2xs hover:shadow-md transition-all duration-300 text-center"
            >
              <span className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-[#F97316] transition-colors uppercase tracking-tight">
                {brand.name}
              </span>
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wide mt-2">
                {brand.tagline}
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1">
                {brand.specialization}
              </span>
            </Link>
          ))}
        </div>

        {/* Top Picks continuation (Matching Agrimart reference in screenshot) */}
        <div className="mt-20 pt-16 border-t border-stone-200/90 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eef7ee] border border-[#d2ecd2] text-[#1e7e34] text-[11px] sm:text-xs font-bold tracking-wider uppercase mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e7e34]" />
            <span>AUTHORIZED BRAND PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1F1F1F] tracking-tight">
            Prakash&apos;s Top Picks
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto mt-2 leading-relaxed font-normal">
            Explore top agricultural machinery and high-efficiency equipment with us
          </p>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 text-left">
            {featuredProducts.slice(0, 4).map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all uppercase tracking-wider"
            >
              <span>Browse Complete Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, please share quotes for your top machinery.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Detailed Brand Profiles */}
      <section className="space-y-6">
        <div className="border-b border-stone-200 pb-4">
          <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
            Comprehensive Directory
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-900 mt-1">
            Brand Specializations &amp; Implements
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#F97316] shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="font-extrabold text-2xl text-stone-900 uppercase tracking-tight">
                      {brand.name}
                    </h4>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border shrink-0 ${brand.badgeColor}`}>
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

                <div className="pt-2 border-t border-stone-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Supported Machinery:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {brand.equipment.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-stone-100 text-stone-800 px-2 py-0.5 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <Link
                  href={`/products?search=${encodeURIComponent(brand.name)}`}
                  className="flex-1 text-center bg-stone-900 hover:bg-[#F97316] text-white py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <span>View Equipment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={getGeneralWhatsAppUrl(`Hello Prakash Agri Tools, please share price list and stock availability for ${brand.name} machines.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2 px-3 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Quote</span>
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
      <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-800">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[#F97316] text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Statutory Verification</span>
          </div>
          <h4 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
            Need Government MSME &amp; Subsidy Certifications?
          </h4>
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
