import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProductForm from "@/components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      media: { orderBy: { displayOrder: "asc" } },
    },
  });

  if (!product) notFound();

  const productData = {
    ...product,
    price: product.price ? Number(product.price) : null,
  };

  return (
    <div className="space-y-6">
      <ProductForm initialData={productData} isEdit={true} />
    </div>
  );
}
