import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/types/content";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-accent-soft uppercase">{content.eyebrow}</p>
          <span className="mt-4 block h-px w-12 bg-accent-soft/60" />
          <h1 className="font-serif mt-6 text-4xl leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/70 sm:text-base">
            {content.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/san-pham" className="btn-luxury bg-accent-soft text-ink hover:opacity-85">
              Xem sản phẩm
            </Link>
            <Link
              href="/lien-he"
              className="btn-luxury border border-ink-foreground/25 text-ink-foreground hover:border-accent-soft hover:text-accent-soft"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden border border-ink-foreground/15">
          <Image
            src={content.image}
            alt="Đèn chiếu sáng LUMORA"
            width={900}
            height={1125}
            priority
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-6 left-6 border border-accent-soft/50 bg-ink/90 px-6 py-4 backdrop-blur">
            <p className="font-serif text-2xl text-accent-soft">{content.badgeValue}</p>
            <p className="mt-0.5 text-[10px] tracking-[0.2em] text-ink-foreground/70 uppercase">
              {content.badgeLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
