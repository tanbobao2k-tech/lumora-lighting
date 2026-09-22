"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { formatPrice } from "@/lib/format";
import type { OrderPayload } from "@/app/api/orders/route";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ customerName: "", phone: "", address: "", note: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const payload: OrderPayload = {
      ...form,
      items: items.map((i) => ({
        name: i.name,
        variantLabel: i.variantLabel,
        quantity: i.quantity,
        price: i.price,
      })),
      total: totalPrice,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    setOrderId(data.orderId);
    setStatus("done");
    clearCart();
  };

  if (status === "done") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <h1 className="font-serif text-3xl">Đặt hàng thành công</h1>
        <p className="mt-3 text-sm text-muted">
          Mã đơn hàng: <span className="text-foreground">{orderId}</span>. Chúng tôi sẽ liên hệ
          qua số điện thoại {form.phone} để xác nhận đơn hàng.
        </p>
        <Link href="/san-pham" className="btn-luxury mt-8 inline-flex bg-ink text-ink-foreground hover:opacity-85">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <p>Giỏ hàng đang trống, không có gì để đặt.</p>
        <Link href="/san-pham" className="mt-6 inline-block text-sm text-accent hover:opacity-80">
          Quay lại mua sắm →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <h1 className="font-serif text-3xl sm:text-4xl">Thông tin đặt hàng</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-[0.15em] text-muted uppercase" htmlFor="customerName">
              Họ và tên
            </label>
            <input
              id="customerName"
              required
              value={form.customerName}
              onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
              className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.15em] text-muted uppercase" htmlFor="phone">
              Số điện thoại
            </label>
            <input
              id="phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.15em] text-muted uppercase" htmlFor="address">
              Địa chỉ nhận hàng
            </label>
            <input
              id="address"
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              className="mt-2 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="text-xs tracking-[0.15em] text-muted uppercase" htmlFor="note">
              Ghi chú (không bắt buộc)
            </label>
            <textarea
              id="note"
              rows={3}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              className="mt-2 w-full resize-none rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-luxury w-full bg-ink text-ink-foreground hover:opacity-85 disabled:opacity-50"
          >
            {status === "submitting" ? "Đang gửi..." : "Xác nhận đặt hàng"}
          </button>
        </form>

        <div className="rounded-md border border-border p-6">
          <p className="text-xs tracking-[0.15em] text-muted uppercase">Đơn hàng</p>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={`${item.slug}-${item.variantLabel}`} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm font-medium">
            <span>Tổng cộng</span>
            <span className="font-serif text-lg text-accent">{formatPrice(totalPrice)}</span>
          </div>
          <p className="mt-4 text-xs text-muted">
            Thanh toán khi nhận hàng (COD) hoặc chuyển khoản — nhân viên sẽ trao đổi cụ thể khi
            xác nhận đơn.
          </p>
        </div>
      </div>
    </div>
  );
}
