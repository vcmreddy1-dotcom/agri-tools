"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, MessageSquare, Phone, AlertCircle } from "lucide-react";
import { getProductWhatsAppUrl, BUSINESS_INFO } from "@/lib/whatsapp";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: {
    id: string;
    name: string;
    modelNumber?: string | null;
  } | null;
}

export default function EnquiryModal({ isOpen, onClose, product }: EnquiryModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    product
      ? `Hello, please provide current price, availability, and technical details for ${product.name}.`
      : "Hello, I would like to enquire about your machinery availability and pricing."
  );
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          email,
          productId: product?.id || null,
          message,
          source: product ? "PRODUCT_MODAL" : "GENERAL_ENQUIRY",
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setStatus("SUCCESS");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setErrorMessage(msg);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  }

  const whatsappUrl = product
    ? getProductWhatsAppUrl({
        productName: product.name,
        modelNumber: product.modelNumber,
      })
    : `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
        `Hello Prakash Agri Tools, my name is ${customerName || "Customer"}. I would like to enquire about your agricultural equipment.`
      )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "SUCCESS" ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-serif">
              Enquiry Received!
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-stone-900">{customerName}</span>. Your enquiry has been registered in our database. Our team will contact you at{" "}
              <span className="font-semibold text-stone-900">{phone}</span> shortly.
            </p>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Also Chat on WhatsApp Now
              </a>

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block mb-1">
                Direct Machinery Enquiry
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#11341c] font-serif">
                {product ? `Enquire for ${product.name}` : "Enquire with Prakash Agri Tools"}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Share your contact details. Our Hyderabad team will verify stock and current price for you.
              </p>
            </div>

            {status === "ERROR" && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Enquiry Details & Location <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] disabled:opacity-60 text-white py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
                >
                  <Send className="w-4 h-4 text-[#d4b672]" />
                  <span>{loading ? "Submitting..." : "Submit Enquiry"}</span>
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-stone-500 pt-1">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="flex items-center gap-1 hover:text-[#11341c]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                    Call: +91 96660 39444
                  </a>
                  <span>•</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
