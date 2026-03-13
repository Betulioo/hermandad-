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

export async function getAnnouncementsAdmin(page = 1, limit = 50): Promise<Announcement[]> {
  const { data } = await api.get<Announcement[]>('/announcements/admin', {
    params: { page, limit },
  });
  return data;
}

export interface CreateAnnouncementInput {
  title: string;
  content: string;
  isImportant?: boolean;
}

export async function createAnnouncement(input: CreateAnnouncementInput): Promise<Announcement> {
  const { data } = await api.post<Announcement>('/announcements', input);
  return data;
}

export async function deactivateAnnouncement(id: string): Promise<Announcement> {
  const { data } = await api.patch<Announcement>(`/announcements/${id}/deactivate`);
  return data;
}
