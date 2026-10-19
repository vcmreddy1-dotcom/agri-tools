import { prisma } from "@/lib/db";

export async function getMainCategories() {
  return await prisma.category.findMany({
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
}

export async function getCategoryBySlug(slug: string) {
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
}

export async function getFeaturedProducts() {
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
}

export async function getProductBySlug(slug: string) {
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
}

export async function getProducts(options: {
  categorySlug?: string;
  search?: string;
  availability?: string;
  sort?: string;
  limit?: number;
}) {
  const { categorySlug, search, availability, sort, limit = 50 } = options;

  const where: Record<string, unknown> = {
    published: true,
  };

  if (categorySlug && categorySlug !== "all") {
    // Check if category is a parent or subcategory
    const cat = await prisma.category.findUnique({
      where: { slug: categorySlug },
      include: { subcategories: { select: { id: true } } },
    });

    if (cat) {
      if (cat.subcategories.length > 0) {
        // Parent category: include parent's own products and its subcategories' products
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
}
