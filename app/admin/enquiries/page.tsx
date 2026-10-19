"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle2,
  Calendar,
  User,
  AlertCircle,
} from "lucide-react";
import { BUSINESS_INFO } from "@/lib/whatsapp";

interface EnquiryItem {
  id: string;
  customerName?: string | null;
  phone?: string | null;
  email?: string | null;
  message: string;
  source: string;
  status: string;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  async function fetchEnquiries() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, newStatus: string) {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Website Customer Enquiries
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Track customer price and stock requests submitted via public website modals and contact forms.
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchEnquiries()}
            placeholder="Search by customer name, phone, or keyword..."
            className="w-full pl-10 pr-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New (Unresolved)</option>
            <option value="CONTACTED">Contacted</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed / Resolved</option>
          </select>
        </div>

        <div className="sm:col-span-1">
          <button
            onClick={fetchEnquiries}
            className="w-full h-full bg-stone-800 hover:bg-stone-900 text-white py-2 rounded-xl text-xs font-semibold"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Enquiries List */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs text-stone-400">
            Loading customer enquiries...
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-400">
            No customer enquiries found matching the selected status.
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {enquiries.map((enq) => {
              const formattedDate = new Date(enq.createdAt).toLocaleString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              const whatsappReplyUrl = enq.phone
                ? `https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${enq.customerName || ""}, this is Prakash Agri Tools, Hyderabad. Following up on your enquiry regarding ${
                      enq.product?.name || "our agricultural equipment"
                    }.`
                  )}`
                : null;

              return (
                <div key={enq.id} className="p-5 sm:p-6 hover:bg-stone-50/50 transition-colors space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 text-[#11341c] flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-stone-900">
                          {enq.customerName || "Customer (Name not supplied)"}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{formattedDate}</span>
                          <span>•</span>
                          <span className="bg-stone-100 text-stone-600 px-1.5 py-0.2 rounded font-mono">
                            Source: {enq.source}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="flex items-center gap-3">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border focus:outline-none ${
                          enq.status === "NEW"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : enq.status === "CONTACTED"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : enq.status === "IN_PROGRESS"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        <option value="NEW">Status: New</option>
                        <option value="CONTACTED">Status: Contacted</option>
                        <option value="IN_PROGRESS">Status: In Progress</option>
                        <option value="CLOSED">Status: Closed</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Tag if exists */}
                  {enq.product && (
                    <div className="inline-flex items-center gap-1.5 bg-stone-100 text-stone-800 text-xs px-2.5 py-1 rounded-md font-medium">
                      <span>Product of interest:</span>
                      <span className="font-bold text-[#11341c]">{enq.product.name}</span>
                    </div>
                  )}

                  {/* Customer Message */}
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 leading-relaxed">
                    {enq.message}
                  </div>

                  {/* Actions / Direct Response */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    {enq.phone && (
                      <a
                        href={`tel:${enq.phone}`}
                        className="inline-flex items-center gap-1 font-semibold text-stone-700 hover:text-[#11341c]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
                        Call {enq.phone}
                      </a>
                    )}

                    {whatsappReplyUrl && (
                      <a
                        href={whatsappReplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Reply via WhatsApp
                      </a>
                    )}

                    {enq.email && (
                      <a
                        href={`mailto:${enq.email}`}
                        className="text-stone-500 hover:text-stone-800"
                      >
                        Email: {enq.email}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
