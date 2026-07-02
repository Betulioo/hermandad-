import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { EventCard } from '@/components/ui/cards/EventCard';
import { homeUpcomingEvents } from '@/content/home';
import { getEvents } from '@/services/events.service';
import { eventToCardItem, type EventCardItem } from '@/utils/event-format';

const LIMIT = 3;

async function fetchUpcomingEvents(): Promise<EventCardItem[]> {
  try {
    const apiEvents = await getEvents(1, LIMIT);
    return apiEvents.map(eventToCardItem);
  } catch {
    return homeUpcomingEvents;
  }
}

export async function HomeUpcomingEvents() {
  const items = await fetchUpcomingEvents();

  if (items.length === 0) return null;

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Próximos eventos"
            action={
              <Button href="/eventos" variant="ghost" size="sm">
                Ver todos →
              </Button>
            }
          />
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
        </div>
      </Container>
    </Section>
  );
}
