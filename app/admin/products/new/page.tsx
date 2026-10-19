import React from "react";
import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <ProductForm isEdit={false} />
    </div>
  );
}
