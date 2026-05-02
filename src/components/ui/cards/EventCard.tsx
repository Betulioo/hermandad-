import Image from 'next/image';
import { Button } from '@/components/ui/buttons/Button';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/ui/icons';

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  imageUrl?: string;
  label?: string;
  href?: string;
}

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  imageUrl,
  label = "Próximo evento",
  href,
}: EventCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-border-soft bg-surface-card shadow-card">
      {imageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden bg-surface-alt">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-1 border-l-2 border-brand-gold pl-3">
          <p className="text-caption font-semibold uppercase tracking-wider text-brand-gold">
            {label}
          </p>
          <h3 className="font-heading text-h4 font-semibold leading-snug text-text-primary">
            {title}
          </h3>
        </div>

        {description && (
          <p className="text-body-sm text-text-secondary line-clamp-2">
            {description}
          </p>
        )}

        <div className="space-y-1.5">
          <MetaRow icon={<CalendarIcon />}>{date}</MetaRow>
          {time && <MetaRow icon={<ClockIcon />}>{time}</MetaRow>}
          {location && <MetaRow icon={<MapPinIcon />}>{location}</MetaRow>}
        </div>

        {href && (
          <div className="mt-auto pt-1">
            <Button href={href} variant="ghost" size="sm">
              <span aria-hidden>Ver detalle →</span>
              <span className="sr-only">Ver detalle de {title}</span>
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
