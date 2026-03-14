import { cn } from '@/lib/utils/cn';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { Button } from '@/components/ui/buttons/Button';

type ColorScheme = 'navy-burgundy' | 'navy-blue';

const colorSchemeClasses: Record<ColorScheme, string> = {
  'navy-burgundy': 'from-brand-navy/80 to-brand-burgundy',
  'navy-blue': 'from-brand-navy to-brand-blue',
};

interface IntroSectionProps {
  title: string;
  text: string;
  cta: { label: string; href: string };
  imagePlaceholderLabel?: string;
  colorScheme?: ColorScheme;
  className?: string;
}

export function IntroSection({
  title,
  text,
  cta,
  imagePlaceholderLabel,
  colorScheme = 'navy-burgundy',
  className,
}: IntroSectionProps) {
  return (
    <Section className={className}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">{title}</h2>
            <p className="text-body-md text-text-secondary leading-relaxed">{text}</p>
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>

          <div
            className={cn(
              'aspect-[4/3] flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br',
              colorSchemeClasses[colorScheme],
            )}
          >
            {imagePlaceholderLabel && (
              <span
                className="select-none px-8 text-center font-heading text-h1 font-light italic leading-none text-text-inverse/20"
                aria-hidden
              >
                {imagePlaceholderLabel}
              </span>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
