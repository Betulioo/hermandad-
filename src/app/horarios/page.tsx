import type { Metadata } from 'next';
import { getPrayerSchedules } from '@/services/prayer-schedules.service';
import ScheduleItem from '@/components/schedules/ScheduleItem';
import type { PrayerSchedule } from '@/types/prayer-schedule';

export const metadata: Metadata = {
  title: 'Horarios — Santa María la Antigua',
  description: 'Horarios de misas y actividades de la Parroquia Santa María la Antigua',
};

export default async function HorariosPage() {
  const schedules = await getPrayerSchedules(1, 50).catch((): PrayerSchedule[] => []);

  const grouped = groupByType(schedules);
  const groupNames = Object.keys(grouped).sort((a, b) =>
    a === 'Sin categoría' ? 1 : b === 'Sin categoría' ? -1 : a.localeCompare(b, 'es'),
  );

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-stone-800">Horarios</h1>
      {schedules.length === 0 ? (
        <p className="text-sm text-stone-400">No hay horarios publicados actualmente.</p>
      ) : groupNames.length === 1 ? (
        <ul className="divide-y divide-stone-100">
          {schedules.map((s) => (
            <ScheduleItem key={s.id} schedule={s} />
          ))}
        </ul>
      ) : (
        <div className="space-y-6">
          {groupNames.map((name) => (
            <div key={name}>
              <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-stone-400">
                {name}
              </h2>
              <ul className="divide-y divide-stone-100">
                {grouped[name].map((s) => (
                  <ScheduleItem key={s.id} schedule={s} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function groupByType(schedules: PrayerSchedule[]): Record<string, PrayerSchedule[]> {
  return schedules.reduce<Record<string, PrayerSchedule[]>>((acc, s) => {
    const key = s.type ?? 'Sin categoría';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});
}
