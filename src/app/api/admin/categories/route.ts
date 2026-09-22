import { NextResponse } from "next/server";
import { getCategories, saveCategories } from "@/lib/content-store";
import type { CategoryInfo } from "@/types/content";

export async function GET() {
  return NextResponse.json(getCategories());
}

export async function PUT(request: Request) {
  const categories: CategoryInfo[] = await request.json();
  await saveCategories(categories);
  return NextResponse.json({ ok: true });
}
