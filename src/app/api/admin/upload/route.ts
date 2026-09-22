import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { commitFileToGithub, isGithubStorageEnabled } from "@/lib/github-content";

const UPLOAD_DIR = path.join(process.cwd(), "public", "products");
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function slugifyFilename(name: string): string {
  const ext = path.extname(name);
  const base = path
    .basename(name, ext)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "anh"}${ext || ".jpg"}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Chỉ hỗ trợ ảnh JPG, PNG, WEBP" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (isGithubStorageEnabled()) {
    const ext = path.extname(file.name) || ".jpg";
    const base = slugifyFilename(file.name).replace(ext, "");
    const filename = `${base}-${Date.now()}${ext}`;
    await commitFileToGithub(`public/products/${filename}`, buffer.toString("base64"), true);
    return NextResponse.json({ path: `/products/${filename}` });
  }

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });

  let filename = slugifyFilename(file.name);
  let filePath = path.join(UPLOAD_DIR, filename);
  let counter = 1;
  while (fs.existsSync(filePath)) {
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    const baseWithoutCounter = base.replace(/-\d+$/, "");
    filename = `${baseWithoutCounter}-${counter}${ext}`;
    filePath = path.join(UPLOAD_DIR, filename);
    counter += 1;
  }

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ path: `/products/${filename}` });
}
