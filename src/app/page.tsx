import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeatureSection } from "@/components/home/FeatureSection";
import { Testimonials } from "@/components/home/Testimonials";
import { BrandStrip } from "@/components/home/BrandStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <FeatureSection />
      <Testimonials />
      <BrandStrip />
    </>
  );
}
