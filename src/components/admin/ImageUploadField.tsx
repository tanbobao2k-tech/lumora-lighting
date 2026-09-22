"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Tải ảnh thất bại");
    } else {
      onChange(data.path);
    }
    setUploading(false);
  };

  return (
    <div>
      <p className="text-xs tracking-[0.15em] text-muted uppercase">{label}</p>
      <div className="mt-2 flex items-center gap-3">
        {value ? (
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-surface">
            <Image src={value} alt="" width={64} height={64} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-border text-[10px] text-muted">
            Chưa có
          </div>
        )}
        <div className="flex-1">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/products/ten-anh.jpg"
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-xs outline-none focus:border-accent"
          />
          <div className="mt-1.5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="text-xs text-accent hover:opacity-80 disabled:opacity-50"
            >
              {uploading ? "Đang tải..." : "Tải ảnh lên"}
            </button>
            {error && <span className="text-xs text-red-600">{error}</span>}
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </div>
    </div>
  );
}
