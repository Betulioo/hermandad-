import { cn } from '@/lib/utils/cn';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeading({ title, subtitle, className }: PageHeadingProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="font-heading text-h1 font-semibold text-text-primary">{title}</h1>
      {subtitle && <p className="text-body-lg text-text-secondary">{subtitle}</p>}
    </div>
  );
}
