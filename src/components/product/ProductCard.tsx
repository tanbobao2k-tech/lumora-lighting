import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { ProductPlaceholderImage } from "./ProductPlaceholderImage";

export function ProductCard({ product }: { product: Product }) {
  const hasMultipleVariants = product.variants.length > 1;

  return (
    <Link href={`/san-pham/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-sm shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-background/90 px-2.5 py-1 text-[10px] tracking-wide text-foreground/70 backdrop-blur">
          Chính hãng
        </span>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <ProductPlaceholderImage
            label={product.name}
            className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs tracking-wide text-muted">{product.brand}</p>
          <h3 className="text-sm text-foreground">{product.name}</h3>
        </div>
        <p className="whitespace-nowrap text-sm text-foreground">
          {hasMultipleVariants && <span className="text-muted">từ </span>}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
