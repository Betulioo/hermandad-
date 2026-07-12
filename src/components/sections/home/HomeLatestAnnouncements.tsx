import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { AnnouncementCard } from '@/components/ui/cards/AnnouncementCard';
import { getAnnouncements } from '@/services/announcements.service';
import { announcementToView } from '@/lib/mappers/announcement.mapper';

const LIMIT = 3;

type CardItem = {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
  href?: string;
};

async function fetchLatestAnnouncements(): Promise<CardItem[]> {
  try {
    const apiItems = await getAnnouncements(1, LIMIT);
    return apiItems.map((a) => {
      const view = announcementToView(a);
      return {
        id: view.id,
        title: view.title,
        content: view.excerpt,
        date: view.date,
        isImportant: view.isImportant,
        href: `/avisos/${view.id}`,
      };
    });
  } catch {
    // Si la API no está disponible, no se muestran avisos placeholder
    return [];
  }
}

export async function HomeLatestAnnouncements() {
  const items = await fetchLatestAnnouncements();

  if (items.length === 0) {
    return null;
  }

  return (
    <Section className="bg-surface-alt">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Últimos avisos"
            action={
              <Button href="/avisos" variant="ghost" size="sm">
                Ver todos →
              </Button>
            }
          />
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li key={item.id}>
                <AnnouncementCard
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  isImportant={item.isImportant}
                  truncate
                  href={item.href}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
