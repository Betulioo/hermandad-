import type { Metadata } from 'next';
import { getAnnouncements } from '@/services/announcements.service';
import { AnnouncementCard } from '@/components/ui/cards/AnnouncementCard';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import type { Announcement } from '@/types/announcement';

export const metadata: Metadata = {
  title: 'Avisos — Santa María la Antigua',
  description: 'Avisos y comunicados de la Parroquia Santa María la Antigua',
};

export default async function AvisosPage() {
  const announcements = await getAnnouncements(1, 50).catch((): Announcement[] => []);

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-8">
            <PageHeading
              title="Avisos"
              subtitle="Comunicados y noticias de la comunidad"
            />
            {announcements.length === 0 ? (
              <p className="text-body-sm text-text-muted">
                No hay avisos publicados actualmente.
              </p>
            ) : (
              <ul className="space-y-4">
                {announcements.map((a) => (
                  <li key={a.id}>
                    <AnnouncementCard
                      title={a.title}
                      content={a.content}
                      date={new Date(a.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                      isImportant={a.isImportant}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
