import { api } from '@/lib/api';
import type { Product } from '@/types/product';

export async function getProductsAdmin(page = 1, limit = 50): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products/admin', {
    params: { page, limit },
  });
  return data;
}

export interface ProductCreateInput {
  name: string;
  sku: string;
  description: string;
  priceCents: number;
  stock?: number;
  imageUrl?: string | null;
  category?: string | null;
  slug?: string;
  isActive?: boolean;
}

export interface ProductUpdateInput {
  name?: string;
  sku?: string;
  description?: string;
  priceCents?: number;
  stock?: number;
  imageUrl?: string | null;
  category?: string | null;
  slug?: string;
  isActive?: boolean;
}

export async function createProduct(input: ProductCreateInput): Promise<Product> {
  const { data } = await api.post<Product>('/products', input);
  return data;
}

export async function updateProduct(
  id: string,
  input: ProductUpdateInput,
): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}`, input);
  return data;
}

export async function deactivateProduct(id: string): Promise<Product> {
  const { data } = await api.patch<Product>(`/products/${id}/deactivate`);
  return data;
}
