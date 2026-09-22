import Link from "next/link";
import { categories } from "@/data/categories";
import { SITE_INFO } from "./SITE_INFO";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-b border-border/70 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium">Nhận tin khuyến mãi &amp; sản phẩm mới</p>
          <p className="text-xs text-muted">Đăng ký để không bỏ lỡ ưu đãi từ LUMORA.</p>
        </div>
        <div className="max-w-sm sm:w-80">
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-[0.2em]">{SITE_INFO.brandName}</p>
          <p className="mt-3 text-sm text-muted">{SITE_INFO.brandTagline}</p>
          <p className="mt-6 text-sm text-muted">
            Phân phối: {SITE_INFO.distributedBrands.join(" · ")}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-muted uppercase">Sản phẩm</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/san-pham?danh-muc=${cat.id}`}
                  className="text-foreground/80 hover:text-accent"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-muted uppercase">Hỗ trợ</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/gioi-thieu" className="text-foreground/80 hover:text-accent">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="text-foreground/80 hover:text-accent">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/gio-hang" className="text-foreground/80 hover:text-accent">
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-muted uppercase">Liên hệ</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {SITE_INFO.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="hover:text-accent">
                  {phone}
                </a>
              </li>
            ))}
            <li>{SITE_INFO.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70 px-5 py-6 text-center text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} {SITE_INFO.brandName}. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
