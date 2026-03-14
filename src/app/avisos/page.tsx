import type { Metadata } from 'next';
import { getAnnouncements } from '@/services/announcements.service';
import { AnnouncementCard } from '@/components/ui/cards/AnnouncementCard';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { mockAvisos } from '@/content/avisos';
import {
  announcementToView,
  mockAvisoToView,
  type AnnouncementView,
} from '@/lib/mappers/announcement.mapper';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Avisos — Santa María la Antigua',
  description: 'Avisos y comunicados de la Parroquia Santa María la Antigua',
};

export default async function AvisosPage() {
  let items: AnnouncementView[];

  try {
    const apiAnnouncements = await getAnnouncements(1, 50);
    items =
      apiAnnouncements.length > 0
        ? apiAnnouncements.map(announcementToView)
        : mockAvisos.map(mockAvisoToView);
  } catch {
    items = mockAvisos.map(mockAvisoToView);
  }

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-8">
            <PageHeading
              title="Avisos"
              subtitle="Comunicados y noticias de la comunidad"
            />
            {items.length === 0 ? (
              <p className="text-body-sm text-text-muted">
                No hay avisos publicados actualmente.
              </p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id}>
                    <AnnouncementCard
                      title={item.title}
                      content={item.excerpt}
                      date={item.date}
                      isImportant={item.isImportant}
                      truncate
                      href={`/avisos/${item.id}`}
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
