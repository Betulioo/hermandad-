import { api } from '@/lib/api';
import type { Product } from '@/types/product';

export async function getProducts(page = 1, limit = 50): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/products', {
    params: { page, limit },
  });
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${slug}`);
  return data;
}
