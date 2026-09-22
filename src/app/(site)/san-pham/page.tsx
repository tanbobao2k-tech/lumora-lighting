import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts, getCategories, getCategoryLabel } from "@/lib/content-store";
import type { ProductCategory } from "@/types/product";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryFilter } from "@/components/product/CategoryFilter";

export const metadata: Metadata = {
  title: "Sản phẩm — LUMORA",
};

export const dynamic = "force-dynamic";

export default async function ProductListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoryParam = params["danh-muc"];
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;

  const products = getProducts();
  const categories = getCategories();
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <p className="text-xs tracking-[0.25em] text-muted uppercase">Sản phẩm</p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        {category ? getCategoryLabel(category as ProductCategory) : "Toàn bộ sản phẩm"}
      </h1>

      <div className="mt-6">
        <Suspense fallback={null}>
          <CategoryFilter categories={categories} />
        </Suspense>
      </div>

      <div className="mt-10">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
