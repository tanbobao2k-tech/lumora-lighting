"use client";

import { useState } from "react";
import type { Philosophy } from "@/types/content";
import { ImageUploadField } from "./ImageUploadField";

function fieldClass() {
  return "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";
}

export function PhilosophyEditor({ initialContent }: { initialContent: Philosophy }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/philosophy", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Nhãn nhỏ</span>
        <input
          value={content.eyebrow}
          onChange={(e) => setContent((c) => ({ ...c, eyebrow: e.target.value }))}
          className={fieldClass()}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Tiêu đề</span>
        <input
          value={content.title}
          onChange={(e) => setContent((c) => ({ ...c, title: e.target.value }))}
          className={fieldClass()}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Câu triết lý (trích dẫn lớn)</span>
        <textarea
          rows={4}
          value={content.quote}
          onChange={(e) => setContent((c) => ({ ...c, quote: e.target.value }))}
          className={fieldClass() + " resize-none"}
        />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Đoạn văn phụ</span>
        <textarea
          rows={4}
          value={content.body}
          onChange={(e) => setContent((c) => ({ ...c, body: e.target.value }))}
          className={fieldClass() + " resize-none"}
        />
      </label>

      <ImageUploadField
        label="Ảnh chân dung"
        value={content.portrait}
        onChange={(path) => setContent((c) => ({ ...c, portrait: path }))}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Tên chữ ký</span>
          <input
            value={content.signatureName}
            onChange={(e) => setContent((c) => ({ ...c, signatureName: e.target.value }))}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Chức danh</span>
          <input
            value={content.signatureTitle}
            onChange={(e) => setContent((c) => ({ ...c, signatureTitle: e.target.value }))}
            className={fieldClass()}
          />
        </label>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-foreground px-8 py-3 text-sm tracking-wide text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
        {saved && <span className="text-sm text-accent">Đã lưu ✓</span>}
      </div>
    </form>
  );
}
