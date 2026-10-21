"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Tractor,
} from "lucide-react";
import { BUSINESS_INFO, getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FacebookIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export default function ContactPage() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState("");

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
          message,
          source: "CONTACT_PAGE",
          honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setStatus("SUCCESS");
      setCustomerName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setErrorMessage(msg);
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      {/* Header */}
      <div className="bg-[#11341c] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            Showroom Enquiries & Machinery Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif">
            Contact Prakash Agri Tools
          </h1>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            Reach out directly for machinery pricing, tractor horsepower compatibility, seed drill calibrations, and genuine spare parts availability.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#11341c] font-serif">
              Send Website Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Fill out the form below. We will record your requirements and contact you promptly.
            </p>
          </div>

          {status === "SUCCESS" ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950 font-serif">
                Enquiry Successfully Registered!
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for contacting Prakash Agri Tools. Your enquiry has been saved and our Hyderabad showroom staff will reach out to you shortly.
              </p>
              <div className="pt-2">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect Instantly on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {status === "ERROR" && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Phone / WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 96660 39444"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
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
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Equipment Requirements / Machine Model <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please mention the machine name, tractor HP, crop or land details..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#11341c] hover:bg-[#1f6133] disabled:opacity-60 text-white py-2.5 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Send className="w-4 h-4 text-[#d4b672]" />
                <span>{loading ? "Registering Enquiry..." : "Send Message"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Verified Business Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm border border-stone-200">
                <Image
                  src="/logo-icon.png"
                  alt="Prakash Agri Tools Emblem"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-serif">
                Direct Contact Details
              </h3>
            </div>

            <div className="space-y-4 text-sm text-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Address</span>
                  <span>LB Nagar, Hyderabad, Telangana, India</span>
                  <span className="block text-xs text-stone-500 mt-0.5">
                    (Visit during business hours for live inspection)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Telephone</span>
                  <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-[#11341c] font-semibold hover:underline">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">WhatsApp Business</span>
                  <a
                    href={getGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    +91 96660 39444 (Click to Chat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-stone-900">Showroom Hours</span>
                  <span>Monday — Saturday: 9:30 AM to 7:30 PM</span>
                  <span className="block text-xs text-stone-500">Sunday: Call for appointment</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 sm:py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block">
                Stay Updated
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-serif">
                Follow Us on Social Media
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Watch machinery field demonstrations, walk-arounds, customer tractor setups, and dispatch updates.
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/90 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <InstagramIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-stone-900 group-hover:text-[#bc1888] transition-colors">
                    Instagram Profile
                  </span>
                  <span className="block text-xs text-stone-500 truncate">
                    {BUSINESS_INFO.social.instagramHandle}
                  </span>
                </div>
                <span className="text-xs font-semibold text-stone-600 group-hover:translate-x-0.5 transition-transform">
                  Follow →
                </span>
              </a>

              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/90 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                  <FacebookIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-sm font-bold text-stone-900 group-hover:text-[#1877F2] transition-colors">
                    Facebook Page
                  </span>
                  <span className="block text-xs text-stone-500 truncate">
                    Prakash Agri Tools & Machinery Updates
                  </span>
                </div>
                <span className="text-xs font-semibold text-stone-600 group-hover:translate-x-0.5 transition-transform">
                  Visit →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
