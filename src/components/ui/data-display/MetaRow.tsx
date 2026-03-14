import { cn } from '@/lib/utils/cn';

interface MetaRowProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function MetaRow({ icon, children, className }: MetaRowProps) {
  return (
    <div className={cn('flex items-center gap-2 text-body-sm text-text-muted', className)}>
      {icon && (
        <span className="h-4 w-4 flex-shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </div>
  );
}
