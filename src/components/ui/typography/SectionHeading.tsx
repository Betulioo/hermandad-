import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, action, align = 'left', className }: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        isCenter
          ? 'items-center text-center'
          : 'sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className={cn('space-y-1', isCenter && 'text-center')}>
        <h2 className="font-heading text-h2 font-semibold text-text-primary">{title}</h2>
        {subtitle && <p className="text-body-md text-text-secondary">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
