import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS_INFO } from "@/lib/whatsapp";

export const metadata = {
  title: "Privacy Policy | Prakash Agri Tools",
  description: "Privacy Policy for Prakash Agri Tools website and customer enquiry services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-sm space-y-6 text-stone-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-extrabold text-[#11341c] font-serif">
          Privacy Policy
        </h1>
        <p className="text-xs text-stone-500">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">1. Information We Collect</h2>
          <p>
            Prakash Agri Tools collects information provided directly by you when you use our website, including when you submit an equipment enquiry, request a price quote, or message us via WhatsApp. This may include your full name, phone number, email address, location, and equipment requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">2. How We Use Your Information</h2>
          <p>
            We use your personal details strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
            <li>Respond to your product enquiries and confirm pricing, horsepower matching, and stock availability.</li>
            <li>Provide customer support regarding machinery delivery, maintenance, or spare parts.</li>
            <li>Protect our systems against spam, fraudulent enquiries, and unauthorized access.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">3. Data Sharing & Security</h2>
          <p>
            We do not sell, trade, or rent your personal contact information to third-party marketing brokers. Your enquiry data is accessible only by authorized showroom personnel for legitimate customer service purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">4. Contacting Us Regarding Privacy</h2>
          <p>
            If you have questions regarding your data or wish to have your contact details updated or removed from our enquiry records, please contact us at:
          </p>
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
            <span className="font-bold text-stone-900 block">{BUSINESS_INFO.name}</span>
            <span>Location: {BUSINESS_INFO.location}</span>
            <br />
            <span>Phone: {BUSINESS_INFO.phoneDisplay}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
