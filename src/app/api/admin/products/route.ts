import { NextResponse } from "next/server";
import { getProducts, upsertProduct } from "@/lib/content-store";
import type { Product } from "@/types/product";

export async function GET() {
  return NextResponse.json(getProducts());
}

export async function POST(request: Request) {
  const product: Product = await request.json();

  if (!product.slug || !product.name) {
    return NextResponse.json({ error: "Thiếu slug hoặc tên sản phẩm" }, { status: 400 });
  }

  const existing = getProducts().find((p) => p.slug === product.slug);
  if (existing) {
    return NextResponse.json({ error: "Slug đã tồn tại, chọn slug khác" }, { status: 409 });
  }

  upsertProduct(product);
  return NextResponse.json({ ok: true });
}
