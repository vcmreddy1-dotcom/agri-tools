import { prisma } from "@/lib/db";

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
    name: "Agricultural Implements",
    slug: "agricultural-implements",
    description:
      "Heavy-duty tractor attachments and implements engineered for field preparation, primary tillage, seeding, and crop residue management.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2016.44.06.jpeg",
    displayOrder: 1,
    subcategories: [
      { id: "sub-1", name: "Seed Drills", slug: "seed-drills", _count: { products: 1 } },
      { id: "sub-2", name: "Turbo Seeder", slug: "turbo-seeder", _count: { products: 1 } },
      { id: "sub-3", name: "Rotavators", slug: "rotavators", _count: { products: 1 } },
      { id: "sub-4", name: "Mulchers", slug: "mulchers", _count: { products: 2 } },
      { id: "sub-5", name: "Slashers", slug: "slashers", _count: { products: 3 } },
      { id: "sub-6", name: "Paddy Weeders", slug: "paddy-weeders", _count: { products: 2 } },
      { id: "sub-7", name: "Mini Tillers", slug: "mini-tillers", _count: { products: 2 } },
      { id: "sub-8", name: "Weeders", slug: "weeders", _count: { products: 2 } },
    ],
    _count: { products: 14 },
  },
  {
    id: "cat-2",
    name: "Spraying Equipment",
    slug: "spraying-equipment",
    description:
      "Comprehensive crop protection solutions ranging from portable battery sprayers to tractor-mounted high-volume boom sprayers.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.51.53.jpeg",
    displayOrder: 2,
    subcategories: [
      { id: "sub-9", name: "Battery Sprayers", slug: "battery-sprayers", _count: { products: 1 } },
      { id: "sub-10", name: "Power Sprayers", slug: "power-sprayers", _count: { products: 2 } },
      { id: "sub-11", name: "Solar Sprayers", slug: "solar-sprayers", _count: { products: 3 } },
      { id: "sub-12", name: "300L Sprayers", slug: "300l-sprayers", _count: { products: 2 } },
    ],
    _count: { products: 8 },
  },
  {
    id: "cat-3",
    name: "Garden & Power Equipment",
    slug: "garden-power-equipment",
    description:
      "Commercial landscaping and orchard power machinery for trimming, cutting, wood clearing, and earth drilling.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.51.56.jpeg",
    displayOrder: 3,
    subcategories: [
      { id: "sub-13", name: "Brush Cutters", slug: "brush-cutters", _count: { products: 3 } },
      { id: "sub-14", name: "Chain Saws", slug: "chain-saws", _count: { products: 3 } },
      { id: "sub-15", name: "Hedge Trimmers", slug: "hedge-trimmers", _count: { products: 3 } },
      { id: "sub-16", name: "Lawn Mowers", slug: "lawn-mowers", _count: { products: 3 } },
      { id: "sub-17", name: "Earth Augers", slug: "earth-augers", _count: { products: 3 } },
    ],
    _count: { products: 15 },
  },
  {
    id: "cat-4",
    name: "Fodder Equipment",
    slug: "fodder-equipment",
    description:
      "High-output green and dry fodder cutting machinery for dairy farmers and livestock nutrition.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.52.09%20(2).jpeg",
    displayOrder: 4,
    subcategories: [
      { id: "sub-18", name: "Chaff Cutters", slug: "chaff-cutters", _count: { products: 3 } },
    ],
    _count: { products: 3 },
  },
  {
    id: "cat-5",
    name: "Spare Parts",
    slug: "spare-parts",
    description:
      "Authentic replacement components, boron steel rotavator blades, spray nozzles, belts, and bearings.",
    image: "/uploads/WhatsApp%20Image%202026-10-13%20at%2017.52.09.jpeg",
    displayOrder: 5,
    subcategories: [
      { id: "sub-19", name: "Rotavator Blades", slug: "rotavator-blades", _count: { products: 1 } },
      { id: "sub-20", name: "Seed Drill Parts", slug: "seed-drill-parts", _count: { products: 1 } },
      { id: "sub-21", name: "Sprayer Parts", slug: "sprayer-parts", _count: { products: 1 } },
    ],
    _count: { products: 3 },
  },
];

export async function getMainCategories(): Promise<CategoryWithSubcategories[]> {
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
      return results as unknown as CategoryWithSubcategories[];
    }
    return FALLBACK_CATEGORIES;
  } catch (error) {
    console.error("Error fetching main categories, using fallback:", error);
    return FALLBACK_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    return await prisma.category.findUnique({
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
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProducts() {
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

    return products.map((p) => ({
      ...p,
      price: p.price ? Number(p.price) : null,
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getProductBySlug(slug: string) {
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

    return {
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

    return products.map((p) => ({
      ...p,
      price: p.price ? Number(p.price) : null,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
