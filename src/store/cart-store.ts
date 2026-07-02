import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  /** Stock conocido al añadir/actualizar; se usa para limitar cantidad */
  stock: number;
  quantity: number;
}

interface CartStore {
  items: CartLine[];
  addItem: (input: {
    productId: string;
    slug: string;
    name: string;
    priceCents: number;
    stock: number;
  }) => void;
  setQuantity: (productId: string, quantity: number) => void;
  setKnownStock: (productId: string, stock: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

function totalCents(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
}

function totalItems(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + line.quantity, 0);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: ({ productId, slug, name, priceCents, stock }) => {
        if (stock <= 0) return;
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            const nextQty = Math.min(existing.quantity + 1, stock);
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: nextQty, stock, priceCents, name, slug }
                  : i,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { productId, slug, name, priceCents, stock, quantity: 1 },
            ],
          };
        });
      },

      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter((i) => i.productId !== productId),
          }));
          return;
        }
        set((state) => {
          const line = state.items.find((i) => i.productId === productId);
          if (!line) return state;
          const capped = Math.min(quantity, Math.max(line.stock, 0));
          if (capped <= 0) {
            return { items: state.items.filter((i) => i.productId !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.productId === productId ? { ...i, quantity: capped } : i,
            ),
          };
        });
      },

      setKnownStock: (productId, stock) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, stock: Math.max(stock, 0) } : i,
          ),
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'hermandad-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export function selectCartTotalCents(items: CartLine[]): number {
  return totalCents(items);
}

export function selectCartTotalItems(items: CartLine[]): number {
  return totalItems(items);
}
