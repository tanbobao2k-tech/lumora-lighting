import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const REVIEWS = [
  {
    quote:
      "Đèn downlight Opple lắp cho cả căn hộ, ánh sáng đều và không bị chói. Tư vấn nhiệt độ màu rất kỹ trước khi mua.",
    author: "Anh Hùng",
    location: "Hoài Đức, Hà Nội",
  },
  {
    quote:
      "Đặt đèn cắm cỏ sân vườn, giao hàng đúng hẹn, đóng gói cẩn thận. Sản phẩm đúng như mô tả, sẽ ủng hộ tiếp.",
    author: "Chị Lan",
    location: "Hà Đông, Hà Nội",
  },
  {
    quote:
      "Mua cả lô đèn cho công trình, giá tốt và có xuất hoá đơn đầy đủ. Đội ngũ hỗ trợ kỹ thuật nhiệt tình.",
    author: "Anh Đức",
    location: "Nam Từ Liêm, Hà Nội",
  },
];

export function Testimonials() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.25em] text-muted uppercase">Khách hàng nói gì</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Được tin dùng</h2>
        </RevealOnScroll>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <RevealOnScroll key={review.author} delay={i * 0.08}>
              <div className="h-full rounded-sm border border-border bg-background p-6">
                <p className="text-sm leading-relaxed text-foreground/80">“{review.quote}”</p>
                <p className="mt-4 text-sm font-medium">{review.author}</p>
                <p className="text-xs text-muted">{review.location}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
