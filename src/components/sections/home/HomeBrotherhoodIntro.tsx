import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { Button } from '@/components/ui/buttons/Button';
import { homeBrotherhoodIntro } from '@/content/home';
import { siteConfig } from '@/lib/config/site';

export function HomeBrotherhoodIntro() {
  const { title, text, cta } = homeBrotherhoodIntro;

  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Text */}
          <div className="space-y-5">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">{title}</h2>
            <p className="text-body-md text-text-secondary leading-relaxed">{text}</p>
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>

          {/* Image placeholder */}
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-brand-navy/80 to-brand-burgundy aspect-[4/3] flex items-center justify-center">
            <span
              className="select-none text-center font-heading text-h1 font-light italic text-text-inverse/20 px-8 leading-none"
              aria-hidden
            >
              {siteConfig.shortName}
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
