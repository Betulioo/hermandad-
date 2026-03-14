import { Badge } from '@/components/ui/data-display/Badge';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { Button } from '@/components/ui/buttons/Button';
import { CalendarIcon } from '@/components/ui/icons';

interface AnnouncementCardProps {
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
  truncate?: boolean;
  href?: string;
}

export function AnnouncementCard({
  title,
  content,
  date,
  isImportant = false,
  truncate = false,
  href,
}: AnnouncementCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-md border border-border-soft bg-surface-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-heading text-h4 font-semibold leading-snug text-text-primary">{title}</h3>
        {isImportant && <Badge variant="important">Destacado</Badge>}
      </div>
      <p className={`text-body-sm text-text-secondary ${truncate ? 'line-clamp-3' : ''}`}>{content}</p>
      <MetaRow icon={<CalendarIcon />}>{date}</MetaRow>
      {href && (
        <div className="mt-auto pt-1">
          <Button href={href} variant="ghost" size="sm">
            <span aria-hidden>Leer más →</span>
            <span className="sr-only">Leer más sobre {title}</span>
          </Button>
        </div>
      )}
    </article>
  );
}
