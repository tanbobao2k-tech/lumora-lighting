"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

export function CategoryFilter() {
  const searchParams = useSearchParams();
  const active = searchParams.get("danh-muc");

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/san-pham"
        className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors ${
          !active
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border text-foreground/70 hover:border-accent hover:text-accent"
        }`}
      >
        Tất cả
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/san-pham?danh-muc=${cat.id}`}
          className={`rounded-full border px-4 py-1.5 text-xs tracking-wide transition-colors ${
            active === cat.id
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border text-foreground/70 hover:border-accent hover:text-accent"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
