import type { Metadata } from "next";
import Image from "next/image";
import { getPhilosophy, getSiteInfo } from "@/lib/content-store";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Triết lý kinh doanh — LUMORA",
};

export const dynamic = "force-dynamic";

export default function PhilosophyPage() {
  const content = getPhilosophy();
  const siteInfo = getSiteInfo();

  return (
    <div className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 md:grid-cols-[0.85fr_1.15fr] md:items-center md:py-32">
        <RevealOnScroll className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden border border-accent-soft/30 md:mx-0">
          <Image
            src={content.portrait}
            alt={content.signatureName}
            width={900}
            height={1200}
            priority
            className="h-full w-full object-cover"
          />
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <p className="text-[11px] tracking-[0.3em] text-accent-soft uppercase">
            {content.eyebrow}
          </p>
          <span className="mt-4 block h-px w-12 bg-accent-soft/60" />
          <h1 className="font-serif mt-6 text-3xl leading-[1.2] sm:text-4xl">{content.title}</h1>

          <blockquote className="mt-8 border-l-2 border-accent-soft/50 pl-6">
            <p className="font-serif text-lg leading-relaxed text-ink-foreground/90 sm:text-xl">
              “{content.quote}”
            </p>
          </blockquote>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-ink-foreground/65">
            {content.body}
          </p>

          <div className="mt-12">
            <p className="font-serif text-2xl text-accent-soft">{content.signatureName}</p>
            <p className="mt-1 text-[11px] tracking-[0.2em] text-ink-foreground/55 uppercase">
              {content.signatureTitle} — {siteInfo.brandName}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
