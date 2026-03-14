import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { EventCard } from '@/components/ui/cards/EventCard';
import { homeUpcomingEvents } from '@/content/home';

export function HomeUpcomingEvents() {
  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Próximos eventos"
            action={
              <Button href="/avisos" variant="ghost" size="sm">
                Ver todos →
              </Button>
            }
          />
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {homeUpcomingEvents.map((event) => (
              <li key={event.id}>
                <EventCard
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  location={event.location}
                  description={event.description}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
