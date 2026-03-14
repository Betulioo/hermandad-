import { Button } from '@/components/ui/buttons/Button';
import { Container } from '@/components/layout/container/Container';
import { siteConfig } from '@/lib/config/site';

interface HeroMainProps {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export function HeroMain({ title, subtitle, ctaPrimary, ctaSecondary }: HeroMainProps) {
  return (
    <section className="bg-surface-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:items-center md:py-20 lg:py-24">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="font-heading text-h1 font-semibold leading-tight text-text-primary md:text-display-lg">
              {title}
            </h1>
            <p className="text-body-lg text-text-secondary md:max-w-md">{subtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={ctaPrimary.href} variant="primary" size="md">
                {ctaPrimary.label}
              </Button>
              <Button href={ctaSecondary.href} variant="secondary" size="md">
                {ctaSecondary.label}
              </Button>
            </div>
          </div>

          {/* Decorative image placeholder — replace with <Image> when available */}
          <div className="order-first md:order-last">
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-navy to-brand-blue aspect-[4/3] flex items-center justify-center">
              <span
                className="select-none text-center font-heading text-display-xl font-light italic text-text-inverse/15 px-8 leading-none"
                aria-hidden
              >
                {siteConfig.shortName}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
