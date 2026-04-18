'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils/formatPrice';
import { getOrdersAdmin } from '@/services/orders-admin.service';
import type { Order } from '@/types/order';

export default function AdminPedidosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  const loadOrders = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getOrdersAdmin();
      setOrders(data);
    } catch {
      setListError('No se pudieron cargar los pedidos.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      loadOrders();
    }
  }, [loading, user, loadOrders]);

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
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Pedidos</h1>

      <section className="space-y-3">
        <p className="text-sm text-stone-600">
          Pedidos recibidos desde la tienda. Solo lectura en este panel.
        </p>

        {listLoading ? (
          <p className="text-sm text-stone-400">Cargando…</p>
        ) : listError ? (
          <p className="text-sm text-red-600">{listError}</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-stone-400">No hay pedidos todavía.</p>
        ) : (
          <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
            {orders.map((o) => (
              <li
                key={o.id}
                className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-stone-800">{o.customerName}</span>
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
                      {o.status}
                    </span>
                  </div>
                  <p className="text-sm text-stone-600">{o.customerContact}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(o.createdAt).toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-medium tabular-nums text-stone-800">
                    {formatPrice(o.totalCents)}
                  </span>
                  <Link
                    href={`/admin/pedidos/${o.id}`}
                    className="text-sm font-medium text-stone-600 hover:text-stone-900"
                  >
                    Ver detalle →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
