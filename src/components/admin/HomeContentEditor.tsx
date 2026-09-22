"use client";

import { useState } from "react";
import type { HomeContent } from "@/types/content";
import { ImageUploadField } from "./ImageUploadField";

function fieldClass() {
  return "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";
}

const EMPTY_TESTIMONIAL = { quote: "", author: "", location: "" };

export function HomeContentEditor({ initialContent }: { initialContent: HomeContent }) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/home", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
      <section>
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">Hero (banner đầu trang)</h2>
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="text-xs text-muted">Nhãn nhỏ phía trên tiêu đề</span>
            <input
              value={content.hero.eyebrow}
              onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, eyebrow: e.target.value } }))}
              className={fieldClass()}
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Tiêu đề chính</span>
            <input
              value={content.hero.title}
              onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, title: e.target.value } }))}
              className={fieldClass()}
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Mô tả ngắn</span>
            <textarea
              rows={3}
              value={content.hero.subtitle}
              onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, subtitle: e.target.value } }))}
              className={fieldClass() + " resize-none"}
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs text-muted">Số liệu trên thẻ nổi (ví dụ &quot;2 năm&quot;)</span>
              <input
                value={content.hero.badgeValue}
                onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, badgeValue: e.target.value } }))}
                className={fieldClass()}
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Chú thích thẻ nổi</span>
              <input
                value={content.hero.badgeLabel}
                onChange={(e) => setContent((c) => ({ ...c, hero: { ...c.hero, badgeLabel: e.target.value } }))}
                className={fieldClass()}
              />
            </label>
          </div>
          <ImageUploadField
            label="Ảnh hero"
            value={content.hero.image}
            onChange={(path) => setContent((c) => ({ ...c, hero: { ...c.hero, image: path } }))}
          />
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">Thanh số liệu</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {content.trustStats.map((stat, i) => (
            <div key={i} className="flex gap-2 rounded-md border border-border p-3">
              <input
                value={stat.value}
                placeholder="Giá trị"
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    trustStats: c.trustStats.map((s, si) => (si === i ? { ...s, value: e.target.value } : s)),
                  }))
                }
                className="w-24 rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-accent"
              />
              <input
                value={stat.label}
                placeholder="Nhãn"
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    trustStats: c.trustStats.map((s, si) => (si === i ? { ...s, label: e.target.value } : s)),
                  }))
                }
                className="flex-1 rounded-md border border-border bg-surface px-2 py-1.5 text-sm outline-none focus:border-accent"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">Vì sao chọn LUMORA</h2>
        <div className="mt-3 space-y-3">
          <label className="block">
            <span className="text-xs text-muted">Nhãn nhỏ</span>
            <input
              value={content.feature.eyebrow}
              onChange={(e) => setContent((c) => ({ ...c, feature: { ...c.feature, eyebrow: e.target.value } }))}
              className={fieldClass()}
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Tiêu đề</span>
            <input
              value={content.feature.title}
              onChange={(e) => setContent((c) => ({ ...c, feature: { ...c.feature, title: e.target.value } }))}
              className={fieldClass()}
            />
          </label>
          <label className="block">
            <span className="text-xs text-muted">Nội dung</span>
            <textarea
              rows={3}
              value={content.feature.body}
              onChange={(e) => setContent((c) => ({ ...c, feature: { ...c.feature, body: e.target.value } }))}
              className={fieldClass() + " resize-none"}
            />
          </label>
          <ImageUploadField
            label="Ảnh minh hoạ"
            value={content.feature.image}
            onChange={(path) => setContent((c) => ({ ...c, feature: { ...c.feature, image: path } }))}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase">Đánh giá khách hàng</h2>
          <button
            type="button"
            onClick={() =>
              setContent((c) => ({ ...c, testimonials: [...c.testimonials, { ...EMPTY_TESTIMONIAL }] }))
            }
            className="text-xs text-accent hover:opacity-80"
          >
            + Thêm đánh giá
          </button>
        </div>
        <div className="mt-3 space-y-3">
          {content.testimonials.map((t, i) => (
            <div key={i} className="rounded-md border border-border p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Đánh giá {i + 1}</span>
                <button
                  type="button"
                  onClick={() =>
                    setContent((c) => ({ ...c, testimonials: c.testimonials.filter((_, ti) => ti !== i) }))
                  }
                  className="text-xs text-red-600 hover:opacity-80"
                >
                  Xoá
                </button>
              </div>
              <textarea
                rows={2}
                value={t.quote}
                placeholder="Nội dung đánh giá"
                onChange={(e) =>
                  setContent((c) => ({
                    ...c,
                    testimonials: c.testimonials.map((x, ti) => (ti === i ? { ...x, quote: e.target.value } : x)),
                  }))
                }
                className={fieldClass() + " resize-none"}
              />
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <input
                  value={t.author}
                  placeholder="Tên khách hàng"
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      testimonials: c.testimonials.map((x, ti) => (ti === i ? { ...x, author: e.target.value } : x)),
                    }))
                  }
                  className={fieldClass()}
                />
                <input
                  value={t.location}
                  placeholder="Khu vực"
                  onChange={(e) =>
                    setContent((c) => ({
                      ...c,
                      testimonials: c.testimonials.map((x, ti) => (ti === i ? { ...x, location: e.target.value } : x)),
                    }))
                  }
                  className={fieldClass()}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

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
