import Link from "next/link";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <RevealOnScroll>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.25em] text-muted uppercase">Nổi bật</p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Sản phẩm tiêu biểu</h2>
          </div>
          <Link href="/san-pham" className="hidden text-sm text-accent hover:opacity-80 sm:block">
            Xem tất cả →
          </Link>
        </div>
      </RevealOnScroll>
      <div className="mt-8">
        <ProductGrid products={featured} />
      </div>
    </section>
  );
}
