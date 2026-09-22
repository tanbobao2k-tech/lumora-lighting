import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { Testimonial } from "@/types/content";

export function Testimonials({ reviews }: { reviews: Testimonial[] }) {
  if (reviews.length === 0) return null;

  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealOnScroll className="text-center">
          <p className="text-[11px] tracking-[0.3em] text-accent uppercase">Khách hàng nói gì</p>
          <h2 className="font-serif mt-3 text-3xl sm:text-4xl">Được tin dùng</h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {reviews.map((review, i) => (
            <RevealOnScroll key={review.author} delay={i * 0.08}>
              <div className="h-full border-t-2 border-accent pt-6 text-center sm:text-left">
                <p className="font-serif text-4xl leading-none text-accent-soft">“</p>
                <p className="-mt-3 text-sm leading-relaxed text-foreground/80">{review.quote}</p>
                <p className="font-serif mt-5 text-base">{review.author}</p>
                <p className="text-[11px] tracking-[0.15em] text-muted uppercase">{review.location}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
