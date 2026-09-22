import type { ProductCategory } from "@/types/product";

export interface CategoryInfo {
  id: ProductCategory;
  label: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    id: "trong-nha",
    label: "Đèn trong nhà",
    description: "Đèn ốp trần, downlight, đèn đọc sách, máng đèn tuýp cho không gian sống.",
  },
  {
    id: "ngoai-troi",
    label: "Đèn ngoài trời",
    description: "Đèn cắm cỏ, đèn âm đất — chiếu sáng sân vườn, lối đi.",
  },
  {
    id: "nang-luong-mat-troi",
    label: "Quạt năng lượng mặt trời",
    description: "Giải pháp làm mát tiết kiệm điện, vận hành bằng năng lượng mặt trời.",
  },
];

export function getCategoryLabel(id: ProductCategory): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
