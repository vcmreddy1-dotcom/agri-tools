import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getProducts, getMainCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Search, Filter, Layers, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata = {
  title: "All Agricultural Machinery & Products Catalogue",
  description:
    "Explore our complete range of agricultural implements, seed drills, rotavators, sprayers, garden power tools, and genuine spare parts in Hyderabad.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    availability?: string;
    sort?: string;
  }>;
}) {
  const { category, search, availability, sort } = await searchParams;

  const [products, mainCategories] = await Promise.all([
    getProducts({
      categorySlug: category,
      search,
      availability,
      sort,
    }),
    getMainCategories(),
  ]);

  // Find active category if filtered
  let activeCategoryName = "All Products";
  if (category) {
    const matched = await prisma.category.findUnique({
      where: { slug: category },
      select: { name: true, parentCategory: { select: { name: true } } },
    });
    if (matched) {
      activeCategoryName = matched.parentCategory
        ? `${matched.parentCategory.name} > ${matched.name}`
        : matched.name;
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          ...(category ? [{ label: activeCategoryName }] : []),
        ]}
      />

      {/* Header Banner */}
      <div className="bg-[#11341c] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
            Verified Machinery Catalogue
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-serif">
            {activeCategoryName}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Discover verified agricultural machinery, implements, sprayers, and genuine spare parts. Click any item to view specifications or enquire for the latest price on WhatsApp.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
        <form method="GET" action="/products" className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword search */}
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Search by name, model (e.g. 9 Tyne, Robusto, 300L)..."
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
            />
          </div>

          {/* Category selector */}
          <div className="sm:col-span-4">
            <select
              name="category"
              defaultValue={category || ""}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
            >
              <option value="">All Categories & Subcategories</option>
              {mainCategories.map((main) => (
                <optgroup key={main.id} label={main.name}>
                  <option value={main.slug}>All {main.name}</option>
                  {main.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.slug}>
                      — {sub.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Availability filter */}
          <div className="sm:col-span-2">
            <select
              name="availability"
              defaultValue={availability || ""}
              className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
            >
              <option value="">Any Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="ENQUIRE">Enquire Availability</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>

          {/* Submit button */}
          <div className="sm:col-span-1">
            <button
              type="submit"
              className="w-full h-full bg-[#11341c] hover:bg-[#1f6133] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center transition-colors"
            >
              Filter
            </button>
          </div>
        </form>

        {/* Quick Main Categories Pills */}
        <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-semibold shrink-0">Categories:</span>
          <Link
            href="/products"
            className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
              !category
                ? "bg-[#11341c] text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            All Products
          </Link>
          {mainCategories.map((c) => (
            <Link
              key={c.id}
              href={`/products/${c.slug}`}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-medium transition-colors ${
                category === c.slug
                  ? "bg-[#11341c] text-white"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Results Count & Sort */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500">
        <div>
          Showing <span className="font-bold text-stone-900">{products.length}</span>{" "}
          machinery item{products.length === 1 ? "" : "s"} in catalogue
        </div>
        {(category || search || availability) && (
          <Link
            href="/products"
            className="text-xs font-semibold text-[#1f6133] hover:underline"
          >
            Clear all filters
          </Link>
        )}
      </div>

      {/* Product Grid or Empty State */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            No matching products found
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            We couldn't find any equipment matching your criteria. Try adjusting your search keywords, category, or contact our Hyderabad showroom directly for unlisted machinery.
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#11341c] text-white px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Reset Filters
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
