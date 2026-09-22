import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { HomeContent } from "@/types/content";

const POINTS = [
  {
    title: "Hàng chính hãng",
    body: "Nhập trực tiếp từ nhà phân phối, đầy đủ chứng từ, tem bảo hành.",
    icon: (
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    ),
  },
  {
    title: "Bảo hành 2 năm",
    body: "Theo lỗi nhà sản xuất, hỗ trợ đổi trả nhanh chóng.",
    icon: <path d="M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0Zm8-4v4l3 2" />,
  },
  {
    title: "Tư vấn kỹ thuật",
    body: "Chọn đúng công suất, nhiệt độ màu cho từng không gian.",
    icon: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2 2m7.4 7.4 2 2m0-11.4-2 2m-7.4 7.4-2 2" />,
  },
];

export function FeatureSection({ content }: { content: HomeContent["feature"] }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <RevealOnScroll className="aspect-[4/3] overflow-hidden rounded-sm md:order-2">
          <Image
            src={content.image}
            alt={content.title}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="md:order-1">
          <p className="text-xs tracking-[0.25em] text-muted uppercase">{content.eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{content.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{content.body}</p>

          <div className="mt-8 space-y-5">
            {POINTS.map((point) => (
              <div key={point.title} className="flex gap-4">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="mt-0.5 h-9 w-9 shrink-0 rounded-full border border-border p-2 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {point.icon}
                </svg>
                <div>
                  <p className="text-sm font-medium">{point.title}</p>
                  <p className="text-sm text-muted">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
