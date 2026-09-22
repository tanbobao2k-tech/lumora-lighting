import { NextResponse } from "next/server";
import { getSiteInfo, saveSiteInfo } from "@/lib/content-store";
import type { SiteInfo } from "@/types/content";

export async function GET() {
  return NextResponse.json(getSiteInfo());
}

export async function PUT(request: Request) {
  const info: SiteInfo = await request.json();
  await saveSiteInfo(info);
  return NextResponse.json({ ok: true });
}
