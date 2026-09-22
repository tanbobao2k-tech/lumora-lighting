import type { Metadata } from "next";
import Image from "next/image";
import { getProjects } from "@/lib/content-store";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Dự án — LUMORA",
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <RevealOnScroll>
            <p className="text-[11px] tracking-[0.3em] text-accent-soft uppercase">Dự án</p>
            <span className="mt-4 block h-px w-12 bg-accent-soft/60" />
            <h1 className="font-serif mt-6 max-w-2xl text-4xl leading-[1.15] sm:text-5xl">
              Công trình đã hoàn thiện
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-foreground/70 sm:text-base">
              Một số công trình khách sạn, resort, giáo dục và nhà xưởng đã được LUMORA cùng đối
              tác triển khai giải pháp chiếu sáng trọn gói.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={(i % 2) * 0.1}>
              <div className="group">
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-serif text-xl">{project.title}</h2>
                    <p className="mt-1 text-sm text-muted">{project.description}</p>
                  </div>
                  <p className="whitespace-nowrap text-[11px] tracking-[0.15em] text-accent uppercase">
                    {project.location}
                  </p>
                </div>
                <p className="mt-2 text-[11px] tracking-[0.15em] text-muted uppercase">
                  {project.category}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
