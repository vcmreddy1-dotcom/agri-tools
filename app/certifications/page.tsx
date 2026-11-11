import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Building2,
  Phone,
  MessageSquare,
  FileCheck,
  Scale,
  Sparkles,
  Tractor,
} from "lucide-react";
import CertificatesGallery from "@/components/CertificatesGallery";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Official Certifications & Brand Authorizations | Prakash Agri Tools",
  description:
    "Explore our verified Government MSME registration, AMMA India life membership, Class 7 trademark, and authorized OEM dealerships including Honda, Shrachi, Jaysan, and Rohitkrishi.",
};

export default function CertificationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Certifications & Authorizations" },
        ]}
      />

      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-linear-to-br from-[#0e2c17] via-[#11341c] to-[#1c4d29] p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#d4b672] text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>Verified Industry Accreditations Since 2009</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight leading-tight">
            Official Certifications & <br className="hidden sm:inline" />
            <span className="text-[#f58220]">Brand Authorizations</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            At Prakash Agri Tools, every implement, power machine, and replacement component is backed by verified statutory certifications and direct OEM dealership agreements. Browse our complete portfolio of credentials below.
          </p>

          {/* Quick Pillars */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[#d4b672] font-black block text-sm">Govt. MSME</span>
              <span className="text-stone-300 text-[11px]">UDYAM-TS-09-0011074</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[#d4b672] font-black block text-sm">AMMA India</span>
              <span className="text-stone-300 text-[11px]">Life Member (#785)</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[#d4b672] font-black block text-sm">Trademark</span>
              <span className="text-stone-300 text-[11px]">Class 7 Registered</span>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <span className="text-[#d4b672] font-black block text-sm">8+ OEM Brands</span>
              <span className="text-stone-300 text-[11px]">Honda, Shrachi, Jaysan...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Gallery */}
      <CertificatesGallery />

      {/* Why Certification Matters Section */}
      <section className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200/90 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-[#11341c]">
            The Prakash Agri Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Why Authorized Certification Matters for Farmers
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Purchasing agricultural machinery is a multi-year capital investment. Our formal certifications protect your purchase from unauthorized copies, substandard steels, and voided warranties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              100% Genuine Machinery
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Direct factory dispatches from certified manufacturers guarantee genuine boron steel alloys, certified gearboxes, and OEM engine blocks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Manufacturer Warranty
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              All equipment carries valid manufacturer warranties honored across authorized service networks, ensuring hassle-free repair claims.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Subsidy & Bank Compliant
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our Government Udyam MSME and GST invoicing qualify your purchases for state agricultural department subsidies, NABARD, and bank loans.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Factory Trained Mechanics
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our technicians undergo formal OEM training to diagnose, calibrate, and service tillers, sprayers, planters, and harvesting machinery.
            </p>
          </div>
        </div>
      </section>

      {/* Showroom Contact CTA */}
      <div className="bg-[#11341c] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold font-serif">
            Need Document Verification or Corporate Supply?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            We provide verified dealership proofs, GST invoices, and technical tender documentation for government orders, farmer cooperatives, and bulk institutional buyers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_INFO.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-sm font-bold border border-white/20 transition-all"
          >
            <Phone className="w-4 h-4 text-[#c5a059]" />
            <span>Call Showroom</span>
          </a>

          <a
            href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I would like to inquire about your certificates and authorized brand machinery.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f58220] hover:bg-[#d97218] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
}
