import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import type { TrustStat } from "@/types/content";

export function TrustBar({ stats }: { stats: TrustStat[] }) {
  return (
    <section className="border-y border-border/70 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <RevealOnScroll className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-accent sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs tracking-wide text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
