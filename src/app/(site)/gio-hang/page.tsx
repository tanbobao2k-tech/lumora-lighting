"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <p className="text-lg">Giỏ hàng của bạn đang trống.</p>
        <Link
          href="/san-pham"
          className="mt-6 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background hover:opacity-85"
        >
          Khám phá sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-2xl font-semibold sm:text-3xl">Giỏ hàng</h1>

      <div className="mt-8 divide-y divide-border">
        {items.map((item) => (
          <div key={`${item.slug}-${item.variantLabel}`} className="flex items-center gap-4 py-5">
            <div className="flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              {item.variantLabel && <p className="text-xs text-muted">{item.variantLabel}</p>}
              <p className="mt-1 text-sm text-muted">{formatPrice(item.price)}</p>
            </div>

            <div className="flex items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                className="h-8 w-8 text-sm hover:text-accent"
              >
                −
              </button>
              <span className="w-7 text-center text-sm">{item.quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                className="h-8 w-8 text-sm hover:text-accent"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right text-sm">{formatPrice(item.price * item.quantity)}</p>

            <button
              type="button"
              aria-label="Xóa sản phẩm"
              onClick={() => removeItem(item.slug)}
              className="text-muted hover:text-accent"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
        <p className="text-sm text-muted">Tổng cộng</p>
        <p className="text-xl font-semibold">{formatPrice(totalPrice)}</p>
      </div>

      <Link
        href="/dat-hang"
        className="mt-6 block w-full rounded-full bg-foreground py-3.5 text-center text-sm tracking-wide text-background hover:opacity-85"
      >
        Tiến hành đặt hàng
      </Link>
    </div>
  );
}
