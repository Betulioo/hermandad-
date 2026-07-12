import Image from 'next/image';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { EventCard } from '@/components/ui/cards/EventCard';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/ui/icons';
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

function FeaturedEvent({ event }: { event: EventCardItem }) {
  return (
    <article className="mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-lg border border-border-soft bg-surface-card shadow-card md:grid-cols-2">
      {event.imageUrl && (
        <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full md:min-h-[20rem]">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(min-width: 768px) 512px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-5 p-6 md:p-8">
        <span className="text-caption font-semibold uppercase tracking-wider text-brand-gold">
          Próximo evento
        </span>
        <h3 className="font-heading text-h3 font-semibold text-text-primary">
          {event.title}
        </h3>
        <div className="space-y-1.5">
          <MetaRow icon={<CalendarIcon />} className="text-text-secondary">
            {event.date}
          </MetaRow>
          {event.time && (
            <MetaRow icon={<ClockIcon />} className="text-text-secondary">
              {event.time}
            </MetaRow>
          )}
          {event.location && (
            <MetaRow icon={<MapPinIcon />} className="text-text-secondary">
              {event.location}
            </MetaRow>
          )}
        </div>
        {event.description && (
          <p className="text-body-md leading-relaxed text-text-secondary line-clamp-4">
            {event.description}
          </p>
        )}
        {event.href && (
          <div className="mt-auto pt-2">
            <Button href={event.href} variant="primary" size="sm">
              Ver detalle →
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}

export async function HomeUpcomingEvents() {
  const items = await fetchUpcomingEvents();

  if (items.length === 0) return null;

  const isSingle = items.length === 1;
  const gridClass =
    items.length === 2
      ? 'mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2'
      : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <Section spacing="compact">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Próximos eventos"
            align={isSingle ? 'center' : 'left'}
            action={
              !isSingle ? (
                <Button href="/eventos" variant="ghost" size="sm">
                  Ver todos →
                </Button>
              ) : undefined
            }
          />
          {isSingle ? (
            <FeaturedEvent event={items[0]} />
          ) : (
            <ul className={gridClass}>
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
  );
}
