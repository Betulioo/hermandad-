import { api } from '@/lib/api';
import type { PrayerSchedule } from '@/types/prayer-schedule';

export async function getPrayerSchedules(page = 1, limit = 20): Promise<PrayerSchedule[]> {
  const { data } = await api.get<PrayerSchedule[]>('/prayer-schedules', {
    params: { page, limit },
  });
  return data;
}

export async function getPrayerSchedulesAdmin(page = 1, limit = 50): Promise<PrayerSchedule[]> {
  const { data } = await api.get<PrayerSchedule[]>('/prayer-schedules/admin', {
    params: { page, limit },
  });
  return data;
}

export interface PrayerScheduleInput {
  title: string;
  days: string;
  time: string;
  location?: string | null;
  type?: string | null;
}

export async function createPrayerSchedule(input: PrayerScheduleInput): Promise<PrayerSchedule> {
  const { data } = await api.post<PrayerSchedule>('/prayer-schedules', input);
  return data;
}

export async function updatePrayerSchedule(
  id: string,
  input: PrayerScheduleInput,
): Promise<PrayerSchedule> {
  const { data } = await api.patch<PrayerSchedule>(`/prayer-schedules/${id}`, input);
  return data;
}

export async function deactivatePrayerSchedule(id: string): Promise<PrayerSchedule> {
  const { data } = await api.patch<PrayerSchedule>(`/prayer-schedules/${id}/deactivate`);
  return data;
}

export async function reactivatePrayerSchedule(id: string): Promise<PrayerSchedule> {
  const { data } = await api.patch<PrayerSchedule>(`/prayer-schedules/${id}/reactivate`);
  return data;
}
