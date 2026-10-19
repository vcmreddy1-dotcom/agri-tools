import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        media: {
          orderBy: { displayOrder: "asc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("Fetch single product error:", err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      name,
      slug,
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

    const specsJson =
      typeof technicalSpecifications === "object"
        ? JSON.stringify(technicalSpecifications)
        : technicalSpecifications || "{}";

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
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
        published: Boolean(published),
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
      },
    });

    // Update media if supplied
    if (Array.isArray(media)) {
      await prisma.productMedia.deleteMany({ where: { productId: id } });
      for (let i = 0; i < media.length; i++) {
        const item = media[i];
        const mediaUrl = typeof item === "string" ? item : item.mediaUrl;
        if (mediaUrl) {
          await prisma.productMedia.create({
            data: {
              productId: id,
              mediaUrl,
              mediaType: item.mediaType || "IMAGE",
              altText: item.altText || `${name} view ${i + 1}`,
              displayOrder: i,
            },
          });
        }
      }
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete related media first
    await prisma.productMedia.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
