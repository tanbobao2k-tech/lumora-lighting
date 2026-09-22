export type ProductCategory = "trong-nha" | "ngoai-troi" | "nang-luong-mat-troi";

export interface ProductVariant {
  sapCode: string;
  power: string;
  voltage: string;
  colorTemp: string;
  ipRating: string;
  dimensions: string;
  finish?: string;
  note?: string;
  /** Ảnh riêng cho phiên bản này (khác màu/kiểu lắp so với phiên bản khác) */
  image?: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: string;
  unit: string;
  price: number;
  description: string;
  variants: ProductVariant[];
  /** Ảnh đại diện sản phẩm (dùng cho thẻ sản phẩm, ảnh mặc định) */
  image?: string;
  /** Đường dẫn model 3D (.glb/.gltf) — để trống cho tới khi có file thật */
  model3d?: string;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  unit: string;
  image?: string;
  quantity: number;
  variantLabel?: string;
}
