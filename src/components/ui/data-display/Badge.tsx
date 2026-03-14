import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'important' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-alt text-text-secondary',
  important: 'bg-brand-gold/15 text-brand-gold',
  success: 'bg-state-success/10 text-state-success',
  warning: 'bg-state-warning/10 text-state-warning',
  error: 'bg-state-error/10 text-state-error',
  info: 'bg-state-info/10 text-state-info',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-caption font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
