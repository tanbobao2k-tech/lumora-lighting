import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeatureSection } from "@/components/home/FeatureSection";
import { ProjectsTeaser } from "@/components/home/ProjectsTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { BrandStrip } from "@/components/home/BrandStrip";
import { getHomeContent, getProjects } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const content = getHomeContent();
  const projects = getProjects();

  return (
    <>
      <Hero content={content.hero} />
      <TrustBar stats={content.trustStats} />
      <CategoryGrid />
      <FeaturedProducts />
      <FeatureSection content={content.feature} />
      <ProjectsTeaser projects={projects} />
      <Testimonials reviews={content.testimonials} />
      <BrandStrip />
    </>
  );
}
