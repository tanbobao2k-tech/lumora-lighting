import Link from "next/link";
import { getCategories, getSiteInfo } from "@/lib/content-store";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const categories = getCategories();
  const SITE_INFO = getSiteInfo();

  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 border-b border-ink-foreground/10 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-medium">Nhận tin khuyến mãi &amp; sản phẩm mới</p>
          <p className="text-xs text-ink-foreground/50">Đăng ký để không bỏ lỡ ưu đãi từ LUMORA.</p>
        </div>
        <div className="max-w-sm sm:w-80">
          <NewsletterForm />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="font-serif text-xl tracking-[0.2em]">{SITE_INFO.brandName}</p>
          <p className="mt-3 text-sm text-ink-foreground/55">{SITE_INFO.brandTagline}</p>
          <p className="mt-6 text-sm text-ink-foreground/55">
            Phân phối: {SITE_INFO.distributedBrands.join(" · ")}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-accent-soft uppercase">Sản phẩm</p>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/san-pham?danh-muc=${cat.id}`}
                  className="text-ink-foreground/70 hover:text-accent-soft"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-accent-soft uppercase">Hỗ trợ</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/du-an" className="text-ink-foreground/70 hover:text-accent-soft">
                Dự án
              </Link>
            </li>
            <li>
              <Link href="/triet-ly-kinh-doanh" className="text-ink-foreground/70 hover:text-accent-soft">
                Triết lý kinh doanh
              </Link>
            </li>
            <li>
              <Link href="/gioi-thieu" className="text-ink-foreground/70 hover:text-accent-soft">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/lien-he" className="text-ink-foreground/70 hover:text-accent-soft">
                Liên hệ
              </Link>
            </li>
            <li>
              <Link href="/gio-hang" className="text-ink-foreground/70 hover:text-accent-soft">
                Giỏ hàng
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-accent-soft uppercase">Liên hệ</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/70">
            {SITE_INFO.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} className="hover:text-accent-soft">
                  {phone}
                </a>
              </li>
            ))}
            <li>{SITE_INFO.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10 px-5 py-6 text-center text-xs text-ink-foreground/45 sm:px-8">
        © {new Date().getFullYear()} {SITE_INFO.brandName}. Bảo lưu mọi quyền.
      </div>
    </footer>
  );
}
