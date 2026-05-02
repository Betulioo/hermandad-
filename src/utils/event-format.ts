import type { EventItem } from '@/types/event';

export type EventCardItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  href?: string;
};

function extractNextImageSource(imageUrl: string): string {
  if (!imageUrl.startsWith('/_next/image')) return imageUrl;

  try {
    const url = new URL(imageUrl, 'http://localhost');
    return url.searchParams.get('url') ?? imageUrl;
  } catch {
    return imageUrl;
  }
}

export function getDisplayEventImageUrl(imageUrl?: string | null): string | undefined {
  if (!imageUrl) return undefined;

  const sourceUrl = extractNextImageSource(imageUrl.trim());

  try {
    const url = new URL(sourceUrl);
    const isCloudinaryUpload =
      url.hostname === 'res.cloudinary.com' && url.pathname.includes('/image/upload/');

    if (isCloudinaryUpload && url.pathname.toLowerCase().endsWith('.heic')) {
      url.pathname = url.pathname.replace('/image/upload/', '/image/upload/f_jpg,q_auto/');
      return url.toString();
    }
  } catch {
    return sourceUrl;
  }

  return sourceUrl;
}

export function formatEventDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function eventToCardItem(event: EventItem): EventCardItem {
  return {
    id: event.id,
    title: event.title,
    date: formatEventDate(event.date),
    time: event.time ?? undefined,
    location: event.location ?? undefined,
    description: event.description ?? undefined,
    imageUrl: getDisplayEventImageUrl(event.imageUrl),
    href: `/eventos/${event.id}`,
  };
}
