import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { HeroPage } from '@/components/ui/hero/HeroPage';
import { IntroSection } from '@/components/sections/IntroSection';
import { EventCard } from '@/components/ui/cards/EventCard';
import { InfoCard } from '@/components/ui/cards/InfoCard';
import { Button } from '@/components/ui/buttons/Button';
import { UsersIcon } from '@/components/ui/icons';
import {
  hermandadHero,
  hermandadIntro,
  hermandadEvents,
  hermandadParticipation,
  hermandadCta,
} from '@/content/hermandad';

export const metadata: Metadata = {
  title: 'Hermandad — Santa María la Antigua',
  description:
    'Conoce la Hermandad de Santa María la Antigua: cultos, procesión, historia y cómo unirte.',
};

const participationIcons: Record<string, React.ReactNode> = {
  hermano: <UsersIcon className="h-5 w-5" />,
  joven: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  voluntariado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export default function HermandadPage() {
  return (
    <PageShell>
      {/* Cabecera de sección */}
      <HeroPage title={hermandadHero.title} subtitle={hermandadHero.subtitle} />

      {/* Presentación de la Hermandad */}
      <IntroSection
        title={hermandadIntro.title}
        text={hermandadIntro.text}
        cta={hermandadIntro.cta}
        colorScheme="navy-burgundy"
      />

      {/* Próximos cultos y eventos */}
      <Section className="bg-surface-alt">
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title="Cultos y actos"
              subtitle="Próximas celebraciones de la Hermandad"
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hermandadEvents.map((event) => (
                <li key={event.id}>
                  <EventCard
                    label={event.label}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Participación */}
      <Section>
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title="Participa"
              subtitle="Hay un lugar para ti en la Hermandad"
              align="center"
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hermandadParticipation.map((item) => (
                <li key={item.id}>
                  <InfoCard
                    icon={participationIcons[item.id]}
                    title={item.title}
                    description={item.description}
                    cta={item.cta}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* CTA final */}
      <Section spacing="spacious" className="bg-surface-dark">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="font-heading text-h2 font-semibold text-text-inverse md:max-w-xl">
              {hermandadCta.title}
            </h2>
            <p className="text-body-lg text-text-inverse/75 md:max-w-lg">
              {hermandadCta.text}
            </p>
            <Button href={hermandadCta.button.href} variant="secondary" size="lg">
              {hermandadCta.button.label}
            </Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
