import React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { getMainCategories, getFeaturedProducts } from "@/lib/data";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getMainCategories(),
    getFeaturedProducts(),
  ]);

  // Aggregate total products per parent category (parent products + its subcategory products)
  const categoryStats = categories.map((cat) => {
    const subcatCount = cat.subcategories.reduce(
      (acc, s) => acc + s._count.products,
      0
    );
    const totalCount = cat._count.products + subcatCount;
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#1f6133]/80 border border-[#2ea65a]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-[#d4b672]" />
                <span>Established in {BUSINESS_INFO.establishedYear} • LB Nagar, Hyderabad</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-white leading-tight">
                Reliable Agricultural Machinery for Better Farming
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-200 max-w-2xl leading-relaxed">
                Explore agricultural implements, spraying equipment, garden machinery, fodder equipment and genuine spare parts from Prakash Agri Tools.
              </p>

              {/* CTA Group */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d4b472] text-[#091a0e] px-8 py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-7 py-3.5 rounded-xl font-semibold text-base transition-all backdrop-blur-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#d4b672]" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              {/* Verified Meta Highlights */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                  <span>15+ Years Agro Equipment Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c5a059]" />
                  <span>LB Nagar, Hyderabad Showroom</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c5a059]" />
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:underline">
                    Call: +91 96660 39444
                  </a>
                </div>
              </div>
            </div>

            {/* Right Card / Machine Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/40 shadow-2xl bg-stone-900 aspect-4/3 lg:aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80"
                  alt="Agricultural tractor and implements in field"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#d4b672] text-xs font-bold uppercase tracking-wider">
                    Featured Implement
                  </span>
                  <p className="text-white text-lg font-bold font-serif">
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
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              Complete Agricultural Catalogue
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11341c] font-serif mt-1">
              Main Product Categories
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Browse our 5 core equipment categories spanning 34 specialized subcategories. All counts are drawn dynamically from our verified database.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1f6133] hover:text-[#11341c] hover:underline shrink-0"
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
              className={`bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-[#1f6133] transition-all duration-300 overflow-hidden flex flex-col group ${
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
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#11341c] px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                  {cat.totalCount} {cat.totalCount === 1 ? "Product" : "Products"}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-[#11341c] transition-colors font-serif">
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
                      <span className="text-[11px] text-[#1f6133] font-semibold self-center px-1">
                        +{cat.subcategories.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <Link
                    href={`/products/${cat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#11341c] group-hover:text-[#c5a059] transition-colors uppercase tracking-wider"
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

      {/* SECTION C: FEATURED PRODUCTS */}
      <section className="bg-stone-100/70 border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                Direct from Showroom
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11341c] font-serif mt-1">
                Featured Agricultural Machinery
              </h2>
              <p className="text-sm text-stone-600 mt-1">
                Verified models available for direct enquiry, with full specifications and warranty assistance.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#11341c] hover:underline"
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
            <span className="inline-block bg-[#c5a059] text-[#091a0e] text-xs font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
              Category Spotlight
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight">
              Agricultural Implements & Tillage Machinery
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Our largest and most prominent category. Featuring Seed Drills, Turbo Seeders, Rotavators, Disc Harrows, Disc Ploughs, Cultivators, Laser Land Levelers, Reversible Ploughs, Mulchers, and more. Built to withstand Indian soil conditions.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-medium text-stone-200">
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm">Seed Drills</span>
                <span className="text-stone-400">Zero-till & multi-crop</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm">Rotavators</span>
                <span className="text-stone-400">Robusto & Vivo series</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm">Disc Harrows</span>
                <span className="text-stone-400">Mounted & hydraulic</span>
              </div>
              <div className="bg-[#174826] p-3 rounded-xl border border-white/10">
                <span className="block font-bold text-white text-sm">Laser Levelers</span>
                <span className="text-stone-400">Precision grade control</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/products/agricultural-implements"
                className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d4b472] text-[#091a0e] px-7 py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <span>View All Implements</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I would like to enquire specifically about Agricultural Implements availability.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#d4b672]" />
                <span>Enquire on Implements</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: WHY CHOOSE PRAKASH AGRI TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            Verified Business Credibility
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11341c] font-serif mt-1">
            Why Choose Prakash Agri Tools?
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Committed to providing farmers and contractors in Telangana with authentic agricultural machinery, dependable after-sales guidance, and genuine spares.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#1f6133] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#11341c] flex items-center justify-center mb-5 border border-emerald-100">
              <Clock className="w-6 h-6 text-[#11341c]" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Established in 2009
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Serving the agricultural community for over 15 years from our permanent LB Nagar showroom in Hyderabad with deep hands-on machinery know-how.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#1f6133] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#11341c] flex items-center justify-center mb-5 border border-emerald-100">
              <Layers className="w-6 h-6 text-[#11341c]" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Comprehensive Multi-Category Range
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              From heavy tractor implements to battery sprayers, brush cutters, and fodder machines, get the right equipment for your acreage in one trusted place.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/90 shadow-xs hover:border-[#1f6133] transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#11341c] flex items-center justify-center mb-5 border border-emerald-100">
              <Wrench className="w-6 h-6 text-[#11341c]" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Spare Parts Enquiry Support
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Never stay stalled in harvest season. We stock and source genuine rotavator blades, seed cups, bearings, belts, and spray guns with direct fitment support.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION F: PRODUCT ENQUIRY PROCESS */}
      <section className="bg-stone-50 border-y border-stone-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11341c] font-serif mt-1">
              How Product Enquiry Works
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              We operate an honest, direct showroom catalogue with real pricing confirmed upon stock and specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#d4b672] font-bold flex items-center justify-center mx-auto text-base">
                1
              </div>
              <h3 className="font-bold text-stone-900 text-base font-serif">
                Browse the Catalogue
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Explore our full range of implements, sprayers, fodder cutters, and spare parts with verified technical specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#d4b672] font-bold flex items-center justify-center mx-auto text-base">
                2
              </div>
              <h3 className="font-bold text-stone-900 text-base font-serif">
                Select a Product & Enquire
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Click the WhatsApp enquiry button or submit a web enquiry form prefilled with the machine model and specifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center space-y-3 relative">
              <div className="w-10 h-10 rounded-full bg-[#11341c] text-[#d4b672] font-bold flex items-center justify-center mx-auto text-base">
                3
              </div>
              <h3 className="font-bold text-stone-900 text-base font-serif">
                Confirm Price & Availability
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
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
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              Visit Our Showroom
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11341c] font-serif">
              Contact Prakash Agri Tools
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We welcome farmers, agritech contractors, and dealers to visit our LB Nagar location in Hyderabad. We assist with tractor HP matching, seed drill calibration, and spare blade selection.
            </p>

            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Address:</span>
                  <span>LB Nagar, Hyderabad, Telangana, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Phone Support:</span>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="hover:underline text-[#11341c] font-semibold">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
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
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 px-6 py-3 rounded-xl font-semibold text-sm transition-colors border border-stone-200"
              >
                <span>Full Contact Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-stone-50 rounded-2xl p-6 border border-stone-200 space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#11341c] text-[#d4b672] flex items-center justify-center mx-auto shadow-md">
              <Tractor className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Agricultural Guidance
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Unsure which rotavator width fits your tractor, or what seed drill tyne spacing suits your pulses? Call or WhatsApp us directly.
            </p>
            <div className="pt-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#11341c] text-white py-3 px-4 rounded-xl font-bold text-sm hover:bg-[#1f6133] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#d4b672]" />
                <span>Call +91 96660 39444</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
