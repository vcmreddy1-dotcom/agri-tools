import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");
    const categoryId = searchParams.get("categoryId");
    const status = searchParams.get("status");

    const where: Record<string, unknown> = {};

    if (search && search.trim() !== "") {
      where.OR = [
        { name: { contains: search.trim() } },
        { brand: { contains: search.trim() } },
        { modelNumber: { contains: search.trim() } },
      ];
    }

    if (categoryId && categoryId !== "ALL") {
      where.categoryId = categoryId;
    }

    if (status === "PUBLISHED") where.published = true;
    if (status === "DRAFT") where.published = false;
    if (status === "OUT_OF_STOCK") where.availabilityStatus = "OUT_OF_STOCK";

    const products = await prisma.product.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            parentCategory: { select: { id: true, name: true } },
          },
        },
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug: customSlug,
      brand,
      modelNumber,
      shortDescription,
      description,
      categoryId,
      priceType,
      price,
      availabilityStatus,
      technicalSpecifications,
      applications,
      featured,
      published,
      seoTitle,
      seoDescription,
      media,
    } = body;

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: "Product name and category are required" },
        { status: 400 }
      );
    }

    let finalSlug = customSlug ? generateSlug(customSlug) : generateSlug(name);
    // Check slug collision
    const existing = await prisma.product.findUnique({
      where: { slug: finalSlug },
    });
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const specsJson =
      typeof technicalSpecifications === "object"
        ? JSON.stringify(technicalSpecifications)
        : technicalSpecifications || "{}";

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        brand: brand || null,
        modelNumber: modelNumber || null,
        shortDescription: shortDescription || null,
        description: description || null,
        categoryId,
        priceType: priceType || "ENQUIRY_ONLY",
        price: price ? Number(price) : null,
        availabilityStatus: availabilityStatus || "AVAILABLE",
        technicalSpecifications: specsJson,
        applications: applications || null,
        featured: Boolean(featured),
        published: published !== undefined ? Boolean(published) : true,
        seoTitle: seoTitle || `${name} | Prakash Agri Tools`,
        seoDescription: seoDescription || shortDescription || null,
      },
    });

    if (Array.isArray(media) && media.length > 0) {
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const mediaUrl = typeof item === "string" ? item : item.mediaUrl;
        if (mediaUrl) {
          await prisma.productMedia.create({
            data: {
              productId: product.id,
              mediaUrl,
              mediaType: item.mediaType || "IMAGE",
              altText: item.altText || `${name} photo`,
              displayOrder: i,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, product });
  } catch (err) {
    console.error("Create product error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
