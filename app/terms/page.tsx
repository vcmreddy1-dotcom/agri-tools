import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BUSINESS_INFO } from "@/lib/whatsapp";

export const metadata = {
  title: "Terms and Conditions | Prakash Agri Tools",
  description: "Terms and conditions of catalogue usage and enquiry services for Prakash Agri Tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Terms and Conditions" }]} />

      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-sm space-y-6 text-stone-700 text-sm leading-relaxed">
        <h1 className="text-3xl font-extrabold text-[#11341c] font-serif">
          Terms & Conditions
        </h1>
        <p className="text-xs text-stone-500">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">1. Nature of the Website</h2>
          <p>
            The website of Prakash Agri Tools serves primarily as an informational product showroom and enquiry platform. It is not an automated payment marketplace or direct e-commerce checkout site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">2. Pricing & Availability</h2>
          <p>
            Products are marked with "Get Latest Price" or verified showroom prices. Prices in agricultural implements fluctuate based on steel raw material costs, freight, horsepower configurations, and attached accessories. Final prices, warranty terms, and stock status are confirmed directly upon enquiry with Prakash Agri Tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">3. Technical Specifications</h2>
          <p>
            All listed technical specifications (such as working width, number of tynes, disc diameters, and HP requirements) are provided based on verified manufacturer guidelines. Customers are advised to confirm specific tractor linkage compatibility before purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-stone-900">4. Applicable Law</h2>
          <p>
            Any disputes arising from business transactions shall be subject to the jurisdiction of courts in Hyderabad, Telangana, India.
          </p>
        </section>
      </div>
    </div>
  );
}
