import { getCategories } from "@/lib/content-store";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  const categories = getCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Thêm sản phẩm mới</h1>
      <div className="mt-6">
        <ProductForm mode="create" categories={categories} />
      </div>
    </div>
  );
}
