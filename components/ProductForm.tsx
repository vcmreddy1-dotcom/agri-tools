"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
  Eye,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  parentCategoryId?: string | null;
  parentCategory?: { name: string } | null;
  subcategories?: { id: string; name: string }[];
}

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    slug?: string;
    brand?: string | null;
    modelNumber?: string | null;
    shortDescription?: string | null;
    description?: string | null;
    categoryId: string;
    priceType: string;
    price?: unknown;
    availabilityStatus: string;
    technicalSpecifications?: string | null;
    applications?: string | null;
    featured: boolean;
    published: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    media?: { mediaUrl: string; altText?: string | null }[];
  };
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [brand, setBrand] = useState(initialData?.brand || "Prakash Agro");
  const [modelNumber, setModelNumber] = useState(initialData?.modelNumber || "");
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || "");
  const [priceType, setPriceType] = useState(initialData?.priceType || "ENQUIRY_ONLY");
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : "");
  const [availabilityStatus, setAvailabilityStatus] = useState(initialData?.availabilityStatus || "AVAILABLE");
  const [applications, setApplications] = useState(initialData?.applications || "");
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [published, setPublished] = useState(initialData?.published !== undefined ? initialData.published : true);
  const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || "");

  // Media
  const [mediaList, setMediaList] = useState<{ mediaUrl: string; altText?: string | null }[]>(
    initialData?.media || []
  );
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);

  // Specifications key-value pairs
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(() => {
    if (initialData?.technicalSpecifications) {
      try {
        const obj = JSON.parse(initialData.technicalSpecifications);
        return Object.entries(obj).map(([k, v]) => ({ key: k, value: String(v) }));
      } catch {
        return [{ key: "Tractor HP Requirement", value: "45 HP" }];
      }
    }
    return [
      { key: "Tractor HP Requirement", value: "35 - 50 HP" },
      { key: "Working Width", value: "180 cm" },
      { key: "Weight", value: "420 kg" },
    ];
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (!categoryId && data.length > 0) {
            // Pick first subcategory if available
            const sub = data.find((c) => c.parentCategoryId);
            if (sub) setCategoryId(sub.id);
            else setCategoryId(data[0].id);
          }
        }
      })
      .catch(console.error);
  }, [categoryId]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      setMediaList((prev) => [...prev, { mediaUrl: data.url, altText: name }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
    }
  }

  function handleAddImageUrl() {
    if (imageUrlInput.trim()) {
      setMediaList((prev) => [...prev, { mediaUrl: imageUrlInput.trim(), altText: name }]);
      setImageUrlInput("");
    }
  }

  function handleRemoveMedia(index: number) {
    setMediaList((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleAddSpecRow() {
    setSpecs((prev) => [...prev, { key: "", value: "" }]);
  }

  function handleRemoveSpecRow(index: number) {
    setSpecs((prev) => prev.filter((_, idx) => idx !== index));
  }

  function handleSpecChange(index: number, field: "key" | "value", val: string) {
    setSpecs((prev) => {
      const copy = [...prev];
      copy[index][field] = val;
      return copy;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      // Build specs JSON object
      const specsObject: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          specsObject[s.key.trim()] = s.value.trim();
        }
      });

      const payload = {
        name,
        slug: slug.trim() || undefined,
        brand,
        modelNumber,
        shortDescription,
        description,
        categoryId,
        priceType,
        price: price ? Number(price) : null,
        availabilityStatus,
        technicalSpecifications: JSON.stringify(specsObject),
        applications,
        featured,
        published,
        seoTitle,
        seoDescription,
        media: mediaList,
      };

      const url = isEdit ? `/api/admin/products/${initialData?.id}` : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/products");
        router.refresh();
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setError(msg);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              {isEdit ? `Edit: ${name}` : "Add New Agricultural Machinery"}
            </h1>
            <p className="text-xs text-stone-500">
              Provide verified technical specifications, media photos, and availability.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] disabled:opacity-60 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
        >
          <Save className="w-4 h-4 text-[#d4b672]" />
          <span>{saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Product"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Product saved successfully! Redirecting...</span>
        </div>
      )}

      {/* Basic Info Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          1. General Product Identification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rotary Tiller — Robusto 6FT"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Custom URL Slug (Leave blank to auto-generate)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. rotary-tiller-robusto-6ft"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Brand / Manufacturer
            </label>
            <input
              type="text"
              value={brand || ""}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Prakash Agro"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Model Number / Code
            </label>
            <input
              type="text"
              value={modelNumber || ""}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="e.g. PAT-ROB-6FT"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Category Assignment <span className="text-rose-500">*</span>
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.parentCategory ? `${c.parentCategory.name} > ${c.name}` : c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Short Summary Description (for cards and previews)
          </label>
          <input
            type="text"
            value={shortDescription || ""}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="One-line summary of equipment utility..."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Full Description
          </label>
          <textarea
            rows={4}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprehensive description of implement, gearbox durability, chassis design..."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
          />
        </div>
      </div>

      {/* Pricing & Availability */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          2. Pricing & Stock Settings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Pricing Display Mode
            </label>
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
            >
              <option value="ENQUIRY_ONLY">Get Latest Price (Showroom Quote)</option>
              <option value="FIXED">Fixed Price (₹)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Price in INR (if Fixed)
            </label>
            <input
              type="number"
              disabled={priceType === "ENQUIRY_ONLY"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 115000"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Stock Availability
            </label>
            <select
              value={availabilityStatus}
              onChange={(e) => setAvailabilityStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900 bg-white"
            >
              <option value="AVAILABLE">Available</option>
              <option value="ENQUIRE">Enquire for Availability</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-[#11341c] rounded"
            />
            <span>Mark as Featured Product (Display on Homepage)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-[#11341c] rounded"
            />
            <span>Published (Visible to public)</span>
          </label>
        </div>
      </div>

      {/* Media Uploads */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
          3. Product Photos & Media
        </h2>

        {/* Existing photos */}
        {mediaList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {mediaList.map((m, idx) => (
              <div
                key={idx}
                className="relative aspect-4/3 rounded-xl overflow-hidden border border-stone-200 group"
              >
                <img
                  src={m.mediaUrl}
                  alt={m.altText || `Photo ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveMedia(idx)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 text-white opacity-90 hover:opacity-100 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload or Add URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center hover:border-[#11341c] transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center space-y-1.5"
            >
              <Upload className="w-6 h-6 text-[#11341c]" />
              <span className="text-xs font-bold text-stone-800">
                {uploading ? "Uploading Image..." : "Upload Photo from Device"}
              </span>
              <span className="text-[11px] text-stone-400">
                JPEG, PNG, WebP up to 10MB
              </span>
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700">
              Or Attach Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#11341c] text-stone-900"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="bg-stone-800 hover:bg-stone-900 text-white px-3 py-2 rounded-xl text-xs font-semibold shrink-0"
              >
                Add URL
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Technical Specifications */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <h2 className="text-base font-bold text-stone-900">
            4. Technical Specifications (Category Specific)
          </h2>
          <button
            type="button"
            onClick={handleAddSpecRow}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f6133] hover:underline"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Specification Field</span>
          </button>
        </div>

        <div className="space-y-2">
          {specs.map((s, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <input
                type="text"
                value={s.key}
                onChange={(e) => handleSpecChange(idx, "key", e.target.value)}
                placeholder="Specification (e.g. Working Width)"
                className="w-1/2 px-3 py-2 text-xs rounded-xl border border-stone-200 text-stone-900"
              />
              <input
                type="text"
                value={s.value}
                onChange={(e) => handleSpecChange(idx, "value", e.target.value)}
                placeholder="Value (e.g. 180 cm / 6 Feet)"
                className="w-1/2 px-3 py-2 text-xs rounded-xl border border-stone-200 text-stone-900 font-semibold"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpecRow(idx)}
                className="p-2 text-stone-400 hover:text-rose-600 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            Applications & Crops (Comma-separated)
          </label>
          <input
            type="text"
            value={applications || ""}
            onChange={(e) => setApplications(e.target.value)}
            placeholder="e.g. Wheat, Paddy, Cotton, Soil Pulverization"
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900"
          />
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
        <Link
          href="/admin/products"
          className="px-5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] disabled:opacity-60 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
        >
          <Save className="w-4 h-4 text-[#d4b672]" />
          <span>{saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Product"}</span>
        </button>
      </div>
    </form>
  );
}
