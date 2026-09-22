"use client";

import { useState } from "react";
import type { SiteInfo } from "@/types/content";

function fieldClass() {
  return "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";
}

export function SiteInfoEditor({ initialInfo }: { initialInfo: SiteInfo }) {
  const [info, setInfo] = useState(initialInfo);
  const [phonesText, setPhonesText] = useState(initialInfo.phones.join(", "));
  const [brandsText, setBrandsText] = useState(initialInfo.distributedBrands.join(", "));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = <K extends keyof SiteInfo>(key: K, value: SiteInfo[K]) =>
    setInfo((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    const payload: SiteInfo = {
      ...info,
      phones: phonesText.split(",").map((s) => s.trim()).filter(Boolean),
      distributedBrands: brandsText.split(",").map((s) => s.trim()).filter(Boolean),
    };

    await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Tên thương hiệu</span>
        <input value={info.brandName} onChange={(e) => update("brandName", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Slogan / tagline</span>
        <input value={info.brandTagline} onChange={(e) => update("brandTagline", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Số điện thoại (cách nhau bởi dấu phẩy)</span>
        <input value={phonesText} onChange={(e) => setPhonesText(e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Địa chỉ</span>
        <input value={info.address} onChange={(e) => update("address", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Link Google Maps (bấm &quot;Chia sẻ&quot; trên Google Maps để lấy)</span>
        <input value={info.mapLink} onChange={(e) => update("mapLink", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">
          Link nhúng bản đồ (dạng https://maps.google.com/maps?q=lat,lng&z=17&output=embed)
        </span>
        <input value={info.mapEmbedSrc} onChange={(e) => update("mapEmbedSrc", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Link trang Facebook</span>
        <input value={info.facebookPage} onChange={(e) => update("facebookPage", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Link Messenger (m.me/...)</span>
        <input value={info.messengerLink} onChange={(e) => update("messengerLink", e.target.value)} className={fieldClass()} />
      </label>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Thương hiệu phân phối (cách nhau bởi dấu phẩy)</span>
        <input value={brandsText} onChange={(e) => setBrandsText(e.target.value)} className={fieldClass()} />
      </label>

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
