import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { EventCard } from '@/components/ui/cards/EventCard';
import { homeUpcomingEvents } from '@/content/home';
import { getEvents } from '@/services/events.service';
import { eventToCardItem, type EventCardItem } from '@/utils/event-format';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Eventos - Santa María la Antigua',
  description: 'Eventos, cultos y actos de la comunidad de Santa María la Antigua',
};

async function getEventItems(): Promise<EventCardItem[]> {
  try {
    const apiEvents = await getEvents(1, 50);
    return apiEvents.map(eventToCardItem);
  } catch {
    return homeUpcomingEvents;
  }
}

export default async function EventosPage() {
  const items = await getEventItems();

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-8">
            <PageHeading
              title="Eventos"
              subtitle="Cultos, encuentros y actividades de la comunidad"
            />

            {items.length === 0 ? (
              <p className="text-body-sm text-text-muted">
                No hay eventos publicados actualmente.
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((event) => (
                  <li key={event.id}>
                    <EventCard
                      title={event.title}
                      date={event.date}
                      time={event.time}
                      location={event.location}
                      description={event.description}
                      imageUrl={event.imageUrl}
                      href={event.href}
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
