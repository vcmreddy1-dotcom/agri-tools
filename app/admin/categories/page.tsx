"use client";

import React, { useState, useEffect } from "react";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Save,
  X,
} from "lucide-react";

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  displayOrder: number;
  isActive: boolean;
  _count?: { products: number };
}

interface MainCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  displayOrder: number;
  parentCategoryId?: string | null;
  subcategories: SubCategory[];
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<MainCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<MainCategory> | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);
  const [displayOrder, setDisplayOrder] = useState("0");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        // Group hierarchy (parent categories with subcategories)
        const parents = data.filter((c: MainCategory) => !c.parentCategoryId);
        setCategories(parents);
        // Expand first by default
        if (parents.length > 0) {
          setExpandedCats({ [parents[0].id]: true });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function toggleExpand(id: string) {
    setExpandedCats((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function openCreateModal(parentId: string | null = null) {
    setEditingCat(null);
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
    setParentCategoryId(parentId);
    setDisplayOrder("0");
    setError("");
    setIsModalOpen(true);
  }

  function openEditModal(cat: MainCategory | SubCategory, parentId: string | null = null) {
    setEditingCat(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setImage((cat as MainCategory).image || "");
    setParentCategoryId(parentId);
    setDisplayOrder(String(cat.displayOrder || 0));
    setError("");
    setIsModalOpen(true);
  }

  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        id: editingCat?.id,
        name,
        slug: slug.trim(),
        description,
        image,
        parentCategoryId: parentCategoryId || null,
        displayOrder: Number(displayOrder),
      };

      const method = editingCat?.id ? "PUT" : "POST";
      const res = await fetch("/api/admin/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category");

      setIsModalOpen(false);
      fetchCategories();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Save failed";
      setError(msg);
    }
  }

  async function handleDeleteCategory(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Cannot delete category");
        return;
      }

      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Error deleting category");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            Categories & Subcategories Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Organize the 5 main equipment categories and 34 verified subcategories. Safety protections prevent deleting categories with assigned products.
          </p>
        </div>

        <button
          onClick={() => openCreateModal(null)}
          className="inline-flex items-center gap-2 bg-[#11341c] hover:bg-[#1f6133] text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#d4b672]" />
          <span>Add Main Category</span>
        </button>
      </div>

      {/* Categories Hierarchy List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 text-center text-xs text-stone-400 rounded-2xl border border-stone-200">
            Loading categories hierarchy...
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-white p-12 text-center text-xs text-stone-400 rounded-2xl border border-stone-200">
            No categories defined yet.
          </div>
        ) : (
          categories.map((parent) => {
            const isExpanded = expandedCats[parent.id] ?? false;
            const subCount = parent.subcategories?.length || 0;
            const totalProducts =
              (parent._count?.products || 0) +
              (parent.subcategories?.reduce(
                (sum, s) => sum + (s._count?.products || 0),
                0
              ) || 0);

            return (
              <div
                key={parent.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden"
              >
                {/* Parent Row */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-stone-50/60 hover:bg-stone-50 transition-colors">
                  <div
                    onClick={() => toggleExpand(parent.id)}
                    className="flex items-center gap-3 cursor-pointer flex-1"
                  >
                    <button className="text-stone-500 p-1">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm sm:text-base text-stone-900 font-serif">
                          {parent.name}
                        </span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {totalProducts} Products
                        </span>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        Slug: /{parent.slug} • {subCount} Subcategories
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openCreateModal(parent.id)}
                      className="px-2.5 py-1 text-xs font-semibold bg-stone-200/80 hover:bg-stone-300 rounded-lg text-stone-800 flex items-center gap-1"
                      title="Add subcategory inside this parent"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add Subcategory</span>
                    </button>
                    <button
                      onClick={() => openEditModal(parent, null)}
                      className="p-1.5 text-stone-600 hover:text-[#11341c] hover:bg-stone-200/50 rounded-lg"
                      title="Edit Category"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(parent.id, parent.name)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subcategories Accordion Content */}
                {isExpanded && parent.subcategories && (
                  <div className="p-4 sm:p-5 border-t border-stone-200/80 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {parent.subcategories.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-3 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-50 flex items-center justify-between gap-2"
                        >
                          <div>
                            <span className="block font-semibold text-xs text-stone-900">
                              {sub.name}
                            </span>
                            <span className="block text-[10px] text-stone-400 font-mono">
                              /{sub.slug} • {sub._count?.products || 0} products
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => openEditModal(sub, parent.id)}
                              className="p-1 text-stone-500 hover:text-[#11341c]"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(sub.id, sub.name)}
                              className="p-1 text-stone-400 hover:text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-stone-900 font-serif mb-4">
              {editingCat?.id ? "Edit Category" : parentCategoryId ? "Add Subcategory" : "Add Main Category"}
            </h3>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!editingCat?.id) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .trim()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/^-+|-+$/g, "")
                      );
                    }
                  }}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Slug (URL Path) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 text-stone-900"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2 text-xs font-semibold border border-stone-200 rounded-xl hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 text-xs font-bold bg-[#11341c] hover:bg-[#1f6133] text-white rounded-xl shadow-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
