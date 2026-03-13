import type { Metadata } from 'next';
import { getAnnouncements } from '@/services/announcements.service';
import AnnouncementCard from '@/components/announcements/AnnouncementCard';
import type { Announcement } from '@/types/announcement';

export const metadata: Metadata = {
  title: 'Avisos — Santa María la Antigua',
  description: 'Avisos y comunicados de la Parroquia Santa María la Antigua',
};

export default async function AvisosPage() {
  const announcements = await getAnnouncements(1, 50).catch((): Announcement[] => []);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold text-stone-800">Avisos</h1>
      {announcements.length === 0 ? (
        <p className="text-sm text-stone-400">No hay avisos publicados actualmente.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </ul>
      )}
    </section>
  );
}
