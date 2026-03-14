'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  getParishInfo,
  updateParishInfo,
  type UpdateParishInfoDto,
} from '@/services/parish-info.service';
import type { ParishInfo } from '@/types/parish-info';

const EMPTY_FORM = {
  name: '',
  address: '',
  contactEmail: '',
  contactPhone: '',
  officeHours: '',
  massSchedulesSummary: '',
  facebookUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
};

function toForm(info: ParishInfo) {
  return {
    name:                 info.name,
    address:              info.address              ?? '',
    contactEmail:         info.contactEmail         ?? '',
    contactPhone:         info.contactPhone         ?? '',
    officeHours:          info.officeHours          ?? '',
    massSchedulesSummary: info.massSchedulesSummary ?? '',
    facebookUrl:          info.facebookUrl          ?? '',
    instagramUrl:         info.instagramUrl         ?? '',
    youtubeUrl:           info.youtubeUrl           ?? '',
  };
}

export default function AdminParishInfoPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadError, setLoadError]     = useState<string | null>(null);
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  useEffect(() => {
    if (!loading && user?.role === 'ADMIN') {
      setLoadingInfo(true);
      setLoadError(null);
      getParishInfo()
        .then((info) => {
          if (info) setFormData(toForm(info));
        })
        .catch(() => setLoadError('No se pudo cargar la información de la parroquia.'))
        .finally(() => setLoadingInfo(false));
    }
  }, [loading, user]);

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
    setSaveSuccess(false);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaveError(null);
    setSaveSuccess(false);
    setSaving(true);
    try {
      const dto: UpdateParishInfoDto = {
        name:                 formData.name.trim(),
        address:              formData.address              || null,
        contactEmail:         formData.contactEmail         || null,
        contactPhone:         formData.contactPhone         || null,
        officeHours:          formData.officeHours          || null,
        massSchedulesSummary: formData.massSchedulesSummary || null,
        facebookUrl:          formData.facebookUrl          || null,
        instagramUrl:         formData.instagramUrl         || null,
        youtubeUrl:           formData.youtubeUrl           || null,
      };
      const updated = await updateParishInfo(dto);
      setFormData(toForm(updated));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600';

  if (loadingInfo) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-stone-800">Admin — Parroquia</h1>
        <p className="text-sm text-stone-400">Cargando…</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-stone-800">Admin — Parroquia</h1>
        <p className="text-sm text-red-600">{loadError}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-stone-800">Admin — Parroquia</h1>

      <form onSubmit={handleSave} className="space-y-6">

        {/* Información básica */}
        <section className="space-y-4 rounded-lg border border-stone-200 bg-white p-4">
          <h2 className="text-base font-semibold text-stone-700">Información básica</h2>

          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={160}
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-medium text-stone-700">
              Dirección
            </label>
            <textarea
              id="address"
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Contacto */}
        <section className="space-y-4 rounded-lg border border-stone-200 bg-white p-4">
          <h2 className="text-base font-semibold text-stone-700">Contacto</h2>

          <div className="space-y-1">
            <label htmlFor="contactEmail" className="block text-sm font-medium text-stone-700">
              Correo electrónico
            </label>
            <input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="contactPhone" className="block text-sm font-medium text-stone-700">
              Teléfono
            </label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              maxLength={30}
              value={formData.contactPhone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Horarios */}
        <section className="space-y-4 rounded-lg border border-stone-200 bg-white p-4">
          <h2 className="text-base font-semibold text-stone-700">Horarios</h2>

          <div className="space-y-1">
            <label htmlFor="officeHours" className="block text-sm font-medium text-stone-700">
              Horario de oficina
            </label>
            <textarea
              id="officeHours"
              name="officeHours"
              rows={3}
              value={formData.officeHours}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="massSchedulesSummary" className="block text-sm font-medium text-stone-700">
              Resumen de horarios de misa
            </label>
            <textarea
              id="massSchedulesSummary"
              name="massSchedulesSummary"
              rows={3}
              value={formData.massSchedulesSummary}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </section>

        {/* Redes sociales */}
        <section className="space-y-4 rounded-lg border border-stone-200 bg-white p-4">
          <h2 className="text-base font-semibold text-stone-700">Redes sociales</h2>

          <div className="space-y-1">
            <label htmlFor="facebookUrl" className="block text-sm font-medium text-stone-700">
              Facebook
            </label>
            <input
              id="facebookUrl"
              name="facebookUrl"
              type="url"
              value={formData.facebookUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://facebook.com/..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="instagramUrl" className="block text-sm font-medium text-stone-700">
              Instagram
            </label>
            <input
              id="instagramUrl"
              name="instagramUrl"
              type="url"
              value={formData.instagramUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://instagram.com/..."
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="youtubeUrl" className="block text-sm font-medium text-stone-700">
              YouTube
            </label>
            <input
              id="youtubeUrl"
              name="youtubeUrl"
              type="url"
              value={formData.youtubeUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://youtube.com/..."
            />
          </div>
        </section>

        {/* Acciones */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>

          {saveSuccess && (
            <p className="text-sm text-green-700">Información guardada correctamente.</p>
          )}
          {saveError && (
            <p className="text-sm text-red-600">{saveError}</p>
          )}
        </div>

      </form>
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
