import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const CATEGORY_IMAGES: Record<string, string> = {
  "trong-nha": "/products/den-downlight-am-tran_20w-choa.jpg",
  "ngoai-troi": "/products/den-cam-co_tr-e93-b.jpg",
  "nang-luong-mat-troi": "/products/quat-nang-luong_dung.jpg",
};

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.25em] text-muted uppercase">Danh mục</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Chọn theo nhu cầu</h2>
      </RevealOnScroll>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {categories.map((cat, i) => (
          <RevealOnScroll key={cat.id} delay={i * 0.08}>
            <Link href={`/san-pham?danh-muc=${cat.id}`} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={CATEGORY_IMAGES[cat.id]}
                  alt={cat.label}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-3 text-sm font-medium">{cat.label}</h3>
              <p className="mt-1 text-xs text-muted">{cat.description}</p>
            </Link>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
