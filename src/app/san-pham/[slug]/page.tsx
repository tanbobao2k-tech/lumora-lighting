import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProductBySlug, products } from "@/data/products";
import { getCategoryLabel } from "@/data/categories";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { ProductGrid } from "@/components/product/ProductGrid";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — LUMORA` : "Sản phẩm — LUMORA" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <nav className="text-xs text-muted">
        <Link href="/san-pham" className="hover:text-accent">
          Sản phẩm
        </Link>
        <span className="mx-1.5">/</span>
        <Link href={`/san-pham?danh-muc=${product.category}`} className="hover:text-accent">
          {getCategoryLabel(product.category)}
        </Link>
      </nav>

      <div className="mt-6">
        <ProductDetailView product={product} />
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <p className="text-xs tracking-[0.25em] text-muted uppercase">Có thể bạn quan tâm</p>
          <h2 className="mt-2 text-xl font-semibold">Sản phẩm liên quan</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      )}
    </div>
  );
}
