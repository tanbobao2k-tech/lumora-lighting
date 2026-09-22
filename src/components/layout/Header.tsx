"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";

const NAV_LINKS = [
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
];

export function Header({ brandName }: { brandName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-[0.2em]">
          {brandName}
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-sm tracking-wide md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-accent ${
                  pathname?.startsWith(link.href) ? "text-accent" : "text-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link href="/gio-hang" aria-label="Giỏ hàng" className="relative text-foreground/80 hover:text-accent">
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 5h2l1.6 9.6A2 2 0 0 0 8.6 16h8.8a2 2 0 0 0 2-1.7L21 8H6" />
              <circle cx="9.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
              <circle cx="17.5" cy="20" r="1.3" fill="currentColor" stroke="none" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground">
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
              className={`h-px w-5 bg-foreground transition-transform ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-foreground transition-transform ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border/70 px-5 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm tracking-wide text-foreground/80 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
