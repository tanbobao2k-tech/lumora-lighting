import { NextResponse } from "next/server";
import { getHomeContent, saveHomeContent } from "@/lib/content-store";
import type { HomeContent } from "@/types/content";

export async function GET() {
  return NextResponse.json(getHomeContent());
}

export async function PUT(request: Request) {
  const content: HomeContent = await request.json();
  saveHomeContent(content);
  return NextResponse.json({ ok: true });
}
