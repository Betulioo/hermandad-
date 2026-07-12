import type { ParishInfo } from '@/types/parish-info';
import { homeLocationContact } from '@/content/home';

export interface ContactInfo {
  /** Dirección completa incluyendo ciudad, lista para renderizar directamente. */
  address: string;
  phone: string;
  email: string;
  officeHours: string;
  massScheduleSummary: string;
  /** No existe en el backend; siempre procede del contenido estático. */
  mapsUrl: string;
}

const FALLBACK: ContactInfo = {
  address: `${homeLocationContact.address}, ${homeLocationContact.city}`,
  phone: homeLocationContact.phone,
  email: homeLocationContact.email,
  officeHours: homeLocationContact.officeHours,
  massScheduleSummary: '',
  mapsUrl: homeLocationContact.mapsUrl,
};

/**
 * Adapta ParishInfo de la API a ContactInfo para la UI.
 * Cada campo nullable cae al valor estático de fallback si la API no lo proporciona.
 * mapsUrl siempre procede del contenido estático (campo no existe en el backend).
 */
export function parishInfoToContact(p: ParishInfo | null): ContactInfo {
  if (!p) return FALLBACK;
  return {
    address: p.address ?? FALLBACK.address,
    phone: p.contactPhone ?? FALLBACK.phone,
    email: p.contactEmail ?? FALLBACK.email,
    officeHours: p.officeHours ?? FALLBACK.officeHours,
    massScheduleSummary: p.massSchedulesSummary ?? '',
    mapsUrl: FALLBACK.mapsUrl,
  };
}
