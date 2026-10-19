"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Tractor,
  Layers,
  Share2,
  Calendar,
  Send,
} from "lucide-react";
import { getProductWhatsAppUrl, BUSINESS_INFO } from "@/lib/whatsapp";
import EnquiryModal from "@/components/EnquiryModal";
import ProductCard from "@/components/ProductCard";

interface ProductDetailViewProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brand?: string | null;
    modelNumber?: string | null;
    shortDescription?: string | null;
    description?: string | null;
    priceType?: string | null;
    price?: unknown;
    currency?: string;
    availabilityStatus?: string;
    technicalSpecifications?: string | null;
    applications?: string | null;
    category?: {
      id: string;
      name: string;
      slug: string;
      parentCategory?: { name: string; slug: string } | null;
      products?: unknown[];
    } | null;
    media: { id: string; mediaUrl: string; altText?: string | null }[];
  };
  relatedProducts: unknown[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Parse specifications JSON
  let specsObj: Record<string, string> = {};
  if (product.technicalSpecifications) {
    try {
      specsObj = JSON.parse(product.technicalSpecifications);
    } catch {
      // ignore
    }
  }

  const images =
    product.media && product.media.length > 0
      ? product.media
      : [
          {
            id: "fallback",
            mediaUrl:
              "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=80",
            altText: product.name,
          },
        ];

  const currentImage = images[selectedImageIndex] || images[0];

  const productUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://prakashagritools.com/products/${product.slug}`;

  const whatsappUrl = getProductWhatsAppUrl({
    productName: product.name,
    modelNumber: product.modelNumber,
    productUrl,
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderAvailabilityBadge = () => {
    switch (product.availabilityStatus) {
      case "OUT_OF_STOCK":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5" />
            Out of Stock
          </span>
        );
      case "ENQUIRE":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Enquire for Availability
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Stock Available
          </span>
        );
    }
  };

  return (
    <div className="space-y-12">
      {/* Product Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo */}
          <div className="relative aspect-4/3 w-full bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs group">
            <img
              src={currentImage.mediaUrl}
              alt={currentImage.altText || product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 z-10">
              {renderAvailabilityBadge()}
            </div>
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-xs text-stone-700 hover:text-stone-900 p-2 rounded-full shadow-xs border border-stone-200 text-xs flex items-center gap-1"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
              {copied && <span className="font-semibold text-emerald-700">Copied!</span>}
            </button>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? "border-[#11341c] ring-2 ring-[#11341c]/20"
                      : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.mediaUrl}
                    alt={img.altText || `View ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Enquiry Box */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Brand Header */}
            <div className="flex items-center gap-2 flex-wrap">
              {product.category && (
                <Link
                  href={`/products/${product.category.slug}`}
                  className="bg-emerald-50 text-[#11341c] hover:bg-emerald-100 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                >
                  {product.category.name}
                </Link>
              )}
              {product.brand && (
                <span className="text-stone-500 text-xs font-semibold">
                  Brand: <span className="text-stone-800">{product.brand}</span>
                </span>
              )}
              {product.modelNumber && (
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded text-xs font-mono font-medium">
                  Model: {product.modelNumber}
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 font-serif leading-tight">
              {product.name}
            </h1>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-sm text-stone-600 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Pricing Section (Default: Get Latest Price) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold block">
                Showroom Price & Availability
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#11341c] font-serif">
                  {product.priceType === "FIXED" && product.price
                    ? `₹${Number(product.price).toLocaleString("en-IN")}`
                    : "Get Latest Price"}
                </span>
                <span className="text-xs text-stone-500">
                  (Direct showroom quote with warranty)
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Prices vary according to HP tractor matching, blade configuration, and accessories. Enquire below for today's price.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-[#d4b672]" />
                <span>Enquire on WhatsApp</span>
              </a>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d4b472] text-[#091a0e] py-3.5 px-6 rounded-2xl font-bold text-sm shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Web Enquiry</span>
              </button>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-stone-600 pt-1">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-[#11341c] font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                Direct Call: +91 96660 39444
              </a>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#11341c]" />
                LB Nagar Showroom, Hyderabad
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Verified Technical Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Detailed Overview & Applications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-stone-900 font-serif">
              Equipment Overview
            </h2>
            <div className="text-sm text-stone-700 leading-relaxed space-y-3 whitespace-pre-line">
              {product.description || product.shortDescription}
            </div>

            {product.applications && (
              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 mb-2">
                  Recommended Applications & Crops
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.split(",").map((app, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-50 text-emerald-900 border border-emerald-100 text-xs px-3 py-1 rounded-lg font-medium"
                    >
                      {app.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Verified Technical Specifications Table */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                Technical Specifications
              </h2>
              <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded font-semibold uppercase">
                Verified
              </span>
            </div>

            {Object.keys(specsObj).length > 0 ? (
              <div className="divide-y divide-stone-100 text-xs">
                {Object.entries(specsObj).map(([key, val]) => (
                  <div key={key} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="font-medium text-stone-500">{key}</span>
                    <span className="font-bold text-stone-900 text-right">{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 py-4 text-center">
                Detailed technical specifications sheet available upon enquiry.
              </p>
            )}

            <div className="pt-4 border-t border-stone-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 rounded-xl font-semibold text-xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#11341c]" />
                <span>Ask Technical Clarification on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Machinery in Same Category */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                Similar Machinery
              </span>
              <h2 className="text-2xl font-bold text-[#11341c] font-serif">
                Related Equipment
              </h2>
            </div>
            {product.category && (
              <Link
                href={`/products/${product.category.slug}`}
                className="text-xs font-semibold text-[#1f6133] hover:underline"
              >
                View all {product.category.name} →
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(relatedProducts as any[]).map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}

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
    </div>
  );
}
