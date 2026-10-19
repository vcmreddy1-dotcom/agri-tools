import React from "react";
import Link from "next/link";
import { Tractor, ShieldCheck, Clock, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata = {
  title: "About Us | Prakash Agri Tools Hyderabad",
  description:
    "Learn about Prakash Agri Tools, established in 2009 in LB Nagar, Hyderabad. Supplying dependable agricultural implements, sprayers, fodder machines, and genuine replacement spare parts.",
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Header */}
      <div className="bg-[#11341c] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            Established in {BUSINESS_INFO.establishedYear} • Hyderabad
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight">
            Trusted Agricultural Equipment Partner Since 2009
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            Prakash Agri Tools was established with a singular objective: to connect farmers, farm contractors, and dairy owners with durable, verified agricultural machinery that withstands Indian fieldwork without downtime.
          </p>
        </div>
      </div>

      {/* Main Story & Values */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 text-stone-700 leading-relaxed text-sm sm:text-base">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#11341c] font-serif">
            Our Business Story & Experience
          </h2>
          <p>
            Operating from LB Nagar in Hyderabad, Telangana, Prakash Agri Tools has spent over 15 years understanding the practical challenges farmers face in field preparation, precision seeding, plant protection, and fodder management.
          </p>
          <p>
            Whether it is selecting a rotavator with the correct blade shape for heavy soil, choosing a multi-crop zero-till seed drill, or matching a tractor boom sprayer to pump pressure, we believe in honest technical guidance rather than generic sales talk.
          </p>
          <p>
            We strictly believe that agricultural machinery is an investment for years to come. That is why every piece of equipment in our showroom is supported with genuine replacement spare parts—from boron steel blades to seed tubes and pump seal kits.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#11341c]" />
                Zero Fabricated Claims
              </span>
              <p className="text-xs text-stone-600">
                We only state verified tractor HP requirements, cutting widths, and tank capacities backed by manufacturer specs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
              <span className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <CheckCircle2 className="w-4 h-4 text-[#11341c]" />
                Spare Parts Continuity
              </span>
              <p className="text-xs text-stone-600">
                We prioritize machines whose wear components and spares are consistently available in the market.
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-[#11341c] text-[#d4b672] flex items-center justify-center shadow-md">
            <Tractor className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold text-stone-900 font-serif">
              Showroom Information
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Location</span>
                  <span>LB Nagar, Hyderabad, Telangana, India</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Phone Support</span>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#11341c] font-semibold hover:underline">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Hours</span>
                  <span>Monday to Saturday: 9:30 AM — 7:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#d4b672]" />
              <span>Direct WhatsApp Contact</span>
            </a>
            <Link
              href="/contact"
              className="w-full text-center py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
            >
              View Location & Enquiry Form →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
