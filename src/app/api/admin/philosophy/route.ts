import { NextResponse } from "next/server";
import { getPhilosophy, savePhilosophy } from "@/lib/content-store";
import type { Philosophy } from "@/types/content";

export async function GET() {
  return NextResponse.json(getPhilosophy());
}

export async function PUT(request: Request) {
  const content: Philosophy = await request.json();
  await savePhilosophy(content);
  return NextResponse.json({ ok: true });
}
