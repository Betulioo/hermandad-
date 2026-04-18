'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { formatPrice } from '@/lib/utils/formatPrice';
import {
  getProductsAdmin,
  createProduct,
  updateProduct,
  deactivateProduct,
} from '@/services/products-admin.service';
import type { Product } from '@/types/product';

type ProductForm = {
  name: string;
  slug: string;
  sku: string;
  description: string;
  priceEuros: string;
  stock: number;
  imageUrl: string;
  category: string;
  isActive: boolean;
};

const EMPTY_FORM: ProductForm = {
  name: '',
  slug: '',
  sku: '',
  description: '',
  priceEuros: '',
  stock: 0,
  imageUrl: '',
  category: '',
  isActive: true,
};

function centsToEurosInput(cents: number): string {
  return (cents / 100).toFixed(2);
}

function eurosToCents(value: string): number {
  const n = parseFloat(value.replace(',', '.').trim());
  if (Number.isNaN(n) || n < 0) {
    throw new Error('El precio no es válido');
  }
  return Math.round(n * 100);
}

export default function AdminProductosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  const loadProducts = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getProductsAdmin();
      setProducts(data);
    } catch {
      setListError('No se pudieron cargar los productos.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      loadProducts();
    }
  }, [loading, user, loadProducts]);

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

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      sku: p.sku,
      description: p.description,
      priceEuros: centsToEurosInput(p.priceCents),
      stock: p.stock,
      imageUrl: p.imageUrl ?? '',
      category: p.category ?? '',
      isActive: p.isActive,
    });
    setSaveError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setSaveError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaveError(null);
    let priceCents: number;
    try {
      priceCents = eurosToCents(form.priceEuros);
    } catch {
      setSaveError('Indica un precio válido (por ejemplo 12,50).');
      return;
    }

    const payloadBase = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      description: form.description.trim(),
      priceCents,
      stock: Number.isFinite(form.stock) ? Math.max(0, Math.floor(form.stock)) : 0,
      imageUrl: form.imageUrl.trim() || null,
      category: form.category.trim() || null,
      slug: form.slug.trim() || undefined,
      isActive: form.isActive,
    };

    setSaving(true);
    try {
      if (editingId) {
        await updateProduct(editingId, payloadBase);
      } else {
        await createProduct(payloadBase);
      }
      cancelEdit();
      await loadProducts();
    } catch (err) {
      setSaveError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(id: string) {
    setActionError(null);
    setDeactivatingId(id);
    try {
      await deactivateProduct(id);
      await loadProducts();
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setDeactivatingId(null);
    }
  }

  const isEditing = editingId !== null;
  const inputClass =
    'w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600';

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Productos</h1>

      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-700">
            {isEditing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-stone-400 hover:text-stone-600 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-stone-700">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={160}
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="sku" className="block text-sm font-medium text-stone-700">
                SKU
              </label>
              <input
                id="sku"
                type="text"
                required
                maxLength={80}
                value={form.sku}
                onChange={(e) => setForm((prev) => ({ ...prev, sku: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="slug" className="block text-sm font-medium text-stone-700">
              Slug <span className="font-normal text-stone-500">(opcional)</span>
            </label>
            <input
              id="slug"
              type="text"
              maxLength={160}
              placeholder="Se genera desde el nombre si lo dejas vacío"
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-stone-700">
              Descripción
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className={inputClass}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <label htmlFor="priceEuros" className="block text-sm font-medium text-stone-700">
                Precio (€)
              </label>
              <input
                id="priceEuros"
                type="text"
                required
                inputMode="decimal"
                placeholder="12,50"
                value={form.priceEuros}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, priceEuros: e.target.value }))
                }
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="stock" className="block text-sm font-medium text-stone-700">
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min={0}
                step={1}
                value={form.stock}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    stock: parseInt(e.target.value, 10) || 0,
                  }))
                }
                className={inputClass}
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="category" className="block text-sm font-medium text-stone-700">
                Categoría <span className="font-normal text-stone-500">(opcional)</span>
              </label>
              <input
                id="category"
                type="text"
                maxLength={80}
                placeholder="p. ej. devocionario"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700">
              URL de imagen <span className="font-normal text-stone-500">(opcional)</span>
            </label>
            <input
              id="imageUrl"
              type="text"
              maxLength={500}
              value={form.imageUrl}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            Producto activo (visible en la tienda pública)
          </label>

          {saveError && <p className="text-sm text-red-600">{saveError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving
              ? isEditing
                ? 'Guardando…'
                : 'Creando…'
              : isEditing
                ? 'Guardar cambios'
                : 'Crear producto'}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-stone-700">Catálogo</h2>

        {actionError && <p className="text-sm text-red-600">{actionError}</p>}

        {listLoading ? (
          <p className="text-sm text-stone-400">Cargando…</p>
        ) : listError ? (
          <p className="text-sm text-red-600">{listError}</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-stone-400">No hay productos todavía.</p>
        ) : (
          <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
            {products.map((p) => (
              <li
                key={p.id}
                className={[
                  'flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-start sm:justify-between',
                  editingId === p.id ? 'bg-stone-50' : '',
                ].join(' ')}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-stone-800">{p.name}</span>
                    {p.isActive ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Activo
                      </span>
                    ) : (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-500">
                    SKU {p.sku} · {p.slug}
                  </p>
                  <p className="text-sm text-stone-600">
                    {formatPrice(p.priceCents)} · Stock {p.stock}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    disabled={editingId === p.id}
                    className="text-sm text-stone-400 hover:text-stone-700 disabled:opacity-40 transition-colors"
                  >
                    Editar
                  </button>
                  {p.isActive && (
                    <button
                      type="button"
                      onClick={() => handleDeactivate(p.id)}
                      disabled={deactivatingId === p.id}
                      className="text-sm text-stone-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                    >
                      {deactivatingId === p.id ? '…' : 'Desactivar'}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { message?: unknown } } }).response;
    const msg = response?.data?.message;
    if (typeof msg === 'string') return msg;
    if (Array.isArray(msg)) return msg.join(' ');
  }
  return 'Ocurrió un error. Inténtalo de nuevo.';
}
