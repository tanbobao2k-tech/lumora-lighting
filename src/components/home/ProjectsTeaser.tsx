import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ProjectsTeaser({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <RevealOnScroll className="flex items-end justify-between">
          <div>
            <p className="text-[11px] tracking-[0.3em] text-accent-soft uppercase">Dự án</p>
            <h2 className="font-serif mt-3 text-3xl sm:text-4xl">Công trình tiêu biểu</h2>
          </div>
          <Link
            href="/du-an"
            className="hidden text-xs tracking-[0.15em] text-accent-soft uppercase hover:opacity-80 sm:block"
          >
            Xem tất cả →
          </Link>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {featured.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={i * 0.08}>
              <Link href="/du-an" className="group block">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="font-serif mt-4 text-lg">{project.title}</p>
                <p className="text-[11px] tracking-[0.15em] text-ink-foreground/55 uppercase">
                  {project.location}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
