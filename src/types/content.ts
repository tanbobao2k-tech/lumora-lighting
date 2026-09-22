import type { ProductCategory } from "./product";

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  description: string;
}

export interface SiteInfo {
  brandName: string;
  brandTagline: string;
  phones: string[];
  address: string;
  mapLink: string;
  mapEmbedSrc: string;
  facebookPage: string;
  messengerLink: string;
  distributedBrands: string[];
}

export interface TrustStat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badgeValue: string;
    badgeLabel: string;
    image: string;
  };
  trustStats: TrustStat[];
  feature: {
    eyebrow: string;
    title: string;
    body: string;
    image: string;
  };
  testimonials: Testimonial[];
}
