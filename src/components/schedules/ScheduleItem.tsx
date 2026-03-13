import type { PrayerSchedule } from '@/types/prayer-schedule';

export default function ScheduleItem({ schedule }: { schedule: PrayerSchedule }) {
  return (
    <li className="flex items-start justify-between gap-4 py-3">
      <div className="space-y-0.5">
        <p className="font-medium text-stone-800">{schedule.title}</p>
        <p className="text-sm text-stone-500">
          {schedule.days} · {schedule.time}
        </p>
        {schedule.location && (
          <p className="text-sm text-stone-400">{schedule.location}</p>
        )}
      </div>
      {schedule.type && (
        <span className="mt-0.5 shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600">
          {schedule.type}
        </span>
      )}
    </li>
  );
}
