# LUMORA — Website bán đèn chiếu sáng

Website giới thiệu và bán đèn chiếu sáng chính hãng (Opple, Philips, Osram, LTS) và quạt năng
lượng mặt trời. Dự án tách biệt hoàn toàn với "Bủm Bủm Store" (bán quần áo) ở thư mục gốc.

## Trạng thái hiện tại

Đây là **khung xương (scaffold)** ban đầu, dùng dữ liệu mẫu trích từ ảnh chụp bảng báo giá LTS.
Còn thiếu:

- **File Excel đầy đủ** — file gốc nằm ở `C:\Users\Admin\Desktop\LTS_DANH SÁCH HÀNG CÓ SẴN_02.07.2026_send.xls`
  (đã dùng để trích ảnh sản phẩm, xem mục Ảnh sản phẩm bên dưới), nhưng dữ liệu số lượng/giá/thông
  số trong `src/data/products.ts` mới chỉ là ~10 sản phẩm mẫu nhập tay — chưa import đầy đủ toàn bộ
  danh mục từ file này.
- **Ảnh sản phẩm** — trích xuất trực tiếp từ ảnh gốc nhúng trong file Excel báo giá LTS (chuyển
  `.xls` → `.xlsx` qua Excel COM để lấy ảnh chất lượng cao trong `xl/media/`, khớp từng ảnh với
  đúng SKU bằng mắt), đặt tại `public/products/*.jpg` (ghép nền màu kem đồng bộ UI). Chất lượng
  tốt hơn nhiều so với bản đầu (crop từ ảnh chụp màn hình), nhưng vẫn có 1-2 ảnh nguồn kém (ví dụ
  `mang-den-tuyp_doi.jpg` là ảnh chụp tay trên sàn thảm, không phải ảnh studio) và một số SKU dùng
  chung ảnh do nguồn không có ảnh riêng biệt cho từng mã hàng. Cấu trúc dữ liệu đã sẵn:
  `Product.image` (ảnh đại diện) và mỗi `ProductVariant.image` (ảnh riêng theo phiên bản/màu)
  trong `src/data/products.ts` — khi có ảnh chụp sản phẩm thật (studio, nền trắng), chỉ cần thay
  đường dẫn, không phải sửa code. [`ProductPlaceholderImage`](src/components/product/ProductPlaceholderImage.tsx)
  vẫn được giữ làm fallback cuối cùng khi sản phẩm chưa có `image`.
- **File 3D (.glb/.gltf)** — [`ProductViewer3D`](src/components/product/ProductViewer3D.tsx) đã
  dựng sẵn khung xoay/zoom bằng `@react-three/fiber` + `@react-three/drei` (`OrbitControls`,
  `useGLTF`). Khi có file model, đặt vào `public/models/<slug>.glb` rồi gán
  `model3d: "/models/<slug>.glb"` trong `products.ts` — viewer sẽ tự chuyển từ hình đèn placeholder
  (dựng bằng primitive) sang model thật.
- **Logo** — chưa có, header đang dùng chữ "LUMORA" dạng text.
- **Nội dung placeholder cần thay trước khi launch thật**:
  [`Testimonials.tsx`](src/components/home/Testimonials.tsx) chứa 3 review khách hàng là **dữ liệu
  mẫu tự viết** (tên, nội dung không có thật) — phải thay bằng đánh giá khách hàng thật trước khi
  đưa web ra công khai, không được để lại như hàng thật. [`TrustBar.tsx`](src/components/home/TrustBar.tsx)
  có số liệu "24h giao hàng nội thành" — cần xác nhận với shop có đúng cam kết này không trước khi
  giữ lại (các số liệu "100% chính hãng", "2 năm bảo hành", "4 thương hiệu" là thông tin thật, lấy
  từ điều kiện bảo hành trong báo giá LTS).
  [`NewsletterForm.tsx`](src/components/layout/NewsletterForm.tsx) mới chỉ là UI, form đăng ký chưa
  nối vào dịch vụ email marketing thật nào — hiện chỉ hiện thông báo cảm ơn ở client, email nhập vào
  không được lưu lại ở đâu cả.

## Thông tin shop

- Số điện thoại: 0968070182 — không hiển thị trực tiếp trong Header nữa (theo yêu cầu người dùng),
  chỉ còn ở Footer, trang Liên hệ, và nút gọi điện trong [`ContactIcons.tsx`](src/components/layout/ContactIcons.tsx).
- Địa chỉ: 88 Ngõ 113 Đ. Đan Khê, Hoài Đức, Hà Nội, Việt Nam
- Bản đồ: ghim đúng vị trí theo link Google Maps người dùng cung cấp (xem
  [`SITE_INFO.ts`](src/components/layout/SITE_INFO.ts))
- Facebook: https://web.facebook.com/Buingoctan2k — dùng làm nút Messenger nổi
  (`https://m.me/Buingoctan2k`). Zalo dùng chung số điện thoại (`https://zalo.me/0968070182`).
- Cụm icon liên hệ nổi (gọi điện / Zalo / Messenger) nằm ở
  [`ContactIcons.tsx`](src/components/layout/ContactIcons.tsx), hiển thị trên mọi trang qua
  `layout.tsx`, tự nâng lên trên thanh "Thêm vào giỏ" dính đáy ở trang chi tiết sản phẩm (mobile).

## Tầm nhìn thiết kế

Tối giản, phong cách Hàn Quốc nhẹ nhàng — nền kem ấm, chữ than đậm, một màu nhấn đồng/vàng trầm
(`--accent`), nhiều khoảng trắng, ảnh sản phẩm full-bleed không viền/shadow nặng. Font chính:
Noto Sans (hỗ trợ tiếng Việt đầy đủ qua `next/font/google`).

## Tech stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 (cấu hình theme qua `@theme inline`
  trong `globals.css`, không có `tailwind.config.js`).
- `@react-three/fiber` + `@react-three/drei` + `three` cho phần xem 3D sản phẩm.
- `framer-motion` cho hiệu ứng fade/slide khi cuộn (`RevealOnScroll`).
- Giỏ hàng: React Context + `localStorage` (`CartProvider`), không cần đăng nhập.
- Đặt hàng: `POST /api/orders` gửi email thông báo qua **Resend** (`resend` npm package) về
  `tanbobao2k@gmail.com` (hardcode trong `route.ts`, đổi `SHOP_EMAIL` nếu cần). Cần biến môi trường
  `RESEND_API_KEY` trong `.env.local` (xem `.env.local.example`) — chưa có key thì route vẫn chạy
  bình thường, chỉ `console.warn` và log đơn hàng ra console thay vì gửi mail. Lấy API key tại
  https://resend.com (đăng ký free, vào mục API Keys → Create). Sender hiện dùng
  `onboarding@resend.dev` (không cần verify domain) — cách này chỉ gửi được tới email đã đăng ký
  tài khoản Resend; nếu sau này verify domain riêng thì đổi `from` trong `route.ts` sang domain đó
  để gửi ổn định hơn. Chưa có cổng thanh toán online.

## Quy ước code

- Component nhỏ, đặt tên tiếng Anh; nội dung hiển thị (copy) bằng tiếng Việt.
- Route tiếng Việt không dấu gạch nối theo URL hiện có: `/san-pham`, `/san-pham/[slug]`,
  `/gio-hang`, `/dat-hang`, `/gioi-thieu`, `/lien-he`.
- Dữ liệu sản phẩm là nguồn sự thật duy nhất ở `src/data/products.ts` — không hardcode sản phẩm
  trong component.

## Commands

```
npm run dev      # chạy dev server
npm run build    # build production
npm run lint     # kiểm tra lint
```
