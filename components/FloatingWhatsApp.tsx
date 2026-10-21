"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);

  // Hide on admin portal
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Tooltip notice */}
      {showTooltip && (
        <div className="bg-stone-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl max-w-xs border border-stone-800 animate-in fade-in slide-in-from-bottom-2 duration-150 flex items-center gap-2">
          <span>Need latest machinery price & stock? Chat directly with us!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Floating Phone Dial */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-stone-800 rounded-full flex items-center justify-center shadow-lg border border-stone-200 hover:bg-stone-50 hover:scale-105 transition-all"
          aria-label="Call Prakash Agri Tools"
          title="Call +91 96660 39444"
        >
          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#11341c]" />
        </a>

        {/* Floating WhatsApp Action */}
        <a
          href={getGeneralWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white w-10 h-10 sm:w-auto p-2 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-emerald-950/20 hover:scale-105 transition-all font-semibold text-xs sm:text-sm"
          aria-label="WhatsApp Enquiry"
        >
          <MessageSquare className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
