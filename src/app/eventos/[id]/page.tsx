import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { Button } from '@/components/ui/buttons/Button';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/ui/icons';
import { getEventById } from '@/services/events.service';
import type { EventItem } from '@/types/event';
import { formatEventDate, getDisplayEventImageUrl } from '@/utils/event-format';

export const dynamic = 'force-dynamic';

type EventView = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
};

function eventToView(event: EventItem): EventView {
  return {
    id: event.id,
    title: event.title,
    date: formatEventDate(event.date),
    time: event.time ?? undefined,
    location: event.location ?? undefined,
    description: event.description ?? undefined,
    imageUrl: getDisplayEventImageUrl(event.imageUrl),
  };
}

async function getEvento(id: string): Promise<EventView | null> {
  try {
    const event = await getEventById(id);
    return eventToView(event);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEvento(id);

  return {
    title: event
      ? `${event.title} - Santa María la Antigua`
      : 'Evento - Santa María la Antigua',
    description: event
      ? `Evento de la comunidad: ${event.title}`
      : 'Evento de la comunidad de Santa María la Antigua',
  };
}

export default async function EventoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvento(id);

  if (!event) notFound();

  return (
    <PageShell>
      <Section>
        <Container size="md">
          <div className="space-y-8">
            <Link
              href="/eventos"
              className="inline-flex items-center gap-1 text-body-sm text-text-muted transition-colors hover:text-text-primary"
            >
              ← Volver a eventos
            </Link>

            {event.imageUrl && (
              <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-border-soft bg-surface-alt">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <PageHeading title={event.title} />
              <div className="space-y-1.5">
                <MetaRow icon={<CalendarIcon />}>{event.date}</MetaRow>
                {event.time && <MetaRow icon={<ClockIcon />}>{event.time}</MetaRow>}
                {event.location && (
                  <MetaRow icon={<MapPinIcon />}>{event.location}</MetaRow>
                )}
              </div>
            </div>

            {event.description && (
              <div className="space-y-4">
                {event.description.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-body-md leading-relaxed text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            <div className="border-t border-border-soft pt-6">
              <Button href="/eventos" variant="secondary" size="sm">
                ← Ver todos los eventos
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
