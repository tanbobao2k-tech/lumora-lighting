"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

const NAV_LINKS = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/du-an", label: "Dự án" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/triet-ly-kinh-doanh", label: "Triết lý" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header({ brandName }: { brandName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-ink text-ink-foreground">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-2xl tracking-[0.3em]">
          {brandName}
        </Link>

        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-10 text-[11px] tracking-[0.2em] uppercase md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-accent-soft ${
                  pathname?.startsWith(link.href) ? "text-accent-soft" : "text-ink-foreground/75"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/gio-hang" aria-label="Giỏ hàng" className="relative text-ink-foreground/80 hover:text-accent-soft">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5h2l1.6 9.6A2 2 0 0 0 8.6 16h8.8a2 2 0 0 0 2-1.7L21 8H6" />
              <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-soft text-[10px] text-ink">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="Mở menu"
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-ink-foreground transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-ink-foreground transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink-foreground/15 px-5 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-xs tracking-[0.2em] uppercase text-ink-foreground/80 hover:text-accent-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
