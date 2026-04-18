'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getPrayerSchedulesAdmin,
  createPrayerSchedule,
  updatePrayerSchedule,
  deactivatePrayerSchedule,
  reactivatePrayerSchedule,
} from '@/services/prayer-schedules.service';
import type { PrayerSchedule } from '@/types/prayer-schedule';

const EMPTY_FORM = {
  title: '',
  days: '',
  time: '',
  location: '',
  type: '',
};

function toForm(s: PrayerSchedule) {
  return {
    title: s.title,
    days: s.days,
    time: s.time,
    location: s.location ?? '',
    type: s.type ?? '',
  };
}

export default function AdminHorariosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [schedules, setSchedules] = useState<PrayerSchedule[]>([]);
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

  const loadSchedules = useCallback(async () => {
    setListLoading(true);
    setListError(null);
    try {
      const data = await getPrayerSchedulesAdmin();
      setSchedules(data);
    } catch {
      setListError('No se pudieron cargar los horarios.');
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      loadSchedules();
    }
  }, [loading, user, loadSchedules]);

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSaveError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function startEdit(schedule: PrayerSchedule) {
    setEditingId(schedule.id);
    setForm(toForm(schedule));
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
      days: form.days.trim(),
      time: form.time.trim(),
      location: form.location.trim() || null,
      type: form.type.trim() || null,
    };

    try {
      if (editingId) {
        await updatePrayerSchedule(editingId, payload);
      } else {
        await createPrayerSchedule(payload);
      }
      cancelEdit();
      await loadSchedules();
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
      await deactivatePrayerSchedule(id);
      if (editingId === id) cancelEdit();
      await loadSchedules();
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
      await reactivatePrayerSchedule(id);
      await loadSchedules();
    } catch (err) {
      setActionError(extractErrorMessage(err));
    } finally {
      setReactivatingId(null);
    }
  }

  const inputClass =
    'w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600';

  const isEditing = editingId !== null;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Horarios</h1>

      {/* Formulario crear / editar */}
      <section className="space-y-3 rounded-lg border border-stone-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-stone-700">
            {isEditing ? 'Editar horario' : 'Nuevo horario'}
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
                placeholder="Ej. Misa diaria"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="type" className="block text-sm font-medium text-stone-700">
                Tipo
              </label>
              <input
                id="type"
                name="type"
                type="text"
                maxLength={80}
                value={form.type}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej. Misas, Sacramentos…"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="days" className="block text-sm font-medium text-stone-700">
                Días <span className="text-red-500">*</span>
              </label>
              <input
                id="days"
                name="days"
                type="text"
                required
                maxLength={160}
                value={form.days}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej. Lunes a viernes"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="time" className="block text-sm font-medium text-stone-700">
                Hora <span className="text-red-500">*</span>
              </label>
              <input
                id="time"
                name="time"
                type="text"
                required
                value={form.time}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej. 19:00"
              />
            </div>
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
              placeholder="Ej. Capilla mayor"
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
                ? 'Guardando…'
                : 'Creando…'
              : isEditing
                ? 'Guardar cambios'
                : 'Crear horario'}
          </button>
        </form>
      </section>

      {/* Listado */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-stone-700">Todos los horarios</h2>

        {actionError && <p className="text-sm text-red-600">{actionError}</p>}

        {listLoading ? (
          <p className="text-sm text-stone-400">Cargando…</p>
        ) : listError ? (
          <p className="text-sm text-red-600">{listError}</p>
        ) : schedules.length === 0 ? (
          <p className="text-sm text-stone-400">No hay horarios todavía.</p>
        ) : (
          <ul className="divide-y divide-stone-100 rounded-lg border border-stone-200 bg-white">
            {schedules.map((s) => (
              <li
                key={s.id}
                className={[
                  'flex items-start justify-between gap-4 px-4 py-3',
                  editingId === s.id ? 'bg-stone-50' : '',
                ].join(' ')}
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-stone-800">{s.title}</span>
                    {s.type && (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                        {s.type}
                      </span>
                    )}
                    {!s.isActive && (
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-500">
                        Inactivo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500">
                    {s.days} · {s.time}
                    {s.location && <span> · {s.location}</span>}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <button
                    onClick={() => startEdit(s)}
                    disabled={editingId === s.id}
                    className="text-sm text-stone-400 hover:text-stone-700 disabled:opacity-40 transition-colors"
                  >
                    Editar
                  </button>
                  {s.isActive ? (
                    <button
                      onClick={() => handleDeactivate(s.id)}
                      disabled={deactivatingId === s.id}
                      className="text-sm text-stone-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                    >
                      {deactivatingId === s.id ? '…' : 'Desactivar'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivate(s.id)}
                      disabled={reactivatingId === s.id}
                      className="text-sm text-stone-400 hover:text-green-700 disabled:opacity-50 transition-colors"
                    >
                      {reactivatingId === s.id ? '…' : 'Reactivar'}
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
