import { Badge } from '@/components/ui/data-display/Badge';
import { MetaRow } from '@/components/ui/data-display/MetaRow';

interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
  truncate?: boolean;
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

export function AnnouncementCard({ title, content, date, isImportant = false, truncate = false }: AnnouncementCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-md border border-border-soft bg-surface-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-h4 font-semibold leading-snug text-text-primary">{title}</h3>
        {isImportant && <Badge variant="important">Destacado</Badge>}
      </div>
      <p className={`text-body-sm text-text-secondary ${truncate ? 'line-clamp-3' : ''}`}>{content}</p>
      <MetaRow icon={<CalendarIcon />}>{date}</MetaRow>
    </article>
  );
}
