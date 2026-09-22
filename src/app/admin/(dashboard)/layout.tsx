import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";

const ADMIN_NAV = [
  { href: "/admin/san-pham", label: "Sản phẩm" },
  { href: "/admin/danh-muc", label: "Danh mục" },
  { href: "/admin/du-an", label: "Dự án" },
  { href: "/admin/trang-chu", label: "Nội dung trang chủ" },
  { href: "/admin/thong-tin", label: "Thông tin shop" },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-surface sm:block">
        <div className="px-5 py-5">
          <p className="text-sm font-semibold tracking-[0.2em]">LUMORA</p>
          <p className="text-xs text-muted">Quản trị</p>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-background hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto px-3 py-4">
          <Link href="/" className="block rounded-md px-3 py-2 text-sm text-muted hover:text-accent">
            ← Về trang web
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-3 sm:hidden">
          <p className="text-sm font-semibold tracking-[0.2em]">LUMORA Admin</p>
          <LogoutButton compact />
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-3 py-2 sm:hidden">
          {ADMIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="px-5 py-8 sm:px-10">{children}</main>
      </div>
    </div>
  );
}
