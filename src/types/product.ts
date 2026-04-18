export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  priceCents: number;
  stock: number;
  imageUrl: string | null;
  category: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
