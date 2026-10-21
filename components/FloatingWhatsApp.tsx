"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon, SolidPhoneIcon } from "@/components/icons/SocialIcons";

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide on admin portal
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3 pointer-events-auto">
      {/* 1. Phone Call Floating Button (Solid Black Circle with White Handset Icon) */}
      <a
        href={`tel:${BUSINESS_INFO.phoneRaw}`}
        className="w-12 h-12 sm:w-[50px] sm:h-[50px] bg-[#111111] hover:bg-black text-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Call Prakash Agri Tools"
        title={`Call ${BUSINESS_INFO.phoneDisplay}`}
      >
        <SolidPhoneIcon className="w-5 h-5 text-white" />
      </a>

      {/* 2. WhatsApp Floating Button (Vibrant WhatsApp Green Circle with White Logo) */}
      <a
        href={getGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-[50px] sm:h-[50px] bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/30 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
