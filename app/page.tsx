import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Tractor,
  Phone,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  HelpCircle,
  Cpu,
  Layers,
  Wrench,
  Search,
  Award,
  FileCheck,
} from "lucide-react";
import { getMainCategories, getFeaturedProducts } from "@/lib/data";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getMainCategories(),
    getFeaturedProducts(),
  ]);

  // Aggregate total products per parent category (parent products + its subcategory products)
  const categoryStats = categories.map((cat) => {
    const subcatCount = (cat.subcategories || []).reduce(
      (acc: number, s) => acc + (s._count?.products || 0),
      0
    );
    const totalCount = (cat._count?.products || 0) + subcatCount;
    return {
      ...cat,
      totalCount,
    };
  });

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* SECTION A: HERO */}
      <section className="relative bg-gradient-to-b from-[#11341c] via-[#174826] to-[#11341c] text-white pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#1f6133]/90 border border-[#2ea65a]/40 rounded-full pl-2 pr-3.5 py-1 text-[11px] sm:text-xs font-semibold text-emerald-200 shadow-md">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0">
                  <Image
                    src="/logo-icon.png"
                    alt="Prakash Agri Tools emblem"
                    width={18}
                    height={18}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>Estd. {BUSINESS_INFO.establishedYear} • Powering Agriculture • Hyderabad</span>
              </div>

              {/* Headline matching Landforce bold uppercase aesthetic */}
              <h1 className="text-[28px] sm:text-[40px] lg:text-[52px] font-extrabold uppercase tracking-[0.02em] text-white leading-[1.08]">
                TRANSFORMING INDIAN AGRICULTURE FOR OVER TWO DECADES
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base lg:text-lg text-stone-200 max-w-2xl font-normal leading-[1.65]">
                Reliable agricultural implements, high-output sprayers, rotary tillers, seed drills, and genuine spare parts engineered to withstand tough Indian soil conditions.
              </p>

              {/* CTA Group */}
              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Link
                  href="/products"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Explore Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 sm:px-7 py-3.5 sm:py-4 rounded-xl font-semibold text-xs sm:text-sm transition-all backdrop-blur-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#F97316]" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>

              {/* Verified Meta Highlights */}
              <div className="pt-4 sm:pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-stone-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>15+ Years Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span>LB Nagar, Hyderabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#F97316] shrink-0" />
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:underline font-semibold text-white">
                    +91 96660 39444
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card / Machine Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/40 shadow-2xl bg-stone-900 aspect-4/3 lg:aspect-square">
                <img
                  src={`/uploads/${encodeURIComponent("WhatsApp Image 2026-10-13 at 16.44.01.jpeg")}`}
                  alt="Tractor with disc harrow working in field - Prakash Agri Tools"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-lg flex items-center gap-2 border border-stone-200/60">
                  <Image
                    src="/logo-icon.png"
                    alt="Prakash Agri Tools Emblem"
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                  <div className="pr-1 text-left">
                    <span className="block text-[10px] font-black leading-none text-[#11341c]">PRAKASH</span>
                    <span className="block text-[9px] font-bold leading-none text-[#e26d0a]">AGRI TOOLS</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#d4b672] text-xs font-bold uppercase tracking-wider">
                    Featured Implement
                  </span>
                  <p className="text-white text-lg font-bold uppercase tracking-tight">
                    Rotavators, Seed Drills & Laser Levelers
                  </p>
                  <p className="text-stone-300 text-xs mt-1">
                    Direct stock available with warranty and spare parts support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: MAIN CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              Complete Agricultural Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1F1F1F] mt-1 leading-[1.15]">
              MAKING <span className="text-[#F97316]">AGRICULTURE</span> MORE ECONOMICAL
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl font-normal leading-[1.6]">
              Browse our core equipment sectors spanning comprehensive machinery and implements. All equipment is verified and serviced directly from our Hyderabad showroom.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F97316] hover:text-[#EA580C] uppercase tracking-wider shrink-0"
          >
            <span>All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryStats.map((cat, idx) => (
            <div
              key={cat.id}
              className={`bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-[#F97316] transition-all duration-300 overflow-hidden flex flex-col group ${
                idx === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""
              }`}
            >
              <div
                className={`relative w-full bg-stone-100 overflow-hidden ${
                  idx === 0 ? "aspect-16/10 lg:aspect-4/3" : "aspect-16/9"
                }`}
              >
                <img
                  src={
                    cat.image ||
                    "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80"
                  }
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#1F1F1F] px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
                  {cat.totalCount} {cat.totalCount === 1 ? "Product" : "Products"}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1F1F1F] group-hover:text-[#F97316] transition-colors uppercase tracking-tight">
                    <Link href={`/products/${cat.slug}`}>{cat.name}</Link>
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories pill tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.subcategories.slice(0, 4).map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/products?category=${sub.slug}`}
                        className="bg-stone-50 hover:bg-stone-100 text-stone-700 text-[11px] px-2.5 py-1 rounded-md border border-stone-200/60 font-medium"
                      >
                        {sub.name}
                      </Link>
                    ))}
                    {cat.subcategories.length > 4 && (
                      <span className="text-[11px] text-[#F97316] font-semibold self-center px-1">
                        +{cat.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <Link
                    href={`/products/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F1F1F] group-hover:text-[#F97316] transition-colors uppercase tracking-wider"
                  >
                    <span>Browse {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION C: FEATURED PRODUCTS matching Landforce Screenshot 5 */}
      <section className="bg-stone-100/70 border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
                Direct from Showroom
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1F1F1F] mt-1">
                OUR <span className="text-[#F97316] relative inline-block pb-1.5">PRODUCTS<span className="absolute bottom-0 left-0 w-full h-1 bg-[#F97316] rounded-full"></span></span>
              </h2>
              <p className="text-sm text-stone-600 mt-1 font-normal">
                Verified machinery models available for direct showroom inspection, with full specifications and warranty assistance.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F97316] hover:text-[#EA580C] uppercase tracking-wider"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: AGRICULTURAL IMPLEMENTS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#11341c] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <span className="inline-block bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              Category Spotlight
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.12]">
              HEAVY DUTY <span className="text-[#F97316]">TILLAGE MACHINERY</span> & IMPLEMENTS
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-[1.65] font-normal">
              Our flagship machinery sector. Featuring Seed Drills, Turbo Seeders, Rotavators, Disc Harrows, Disc Ploughs, Cultivators, Laser Land Levelers, Reversible Ploughs, Mulchers, and more. Built to withstand Indian soil conditions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-medium text-stone-200">
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm uppercase">Seed Drills</span>
                <span className="text-stone-300">Zero-till & multi-crop</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm uppercase">Rotavators</span>
                <span className="text-stone-300">Robusto & Vivo series</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm uppercase">Disc Harrows</span>
                <span className="text-stone-300">Mounted & hydraulic</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm uppercase">Laser Levelers</span>
                <span className="text-stone-300">Precision grade control</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/products/land-preparation"
                className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-all uppercase tracking-wider"
              >
                <span>View All Implements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I would like to enquire specifically about Agricultural Implements availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#F97316]" />
                <span>Enquire on Implements</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: WHY CHOOSE PRAKASH AGRI TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
            Verified Business Credibility
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1F1F1F] mt-1 leading-[1.15]">
            WHY CHOOSE <span className="text-[#F97316]">PRAKASH AGRI TOOLS</span>
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-normal leading-[1.6]">
            Committed to providing farmers and contractors in Telangana with authentic agricultural machinery, dependable after-sales guidance, and genuine spares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#F97316] transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-5 border border-orange-100">
              <Clock className="w-6 h-6 text-[#F97316]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F] uppercase tracking-wide">
              Established in 2009
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-[1.65]">
              Serving the agricultural community for over 15 years from our permanent LB Nagar showroom in Hyderabad with deep hands-on machinery know-how.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#F97316] transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-5 border border-orange-100">
              <Layers className="w-6 h-6 text-[#F97316]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F] uppercase tracking-wide">
              Comprehensive Multi-Category Range
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-[1.65]">
              From heavy tractor implements to battery sprayers, brush cutters, and fodder machines, get the right equipment for your acreage in one trusted place.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#F97316] transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#F97316] flex items-center justify-center mb-5 border border-orange-100">
              <Wrench className="w-6 h-6 text-[#F97316]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F] uppercase tracking-wide">
              Spare Parts Enquiry Support
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-[1.65]">
              Never stay stalled in harvest season. We stock and source genuine rotavator blades, seed cups, bearings, belts, and spray guns with direct fitment support.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: VERIFIED CERTIFICATIONS & DEALERSHIP AUTHORIZATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-stone-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[#F97316] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <span>Verified Industry Accreditations</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white leading-[1.15]">
                GOVERNMENT APPROVED <span className="text-[#F97316]">CERTIFICATIONS & SUBSIDIES</span>
              </h2>
              <p className="text-sm text-stone-300 leading-[1.6] font-normal">
                Backed by Government MSME registration, AMMA India life membership, and direct OEM dealership appointments. We guarantee 100% genuine machinery with factory warranty support.
              </p>
            </div>

            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold shadow-lg transition-all shrink-0 uppercase tracking-wider"
            >
              <Award className="w-4 h-4" />
              <span>View All 13 Official Certificates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Spotlight Certificate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {/* Card 1: MSME Udyam */}
            <Link
              href="/certifications"
              className="group bg-stone-800/90 hover:bg-stone-800 rounded-2xl p-5 border border-stone-700/80 hover:border-[#F97316]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white/5 border border-stone-700">
                  <Image
                    src="/certificates/udyam-msme-registration-certificate.webp"
                    alt="Udyam MSME Registration"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block">
                    Government of India
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 uppercase group-hover:text-[#F97316] transition-colors">
                    Udyam MSME Registration
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    UDYAM-TS-09-0011074
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#F97316] font-semibold mt-3 flex items-center gap-1">
                <span>View Full Document</span>
                <span>→</span>
              </span>
            </Link>

            {/* Card 2: AMMA India */}
            <Link
              href="/certifications"
              className="group bg-stone-800/90 hover:bg-stone-800 rounded-2xl p-5 border border-stone-700/80 hover:border-[#F97316]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white/5 border border-stone-700">
                  <Image
                    src="/certificates/amma-india-life-member-certificate.webp"
                    alt="AMMA India Life Member"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block">
                    Apex Manufacturers Body
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 uppercase group-hover:text-[#F97316] transition-colors">
                    AMMA India Life Member
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    Member No: LM-785
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#F97316] font-semibold mt-3 flex items-center gap-1">
                <span>View Full Document</span>
                <span>→</span>
              </span>
            </Link>

            {/* Card 3: Honda Power Products */}
            <Link
              href="/certifications"
              className="group bg-stone-800/90 hover:bg-stone-800 rounded-2xl p-5 border border-stone-700/80 hover:border-[#F97316]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white/5 border border-stone-700">
                  <Image
                    src="/certificates/honda-power-products-dealership-certificate.webp"
                    alt="Honda Power Products Authorization"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block">
                    Authorized OEM Dealership
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 uppercase group-hover:text-[#F97316] transition-colors">
                    Honda India Power Products
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Engines, Tillers & Sprayers
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#F97316] font-semibold mt-3 flex items-center gap-1">
                <span>View Full Document</span>
                <span>→</span>
              </span>
            </Link>

            {/* Card 4: Shrachi / BTL EPC */}
            <Link
              href="/certifications"
              className="group bg-stone-800/90 hover:bg-stone-800 rounded-2xl p-5 border border-stone-700/80 hover:border-[#F97316]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-white/5 border border-stone-700">
                  <Image
                    src="/certificates/shrachi-btl-epc-dealership-certificate.webp"
                    alt="Shrachi Agrimech Dealership"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F97316] block">
                    ISO 9001:2015 Certified
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 uppercase group-hover:text-[#F97316] transition-colors">
                    Shrachi Agrimech & BTL EPC
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Power Tillers & Harvesters
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#F97316] font-semibold mt-3 flex items-center gap-1">
                <span>View Full Document</span>
                <span>→</span>
              </span>
            </Link>
          </div>

          {/* Brand Partner Ticker / Pill Strip */}
          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-400 relative z-10">
            <span className="font-bold uppercase tracking-wider text-stone-300">
              Authorized Partner Brands:
            </span>
            <div className="flex flex-wrap items-center gap-3 font-semibold text-stone-300">
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">HONDA</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">SHRACHI</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">JAYSAN</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">ROHITKRISHI</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">NIPHA ONEHORN</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">ENOCHS</span>
              <span className="px-3 py-1 rounded-lg bg-stone-800 border border-stone-700">ANNAPURNA</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: PRODUCT ENQUIRY PROCESS */}
      <section className="bg-stone-50 border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1F1F1F] mt-1 leading-[1.15]">
              HOW PRODUCT <span className="text-[#F97316]">ENQUIRY WORKS</span>
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-normal leading-[1.6]">
              We operate an honest, direct showroom catalogue with real pricing confirmed upon stock and specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#F97316] font-bold flex items-center justify-center mx-auto text-base">
                1
              </div>
              <h3 className="font-bold text-[#1F1F1F] text-base uppercase tracking-tight">
                Browse the Catalogue
              </h3>
              <p className="text-xs text-stone-600 leading-[1.65]">
                Explore our full range of implements, sprayers, fodder cutters, and spare parts with verified technical specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#F97316] font-bold flex items-center justify-center mx-auto text-base">
                2
              </div>
              <h3 className="font-bold text-[#1F1F1F] text-base uppercase tracking-tight">
                Select a Product & Enquire
              </h3>
              <p className="text-xs text-stone-600 leading-[1.65]">
                Click the WhatsApp enquiry button or submit a web enquiry form prefilled with the machine model and specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#F97316] font-bold flex items-center justify-center mx-auto text-base">
                3
              </div>
              <h3 className="font-bold text-[#1F1F1F] text-base uppercase tracking-tight">
                Confirm Price & Availability
              </h3>
              <p className="text-xs text-stone-600 leading-[1.65]">
                Our Hyderabad showroom team confirms current availability, verified pricing, tractor compatibility, and delivery details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: CONTACT AND LOCATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-lg p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider">
              Visit Our Showroom
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-[#1F1F1F] leading-[1.15]">
              CONTACT <span className="text-[#F97316]">PRAKASH AGRI TOOLS</span>
            </h2>
            <p className="text-sm text-stone-600 leading-[1.6] font-normal">
              We welcome farmers, agritech contractors, and dealers to visit our LB Nagar location in Hyderabad. We assist with tractor HP matching, seed drill calibration, and spare blade selection.
            </p>

            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Address:</span>
                  <span>LB Nagar, Hyderabad, Telangana, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Phone Support:</span>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:underline text-[#11341c] font-semibold">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Business Working Hours:</span>
                  <span>Monday — Saturday: 9:30 AM to 7:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors border border-stone-200"
              >
                <span>Full Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#11341c] text-[#F97316] flex items-center justify-center mx-auto shadow-md">
              <Tractor className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#1F1F1F] uppercase tracking-tight">
              Agricultural Guidance
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Unsure which rotavator width fits your tractor, or what seed drill tyne spacing suits your pulses? Call or WhatsApp us directly.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F97316] text-white py-3.5 px-4 rounded-xl font-semibold text-xs sm:text-sm hover:bg-[#EA580C] transition-colors uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call +91 96660 39444</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
