import { api } from '@/lib/api';
import type { Announcement } from '@/types/announcement';

export async function getAnnouncements(page = 1, limit = 20): Promise<Announcement[]> {
  const { data } = await api.get<Announcement[]>('/announcements', {
    params: { page, limit },
  });
  return data;
}

export async function getAnnouncementById(id: string): Promise<Announcement> {
  const { data } = await api.get<Announcement>(`/announcements/${id}`);
  return data;
}
