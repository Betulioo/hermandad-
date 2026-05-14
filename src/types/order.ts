export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

export interface OrderItemSnapshot {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  customerName: string;
  customerEmail: string | null;
  customerContact: string;
  notes: string | null;
  totalCents: number;
  /** Incluido en detalle; opcional en listados */
  items?: OrderItemSnapshot[];
  createdAt: string;
  updatedAt: string;
}
