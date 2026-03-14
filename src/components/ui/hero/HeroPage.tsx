import { Container } from '@/components/layout/container/Container';

interface HeroPageProps {
  title: string;
  subtitle?: string;
}

export function HeroPage({ title, subtitle }: HeroPageProps) {
  return (
    <section className="bg-surface-dark">
      <Container>
        <div className="space-y-3 py-12 md:py-16">
          <h1 className="font-heading text-h1 font-semibold text-text-inverse">{title}</h1>
          {subtitle && (
            <p className="text-body-lg text-text-inverse/75 md:max-w-2xl">{subtitle}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
