import type { Metadata } from "next";
import { getSiteInfo } from "@/lib/content-store";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Liên hệ — LUMORA",
};

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const SITE_INFO = getSiteInfo();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <RevealOnScroll>
        <p className="text-xs tracking-[0.25em] text-muted uppercase">Liên hệ</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Kết nối với LUMORA</h1>
      </RevealOnScroll>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <RevealOnScroll className="space-y-5">
          <div>
            <p className="text-xs tracking-[0.15em] text-muted uppercase">Điện thoại</p>
            {SITE_INFO.phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} className="block text-lg hover:text-accent">
                {phone}
              </a>
            ))}
          </div>
          <div>
            <p className="text-xs tracking-[0.15em] text-muted uppercase">Địa chỉ</p>
            <p className="text-lg">{SITE_INFO.address}</p>
          </div>
          <a
            href={SITE_INFO.mapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm text-accent hover:opacity-80"
          >
            Xem đường đi trên Google Maps →
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="aspect-[4/3] overflow-hidden rounded-sm border border-border">
          <iframe
            title="Bản đồ LUMORA"
            src={SITE_INFO.mapEmbedSrc}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </RevealOnScroll>
      </div>
    </div>
  );
}
