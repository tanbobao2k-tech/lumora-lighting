# LUMORA — Website bán đèn chiếu sáng

Website giới thiệu và bán đèn chiếu sáng chính hãng (Opple, Philips, Osram, LTS) và quạt năng
lượng mặt trời. Dự án tách biệt hoàn toàn với "Bủm Bủm Store" (bán quần áo) ở thư mục gốc, và có
repo GitHub riêng: **https://github.com/tanbobao2k-tech/lumora-lighting** (private).

## Trạng thái hiện tại

Đây là **khung xương (scaffold)** ban đầu, dùng dữ liệu mẫu trích từ ảnh chụp bảng báo giá LTS và
từ website chính thức của LTS (ltslight.vn). Còn thiếu:

- **File Excel đầy đủ** — file gốc nằm ở `C:\Users\Admin\Desktop\LTS_DANH SÁCH HÀNG CÓ SẴN_02.07.2026_send.xls`
  (đã dùng để trích ảnh sản phẩm, xem mục Ảnh sản phẩm bên dưới), nhưng dữ liệu số lượng/giá/thông
  số trong `content/products.json` chỉ có 10 sản phẩm khớp đúng báo giá LTS gửi — chưa import đầy
  đủ toàn bộ danh mục từ file này. Có thể nhập thêm trực tiếp qua trang `/admin/san-pham`.
- **Giá của 25 sản phẩm lấy từ ltslight.vn (thêm sau, không có trong báo giá gốc) là giá ước
  tính, chưa xác nhận với LTS** — trang ltslight.vn không công khai giá bán, nên giá các sản phẩm
  này (đèn spotlight, panel, rọi ray, batten, T8, V-shape, high bay, tri-proof, grow light, pole
  light, đèn pha, đèn nấm, đèn hắt cây, đèn âm nước, đèn gắn tường, đèn đường, 4 dòng đèn năng
  lượng mặt trời, đèn chùm trang trí, và 4 dòng đèn sự cố/thoát nạn) được ước lượng dựa trên mặt
  bằng giá thị trường đèn LED Việt Nam cho công suất/loại tương đương — **riêng giá đèn chùm trang
  trí gần như vô nghĩa vì loại này luôn báo giá theo mẫu/kích thước thực tế**, con số trong
  `products.json` chỉ là placeholder tạm. **Phải liên hệ LTS xác nhận giá thật trước khi bán** —
  sửa qua `/admin/san-pham/<slug>`. Ghi chú: người dùng xác nhận LUMORA và LTS Á Châu (ltslight.vn)
  là cùng một chủ sở hữu, nên việc lấy toàn bộ ảnh/thông số từ ltslight.vn không có vấn đề bản
  quyền. 3 sản phẩm (đèn pha/tường/sân vườn năng lượng mặt trời) vẫn chưa có ảnh thật vì chính
  ltslight.vn cũng không hiển thị ảnh cho các mục này (trang chỉ có nút liên hệ báo giá) — đang
  dùng `ProductPlaceholderImage` fallback. Còn nhiều danh mục trên ltslight.vn/vi/san-pham.html
  chưa khai thác hết (ví dụ đèn Décor, đèn LED neon, LED Emergency Driver, đèn âm nước/gắn tường
  không có thông số chi tiết công khai) — có thể lấy thêm khi cần.
- **Ảnh sản phẩm** — trích xuất trực tiếp từ ảnh gốc nhúng trong file Excel báo giá LTS (chuyển
  `.xls` → `.xlsx` qua Excel COM để lấy ảnh chất lượng cao trong `xl/media/`, khớp từng ảnh với
  đúng SKU bằng mắt), đặt tại `public/products/*.jpg` (ghép nền màu kem đồng bộ UI). Vẫn có 1-2
  ảnh nguồn kém (ví dụ `mang-den-tuyp_doi.jpg` là ảnh chụp tay trên sàn thảm, không phải ảnh
  studio) và một số SKU dùng chung ảnh do nguồn không có ảnh riêng biệt cho từng mã hàng. Đổi ảnh
  trực tiếp qua trang admin (`/admin/san-pham/<slug>`, có nút tải ảnh lên).
- **File 3D (.glb/.gltf)** — [`ProductViewer3D`](src/components/product/ProductViewer3D.tsx) đã
  dựng sẵn khung xoay/zoom bằng `@react-three/fiber` + `@react-three/drei` (`OrbitControls`,
  `useGLTF`). Khi có file model, đặt vào `public/models/<slug>.glb` rồi gán
  `model3d: "/models/<slug>.glb"` cho sản phẩm đó trong `content/products.json` — viewer sẽ tự
  chuyển từ ảnh tĩnh sang model thật. Chưa có UI admin cho việc này (phải sửa JSON tay).
- **Logo** — chưa có, header đang dùng chữ "LUMORA" dạng text.
- **Nội dung placeholder cần thay trước khi launch thật** (sửa qua `/admin/trang-chu`):
  `content/home.json` có 3 review khách hàng là **dữ liệu mẫu tự viết** (tên, nội dung không có
  thật) — phải thay bằng đánh giá khách hàng thật trước khi đưa web ra công khai. Cũng có số liệu
  "24h giao hàng nội thành" trong `trustStats` — cần xác nhận với shop có đúng cam kết này không.
  [`NewsletterForm.tsx`](src/components/layout/NewsletterForm.tsx) mới chỉ là UI, form đăng ký
  chưa nối vào dịch vụ email marketing thật nào — hiện chỉ hiện thông báo cảm ơn ở client, email
  nhập vào không được lưu lại ở đâu cả.

## Trang quản trị (/admin)

Có trang admin chỉnh sửa gần như mọi nội dung web mà không cần sửa code / build lại:

- **Đăng nhập**: `/admin/login`, xác thực bằng 1 mật khẩu chung lưu ở biến môi trường
  `ADMIN_PASSWORD` trong `.env.local` (hiện đang là `lumora-quan-tri-2026` — **nên đổi mật khẩu
  này** qua `.env.local` rồi restart server). Phiên đăng nhập lưu bằng cookie httpOnly 30 ngày.
  Route `/admin/*` và `/api/admin/*` được chặn bởi [`src/proxy.ts`](src/proxy.ts) (Next.js 16 đổi
  tên quy ước từ `middleware.ts` sang `proxy.ts`).
- **Quản lý được**: sản phẩm (thêm/sửa/xoá, nhiều phiên bản/biến thể, tải ảnh lên) tại
  `/admin/san-pham`; danh mục (chỉ label/mô tả, không thêm/xoá vì 3 category id cố định trong
  `ProductCategory` type) tại `/admin/danh-muc`; thông tin shop (SĐT, địa chỉ, link bản đồ,
  Facebook/Messenger, thương hiệu phân phối) tại `/admin/thong-tin`; nội dung trang chủ (hero,
  trust bar, feature points text, testimonials) tại `/admin/trang-chu`.
- **Dữ liệu lưu ở đâu**: file JSON trong `content/` (`products.json`, `categories.json`,
  `site.json`, `home.json`), đọc/ghi qua [`src/lib/content-store.ts`](src/lib/content-store.ts)
  bằng `fs` — **đồng bộ, chạy trên Node.js runtime**. Web đọc trực tiếp các file này ở mọi request
  (toàn bộ trang site đều đánh dấu `export const dynamic = "force-dynamic"`), nên sửa ở admin là
  thấy ngay trên web, không cần build lại.
- **Giới hạn quan trọng khi deploy lên hosting serverless (Vercel, Netlify...)**: filesystem ở đó
  thường **read-only** khi đã deploy, nghĩa là admin sẽ *đọc* được nội dung (vì file có sẵn trong
  build) nhưng **ghi/lưu thay đổi sẽ lỗi** vì không ghi được vào ổ đĩa. Ảnh upload qua
  `/api/admin/upload` cũng gặp vấn đề tương tự. Muốn admin hoạt động đầy đủ khi deploy công khai,
  cần chuyển `content-store.ts` sang một database thật (Postgres/SQLite qua Turso, MongoDB, v.v.)
  và ảnh sang một storage service (Vercel Blob, Cloudinary, S3...) — hiện tại **chỉ chạy đầy đủ
  khi self-host hoặc chạy trên máy có filesystem ghi được** (ví dụ VPS chạy `next start`, hoặc máy
  dev hiện tại của bạn).
- Ảnh upload lưu trực tiếp vào `public/products/`, cùng thư mục với ảnh có sẵn.

## Thông tin shop

- Số điện thoại: 0968070182 — không hiển thị trực tiếp trong Header (theo yêu cầu người dùng), chỉ
  còn ở Footer, trang Liên hệ, và nút gọi điện trong
  [`ContactIcons.tsx`](src/components/layout/ContactIcons.tsx).
- Địa chỉ: 88 Ngõ 113 Đ. Đan Khê, Hoài Đức, Hà Nội, Việt Nam
- Facebook: https://web.facebook.com/Buingoctan2k — dùng làm nút Messenger nổi
  (`https://m.me/Buingoctan2k`). Zalo dùng chung số điện thoại (`https://zalo.me/0968070182`).
- Cụm icon liên hệ nổi (gọi điện / Zalo / Messenger) nằm ở
  [`ContactIcons.tsx`](src/components/layout/ContactIcons.tsx), hiển thị trên mọi trang qua
  `(site)/layout.tsx`, tự nâng lên trên thanh "Thêm vào giỏ" dính đáy ở trang chi tiết sản phẩm
  (mobile). Toàn bộ thông tin này sửa được qua `/admin/thong-tin`, không cần sửa code.

## Tầm nhìn thiết kế

Đã chuyển từ tối giản Hàn Quốc sang **luxury editorial** (tham khảo LV/Gucci/Thái Công) theo yêu
cầu người dùng — nền đen than (`--ink` / `--ink-foreground`) cho Header, Hero, TrustBar, Footer,
xen giữa các block nền kem sáng (`--background`/`--surface`) cho phần lưới sản phẩm (giữ độ tương
phản rõ để ảnh sản phẩm dễ nhìn). Màu nhấn vàng đồng đậm hơn bản đầu (`--accent` / `--accent-soft`
cho chữ trên nền tối). Font tiêu đề là **Playfair Display** (`.font-serif`, biến `--font-display`)
dùng cho mọi h1/h2 và giá tiền; font phần thân vẫn là Noto Sans. Nút bấm chính dùng class dùng
chung `.btn-luxury` (góc vuông, chữ hoa dãn cách, không còn bo tròn kiểu pill) thay cho
`rounded-full`. Vẫn còn nền ảnh "công nghệ" mờ rất nhẹ (opacity 0.05, đã khử màu bằng
`grayscale`) phủ toàn site — xem `body::before` trong `globals.css`, thêm theo yêu cầu người dùng
trước khi chuyển hướng sang luxury nên đã giảm độ hiện diện để không phá tông đen/vàng.

## Tech stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 (cấu hình theme qua `@theme inline` trong
  `globals.css`, không có `tailwind.config.js`).
- `src/app/(site)/` — route group chứa toàn bộ trang khách hàng (trang chủ, sản phẩm, giỏ hàng...)
  với layout riêng (`(site)/layout.tsx`: Header/Footer/CartProvider/ContactIcons). `src/app/admin/`
  nằm **ngoài** route group này nên không bị dính header/footer của site bán hàng — có shell riêng
  ở `admin/(dashboard)/layout.tsx` (sidebar quản trị), còn `admin/login` dùng thẳng root layout
  (chỉ có `<html>/<body>`, không sidebar).
- `@react-three/fiber` + `@react-three/drei` + `three` cho phần xem 3D sản phẩm.
- `framer-motion` cho hiệu ứng fade/slide khi cuộn (`RevealOnScroll`).
- Giỏ hàng: React Context + `localStorage` (`CartProvider`), không cần đăng nhập.
- Đặt hàng: `POST /api/orders` gửi email thông báo qua **Resend** (`resend` npm package) về
  `tanbobao2k@gmail.com` (hardcode `SHOP_EMAIL` trong `route.ts`). Cần biến môi trường
  `RESEND_API_KEY` trong `.env.local` (xem `.env.local.example`) — chưa có key thì route vẫn chạy
  bình thường, chỉ `console.warn` và log đơn hàng ra console thay vì gửi mail. Sender hiện dùng
  `onboarding@resend.dev` (không cần verify domain) — cách này chỉ gửi được tới email đã đăng ký
  tài khoản Resend; nếu sau này verify domain riêng thì đổi `from` trong `route.ts`. Chưa có cổng
  thanh toán online.
- **`npm run build` chạy `next build --webpack`, không phải Turbopack mặc định** — bản Next.js
  16.3.5 đang dùng bị lỗi ngẫu nhiên `Module not found: @vercel/turbopack-next/internal/font/google/font`
  khi build bằng Turbopack (dù mạng vẫn kết nối được Google Fonts bình thường, và `next dev` với
  Turbopack không gặp lỗi này). Nếu nâng cấp Next.js sau này, thử bỏ `--webpack` xem còn lỗi không.

## Quy ước code

- Component nhỏ, đặt tên tiếng Anh; nội dung hiển thị (copy) bằng tiếng Việt.
- Route tiếng Việt không dấu gạch nối theo URL hiện có: `/san-pham`, `/san-pham/[slug]`,
  `/gio-hang`, `/dat-hang`, `/gioi-thieu`, `/lien-he`.
- Dữ liệu (sản phẩm, danh mục, site info, nội dung trang chủ) là file JSON trong `content/`, đọc
  qua `src/lib/content-store.ts` — không hardcode dữ liệu này trong component nữa. Chỉ cấu trúc
  hiển thị (layout, icon SVG cố định...) mới nằm trong code.

## Commands

```
npm run dev      # chạy dev server (Turbopack)
npm run build    # build production (webpack — xem lý do ở mục Tech stack)
npm run lint     # kiểm tra lint
```
