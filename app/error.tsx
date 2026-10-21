"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Home, MessageSquare } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#fcfaf5]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-white p-2 border border-stone-200 shadow-sm flex items-center justify-center mx-auto">
          <Image
            src="/logo-icon.png"
            alt="Prakash Agri Tools"
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Connection Update
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11341c] font-serif">
            Unable to Load Catalogue
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed">
            We are temporarily synchronizing our machinery inventory. Please reload or reach out directly to our showroom team.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white py-3 px-5 rounded-xl font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#d4b672]" />
            <span>Reload Page</span>
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 py-3 px-5 rounded-xl font-semibold text-xs transition-colors"
          >
            <Home className="w-4 h-4 text-stone-600" />
            <span>Go to Homepage</span>
          </Link>
        </div>

        <div className="pt-2 border-t border-stone-100">
          <a
            href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I noticed an issue on your catalogue website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Showroom via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
