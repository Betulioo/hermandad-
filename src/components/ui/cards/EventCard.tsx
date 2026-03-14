import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { CalendarIcon, ClockIcon, MapPinIcon } from '@/components/ui/icons';

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  label?: string;
}

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  label = 'Próximo evento',
}: EventCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-md border border-border-soft bg-surface-card p-5 shadow-card">
      <div className="space-y-1 border-l-2 border-brand-gold pl-3">
        <p className="text-caption font-semibold uppercase tracking-wider text-brand-gold">{label}</p>
        <h3 className="font-heading text-h4 font-semibold leading-snug text-text-primary">{title}</h3>
      </div>

      {description && (
        <p className="text-body-sm text-text-secondary line-clamp-2">{description}</p>
      )}

      <div className="space-y-1.5">
        <MetaRow icon={<CalendarIcon />}>{date}</MetaRow>
        {time && <MetaRow icon={<ClockIcon />}>{time}</MetaRow>}
        {location && <MetaRow icon={<MapPinIcon />}>{location}</MetaRow>}
      </div>
    </article>
  );
}
