import type { Metadata } from "next";
import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { getSiteInfo } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Giới thiệu — LUMORA",
};

export const dynamic = "force-dynamic";

export default function AboutPage() {
  const SITE_INFO = getSiteInfo();

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <RevealOnScroll>
        <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Giới thiệu</p>
        <h1 className="font-serif mt-3 max-w-2xl text-3xl sm:text-4xl">
          LUMORA — đối tác chiếu sáng đáng tin cậy
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Chúng tôi phân phối đèn chiếu sáng chính hãng từ {SITE_INFO.distributedBrands.join(", ")}
          , phục vụ từ nhu cầu cải tạo nhà ở đến các dự án công trình. Mỗi sản phẩm đều đi kèm
          thông số kỹ thuật rõ ràng và chế độ bảo hành minh bạch.
        </p>
      </RevealOnScroll>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <RevealOnScroll className="aspect-[4/3] overflow-hidden rounded-sm">
          <Image
            src="/products/den-doc-sach_lct001-b-gd.jpg"
            alt="Showroom LUMORA"
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </RevealOnScroll>
        <RevealOnScroll delay={0.1} className="flex flex-col justify-center gap-6">
          {[
            {
              title: "Hàng chính hãng",
              body: "Nhập trực tiếp từ nhà phân phối, đầy đủ chứng từ và tem bảo hành.",
            },
            {
              title: "Tư vấn kỹ thuật",
              body: "Hỗ trợ chọn công suất, nhiệt độ màu, cấp bảo vệ phù hợp từng không gian.",
            },
            {
              title: "Giao hàng tận nơi",
              body: "Giao hàng nhanh tại khu vực Hà Nội và các tỉnh lân cận.",
            },
          ].map((item) => (
            <div key={item.title} className="border-l-2 border-accent pl-5">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </div>
  );
}
