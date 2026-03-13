export interface PrayerSchedule {
  id: string;
  title: string;
  days: string;
  time: string;
  location: string | null;
  type: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
