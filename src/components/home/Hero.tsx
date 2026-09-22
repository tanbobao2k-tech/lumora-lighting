import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/types/content";

export function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="text-xs tracking-[0.25em] text-muted uppercase">{content.eyebrow}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          {content.subtitle}
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/san-pham"
            className="rounded-full bg-foreground px-6 py-3 text-sm tracking-wide text-background transition-opacity hover:opacity-85"
          >
            Xem sản phẩm
          </Link>
          <Link
            href="/lien-he"
            className="rounded-full border border-border px-6 py-3 text-sm tracking-wide transition-colors hover:border-accent hover:text-accent"
          >
            Liên hệ tư vấn
          </Link>
        </div>
      </div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
        <Image
          src={content.image}
          alt="Đèn chiếu sáng LUMORA"
          width={900}
          height={1125}
          priority
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-5 left-5 rounded-sm bg-background/95 px-5 py-4 shadow-lg backdrop-blur">
          <p className="text-2xl font-semibold text-accent">{content.badgeValue}</p>
          <p className="text-xs tracking-wide text-muted">{content.badgeLabel}</p>
        </div>
      </div>
    </section>
  );
}
