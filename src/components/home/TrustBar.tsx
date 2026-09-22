import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { TrustStat } from "@/types/content";

export function TrustBar({ stats }: { stats: TrustStat[] }) {
  return (
    <section className="border-t border-ink-foreground/10 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <RevealOnScroll className="grid grid-cols-2 divide-y divide-ink-foreground/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="px-2 py-4 text-center sm:py-2">
              <p className="font-serif text-2xl text-accent-soft sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-[10px] tracking-[0.18em] text-ink-foreground/60 uppercase sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
