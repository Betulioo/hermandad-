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
  status: string;
  customerName: string;
  customerContact: string;
  notes: string | null;
  totalCents: number;
  /** Incluido en detalle; opcional en listados */
  items?: OrderItemSnapshot[];
  createdAt: string;
  updatedAt: string;
}
