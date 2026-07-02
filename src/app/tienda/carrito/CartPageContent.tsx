'use client';

import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { Button } from '@/components/ui/buttons/Button';
import { formatPrice } from '@/lib/utils/formatPrice';
import {
  useCartStore,
  selectCartTotalCents,
} from '@/store/cart-store';

export function CartPageContent() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalCents = selectCartTotalCents(items);
  const hasUnavailableLines = items.some(
    (line) => line.stock <= 0 || line.quantity > line.stock,
  );

  if (items.length === 0) {
    return (
      <PageShell>
        <Section>
          <Container size="md">
            <div className="space-y-6">
              <PageHeading title="Carrito" />
              <p className="text-body-md text-text-secondary">Tu carrito está vacío.</p>
              <Button href="/tienda" variant="primary" size="md">
                Ir a la tienda
              </Button>
            </div>
          </Container>
        </Section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-8">
            <PageHeading title="Carrito" />

            <ul className="divide-y divide-border-soft rounded-md border border-border-soft bg-surface-card">
              {items.map((line) => {
                const lineCents = line.priceCents * line.quantity;
                return (
                  <li
                    key={line.productId}
                    className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <Link
                        href={`/tienda/${line.slug}`}
                        className="font-heading text-h4 font-semibold text-text-primary hover:text-brand-navy"
                      >
                        {line.name}
                      </Link>
                      <p className="text-body-sm text-text-muted">
                        {formatPrice(line.priceCents)} / unidad
                      </p>
                      {line.stock <= 0 ? (
                        <p className="text-body-sm font-medium text-red-700">
                          Producto agotado. Quitalo para continuar.
                        </p>
                      ) : line.quantity > line.stock ? (
                        <p className="text-body-sm font-medium text-red-700">
                          Stock disponible: {line.stock}. Reducí la cantidad para continuar.
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border-soft text-body-md text-text-primary hover:bg-surface-alt"
                          aria-label="Reducir cantidad"
                          onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-body-md font-medium tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-9 w-9 items-center justify-center rounded-sm border border-border-soft text-body-md text-text-primary hover:bg-surface-alt disabled:opacity-40"
                          aria-label="Aumentar cantidad"
                          disabled={line.quantity >= line.stock}
                          onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <p className="min-w-[5rem] text-right font-heading text-h4 font-semibold text-brand-navy tabular-nums">
                        {formatPrice(lineCents)}
                      </p>

                      <button
                        type="button"
                        className="text-body-sm text-text-muted underline-offset-2 hover:text-text-primary hover:underline"
                        onClick={() => removeItem(line.productId)}
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col gap-4 border-t border-border-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-body-lg text-text-secondary">
                Total ({items.reduce((n, i) => n + i.quantity, 0)} artículos)
              </p>
              <p className="font-heading text-h2 font-semibold text-brand-navy tabular-nums">
                {formatPrice(totalCents)}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {hasUnavailableLines ? (
                <Button type="button" variant="primary" size="md" disabled>
                  Ajustá el carrito para continuar
                </Button>
              ) : (
                <Button href="/tienda/pedido" variant="primary" size="md">
                  Continuar con el pedido
                </Button>
              )}
            </div>

            <p className="text-body-sm text-text-muted">
              El cobro se gestiona en secretaría. No realizamos pago online en este momento.
            </p>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
