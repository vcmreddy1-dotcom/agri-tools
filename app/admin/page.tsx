import React from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Layers,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Eye,
  PlusCircle,
  ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/db";

export default async function AdminDashboardOverview() {
  const [
    totalPublished,
    totalDrafts,
    outOfStock,
    totalEnquiries,
    newEnquiriesCount,
    recentEnquiries,
    mainCategories,
    allProducts,
  ] = await Promise.all([
    prisma.product.count({ where: { published: true } }),
    prisma.product.count({ where: { published: false } }),
    prisma.product.count({ where: { availabilityStatus: "OUT_OF_STOCK" } }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: { product: { select: { name: true, slug: true } } },
    }),
    prisma.category.findMany({
      where: { parentCategoryId: null },
      include: {
        subcategories: {
          include: {
            _count: { select: { products: true } },
          },
        },
        _count: { select: { products: true } },
      },
      orderBy: { displayOrder: "asc" },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        technicalSpecifications: true,
        media: { select: { id: true } },
      },
    }),
  ]);

  // Check missing specs or images
  const productsMissingData = allProducts.filter(
    (p) =>
      !p.media ||
      p.media.length === 0 ||
      !p.technicalSpecifications ||
      p.technicalSpecifications.trim() === "" ||
      p.technicalSpecifications === "{}"
  );

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Dashboard Overview
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time machinery catalogue metrics and recent customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4 text-[#d4b672]" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* 4 Primary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Published Products
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {totalPublished}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Active on public catalogue
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Draft Products
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {totalDrafts}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Unpublished / pending review
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Out of Stock
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {outOfStock}
          </div>
          <span className="text-[11px] text-stone-500 block">
            Needs replenishment notice
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Customer Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#11341c] flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {totalEnquiries}
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold block">
            {newEnquiriesCount} New (Pending Response)
          </span>
        </div>
      </div>

      {/* Missing Specs Alert Box */}
      {productsMissingData.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Quality Action Required: {productsMissingData.length} Product(s) Missing Images or Specifications
            </h4>
            <p className="text-xs text-amber-800">
              The following products require verified photos or technical specification tables before showroom publishing:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {productsMissingData.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/products/${p.id}/edit`}
                  className="bg-white/80 hover:bg-white text-stone-800 px-2.5 py-1 rounded-md text-[11px] font-medium border border-amber-300"
                >
                  Edit {p.name} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Grid: Category Breakdown & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category breakdown */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Category Distribution
            </h3>
            <Link
              href="/admin/categories"
              className="text-xs font-semibold text-[#1f6133] hover:underline"
            >
              Manage Categories →
            </Link>
          </div>

          <div className="space-y-3">
            {mainCategories.map((parent) => {
              const subcatCount = parent.subcategories.reduce(
                (sum, s) => sum + s._count.products,
                0
              );
              const totalInParent = parent._count.products + subcatCount;

              return (
                <div
                  key={parent.id}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span>{parent.name}</span>
                    <span className="bg-white px-2 py-0.5 rounded border border-stone-200 text-[#11341c]">
                      {totalInParent} Products
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {parent.subcategories.length} Subcategories
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900 font-serif">
              Recent Website Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#1f6133] hover:underline"
            >
              View All Enquiries ({totalEnquiries}) →
            </Link>
          </div>

          {recentEnquiries.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">
                      {enq.customerName || "Anonymous Customer"}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        enq.status === "NEW"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : enq.status === "CONTACTED"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600">
                    <span>Phone: {enq.phone}</span>
                    {enq.product && (
                      <span className="text-[#11341c] font-semibold">
                        • Interested in: {enq.product.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-1 italic">
                    "{enq.message}"
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-400">
              No website enquiries recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
