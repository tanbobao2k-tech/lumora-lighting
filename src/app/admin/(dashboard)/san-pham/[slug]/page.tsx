import { notFound } from "next/navigation";
import { getProductBySlug, getCategories } from "@/lib/content-store";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const categories = getCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Sửa sản phẩm — {product.name}</h1>
      <div className="mt-6">
        <ProductForm mode="edit" initialProduct={product} categories={categories} />
      </div>
    </div>
  );
}
