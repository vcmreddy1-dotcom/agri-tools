import React from "react";
import Link from "next/link";
import { Tractor, ArrowLeft, Home, Search, MessageSquare } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#11341c] border border-emerald-100 flex items-center justify-center mx-auto">
          <Tractor className="w-8 h-8 text-[#11341c]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11341c] font-serif">
            Page Not Found
          </h1>
          <p className="text-xs text-stone-600 leading-relaxed">
            The agricultural implement, machinery category, or page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link
            href="/products"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white py-3 px-5 rounded-xl font-bold text-xs shadow-md transition-colors"
          >
            <Search className="w-4 h-4 text-[#d4b672]" />
            <span>Search All Machinery</span>
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 py-3 px-5 rounded-xl font-semibold text-xs transition-colors"
          >
            <Home className="w-4 h-4 text-stone-600" />
            <span>Return to Homepage</span>
          </Link>

          <div className="pt-2 border-t border-stone-100">
            <a
              href={getGeneralWhatsAppUrl("Hello Prakash Agri Tools, I am looking for a specific machinery item.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Ask Showroom Team on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
