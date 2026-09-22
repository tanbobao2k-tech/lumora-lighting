import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/content-store";
import type { Project } from "@/types/content";

export async function GET() {
  return NextResponse.json(getProjects());
}

export async function PUT(request: Request) {
  const projects: Project[] = await request.json();
  await saveProjects(projects);
  return NextResponse.json({ ok: true });
}
