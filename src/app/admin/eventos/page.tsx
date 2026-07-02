'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  createEvent,
  deactivateEvent,
  getEventsAdmin,
  reactivateEvent,
  updateEvent,
} from '@/services/events.service';
import type { EventItem } from '@/types/event';

const EMPTY_FORM = {
  title: '',
  date: '',
  time: '',
  location: '',
  description: '',
  imageUrl: '',
};

function toForm(event: EventItem) {
  return {
    title: event.title,
    date: event.date,
    time: event.time ?? '',
    location: event.location ?? '',
    description: event.description ?? '',
    imageUrl: event.imageUrl ?? '',
  };
}

function toDisplayDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function AdminEventosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [events, setEvents] = useState<EventItem[]>([]);
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

  const loadEvents = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getEventsAdmin();
      setEvents(data);
    } catch {
      setListError('No se pudieron cargar los eventos.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      loadEvents();
    }
  }, [loading, user, loadEvents]);

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setSaveError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEdit(event: EventItem) {
    setEditingId(event.id);
    setForm(toForm(event));
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

    const payload = {
      title: form.title.trim(),
      date: form.date,
      time: form.time.trim() || null,
      location: form.location.trim() || null,
      description: form.description.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
    };

    try {
      if (editingId) {
        await updateEvent(editingId, payload);
      } else {
        await createEvent(payload);
      }
      cancelEdit();
      await loadEvents();
    } catch (err) {
      setSaveError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleDeactivate(id: string) {
    const event = events.find((item) => item.id === id);
    const confirmed = window.confirm(
      `¿Desactivar ${event?.title ?? 'este evento'}? Dejará de verse en la web pública.`,
    );
    if (!confirmed) return;

    setActionError(null);
    setDeactivatingId(id);
    try {
      await deactivateEvent(id);
      if (editingId === id) cancelEdit();
      await loadEvents();
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
      await reactivateEvent(id);
      await loadEvents();
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
      <h1 className="text-2xl font-semibold text-stone-800">Admin - Eventos</h1>

      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-700">
            {isEditing ? 'Editar evento' : 'Nuevo evento'}
          </h2>
          {isEditing && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-stone-400 transition-colors hover:text-stone-600"
            >
              Cancelar
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="title" className="block text-sm font-medium text-stone-700">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                maxLength={160}
                value={form.title}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="date" className="block text-sm font-medium text-stone-700">
                Fecha <span className="text-red-500">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="time" className="block text-sm font-medium text-stone-700">
                Hora
              </label>
              <input
                id="time"
                name="time"
                type="text"
                maxLength={80}
                value={form.time}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej. 19:00 h"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="location" className="block text-sm font-medium text-stone-700">
                Ubicación
              </label>
              <input
                id="location"
                name="location"
                type="text"
                maxLength={160}
                value={form.location}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="imageUrl" className="block text-sm font-medium text-stone-700">
              Imagen URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              maxLength={500}
              value={form.imageUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-stone-700">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {saveError && <p className="text-sm text-red-600">{saveError}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving
              ? isEditing
                ? 'Guardando...'
                : 'Publicando...'
              : isEditing
                ? 'Guardar cambios'
                : 'Publicar evento'}
          </button>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-stone-700">Todos los eventos</h2>

        {actionError && <p className="text-sm text-red-600">{actionError}</p>}

        {listLoading ? (
          <p className="text-sm text-stone-400">Cargando...</p>
        ) : listError ? (
          <p className="text-sm text-red-600">{listError}</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-stone-400">No hay eventos todavía.</p>
        ) : (
          <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
            {events.map((event) => (
              <li
                key={event.id}
                className={[
                  'flex items-start justify-between gap-4 px-4 py-3',
                  editingId === event.id ? 'bg-stone-50' : '',
                ].join(' ')}
              >
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-stone-800">{event.title}</span>
                    {event.isActive ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        Activo
                      </span>
                    ) : (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500">
                    {toDisplayDate(event.date)}
                    {event.time ? ` · ${event.time}` : ''}
                    {event.location ? ` · ${event.location}` : ''}
                  </p>
                  {event.description && (
                    <p className="truncate text-sm text-stone-500">{event.description}</p>
                  )}
                  {event.imageUrl && (
                    <p className="truncate text-xs text-stone-400">{event.imageUrl}</p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    onClick={() => startEdit(event)}
                    disabled={editingId === event.id}
                    className="text-sm text-stone-400 transition-colors hover:text-stone-700 disabled:opacity-40"
                  >
                    Editar
                  </button>
                  {event.isActive ? (
                    <button
                      onClick={() => handleDeactivate(event.id)}
                      disabled={deactivatingId === event.id}
                      className="text-sm text-stone-400 transition-colors hover:text-red-600 disabled:opacity-50"
                    >
                      {deactivatingId === event.id ? '...' : 'Desactivar'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(event.id)}
                      disabled={reactivatingId === event.id}
                      className="text-sm text-stone-400 transition-colors hover:text-green-700 disabled:opacity-50"
                    >
                      {reactivatingId === event.id ? '...' : 'Reactivar'}
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
