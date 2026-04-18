'use client';

import { Button } from '@/components/ui/buttons/Button';
import { Badge } from '@/components/ui/data-display/Badge';
import { useCartStore } from '@/store/cart-store';

interface ProductAddToCartProps {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  stock: number;
}

export function ProductAddToCart({
  productId,
  slug,
  name,
  priceCents,
  stock,
}: ProductAddToCartProps) {
  const addItem = useCartStore((s) => s.addItem);
  const line = useCartStore((s) => s.items.find((i) => i.productId === productId));
  const quantityInCart = line?.quantity ?? 0;
  const atMax = stock > 0 && quantityInCart >= stock;

  if (stock <= 0) {
    return <Badge variant="default">Agotado</Badge>;
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
      {atMax && (
        <p className="text-body-sm text-text-muted">Has alcanzado la cantidad máxima disponible.</p>
      )}
      <Button
        type="button"
        variant="primary"
        size="md"
        disabled={atMax}
        onClick={() =>
          addItem({ productId, slug, name, priceCents, stock })
        }
      >
        Añadir al carrito
      </Button>
    </div>
  );
}
