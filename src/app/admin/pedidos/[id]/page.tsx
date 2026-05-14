'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils/formatPrice';
import {
  getOrderAdmin,
  updateOrderStatusAdmin,
} from '@/services/orders-admin.service';
import {
  ORDER_STATUS_LABELS,
  type Order,
  type OrderStatus,
} from '@/types/order';

const ORDER_STATUS_OPTIONS: OrderStatus[] = ['pending', 'completed', 'cancelled'];

export default function AdminPedidoDetallePage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const { user, loading } = useAuth();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusSaving, setStatusSaving] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

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

  async function handleStatusChange(nextStatus: OrderStatus) {
    if (!order || nextStatus === order.status) return;
    setStatusSaving(true);
    setStatusError(null);
    try {
      const updated = await updateOrderStatusAdmin(order.id, nextStatus);
      setOrder(updated);
    } catch {
      setStatusError('No se pudo actualizar el estado del pedido.');
    } finally {
      setStatusSaving(false);
    }
  }

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
              <span className="font-medium text-stone-800">Estado actual:</span>{' '}
              {ORDER_STATUS_LABELS[order.status]}
            </p>
            <div className="mt-4 border-t border-stone-100 pt-4">
              <label
                htmlFor="order-status"
                className="block text-sm font-medium text-stone-800"
              >
                Cambiar estado
              </label>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <select
                  id="order-status"
                  value={order.status}
                  disabled={statusSaving}
                  onChange={(event) =>
                    handleStatusChange(event.target.value as OrderStatus)
                  }
                  className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600 disabled:opacity-60"
                >
                  {ORDER_STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {ORDER_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                {statusSaving ? (
                  <span className="text-sm text-stone-500">Guardando…</span>
                ) : null}
              </div>
              {statusError ? (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {statusError}
                </p>
              ) : null}
            </div>
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
            {order.customerEmail ? (
              <p>
                <span className="font-medium text-stone-800">Email:</span>{' '}
                <a
                  href={`mailto:${order.customerEmail}`}
                  className="text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-stone-950"
                >
                  {order.customerEmail}
                </a>
              </p>
            ) : null}
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
