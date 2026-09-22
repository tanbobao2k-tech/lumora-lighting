import { getCategories } from "@/lib/content-store";
import { CategoriesEditor } from "@/components/admin/CategoriesEditor";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  const categories = getCategories();

  return (
    <div>
      <h1 className="text-2xl font-semibold">Danh mục</h1>
      <p className="mt-1 text-sm text-muted">
        Chỉ chỉnh sửa được tên hiển thị và mô tả — không thêm/xoá danh mục vì cấu trúc trang phụ
        thuộc vào 3 danh mục cố định này.
      </p>
      <div className="mt-6">
        <CategoriesEditor initialCategories={categories} />
      </div>
    </div>
  );
}
