import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { AnnouncementCard } from '@/components/ui/cards/AnnouncementCard';
import { homeLatestAnnouncements } from '@/content/home';

export function HomeLatestAnnouncements() {
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
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {homeLatestAnnouncements.map((item) => (
              <li key={item.id}>
                <AnnouncementCard
                  title={item.title}
                  content={item.content}
                  date={item.date}
                  isImportant={item.isImportant}
                  truncate
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
