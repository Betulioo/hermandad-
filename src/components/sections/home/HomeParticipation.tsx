import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { InfoCard } from '@/components/ui/cards/InfoCard';
import { Button } from '@/components/ui/buttons/Button';
import { UsersIcon } from '@/components/ui/icons';
import { homeParticipationItems } from '@/content/home';

const icons: Record<string, React.ReactNode> = {
  hermano: <UsersIcon className="h-6 w-6" />,
  joven: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  voluntariado: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

export function HomeParticipation() {
  const isSingle = homeParticipationItems.length === 1;
  const featured = homeParticipationItems[0];

  return (
    <Section spacing="compact">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Participa"
            subtitle="Hay un lugar para ti en nuestra comunidad"
            align="center"
          />
          {isSingle ? (
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-lg border border-border-soft bg-surface-card px-6 py-10 text-center shadow-card md:px-10 md:py-12">
              <span
                className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand-navy/8 text-brand-navy"
                aria-hidden
              >
                {icons[featured.id]}
              </span>
              <div className="space-y-2">
                <h3 className="font-heading text-h3 font-semibold text-text-primary">
                  {featured.title}
                </h3>
                <p className="text-body-md text-text-secondary">
                  {featured.description}
                </p>
              </div>
              {featured.cta && (
                <Button href={featured.cta.href} variant="primary">
                  {featured.cta.label}
                </Button>
              )}
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {homeParticipationItems.map((item) => (
                <li key={item.id}>
                  <InfoCard
                    icon={icons[item.id]}
                    title={item.title}
                    description={item.description}
                    cta={item.cta}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
}
