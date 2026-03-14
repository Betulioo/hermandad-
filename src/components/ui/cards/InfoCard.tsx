import { Button } from '@/components/ui/buttons/Button';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  cta?: { label: string; href: string };
}

export function InfoCard({ icon, title, description, cta }: InfoCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-md border border-border-soft bg-surface-card p-6 shadow-card">
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-navy/10 text-brand-navy">
          {icon}
        </div>
      )}
      <div className="space-y-2">
        <h3 className="font-heading text-h4 font-semibold text-text-primary">{title}</h3>
        <p className="text-body-sm text-text-secondary">{description}</p>
      </div>
      {cta && (
        <div className="mt-auto pt-1">
          <Button href={cta.href} variant="secondary" size="sm">
            {cta.label}
          </Button>
        </div>
      )}
    </article>
  );
}
