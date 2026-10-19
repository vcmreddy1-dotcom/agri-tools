"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageSquare, ArrowRight, ShieldCheck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import EnquiryModal from "@/components/EnquiryModal";

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand?: string | null;
    modelNumber?: string | null;
    shortDescription?: string | null;
    priceType?: string | null;
    price?: unknown;
    currency?: string;
    availabilityStatus?: string;
    technicalSpecifications?: string | null;
    category?: {
      name: string;
      slug: string;
      parentCategory?: { name: string; slug: string } | null;
    } | null;
    media?: { mediaUrl: string; altText?: string | null }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse technical specs to extract 1 or 2 key highlights
  let keySpecs: [string, string][] = [];
  if (product.technicalSpecifications) {
    try {
      const parsed = JSON.parse(product.technicalSpecifications);
      keySpecs = Object.entries(parsed).slice(0, 2) as [string, string][];
    } catch {
      // ignore
    }
  }

  const primaryImage =
    product.media && product.media.length > 0
      ? product.media[0].mediaUrl
      : "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80";

  // Availability badge
  const renderAvailability = () => {
    switch (product.availabilityStatus) {
      case "OUT_OF_STOCK":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            Out of Stock
          </span>
        );
      case "ENQUIRE":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
            <Clock className="w-3 h-3" />
            Enquire for Availability
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Available
          </span>
        );
    }
  };

  const productUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/products/${product.slug}`
      : `/products/${product.slug}`;

  const whatsappUrl = getProductWhatsAppUrl({
    productName: product.name,
    modelNumber: product.modelNumber,
    productUrl,
  });

  return (
    <>
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col h-full overflow-hidden group">
        {/* Image Container */}
        <Link
          href={`/products/${product.slug}`}
          className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden block"
        >
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {renderAvailability()}
          </div>

          {product.category && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md tracking-wider uppercase">
                {product.category.name}
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Brand & Model */}
            {(product.brand || product.modelNumber) && (
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1.5">
                {product.brand && (
                  <span className="text-stone-700 font-semibold">{product.brand}</span>
                )}
                {product.brand && product.modelNumber && <span>•</span>}
                {product.modelNumber && (
                  <span className="bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-[11px] font-mono">
                    {product.modelNumber}
                  </span>
                )}
              </div>
            )}

            {/* Product Name */}
            <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#11341c] transition-colors leading-snug line-clamp-2">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Key Verified Specs highlights */}
            {keySpecs.length > 0 && (
              <div className="mt-3 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px]">
                {keySpecs.map(([key, val]) => (
                  <div key={key} className="bg-stone-50 rounded-lg p-1.5">
                    <span className="block text-stone-400 font-medium truncate">{key}</span>
                    <span className="block text-stone-800 font-semibold truncate">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA Buttons */}
          <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-stone-400 font-semibold">
                  Price
                </span>
                <span className="text-sm font-bold text-[#11341c] bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-md inline-block mt-0.5 border border-emerald-100">
                  {product.priceType === "FIXED" && product.price
                    ? `₹${Number(product.price).toLocaleString("en-IN")}`
                    : "Get Latest Price"}
                </span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="text-xs font-semibold text-stone-600 hover:text-[#11341c] underline underline-offset-2"
              >
                Send Enquiry
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={`/products/${product.slug}`}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#11341c] hover:bg-[#1f6133] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#d4b672]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {isModalOpen && (
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={{
            id: product.id,
            name: product.name,
            modelNumber: product.modelNumber,
          }}
        />
      )}
    </>
  );
}
