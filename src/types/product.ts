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

export type StockValidationStatus =
  | 'available'
  | 'insufficient_stock'
  | 'unavailable';

export interface StockValidationResult {
  productId: string;
  requestedQuantity: number;
  currentStock: number;
  available: boolean;
  status: StockValidationStatus;
  product?: {
    id: string;
    name: string;
    slug: string;
    imageUrl: string | null;
  };
}
