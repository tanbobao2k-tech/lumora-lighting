import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Product, ProductCategory } from "@/types/product";
import type { CategoryInfo, SiteInfo, HomeContent, Project } from "@/types/content";
import { commitFileToGithub, isGithubStorageEnabled } from "./github-content";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJson(file: string, data: unknown): Promise<void> {
  const json = JSON.stringify(data, null, 2) + "\n";

  if (isGithubStorageEnabled()) {
    await commitFileToGithub(`content/${file}`, json);
    return;
  }

  fs.writeFileSync(path.join(CONTENT_DIR, file), json, "utf-8");
}

export function getProducts(): Product[] {
  return readJson<Product[]>("products.json");
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeJson("products.json", products);
}

export async function upsertProduct(product: Product, originalSlug?: string): Promise<void> {
  const products = getProducts();
  const index = products.findIndex((p) => p.slug === (originalSlug ?? product.slug));
  if (index === -1) {
    products.push(product);
  } else {
    products[index] = product;
  }
  await saveProducts(products);
}

export async function deleteProduct(slug: string): Promise<void> {
  await saveProducts(getProducts().filter((p) => p.slug !== slug));
}

export function getCategories(): CategoryInfo[] {
  return readJson<CategoryInfo[]>("categories.json");
}

export function getCategoryLabel(id: ProductCategory): string {
  return getCategories().find((c) => c.id === id)?.label ?? id;
}

export async function saveCategories(categories: CategoryInfo[]): Promise<void> {
  await writeJson("categories.json", categories);
}

export function getSiteInfo(): SiteInfo {
  return readJson<SiteInfo>("site.json");
}

export async function saveSiteInfo(info: SiteInfo): Promise<void> {
  await writeJson("site.json", info);
}

export function getHomeContent(): HomeContent {
  return readJson<HomeContent>("home.json");
}

export async function saveHomeContent(content: HomeContent): Promise<void> {
  await writeJson("home.json", content);
}

export function getProjects(): Project[] {
  return readJson<Project[]>("projects.json");
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await writeJson("projects.json", projects);
}
