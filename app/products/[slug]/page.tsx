import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, getProductBySlug, getProducts } from "@/lib/data";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import ProductDetailView from "@/components/ProductDetailView";
import { Layers, MessageSquare, ArrowRight, AlertCircle, Tractor } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Check Category first
  const category = await getCategoryBySlug(slug);
  if (category) {
    return {
      title: `${category.name} | Prakash Agri Tools Hyderabad`,
      description:
        category.description ||
        `Explore verified ${category.name} at Prakash Agri Tools, Hyderabad. Direct pricing and spare parts support.`,
    };
  }

  // Check Product
  const product = await getProductBySlug(slug);
  if (product) {
    return {
      title: product.seoTitle || `${product.name} | Prakash Agri Tools`,
      description:
        product.seoDescription ||
        product.shortDescription ||
        `Verified specifications, pricing, and availability for ${product.name} from Prakash Agri Tools, Hyderabad.`,
      openGraph: {
        title: product.name,
        description: product.shortDescription || undefined,
        images: product.media?.[0]?.mediaUrl ? [product.media[0].mediaUrl] : undefined,
      },
    };
  }

  return {
    title: "Page Not Found | Prakash Agri Tools",
  };
}

export default async function ProductOrCategoryPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Check if Category
  const category = await getCategoryBySlug(slug);
  if (category) {
    // Fetch products belonging to this category or its subcategories
    const products = await getProducts({ categorySlug: slug });

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            ...(category.parentCategory
              ? [
                  {
                    label: category.parentCategory.name,
                    href: `/products/${category.parentCategory.slug}`,
                  },
                ]
              : []),
            { label: category.name },
          ]}
        />

        {/* Category Header Hero */}
        <div className="bg-[#11341c] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
              {category.parentCategory ? category.parentCategory.name : "Core Equipment Category"}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-serif">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed max-w-2xl">
                {category.description}
              </p>
            )}
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-300">
              <span>Showing {products.length} verified products</span>
              <span>•</span>
              <a
                href={getGeneralWhatsAppUrl(`Hello Prakash Agri Tools, I am enquiring about ${category.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4b672] font-semibold hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Ask Availability on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Subcategories Filter Tabs if Parent Category */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Subcategories ({category.subcategories.length})
              </span>
              <Link href="/products" className="text-xs font-semibold text-[#1f6133] hover:underline">
                View All Categories →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/products/${category.slug}`}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#11341c] text-white"
              >
                All {category.name}
              </Link>
              {category.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/products?category=${sub.slug}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm text-stone-500">
              <div>
                Displaying <span className="font-bold text-stone-900">{products.length}</span>{" "}
                verified machinery models
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#11341c] flex items-center justify-center mx-auto">
              <Tractor className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Looking for {category.name}?
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We regularly source and service {category.name} in our Hyderabad showroom. Contact our team directly on WhatsApp for current stock, horsepower compatibility, and delivery.
            </p>
            <div className="pt-2">
              <a
                href={getGeneralWhatsAppUrl(`Hello Prakash Agri Tools, do you have ${category.name} currently in stock?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#d4b672]" />
                Enquire for {category.name} on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Check if Product
  const product = await getProductBySlug(slug);
  if (product) {
    const related = product.category?.products || [];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Products", href: "/products" },
            ...(product.category?.parentCategory
              ? [
                  {
                    label: product.category.parentCategory.name,
                    href: `/products/${product.category.parentCategory.slug}`,
                  },
                ]
              : []),
            ...(product.category
              ? [
                  {
                    label: product.category.name,
                    href: `/products/${product.category.slug}`,
                  },
                ]
              : []),
            { label: product.name },
          ]}
        />

        <ProductDetailView product={product} relatedProducts={related} />
      </div>
    );
  }

  // 3. Not found
  notFound();
}
