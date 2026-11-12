import React from "react";
import Image from "next/image";
import { Download, Phone, Mail, MapPin, User, Contact } from "lucide-react";

interface VisitingCardProps {
  className?: string;
  showDetails?: boolean;
}

export default function VisitingCard({
  className = "",
  showDetails = true,
}: VisitingCardProps) {
  return (
    <div
      className={`bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-lg space-y-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <span className="text-[11px] font-bold text-[#F97316] uppercase tracking-wider block">
            Official Business Identity
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            Digital Visiting Card
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/prakash-agri-tools-visiting-card.jpg"
            download="Prakash-Agri-Tools-Visiting-Card.jpg"
            className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            title="Download Visiting Card Image"
          >
            <Download className="w-4 h-4" />
            <span>Download Card</span>
          </a>
          <a
            href="/prakash-agri-tools.vcf"
            download="Prakash-Agri-Tools.vcf"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            title="Save Contact to Phone Book"
          >
            <Contact className="w-4 h-4 text-emerald-400" />
            <span>Save Contact</span>
          </a>
        </div>
      </div>

      {/* Card Visual with Download Overlay */}
      <div className="group relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-md bg-stone-50">
        <div className="relative aspect-16/9 w-full">
          <Image
            src="/prakash-agri-tools-visiting-card.jpg"
            alt="Prakash Agri Tools Official Visiting Card - V. Chandra Mohan Reddy"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-contain p-1"
            priority
          />
        </div>

        {/* Hover Quick Download Bar */}
        <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
          <a
            href="/prakash-agri-tools-visiting-card.jpg"
            download="Prakash-Agri-Tools-Visiting-Card.jpg"
            className="inline-flex items-center gap-2 bg-white text-stone-900 px-5 py-2.5 rounded-xl font-bold text-xs shadow-xl uppercase tracking-wider hover:bg-[#F97316] hover:text-white transition-colors"
          >
            <Download className="w-4 h-4 text-[#F97316] group-hover:text-white" />
            <span>Download High-Res JPG</span>
          </a>
          <a
            href="/prakash-agri-tools-visiting-card.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-stone-900/90 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-stone-900 transition-colors"
          >
            <span>View Full Size</span>
          </a>
        </div>
      </div>

      {showDetails && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-stone-700">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <User className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-tight">
                Proprietor
              </span>
              <span className="font-semibold text-stone-800 text-sm">
                V. Chandra Mohan Reddy
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-tight">
                Direct Mobile Number
              </span>
              <a
                href="tel:+918291179999"
                className="font-bold text-emerald-700 hover:underline text-sm"
              >
                +91 82911 79999
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-tight">
                Official Email
              </span>
              <a
                href="mailto:prakashagritools@gmail.com"
                className="font-semibold text-blue-700 hover:underline"
              >
                prakashagritools@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100">
            <MapPin className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-900 block text-xs uppercase tracking-tight">
                Registered Showroom Address
              </span>
              <span className="leading-snug block text-stone-600">
                Plot No. 4-7-3-18/1/4, GF, Inner Ring Road, Bairamalguda, LB Nagar, Hyderabad - 500079
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

