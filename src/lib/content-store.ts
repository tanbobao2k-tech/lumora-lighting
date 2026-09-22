import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Product, ProductCategory } from "@/types/product";
import type { CategoryInfo, SiteInfo, HomeContent } from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson(file: string, data: unknown): void {
  fs.writeFileSync(path.join(CONTENT_DIR, file), JSON.stringify(data, null, 2) + "\n", "utf-8");
}

export function getProducts(): Product[] {
  return readJson<Product[]>("products.json");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export function saveProducts(products: Product[]): void {
  writeJson("products.json", products);
}

export function upsertProduct(product: Product, originalSlug?: string): void {
  const products = getProducts();
  const index = products.findIndex((p) => p.slug === (originalSlug ?? product.slug));
  if (index === -1) {
    products.push(product);
  } else {
    products[index] = product;
  }
  saveProducts(products);
}

export function deleteProduct(slug: string): void {
  saveProducts(getProducts().filter((p) => p.slug !== slug));
}

export function getCategories(): CategoryInfo[] {
  return readJson<CategoryInfo[]>("categories.json");
}

export function getCategoryLabel(id: ProductCategory): string {
  return getCategories().find((c) => c.id === id)?.label ?? id;
}

export function saveCategories(categories: CategoryInfo[]): void {
  writeJson("categories.json", categories);
}

export function getSiteInfo(): SiteInfo {
  return readJson<SiteInfo>("site.json");
}

export function saveSiteInfo(info: SiteInfo): void {
  writeJson("site.json", info);
}

export function getHomeContent(): HomeContent {
  return readJson<HomeContent>("home.json");
}

export function saveHomeContent(content: HomeContent): void {
  writeJson("home.json", content);
}
