import { api } from '@/lib/api';
import type { Order } from '@/types/order';

export async function getOrdersAdmin(page = 1, limit = 50): Promise<Order[]> {
  const { data } = await api.get<Order[]>('/orders/admin', {
    params: { page, limit },
  });
  return data;
}

export async function getOrderAdmin(id: string): Promise<Order> {
  const { data } = await api.get<Order>(`/orders/admin/${id}`);
  return data;
}
