import { SITE_INFO } from "@/components/layout/SITE_INFO";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function BrandStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <RevealOnScroll className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-xs tracking-[0.25em] text-muted uppercase">Phân phối chính hãng</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {SITE_INFO.distributedBrands.map((brand) => (
            <span
              key={brand}
              className="text-lg font-semibold tracking-wide text-foreground/50 transition-colors hover:text-foreground"
            >
              {brand}
            </span>
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
