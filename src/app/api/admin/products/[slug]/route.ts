import { NextResponse } from "next/server";
import { getProductBySlug, upsertProduct, deleteProduct } from "@/lib/content-store";
import type { Product } from "@/types/product";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product: Product = await request.json();

  if (!getProductBySlug(slug)) {
    return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  await upsertProduct(product, slug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await deleteProduct(slug);
  return NextResponse.json({ ok: true });
}
