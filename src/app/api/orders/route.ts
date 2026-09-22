import { NextResponse } from "next/server";
import { Resend } from "resend";
import { formatPrice } from "@/lib/format";

export interface OrderPayload {
  customerName: string;
  phone: string;
  address: string;
  note?: string;
  items: { name: string; variantLabel?: string; quantity: number; price: number }[];
  total: number;
}

const SHOP_EMAIL = "tanbobao2k@gmail.com";

function buildEmailHtml(order: OrderPayload, orderId: string): string {
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee;">
            ${item.name}${item.variantLabel ? `<br/><span style="color:#888;font-size:13px;">${item.variantLabel}</span>` : ""}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1e1c1a;">
      <h2 style="margin-bottom:4px;">Đơn hàng mới — ${orderId}</h2>
      <p style="color:#666;margin-top:0;">LUMORA vừa nhận một đơn đặt hàng mới từ website.</p>

      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:4px 0;color:#888;">Khách hàng</td><td style="padding:4px 0;text-align:right;">${order.customerName}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">Số điện thoại</td><td style="padding:4px 0;text-align:right;">${order.phone}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">Địa chỉ</td><td style="padding:4px 0;text-align:right;">${order.address}</td></tr>
        ${order.note ? `<tr><td style="padding:4px 0;color:#888;">Ghi chú</td><td style="padding:4px 0;text-align:right;">${order.note}</td></tr>` : ""}
      </table>

      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:2px solid #1e1c1a;padding-bottom:6px;">Sản phẩm</th>
            <th style="text-align:center;border-bottom:2px solid #1e1c1a;padding-bottom:6px;">SL</th>
            <th style="text-align:right;border-bottom:2px solid #1e1c1a;padding-bottom:6px;">Thành tiền</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="text-align:right;font-size:18px;font-weight:bold;margin-top:16px;">
        Tổng cộng: ${formatPrice(order.total)}
      </p>
    </div>
  `;
}

export async function POST(request: Request) {
  const order: OrderPayload = await request.json();
  const orderId = `LUMORA-${Date.now()}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[LUMORA] RESEND_API_KEY chưa cấu hình — đơn hàng chỉ log ra console:", order);
    return NextResponse.json({ ok: true, orderId });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "LUMORA <onboarding@resend.dev>",
    to: SHOP_EMAIL,
    subject: `Đơn hàng mới từ ${order.customerName} — ${orderId}`,
    html: buildEmailHtml(order, orderId),
  });

  if (error) {
    console.error("[LUMORA] Gửi email đơn hàng thất bại:", error);
  }

  return NextResponse.json({ ok: true, orderId });
}
