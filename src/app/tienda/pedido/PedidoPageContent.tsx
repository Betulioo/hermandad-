'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { isAxiosError } from 'axios';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { Button } from '@/components/ui/buttons/Button';
import { formatPrice } from '@/lib/utils/formatPrice';
import { createOrder } from '@/services/orders.service';
import { useCartStore, selectCartTotalCents } from '@/store/cart-store';

function formatApiError(err: unknown): string {
  if (isAxiosError(err)) {
    const data = err.response?.data as { message?: string | string[] } | undefined;
    const msg = data?.message;
    if (Array.isArray(msg)) return msg.join(' ');
    if (typeof msg === 'string') return msg;
    if (err.message) return err.message;
  }
  if (err instanceof Error) return err.message;
  return 'No se pudo completar el pedido. Inténtalo de nuevo más tarde.';
}

export function PedidoPageContent() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalCents = selectCartTotalCents(items);

  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOrderId, setSuccessOrderId] = useState<string | null>(null);

  const cartEmpty = items.length === 0;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (items.length === 0) {
      setError('Tu carrito está vacío.');
      return;
    }

    setLoading(true);
    try {
      const order = await createOrder({
        customerName: customerName.trim(),
        customerContact: customerContact.trim(),
        notes: notes.trim() || undefined,
        items: items.map((line) => ({
          productId: line.productId,
          quantity: line.quantity,
        })),
      });
      clearCart();
      setSuccessOrderId(order.id);
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  }

  if (successOrderId) {
    return (
      <PageShell>
        <Section>
          <Container size="md">
            <div className="space-y-6">
              <PageHeading title="Pedido registrado" />
              <p className="text-body-md text-text-secondary">
                Hemos recibido tu pedido correctamente. Guarda este número por si necesitas
                contactar con la secretaría:
              </p>
              <p className="font-heading text-h3 font-semibold text-brand-navy tabular-nums">
                {successOrderId}
              </p>
              <p className="text-body-sm text-text-muted">
                Nos pondremos en contacto contigo para confirmar disponibilidad y forma de pago
                en secretaría.
              </p>
              <Button href="/tienda" variant="primary" size="md">
                Volver a la tienda
              </Button>
            </div>
          </Container>
        </Section>
      </PageShell>
    );
  }

  if (cartEmpty) {
    return (
      <PageShell>
        <Section>
          <Container size="md">
            <div className="space-y-6">
              <PageHeading title="Pedido" />
              <p className="text-body-md text-text-secondary">Tu carrito está vacío.</p>
              <div className="flex flex-wrap gap-3">
                <Button href="/tienda" variant="primary" size="md">
                  Ir a la tienda
                </Button>
                <Button href="/tienda/carrito" variant="secondary" size="md">
                  Ver carrito
                </Button>
              </div>
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
            <div className="space-y-2">
              <PageHeading title="Finalizar pedido" />
              <p className="text-body-sm text-text-muted">
                Revisa el resumen, deja tus datos de contacto y confirma. No se realiza cobro
                online en este momento.
              </p>
            </div>

            <div className="rounded-md border border-border-soft bg-surface-card p-4">
              <h2 className="font-heading text-h4 font-semibold text-text-primary">
                Resumen del carrito
              </h2>
              <ul className="mt-4 divide-y divide-border-soft">
                {items.map((line) => (
                  <li
                    key={line.productId}
                    className="flex flex-wrap items-baseline justify-between gap-2 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <Link
                        href={`/tienda/${line.slug}`}
                        className="font-medium text-text-primary hover:text-brand-navy"
                      >
                        {line.name}
                      </Link>
                      <span className="text-body-sm text-text-muted">
                        {' '}
                        × {line.quantity}
                      </span>
                    </div>
                    <span className="font-medium tabular-nums text-brand-navy">
                      {formatPrice(line.priceCents * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center justify-between border-t border-border-soft pt-4">
                <span className="text-body-lg text-text-secondary">Total</span>
                <span className="font-heading text-h3 font-semibold text-brand-navy tabular-nums">
                  {formatPrice(totalCents)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
              <div className="space-y-2">
                <label htmlFor="customerName" className="block text-body-sm font-medium text-text-primary">
                  Nombre y apellidos
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={160}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-sm border border-border-soft bg-surface-card px-3 py-2 text-body-md text-text-primary outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="customerContact"
                  className="block text-body-sm font-medium text-text-primary"
                >
                  Teléfono o email de contacto
                </label>
                <input
                  id="customerContact"
                  name="customerContact"
                  type="text"
                  autoComplete="tel email"
                  required
                  maxLength={160}
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-sm border border-border-soft bg-surface-card px-3 py-2 text-body-md text-text-primary outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy disabled:opacity-50"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="block text-body-sm font-medium text-text-primary">
                  Notas <span className="font-normal text-text-muted">(opcional)</span>
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={2000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={loading}
                  placeholder="Horario preferido, talla, comentarios…"
                  className="w-full rounded-sm border border-border-soft bg-surface-card px-3 py-2 text-body-md text-text-primary outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy disabled:opacity-50"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-body-sm text-red-900"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" variant="primary" size="md" disabled={loading}>
                  {loading ? 'Enviando…' : 'Confirmar pedido'}
                </Button>
                <Button href="/tienda/carrito" variant="secondary" size="md">
                  Volver al carrito
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
