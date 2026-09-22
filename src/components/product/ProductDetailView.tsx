"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
import { ProductViewer3D } from "./ProductViewer3D";
import { SpecsTable } from "./SpecsTable";

export function ProductDetailView({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = product.variants[variantIndex];
  const variantLabel = useMemo(() => {
    const parts = [variant.power, variant.finish, variant.note].filter(Boolean);
    return parts.join(" · ");
  }, [variant]);

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      unit: product.unit,
      quantity,
      variantLabel,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid gap-10 pb-24 md:gap-14 md:pb-0 md:grid-cols-2">
      <ProductViewer3D
        modelSrc={product.model3d}
        image={variant.image ?? product.image}
        label={product.name}
      />

      <div>
        <p className="text-[11px] tracking-[0.25em] text-accent uppercase">{product.brand}</p>
        <h1 className="font-serif mt-3 text-3xl sm:text-4xl">{product.name}</h1>
        <p className="font-serif mt-3 text-xl text-accent">{formatPrice(product.price)}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-8 space-y-6">
          {product.variants.length > 1 && (
            <div>
              <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Phiên bản</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sapCode}
                    type="button"
                    onClick={() => setVariantIndex(i)}
                    className={`border px-4 py-2 text-xs tracking-wide transition-colors ${
                      i === variantIndex
                        ? "border-ink bg-ink text-ink-foreground"
                        : "border-border text-foreground/70 hover:border-accent hover:text-accent"
                    }`}
                  >
                    {[v.power, v.finish].filter(Boolean).join(" · ")}
                  </button>
                ))}
              </div>
            </div>
          )}

          <SpecsTable variant={variant} />

          <div className="flex items-center gap-4">
            <p className="text-xs tracking-[0.15em] text-muted uppercase">Số lượng</p>
            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-9 w-9 text-sm hover:text-accent"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => setQuantity((q) => q + 1)}
                className="h-9 w-9 text-sm hover:text-accent"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="btn-luxury hidden bg-ink text-ink-foreground hover:opacity-85 sm:inline-flex"
          >
            {added ? "Đã thêm vào giỏ ✓" : `Thêm vào giỏ — ${formatPrice(product.price * quantity)}`}
          </button>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-ink-foreground/10 bg-ink/95 px-5 py-3 text-ink-foreground backdrop-blur sm:hidden">
        <p className="flex-1 text-sm font-semibold">{formatPrice(product.price * quantity)}</p>
        <button
          type="button"
          onClick={handleAdd}
          className="btn-luxury bg-accent-soft text-ink hover:opacity-85"
        >
          {added ? "Đã thêm ✓" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
}
