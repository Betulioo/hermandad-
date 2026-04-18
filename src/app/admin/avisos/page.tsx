'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getAnnouncementsAdmin,
  createAnnouncement,
  updateAnnouncement,
  deactivateAnnouncement,
  reactivateAnnouncement,
} from '@/services/announcements.service';
import type { Announcement } from '@/types/announcement';

const EMPTY_FORM = { title: '', content: '', isImportant: false };

export default function AdminAvisosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
  const [reactivatingId, setReactivatingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  const loadAnnouncements = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getAnnouncementsAdmin();
      setAnnouncements(data);
    } catch {
      setListError('No se pudieron cargar los avisos.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      loadAnnouncements();
    }
  }, [loading, user, loadAnnouncements]);

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

  function startEdit(a: Announcement) {
    setEditingId(a.id);
    setForm({ title: a.title, content: a.content, isImportant: a.isImportant });
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
    setSaving(true);
    try {
      if (editingId) {
        await updateAnnouncement(editingId, form);
      } else {
        await createAnnouncement(form);
      }
      cancelEdit();
      await loadAnnouncements();
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
      await deactivateAnnouncement(id);
      await loadAnnouncements();
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setDeactivatingId(null);
    }
  }

  async function handleReactivate(id: string) {
    setActionError(null);
    setReactivatingId(id);
    try {
      await reactivateAnnouncement(id);
      await loadAnnouncements();
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setReactivatingId(null);
    }
  }

  const isEditing = editingId !== null;
  const inputClass =
    'w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600';

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Avisos</h1>

      {/* Formulario crear / editar */}
      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-700">
            {isEditing ? 'Editar aviso' : 'Nuevo aviso'}
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
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-stone-700">
              Título
            </label>
            <input
              id="title"
              type="text"
              required
              maxLength={160}
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="content" className="block text-sm font-medium text-stone-700">
              Contenido
            </label>
            <textarea
              id="content"
              required
              rows={3}
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              className={inputClass}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={form.isImportant}
              onChange={(e) => setForm((prev) => ({ ...prev, isImportant: e.target.checked }))}
            />
            Marcar como importante
          </label>

          {saveError && <p className="text-sm text-red-600">{saveError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving
              ? isEditing ? 'Guardando…' : 'Publicando…'
              : isEditing ? 'Guardar cambios' : 'Publicar aviso'}
          </button>
        </form>
      </section>

      {/* Listado */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-stone-700">Todos los avisos</h2>

        {actionError && <p className="text-sm text-red-600">{actionError}</p>}

        {listLoading ? (
          <p className="text-sm text-stone-400">Cargando…</p>
        ) : listError ? (
          <p className="text-sm text-red-600">{listError}</p>
        ) : announcements.length === 0 ? (
          <p className="text-sm text-stone-400">No hay avisos todavía.</p>
        ) : (
          <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
            {announcements.map((a) => (
              <li
                key={a.id}
                className={[
                  'flex items-start justify-between gap-4 px-4 py-3',
                  editingId === a.id ? 'bg-stone-50' : '',
                ].join(' ')}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-stone-800">{a.title}</span>
                    {a.isImportant && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                        Importante
                      </span>
                    )}
                    {a.isActive ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Activo
                      </span>
                    ) : (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <p className="truncate text-sm text-stone-500">{a.content}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(a.createdAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    onClick={() => startEdit(a)}
                    disabled={editingId === a.id}
                    className="text-sm text-stone-400 hover:text-stone-700 disabled:opacity-40 transition-colors"
                  >
                    Editar
                  </button>
                  {a.isActive ? (
                    <button
                      onClick={() => handleDeactivate(a.id)}
                      disabled={deactivatingId === a.id}
                      className="text-sm text-stone-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                    >
                      {deactivatingId === a.id ? '…' : 'Desactivar'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(a.id)}
                      disabled={reactivatingId === a.id}
                      className="text-sm text-stone-400 hover:text-green-700 disabled:opacity-50 transition-colors"
                    >
                      {reactivatingId === a.id ? '…' : 'Reactivar'}
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
  }
  return 'Ocurrió un error. Inténtalo de nuevo.';
}
