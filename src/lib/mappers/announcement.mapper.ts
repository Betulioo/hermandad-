import type { Announcement } from '@/types/announcement';
import type { AvisoMock } from '@/content/avisos';

export interface AnnouncementView {
  id: string;
  title: string;
  /** Primer párrafo del contenido, truncado a EXCERPT_MAX_LENGTH si es necesario. */
  excerpt: string;
  /** Texto completo para la vista de detalle. */
  content: string;
  date: string;
  isImportant: boolean;
  /** No existe en el backend actual; siempre undefined para datos reales. */
  category?: string;
}

const EXCERPT_MAX_LENGTH = 160;

function deriveExcerpt(content: string): string {
  const firstParagraph = content.split('\n\n')[0].trim();
  if (firstParagraph.length <= EXCERPT_MAX_LENGTH) return firstParagraph;
  const cut = firstParagraph.lastIndexOf(' ', EXCERPT_MAX_LENGTH);
  return firstParagraph.slice(0, cut > 0 ? cut : EXCERPT_MAX_LENGTH) + '…';
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function announcementToView(a: Announcement): AnnouncementView {
  return {
    id: a.id,
    title: a.title,
    excerpt: deriveExcerpt(a.content),
    content: a.content,
    date: formatDate(a.createdAt),
    isImportant: a.isImportant,
  };
}

export function mockAvisoToView(a: AvisoMock): AnnouncementView {
  return {
    id: a.id,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    date: a.date,
    isImportant: a.isImportant,
    category: a.category,
  };
}
