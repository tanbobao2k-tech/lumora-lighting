"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductVariant } from "@/types/product";
import type { CategoryInfo } from "@/types/content";
import { ImageUploadField } from "./ImageUploadField";

const EMPTY_VARIANT: ProductVariant = {
  sapCode: "",
  power: "",
  voltage: "220-240VAC",
  colorTemp: "",
  ipRating: "",
  dimensions: "",
  finish: "",
  note: "",
  image: "",
};

function fieldClass() {
  return "mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent";
}

export function ProductForm({
  mode,
  initialProduct,
  categories,
}: {
  mode: "create" | "edit";
  initialProduct?: Product;
  categories: CategoryInfo[];
}) {
  const router = useRouter();
  const originalSlug = initialProduct?.slug;

  const [product, setProduct] = useState<Product>(
    initialProduct ?? {
      slug: "",
      name: "",
      brand: "",
      category: categories[0]?.id ?? "trong-nha",
      subCategory: "",
      unit: "Bộ",
      price: 0,
      description: "",
      image: "",
      variants: [{ ...EMPTY_VARIANT }],
    }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = <K extends keyof Product>(key: K, value: Product[K]) =>
    setProduct((p) => ({ ...p, [key]: value }));

  const updateVariant = (index: number, patch: Partial<ProductVariant>) =>
    setProduct((p) => ({
      ...p,
      variants: p.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));

  const addVariant = () =>
    setProduct((p) => ({ ...p, variants: [...p.variants, { ...EMPTY_VARIANT }] }));

  const removeVariant = (index: number) =>
    setProduct((p) => ({ ...p, variants: p.variants.filter((_, i) => i !== index) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = mode === "create" ? "/api/admin/products" : `/api/admin/products/${originalSlug}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Có lỗi xảy ra");
      setSaving(false);
      return;
    }

    router.push("/admin/san-pham");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Slug (URL)</span>
          <input
            required
            value={product.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="den-op-tran-lap-noi"
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Tên sản phẩm</span>
          <input
            required
            value={product.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Thương hiệu</span>
          <input
            required
            value={product.brand}
            onChange={(e) => update("brand", e.target.value)}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Danh mục</span>
          <select
            value={product.category}
            onChange={(e) => update("category", e.target.value as Product["category"])}
            className={fieldClass()}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Danh mục con</span>
          <input
            value={product.subCategory}
            onChange={(e) => update("subCategory", e.target.value)}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Đơn vị</span>
          <input
            value={product.unit}
            onChange={(e) => update("unit", e.target.value)}
            className={fieldClass()}
          />
        </label>
        <label className="block">
          <span className="text-xs tracking-[0.15em] text-muted uppercase">Giá (VND)</span>
          <input
            type="number"
            min={0}
            required
            value={product.price}
            onChange={(e) => update("price", Number(e.target.value))}
            className={fieldClass()}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs tracking-[0.15em] text-muted uppercase">Mô tả</span>
        <textarea
          rows={3}
          value={product.description}
          onChange={(e) => update("description", e.target.value)}
          className={fieldClass() + " resize-none"}
        />
      </label>

      <ImageUploadField
        label="Ảnh đại diện sản phẩm"
        value={product.image ?? ""}
        onChange={(path) => update("image", path)}
      />

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs tracking-[0.15em] text-muted uppercase">Phiên bản / biến thể</p>
          <button
            type="button"
            onClick={addVariant}
            className="text-xs text-accent hover:opacity-80"
          >
            + Thêm phiên bản
          </button>
        </div>

        <div className="mt-3 space-y-4">
          {product.variants.map((variant, i) => (
            <div key={i} className="rounded-md border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Phiên bản {i + 1}</p>
                {product.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="text-xs text-red-600 hover:opacity-80"
                  >
                    Xoá
                  </button>
                )}
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[11px] text-muted">Mã SAP / model</span>
                  <input
                    value={variant.sapCode}
                    onChange={(e) => updateVariant(i, { sapCode: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Công suất</span>
                  <input
                    value={variant.power}
                    onChange={(e) => updateVariant(i, { power: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Điện áp</span>
                  <input
                    value={variant.voltage}
                    onChange={(e) => updateVariant(i, { voltage: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Nhiệt độ màu</span>
                  <input
                    value={variant.colorTemp}
                    onChange={(e) => updateVariant(i, { colorTemp: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Cấp bảo vệ (IP)</span>
                  <input
                    value={variant.ipRating}
                    onChange={(e) => updateVariant(i, { ipRating: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Kích thước</span>
                  <input
                    value={variant.dimensions}
                    onChange={(e) => updateVariant(i, { dimensions: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Hoàn thiện / màu</span>
                  <input
                    value={variant.finish ?? ""}
                    onChange={(e) => updateVariant(i, { finish: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
                <label className="block">
                  <span className="text-[11px] text-muted">Ghi chú</span>
                  <input
                    value={variant.note ?? ""}
                    onChange={(e) => updateVariant(i, { note: e.target.value })}
                    className={fieldClass()}
                  />
                </label>
              </div>

              <div className="mt-3">
                <ImageUploadField
                  label="Ảnh phiên bản này"
                  value={variant.image ?? ""}
                  onChange={(path) => updateVariant(i, { image: path })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-foreground px-8 py-3 text-sm tracking-wide text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu sản phẩm"}
        </button>
      </div>
    </form>
  );
}
