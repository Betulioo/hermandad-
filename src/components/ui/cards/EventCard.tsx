import { MetaRow } from '@/components/ui/data-display/MetaRow';

interface EventCardProps {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function EventCard({ title, date, time, location, description }: EventCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-md border border-border-soft bg-surface-card p-5 shadow-card">
      <div className="space-y-1 border-l-2 border-brand-gold pl-3">
        <p className="text-caption font-semibold uppercase tracking-wider text-brand-gold">Próximo evento</p>
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
