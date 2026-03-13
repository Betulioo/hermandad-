import Link from 'next/link';
import { getParishInfo } from '@/services/parish-info.service';
import { getPrayerSchedules } from '@/services/prayer-schedules.service';
import { getAnnouncements } from '@/services/announcements.service';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import ScheduleItem from '@/components/schedules/ScheduleItem';
import type { ParishInfo } from '@/types/parish-info';
import type { PrayerSchedule } from '@/types/prayer-schedule';
import type { Announcement } from '@/types/announcement';

export default async function HomePage() {
  const [parishInfo, schedules, announcements] = await Promise.all([
    getParishInfo().catch((): ParishInfo | null => null),
    getPrayerSchedules(1, 20).catch((): PrayerSchedule[] => []),
    getAnnouncements(1, 5).catch((): Announcement[] => []),
  ]);

  return (
    <div className="space-y-10">
      <ParishInfoSection info={parishInfo} />
      <SchedulesSection schedules={schedules} />
      <AnnouncementsSection announcements={announcements} />
    </div>
  );
}

function ParishInfoSection({ info }: { info: ParishInfo | null }) {
  if (!info) return null;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold text-stone-800">{info.name}</h1>
      <dl className="space-y-1 text-sm text-stone-600">
        {info.address && (
          <div>
            <dt className="inline font-medium text-stone-700">Dirección: </dt>
            <dd className="inline">{info.address}</dd>
          </div>
        )}
        {info.officeHours && (
          <div>
            <dt className="inline font-medium text-stone-700">Horario de oficina: </dt>
            <dd className="inline">{info.officeHours}</dd>
          </div>
        )}
        {info.contactPhone && (
          <div>
            <dt className="inline font-medium text-stone-700">Teléfono: </dt>
            <dd className="inline">
              <a href={`tel:${info.contactPhone}`} className="hover:underline">
                {info.contactPhone}
              </a>
            </dd>
          </div>
        )}
        {info.contactEmail && (
          <div>
            <dt className="inline font-medium text-stone-700">Email: </dt>
            <dd className="inline">
              <a href={`mailto:${info.contactEmail}`} className="hover:underline">
                {info.contactEmail}
              </a>
            </dd>
          </div>
        )}
        {info.massSchedulesSummary && (
          <div className="pt-1">
            <dt className="font-medium text-stone-700">Horarios de misa:</dt>
            <dd className="whitespace-pre-line">{info.massSchedulesSummary}</dd>
          </div>
        )}
      </dl>
      {(info.facebookUrl || info.instagramUrl || info.youtubeUrl) && (
        <div className="flex gap-3 pt-1 text-sm">
          {info.facebookUrl && (
            <a
              href={info.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800"
            >
              Facebook
            </a>
          )}
          {info.instagramUrl && (
            <a
              href={info.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800"
            >
              Instagram
            </a>
          )}
          {info.youtubeUrl && (
            <a
              href={info.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 hover:text-stone-800"
            >
              YouTube
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function SchedulesSection({ schedules }: { schedules: PrayerSchedule[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-stone-800">Horarios</h2>
        <Link href="/horarios" className="text-sm text-stone-500 hover:text-stone-800">
          Ver todos →
        </Link>
      </div>
      {schedules.length === 0 ? (
        <p className="text-sm text-stone-400">No hay horarios disponibles.</p>
      ) : (
        <ul className="divide-y divide-stone-100">
          {schedules.map((s) => (
            <ScheduleItem key={s.id} schedule={s} />
          ))}
        </ul>
      )}
    </section>
  );
}

function AnnouncementsSection({ announcements }: { announcements: Announcement[] }) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-stone-800">Últimos avisos</h2>
        <Link href="/avisos" className="text-sm text-stone-500 hover:text-stone-800">
          Ver todos →
        </Link>
      </div>
      {announcements.length === 0 ? (
        <p className="text-sm text-stone-400">No hay avisos recientes.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} truncate />
          ))}
        </ul>
      )}
    </section>
  );
}
