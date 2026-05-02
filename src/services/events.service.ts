import { api } from '@/lib/api';
import type { EventItem } from '@/types/event';

export async function getEvents(page = 1, limit = 20): Promise<EventItem[]> {
  const { data } = await api.get<EventItem[]>('/events', {
    params: { page, limit },
  });
  return data;
}

export async function getEventById(id: string): Promise<EventItem> {
  const { data } = await api.get<EventItem>(`/events/${id}`);
  return data;
}

export async function getEventsAdmin(page = 1, limit = 50): Promise<EventItem[]> {
  const { data } = await api.get<EventItem[]>('/events/admin', {
    params: { page, limit },
  });
  return data;
}

export interface EventInput {
  title: string;
  date: string;
  time?: string | null;
  location?: string | null;
  description?: string | null;
  imageUrl?: string | null;
}

export async function createEvent(input: EventInput): Promise<EventItem> {
  const { data } = await api.post<EventItem>('/events', input);
  return data;
}

export async function updateEvent(id: string, input: EventInput): Promise<EventItem> {
  const { data } = await api.patch<EventItem>(`/events/${id}`, input);
  return data;
}

export async function deactivateEvent(id: string): Promise<EventItem> {
  const { data } = await api.patch<EventItem>(`/events/${id}/deactivate`);
  return data;
}

export async function reactivateEvent(id: string): Promise<EventItem> {
  const { data } = await api.patch<EventItem>(`/events/${id}/reactivate`);
  return data;
}
