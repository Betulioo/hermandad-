'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getAnnouncementsAdmin,
  createAnnouncement,
  deactivateAnnouncement,
} from '@/services/announcements.service';
import type { Announcement } from '@/types/announcement';

export default function AdminAvisosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
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

  console.log(user)
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

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreateError(null);
    setCreating(true);
    try {
      await createAnnouncement({ title, content, isImportant });
      setTitle('');
      setContent('');
      setIsImportant(false);
      await loadAnnouncements();
    } catch (err) {
      setCreateError(extractErrorMessage(err));
    } finally {
      setCreating(false);
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

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Avisos</h1>

      {/* Formulario de creación */}
      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <h2 className="text-base font-semibold text-stone-700">Nuevo aviso</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-stone-700">
              Título
            </label>
            <input
              id="title"
              type="text"
              required
              maxLength={160}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600"
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            Marcar como importante
          </label>

          {createError && <p className="text-sm text-red-600">{createError}</p>}

          <button
            type="submit"
            disabled={creating}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {creating ? 'Publicando…' : 'Publicar aviso'}
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
              <li key={a.id} className="flex items-start justify-between gap-4 px-4 py-3">
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

                {a.isActive && (
                  <button
                    onClick={() => handleDeactivate(a.id)}
                    disabled={deactivatingId === a.id}
                    className="shrink-0 text-sm text-stone-400 hover:text-red-600 disabled:opacity-50"
                  >
                    {deactivatingId === a.id ? '…' : 'Desactivar'}
                  </button>
                )}
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
