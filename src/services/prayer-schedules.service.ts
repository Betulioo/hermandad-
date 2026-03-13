import { api } from '@/lib/api';
import type { PrayerSchedule } from '@/types/prayer-schedule';

export async function getPrayerSchedules(page = 1, limit = 20): Promise<PrayerSchedule[]> {
  const { data } = await api.get<PrayerSchedule[]>('/prayer-schedules', {
    params: { page, limit },
  });
  return data;
}
