import type { Announcement } from '@/types/announcement';

interface Props {
  announcement: Announcement;
  truncate?: boolean;
}

export default function AnnouncementCard({ announcement, truncate = false }: Props) {
  return (
    <li className="rounded-lg border border-stone-200 bg-white px-4 py-3">
      <div className="flex items-start gap-2">
        <p className="flex-1 font-medium text-stone-800">{announcement.title}</p>
        {announcement.isImportant && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
            Importante
          </span>
        )}
      </div>
      <p className={`mt-1 text-sm text-stone-500${truncate ? ' line-clamp-2' : ''}`}>
        {announcement.content}
      </p>
      <p className="mt-2 text-xs text-stone-400">
        {new Date(announcement.createdAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </li>
  );
}
