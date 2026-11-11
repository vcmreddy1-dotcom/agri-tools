"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Award,
  FileText,
  Download,
  ExternalLink,
  Search,
  CheckCircle2,
  Calendar,
  MapPin,
  Building2,
  X,
  ZoomIn,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { CERTIFICATES, Certificate } from "@/lib/certificates";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

type CategoryFilter = "all" | "dealership" | "government" | "association";

export default function CertificatesGallery() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredCertificates = useMemo(() => {
    return CERTIFICATES.filter((cert) => {
      const matchesCategory =
        activeFilter === "all" || cert.category === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.regNumber && cert.regNumber.toLowerCase().includes(q)) ||
        (cert.territory && cert.territory.toLowerCase().includes(q)) ||
        cert.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: CERTIFICATES.length,
      dealership: CERTIFICATES.filter((c) => c.category === "dealership").length,
      government: CERTIFICATES.filter((c) => c.category === "government").length,
      association: CERTIFICATES.filter((c) => c.category === "association").length,
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Category Filter Tabs */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-[#11341c] text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All Certificates ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("dealership")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "dealership"
                ? "bg-[#11341c] text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Authorized Dealerships ({counts.dealership})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("government")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "government"
                ? "bg-[#11341c] text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Government & MSME ({counts.government})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("association")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === "association"
                ? "bg-[#11341c] text-white shadow-xs"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Industry Associations ({counts.association})
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by brand, issuer, reg no..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-stone-50/50"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          Showing <strong>{filteredCertificates.length}</strong> verified certificates
          {searchQuery ? ` matching "${searchQuery}"` : ""}
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-700 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          100% Verified Showroom Credentials
        </span>
      </div>

      {/* Grid of Certificates */}
      {filteredCertificates.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4">
          <Award className="w-12 h-12 mx-auto text-stone-300" />
          <h3 className="text-lg font-bold text-stone-800">No certificates match your search</h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Try adjusting your search keywords or clear the category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-[#11341c] text-white rounded-xl text-xs font-bold hover:bg-[#1a4d2a] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="group bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Preview Container */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-4/3 sm:aspect-16/11 bg-stone-100 overflow-hidden cursor-pointer border-b border-stone-100"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 bg-white/95 text-stone-900 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md">
                      <ZoomIn className="w-3.5 h-3.5 text-[#11341c]" />
                      Click to Preview
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-xs backdrop-blur-xs bg-white/90 text-stone-800 border-stone-200`}
                    >
                      <Award className="w-3 h-3 text-[#c5a059]" />
                      {cert.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-5 space-y-3">
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="text-base font-bold text-stone-900 font-serif leading-snug group-hover:text-[#11341c] transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                      <span className="font-semibold text-stone-800 line-clamp-1">
                        {cert.issuer}
                      </span>
                    </div>

                    {cert.regNumber && (
                      <div className="flex items-center gap-2 text-stone-500">
                        <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="font-mono text-[11px] line-clamp-1">
                          {cert.regNumber}
                        </span>
                      </div>
                    )}

                    {cert.territory && (
                      <div className="flex items-center gap-2 text-stone-500">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span className="line-clamp-1">{cert.territory}</span>
                      </div>
                    )}

                    {cert.validity && (
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{cert.validity}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed pt-1">
                    {cert.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#11341c] font-bold py-1.5 px-3 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#11341c]" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={cert.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-stone-700 hover:text-[#11341c] px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-white transition-all shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>

                  <a
                    href={cert.pdf}
                    download
                    className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#11341c] hover:bg-[#1a4d2a] px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 sm:p-6 md:p-10 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-stone-700 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-stone-200 flex items-start justify-between gap-4 bg-stone-50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#11341c] text-white">
                    {selectedCert.categoryLabel}
                  </span>
                  {selectedCert.validity && (
                    <span className="text-xs font-bold text-emerald-700">
                      • {selectedCert.validity}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-serif">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-stone-600">
                  Issued by <strong>{selectedCert.issuer}</strong>
                  {selectedCert.regNumber ? ` • ${selectedCert.regNumber}` : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: High Res Image Viewer */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-900 flex items-center justify-center min-h-[360px]">
              <div className="relative w-full max-w-3xl aspect-[1/1.35] max-h-[65vh]">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="100vw"
                  className="object-contain rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <p className="text-xs text-stone-500 max-w-md hidden sm:block">
                Official document verified and catalogued by Prakash Agri Tools Showroom, LB Nagar, Hyderabad.
              </p>

              <div className="flex items-center justify-end gap-2.5">
                <a
                  href={getGeneralWhatsAppUrl(
                    `Hello Prakash Agri Tools, I am inquiring regarding your authorized dealership/certificate: ${selectedCert.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href={selectedCert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-900 border border-stone-300 hover:bg-stone-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open PDF</span>
                </a>

                <a
                  href={selectedCert.pdf}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#11341c] hover:bg-[#1a4d2a] shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Original</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
