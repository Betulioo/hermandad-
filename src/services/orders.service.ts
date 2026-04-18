import { api } from '@/lib/api';
import type { Order } from '@/types/order';

export interface CreateOrderInput {
  customerName: string;
  customerContact: string;
  notes?: string;
  items: { productId: string; quantity: number }[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const { data } = await api.post<Order>('/orders', input);
  return data;
}
