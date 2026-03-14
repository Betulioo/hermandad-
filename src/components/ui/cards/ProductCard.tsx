import { Button } from '@/components/ui/buttons/Button';
import { Badge } from '@/components/ui/data-display/Badge';

interface ProductCardProps {
  name: string;
  price: string;
  description?: string;
  href?: string;
  featured?: boolean;
}

export function ProductCard({
  name,
  price,
  description,
  href = '/tienda',
  featured = false,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border-soft bg-surface-card shadow-card">
      {/* Image placeholder */}
      <div className="relative aspect-square bg-surface-alt flex items-center justify-center">
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge variant="important">Destacado</Badge>
          </div>
        )}
        <span className="text-text-muted text-caption">Imagen próximamente</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="font-heading text-h4 font-semibold text-text-primary leading-snug">{name}</h3>
          {description && (
            <p className="text-body-sm text-text-secondary line-clamp-2">{description}</p>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-body-lg font-semibold text-brand-navy">{price}</span>
          <Button href={href} variant="ghost" size="sm">
            <span aria-hidden>Ver →</span>
            <span className="sr-only">Ver producto {name}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
