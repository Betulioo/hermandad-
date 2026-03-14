import type { Metadata } from 'next';
import { getPrayerSchedules } from '@/services/prayer-schedules.service';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import ScheduleItem from '@/components/schedules/ScheduleItem';
import type { PrayerSchedule } from '@/types/prayer-schedule';
import { mockHorarios } from '@/content/horarios';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Horarios — Santa María la Antigua',
  description: 'Horarios de misas y actividades de la Parroquia Santa María la Antigua',
};

function groupByType(schedules: PrayerSchedule[]): Record<string, PrayerSchedule[]> {
  return schedules.reduce<Record<string, PrayerSchedule[]>>((acc, s) => {
    const key = s.type ?? 'Sin categoría';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});
}

const TYPE_ORDER = ['Misas', 'Sacramentos', 'Cultos', 'Formación', 'Sin categoría'];

function sortGroupNames(names: string[]): string[] {
  return names.sort((a, b) => {
    const ia = TYPE_ORDER.indexOf(a);
    const ib = TYPE_ORDER.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, 'es');
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

export default async function HorariosPage() {
  let schedules: PrayerSchedule[];

  try {
    const apiSchedules = await getPrayerSchedules(1, 50);
    schedules = apiSchedules.length > 0 ? apiSchedules : mockHorarios;
  } catch {
    schedules = mockHorarios;
  }

  const grouped = groupByType(schedules);
  const groupNames = sortGroupNames(Object.keys(grouped));
  const isSingleGroup = groupNames.length === 1;

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-10">
            <PageHeading
              title="Horarios"
              subtitle="Misas, sacramentos y actividades de la Parroquia"
            />

            {isSingleGroup ? (
              <ul className="divide-y divide-border-soft">
                {schedules.map((s) => (
                  <ScheduleItem key={s.id} schedule={s} />
                ))}
              </ul>
            ) : (
              <div className="space-y-10">
                {groupNames.map((name) => (
                  <div key={name}>
                    <SectionHeading title={name} />
                    <ul className="mt-4 divide-y divide-border-soft">
                      {grouped[name].map((s) => (
                        <ScheduleItem key={s.id} schedule={s} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
