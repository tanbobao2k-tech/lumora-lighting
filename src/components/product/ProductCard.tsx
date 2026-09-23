import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { ProductPlaceholderImage } from "./ProductPlaceholderImage";

export function ProductCard({ product }: { product: Product }) {
  const hasMultipleVariants = product.variants.length > 1;
  const isPhoto = /\.jpe?g$/i.test(product.image ?? "");

  return (
    <Link href={`/san-pham/${product.slug}`} className="group block">
      <div
        className={`aspect-square overflow-hidden border border-border/70 transition-colors duration-300 group-hover:border-accent-soft ${isPhoto ? "" : "bg-surface p-6"}`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${isPhoto ? "object-cover" : "object-contain"}`}
          />
        ) : (
          <ProductPlaceholderImage
            label={product.name}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] tracking-[0.18em] text-muted uppercase">{product.brand}</p>
          <h3 className="mt-1 text-sm text-foreground">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap text-sm font-medium text-accent">
          {hasMultipleVariants && <span className="font-normal text-xs text-muted">từ </span>}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
