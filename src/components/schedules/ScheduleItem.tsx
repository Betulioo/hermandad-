import { Badge } from '@/components/ui/data-display/Badge';
import type { PrayerSchedule } from '@/types/prayer-schedule';

export default function ScheduleItem({ schedule }: { schedule: PrayerSchedule }) {
  return (
    <li className="flex items-start justify-between gap-4 py-4">
      <div className="space-y-1">
        <p className="font-medium text-text-primary">{schedule.title}</p>
        <p className="text-body-sm text-text-secondary">
          {schedule.days} · {schedule.time}
        </p>
        {schedule.location && (
          <p className="text-body-sm text-text-muted">{schedule.location}</p>
        )}
      </div>
      {schedule.type && (
        <div className="mt-0.5 shrink-0">
          <Badge variant="default">{schedule.type}</Badge>
        </div>
      )}
    </li>
  );
}
