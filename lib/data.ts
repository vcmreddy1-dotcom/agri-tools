import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type CategoryDetail = Prisma.CategoryGetPayload<{
  include: {
    parentCategory: true;
    subcategories: {
      where: { isActive: true };
      orderBy: { displayOrder: "asc" };
      include: {
        _count: { select: { products: { where: { published: true } } } };
      };
    };
    _count: {
      select: { products: { where: { published: true } } };
    };
  };
}>;

export interface CategoryWithSubcategories {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentCategoryId?: string | null;
  displayOrder: number;
  isActive?: boolean;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    displayOrder?: number;
    isActive?: boolean;
    _count: {
      products: number;
    };
  }[];
  _count: {
    products: number;
  };
}

const FALLBACK_CATEGORIES: CategoryWithSubcategories[] = [
  {
    id: "cat-1",
    name: "LAND PREPARATION",
    slug: "land-preparation",
    description:
      "Primary & secondary tillage machinery: Reversible ploughs, disc harrows, cultivators, rotavators, and laser levelers.",
    image: "/website-photos/agricultural-machinery-rotary-tiller-tractor-rotovator.avif",
    displayOrder: 1,
    subcategories: [
      { id: "sub-1", name: "Reversible Plough", slug: "reversible-plough", _count: { products: 1 } },
      { id: "sub-2", name: "Hydraulic Reversible Plough", slug: "hydraulic-reversible-plough", _count: { products: 1 } },
      { id: "sub-3", name: "Manual Reversible Plough", slug: "manual-reversible-plough", _count: { products: 1 } },
      { id: "sub-4", name: "Harrow Mounted", slug: "harrow-mounted", _count: { products: 1 } },
      { id: "sub-5", name: "Disc Harrow", slug: "disc-harrows", _count: { products: 1 } },
      { id: "sub-6", name: "Disc Plough", slug: "disc-ploughs", _count: { products: 1 } },
      { id: "sub-7", name: "MB Plough", slug: "mb-plough", _count: { products: 1 } },
      { id: "sub-8", name: "Cultivator", slug: "cultivators", _count: { products: 1 } },
      { id: "sub-9", name: "Rotavator", slug: "rotavators", _count: { products: 1 } },
      { id: "sub-10", name: "Chisel Plough / Sizzle", slug: "chisel-plough", _count: { products: 1 } },
      { id: "sub-11", name: "Levelers", slug: "levelers", _count: { products: 1 } },
      { id: "sub-12", name: "Laser Land Levelers", slug: "laser-land-levelers", _count: { products: 1 } },
      { id: "sub-13", name: "Bund Farmers / Bund Makers", slug: "disc-ridgers-bund-makers", _count: { products: 1 } },
      { id: "sub-14", name: "Sub Soiler", slug: "sub-soiler", _count: { products: 1 } },
    ],
    _count: { products: 14 },
  },
  {
    id: "cat-2",
    name: "SOWING & PLANTING",
    slug: "sowing-planting",
    description:
      "Precision seed drilling, multicrop planters, pneumatic and zero-till DSR equipment.",
    image: "/website-photos/maschiogaspardopneumaticplantervacuumprecisionsp4rows.webp",
    displayOrder: 2,
    subcategories: [
      { id: "sub-15", name: "Manual Seeder", slug: "manual-seeder", _count: { products: 1 } },
      { id: "sub-16", name: "Seed Doubler", slug: "seed-doubler", _count: { products: 1 } },
      { id: "sub-17", name: "Manual Seed Drill", slug: "manual-seed-drill", _count: { products: 1 } },
      { id: "sub-18", name: "Animal Drawn Seed Drill", slug: "animal-drawn-seed-drill", _count: { products: 1 } },
      { id: "sub-19", name: "Mini Tractor Seed Drill / Planters", slug: "mini-tractor-seed-drill-planters", _count: { products: 1 } },
      { id: "sub-20", name: "Tractor Drawn Seed Drill / Planters", slug: "tractor-drawn-seed-drill-planters", _count: { products: 1 } },
      { id: "sub-21", name: "Seed Drills", slug: "seed-drills", _count: { products: 1 } },
      { id: "sub-22", name: "Turbo Seeder", slug: "turbo-seeder", _count: { products: 1 } },
      { id: "sub-23", name: "Potato / Turmeric Planters", slug: "potato-turmeric-planters", _count: { products: 1 } },
      { id: "sub-24", name: "Maize Planters", slug: "maize-planters", _count: { products: 1 } },
      { id: "sub-25", name: "Onion Planters", slug: "onion-planters", _count: { products: 1 } },
      { id: "sub-26", name: "Broad Bed Furrow Planters", slug: "broad-bed-furrow-planters", _count: { products: 1 } },
      { id: "sub-27", name: "Multicrop Precision Seed cum Fertilizer Planter", slug: "multicrop-precision-seed-cum-fertilizer-planter", _count: { products: 1 } },
      { id: "sub-28", name: "Zero Till Drill / DSR", slug: "zero-till-drill-dsr", _count: { products: 1 } },
      { id: "sub-29", name: "Pneumatic Planter", slug: "pneumatic-planter", _count: { products: 1 } },
      { id: "sub-30", name: "Raised Bed Planters", slug: "raised-bed-planters", _count: { products: 1 } },
    ],
    _count: { products: 16 },
  },
  {
    id: "cat-3",
    name: "PLANT PROTECTION",
    slug: "plant-protection",
    description:
      "Crop protection sprayers, battery knapsacks, solar units, and tractor boom sprayers.",
    image: "/website-photos/high-ground-clearance-self-propelled-boom-sprayer-with-50hp-engine.avif",
    displayOrder: 3,
    subcategories: [
      { id: "sub-31", name: "Manual Sprayers", slug: "manual-sprayers", _count: { products: 1 } },
      { id: "sub-32", name: "Solar Sprayer", slug: "solar-sprayers", _count: { products: 3 } },
      { id: "sub-33", name: "Knapsack Sprayer", slug: "knapsack-sprayers", _count: { products: 1 } },
      { id: "sub-34", name: "Battery Sprayer", slug: "battery-sprayers", _count: { products: 1 } },
      { id: "sub-35", name: "Motorised Sprayers", slug: "power-sprayers", _count: { products: 2 } },
      { id: "sub-36", name: "Mist Blowers", slug: "mist-blowers", _count: { products: 1 } },
      { id: "sub-37", name: "Knapsack Sprayer with Honda Engine", slug: "knapsack-sprayer-honda-engine", _count: { products: 1 } },
      { id: "sub-38", name: "HTP Sprayers", slug: "htp-sprayers", _count: { products: 1 } },
      { id: "sub-39", name: "Tractor Mounted Sprayers", slug: "tractor-mounted-sprayers", _count: { products: 1 } },
      { id: "sub-40", name: "Boom Sprayers", slug: "300l-sprayers", _count: { products: 2 } },
      { id: "sub-41", name: "Self Propelled Boom Sprayers", slug: "self-propelled-boom-sprayers", _count: { products: 1 } },
      { id: "sub-42", name: "Tank Sprayers", slug: "tank-sprayers", _count: { products: 1 } },
      { id: "sub-43", name: "Fertilizer Spreaders", slug: "fertilizer-spreaders", _count: { products: 1 } },
    ],
    _count: { products: 13 },
  },
  {
    id: "cat-4",
    name: "WEEDING",
    slug: "weeding",
    description:
      "Mechanical & motorized weed management, cycle weeders, power tillers, and shredders.",
    image: "/website-photos/honda-fj500-power-weeder-500x500.webp",
    displayOrder: 4,
    subcategories: [
      { id: "sub-44", name: "Manual Weeders", slug: "manual-weeders", _count: { products: 1 } },
      { id: "sub-45", name: "Cycle Weeders", slug: "cycle-weeders", _count: { products: 1 } },
      { id: "sub-46", name: "Kono Weeders", slug: "kono-weeders", _count: { products: 1 } },
      { id: "sub-47", name: "Paddy Weeders 2 Row", slug: "paddy-weeders", _count: { products: 2 } },
      { id: "sub-48", name: "Power Weeder", slug: "weeders", _count: { products: 2 } },
      { id: "sub-49", name: "Power Tiller / Mini Tillers", slug: "mini-tillers", _count: { products: 2 } },
      { id: "sub-50", name: "Brush Cutters", slug: "brush-cutters", _count: { products: 3 } },
      { id: "sub-51", name: "Slashers", slug: "slashers", _count: { products: 3 } },
      { id: "sub-52", name: "Mulchers", slug: "mulchers", _count: { products: 2 } },
    ],
    _count: { products: 9 },
  },
  {
    id: "cat-5",
    name: "CROP HARVESTING",
    slug: "crop-harvesting",
    description:
      "Reaping & harvesting machinery: sickles, palm chisels, carbon poles, and rippers.",
    image: "/website-photos/gam-crawler-combine-harvester-2200mm-cutting-width-hst-transmission-rubber-tracked-2242206656-mus3n4bw.avif",
    displayOrder: 5,
    subcategories: [
      { id: "sub-53", name: "Sickle", slug: "sickle", _count: { products: 1 } },
      { id: "sub-54", name: "Chisels for Palm Oil", slug: "chisels-for-palm-oil", _count: { products: 1 } },
      { id: "sub-55", name: "Telescopic Pole Carbon", slug: "telescopic-pole-carbon", _count: { products: 1 } },
      { id: "sub-56", name: "Aluminium Poles", slug: "aluminium-poles", _count: { products: 1 } },
      { id: "sub-57", name: "Mini Harvesters", slug: "mini-harvesters", _count: { products: 1 } },
      { id: "sub-58", name: "Rippers", slug: "rippers", _count: { products: 1 } },
      { id: "sub-59", name: "Tractor Mounted Rippers", slug: "tractor-mounted-rippers", _count: { products: 1 } },
      { id: "sub-60", name: "Tractor Mounted Harvesters", slug: "tractor-mounted-harvesters", _count: { products: 1 } },
      { id: "sub-61", name: "Track Harvesters", slug: "track-harvesters", _count: { products: 1 } },
    ],
    _count: { products: 9 },
  },
  {
    id: "cat-6",
    name: "POST HARVESTING",
    slug: "post-harvesting",
    description:
      "Threshing, grain cleaning, balers, winnowers, and fodder chaff cutting machines.",
    image: "/website-photos/round-straw-baler-jrb310.jpg",
    displayOrder: 6,
    subcategories: [
      { id: "sub-62", name: "Winnowing Fan", slug: "winnowing-fan", _count: { products: 1 } },
      { id: "sub-63", name: "Multi Threshers", slug: "multi-threshers", _count: { products: 1 } },
      { id: "sub-64", name: "Maize Shellers", slug: "maize-shellers", _count: { products: 1 } },
      { id: "sub-65", name: "Maize Dehusker", slug: "maize-dehusker", _count: { products: 1 } },
      { id: "sub-66", name: "Groundnut Thresher", slug: "groundnut-thresher", _count: { products: 1 } },
      { id: "sub-67", name: "Spreaders", slug: "spreaders", _count: { products: 1 } },
      { id: "sub-68", name: "Round Balers", slug: "round-balers", _count: { products: 1 } },
      { id: "sub-69", name: "Square Balers", slug: "square-balers", _count: { products: 1 } },
      { id: "sub-70", name: "Hay Rake", slug: "hay-rake", _count: { products: 1 } },
      { id: "sub-71", name: "Shredders", slug: "shredders", _count: { products: 1 } },
      { id: "sub-72", name: "Chaff Cutters", slug: "chaff-cutters", _count: { products: 3 } },
    ],
    _count: { products: 11 },
  },
  {
    id: "cat-7",
    name: "SPARE PARTS",
    slug: "spare-parts",
    description:
      "Authentic replacement components, boron steel rotavator blades, spray nozzles, belts, and bearings.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.52.09.jpeg",
    displayOrder: 7,
    subcategories: [
      { id: "sub-73", name: "Rotavator Blades", slug: "rotavator-blades", _count: { products: 1 } },
      { id: "sub-74", name: "Seed Drill Parts", slug: "seed-drill-parts", _count: { products: 1 } },
      { id: "sub-75", name: "Sprayer Parts", slug: "sprayer-parts", _count: { products: 1 } },
      { id: "sub-76", name: "Brush Cutter Parts", slug: "brush-cutter-parts", _count: { products: 1 } },
      { id: "sub-77", name: "Bearings", slug: "bearings", _count: { products: 1 } },
      { id: "sub-78", name: "Belts", slug: "belts", _count: { products: 1 } },
      { id: "sub-79", name: "Chains", slug: "chains", _count: { products: 1 } },
      { id: "sub-80", name: "Other Machinery Parts", slug: "other-machinery-parts", _count: { products: 1 } },
    ],
    _count: { products: 8 },
  },
];

// In-Memory Fast Cache with TTL to eliminate Supabase round-trip latency on repeated page visits
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

function getFromCache<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setToCache<T>(key: string, data: T): void {
  if (memoryCache.size > 500) {
    const oldestKey = memoryCache.keys().next().value;
    if (oldestKey) memoryCache.delete(oldestKey);
  }
  memoryCache.set(key, { data, timestamp: Date.now() });
}

export function clearDataCache(): void {
  memoryCache.clear();
}

export async function getMainCategories(): Promise<CategoryWithSubcategories[]> {
  const cached = getFromCache<CategoryWithSubcategories[]>("main_categories");
  if (cached) return cached;

  try {
    const results = await prisma.category.findMany({
      where: {
        parentCategoryId: null,
        isActive: true,
      },
      orderBy: { displayOrder: "asc" },
      include: {
        subcategories: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
          include: {
            _count: { select: { products: { where: { published: true } } } },
          },
        },
        _count: {
          select: { products: { where: { published: true } } },
        },
      },
    });

    if (results && results.length > 0) {
      const data = results as unknown as CategoryWithSubcategories[];
      setToCache("main_categories", data);
      return data;
    }
    return FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("Error fetching main categories, using fallback:", error);
    return FALLBACK_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<CategoryDetail | null> {
  const cacheKey = `category_${slug}`;
  const cached = getFromCache<CategoryDetail>(cacheKey);
  if (cached) return cached;

  try {
    const result = await prisma.category.findUnique({
      where: { slug },
      include: {
        parentCategory: true,
        subcategories: {
          where: { isActive: true },
          orderBy: { displayOrder: "asc" },
          include: {
            _count: { select: { products: { where: { published: true } } } },
          },
        },
        _count: {
          select: { products: { where: { published: true } } },
        },
      },
    });
    if (result) {
      setToCache(cacheKey, result);
    }
    return result;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProducts() {
  const cached = getFromCache<any[]>("featured_products");
  if (cached) return cached;

  try {
    const products = await prisma.product.findMany({
      where: {
        published: true,
        featured: true,
      },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        category: {
          include: { parentCategory: true },
        },
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      price: p.price ? Number(p.price) : null,
    }));
    setToCache("featured_products", formatted);
    return formatted;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
  const cacheKey = `product_${slug}`;
  const cached = getFromCache<any>(cacheKey);
  if (cached) return cached;

  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: {
          include: {
            parentCategory: true,
            products: {
              where: { published: true, NOT: { slug } },
              take: 4,
              include: {
                media: { orderBy: { displayOrder: "asc" }, take: 1 },
                category: true,
              },
            },
          },
        },
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!product) return null;

    const formatted = {
      ...product,
      price: product.price ? Number(product.price) : null,
      category: product.category
        ? {
            ...product.category,
            products: product.category.products.map((rp) => ({
              ...rp,
              price: rp.price ? Number(rp.price) : null,
            })),
          }
        : null,
    };
    setToCache(cacheKey, formatted);
    return formatted;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

export async function getProducts(options: {
  categorySlug?: string;
  search?: string;
  availability?: string;
  sort?: string;
  limit?: number;
}) {
  const cacheKey = `products_${options.categorySlug || ""}_${options.search || ""}_${options.availability || ""}_${options.sort || ""}_${options.limit || 50}`;
  const cached = getFromCache<any[]>(cacheKey);
  if (cached) return cached;

  try {
    const { categorySlug, search, availability, sort, limit = 50 } = options;

    const where: Record<string, unknown> = {
      published: true,
    };

    if (categorySlug && categorySlug !== "all") {
      const cat = await prisma.category.findUnique({
        where: { slug: categorySlug },
        include: { subcategories: { select: { id: true } } },
      });

      if (cat) {
        if (cat.subcategories && cat.subcategories.length > 0) {
          const catIds = [cat.id, ...cat.subcategories.map((s) => s.id)];
          where.categoryId = { in: catIds };
        } else {
          where.categoryId = cat.id;
        }
      }
    }

    if (search && search.trim() !== "") {
      where.OR = [
        { name: { contains: search.trim() } },
        { brand: { contains: search.trim() } },
        { modelNumber: { contains: search.trim() } },
        { description: { contains: search.trim() } },
      ];
    }

    if (availability && availability !== "ALL") {
      where.availabilityStatus = availability;
    }

    let orderBy: Record<string, "asc" | "desc"> = { createdAt: "desc" };
    if (sort === "name-asc") orderBy = { name: "asc" };
    if (sort === "name-desc") orderBy = { name: "desc" };
    if (sort === "oldest") orderBy = { createdAt: "asc" };

    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        category: {
          include: { parentCategory: true },
        },
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    const formatted = products.map((p) => ({
      ...p,
      price: p.price ? Number(p.price) : null,
    }));
    setToCache(cacheKey, formatted);
    return formatted;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
