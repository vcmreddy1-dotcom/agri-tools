import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const [
      totalPublished,
      totalDrafts,
      outOfStock,
      recentEnquiries,
      mainCategories,
      allProductsWithMedia,
    ] = await Promise.all([
      prisma.product.count({ where: { published: true } }),
      prisma.product.count({ where: { published: false } }),
      prisma.product.count({ where: { availabilityStatus: "OUT_OF_STOCK" } }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            select: { name: true, slug: true },
          },
        },
      }),
      prisma.category.findMany({
        where: { parentCategoryId: null },
        include: {
          subcategories: {
            include: {
              _count: {
                select: { products: true },
              },
            },
          },
          _count: {
            select: { products: true },
          },
        },
      }),
      prisma.product.findMany({
        select: {
          id: true,
          name: true,
          technicalSpecifications: true,
          media: { select: { id: true } },
        },
      }),
    ]);

    // Calculate category product counts (aggregating subcategories into main parent)
    const categoryCounts = mainCategories.map((parent) => {
      const subcatCount = parent.subcategories.reduce(
        (sum, sub) => sum + sub._count.products,
        0
      );
      return {
        id: parent.id,
        name: parent.name,
        slug: parent.slug,
        count: parent._count.products + subcatCount,
      };
    });

    // Check missing images or specs
    const missingSpecsOrImages = allProductsWithMedia.filter(
      (p) =>
        !p.media ||
        p.media.length === 0 ||
        !p.technicalSpecifications ||
        p.technicalSpecifications.trim() === "" ||
        p.technicalSpecifications === "{}"
    ).length;

    const totalEnquiries = await prisma.enquiry.count();
    const newEnquiriesCount = await prisma.enquiry.count({
      where: { status: "NEW" },
    });

    return NextResponse.json({
      totalPublished,
      totalDrafts,
      outOfStock,
      totalEnquiries,
      newEnquiriesCount,
      missingSpecsOrImages,
      categoryCounts,
      recentEnquiries,
    });
  } catch (err) {
    console.error("Stats API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
