"use client";

import { useState } from "react";
import type { CategoryInfo } from "@/types/content";

export function CategoriesEditor({ initialCategories }: { initialCategories: CategoryInfo[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (id: string, patch: Partial<CategoryInfo>) =>
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categories),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {categories.map((cat) => (
        <div key={cat.id} className="rounded-md border border-border p-4">
          <p className="text-xs text-muted">ID: {cat.id}</p>
          <label className="mt-2 block">
            <span className="text-xs tracking-[0.15em] text-muted uppercase">Tên hiển thị</span>
            <input
              value={cat.label}
              onChange={(e) => update(cat.id, { label: e.target.value })}
              className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </label>
          <label className="mt-3 block">
            <span className="text-xs tracking-[0.15em] text-muted uppercase">Mô tả</span>
            <textarea
              rows={2}
              value={cat.description}
              onChange={(e) => update(cat.id, { description: e.target.value })}
              className="mt-1.5 w-full resize-none rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </label>
        </div>
      ))}

      <div className="flex items-center gap-3">
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
