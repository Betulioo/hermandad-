'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils/formatPrice';
import { getOrderAdmin } from '@/services/orders-admin.service';
import type { Order } from '@/types/order';

export default function AdminPedidoDetallePage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const { user, loading } = useAuth();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  const load = useCallback(async () => {
    if (!id) return;
    setPageLoading(true);
    setError(null);
    try {
      const data = await getOrderAdmin(id);
      setOrder(data);
    } catch {
      setError('No se pudo cargar el pedido.');
      setOrder(null);
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN' && id) {
      load();
    }
  }, [loading, user, id, load]);

  if (loading) return null;
  if (!user) return null;

  if (user.role !== 'ADMIN') {
    return (
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-stone-800">Acceso denegado</h1>
        <p className="text-sm text-stone-500">
          No tienes permiso para acceder a esta sección.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="/admin/pedidos"
          className="text-sm text-stone-500 hover:text-stone-800"
        >
          ← Volver a pedidos
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-stone-800">Pedido</h1>

      {pageLoading ? (
        <p className="text-sm text-stone-400">Cargando…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : order ? (
        <div className="space-y-6">
          <div className="rounded-lg border border-stone-200 bg-white p-4 text-sm text-stone-700">
            <p className="font-mono text-xs text-stone-500">ID: {order.id}</p>
            <p className="mt-2">
              <span className="font-medium text-stone-800">Estado:</span> {order.status}
            </p>
            <p>
              <span className="font-medium text-stone-800">Fecha:</span>{' '}
              {new Date(order.createdAt).toLocaleString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p>
              <span className="font-medium text-stone-800">Cliente:</span> {order.customerName}
            </p>
            <p>
              <span className="font-medium text-stone-800">Contacto:</span> {order.customerContact}
            </p>
            {order.notes ? (
              <p className="mt-2 border-t border-stone-100 pt-2">
                <span className="font-medium text-stone-800">Notas:</span> {order.notes}
              </p>
            ) : null}
            <p className="mt-3 text-lg font-semibold text-stone-900">
              Total: {formatPrice(order.totalCents)}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-stone-700">Líneas</h2>
            {order.items && order.items.length > 0 ? (
              <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
                {order.items.map((line) => (
                  <li key={line.id} className="px-4 py-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium text-stone-800">{line.productName}</span>
                      <span className="text-sm text-stone-600">
                        {formatPrice(line.unitPriceCents)} × {line.quantity}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Slug: {line.productSlug} · Ref. producto: {line.productId}
                    </p>
                    <p className="mt-1 text-sm font-medium tabular-nums text-stone-800">
                      Subtotal: {formatPrice(line.unitPriceCents * line.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-400">Sin líneas.</p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
