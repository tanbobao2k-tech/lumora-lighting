import Link from "next/link";
import { getProducts, getCategories } from "@/lib/content-store";
import { formatPrice } from "@/lib/format";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const products = getProducts();
  const categories = getCategories();
  const labelOf = (id: string) => categories.find((c) => c.id === id)?.label ?? id;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sản phẩm ({products.length})</h1>
        <Link
          href="/admin/san-pham/moi"
          className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:opacity-85"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-md border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left text-xs text-muted uppercase">
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Phiên bản</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-border last:border-none">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted">{p.brand} · {p.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted">{labelOf(p.category)}</td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 text-muted">{p.variants.length}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/san-pham/${p.slug}`} className="text-xs text-accent hover:opacity-80">
                      Sửa
                    </Link>
                    <DeleteProductButton slug={p.slug} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
