import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { HeroPage } from '@/components/ui/hero/HeroPage';
import { IntroSection } from '@/components/sections/IntroSection';
import { InfoCard } from '@/components/ui/cards/InfoCard';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { Button } from '@/components/ui/buttons/Button';
import { CalendarIcon, ClockIcon, UsersIcon, MapPinIcon, PhoneIcon, MailIcon } from '@/components/ui/icons';
import { siteConfig } from '@/lib/config/site';
import {
  parroquiaHero,
  parroquiaIntro,
  parroquiaSchedule,
  parroquiaSacraments,
  parroquiaContact,
} from '@/content/parroquia';
import { getParishInfo } from '@/services/parish-info.service';
import { parishInfoToContact } from '@/lib/mappers/parish-info.mapper';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Parroquia — Santa María la Antigua',
  description:
    'Conoce la Parroquia de Santa María la Antigua: horarios, sacramentos y vida parroquial.',
};

const scheduleIcons: Record<string, React.ReactNode> = {
  misas: <CalendarIcon className="h-5 w-5" />,
  confesion: <UsersIcon className="h-5 w-5" />,
  adoracion: <ClockIcon className="h-5 w-5" />,
};

export default async function ParroquiaPage() {
  let contact;
  try {
    const parishInfo = await getParishInfo();
    contact = parishInfoToContact(parishInfo);
  } catch {
    contact = parishInfoToContact(null);
  }

  return (
    <PageShell>
      {/* Cabecera de sección */}
      <HeroPage title={parroquiaHero.title} subtitle={parroquiaHero.subtitle} />

      {/* Presentación institucional */}
      <IntroSection
        title={parroquiaIntro.title}
        text={parroquiaIntro.text}
        cta={parroquiaIntro.cta}
        imagePlaceholderLabel={siteConfig.shortName}
        colorScheme="navy-blue"
      />

      {/* Horarios destacados */}
      <Section className="bg-surface-alt">
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title={parroquiaSchedule.heading.title}
              subtitle={parroquiaSchedule.heading.subtitle}
              action={
                <Button href="/horarios" variant="ghost" size="sm">
                  Ver todos →
                </Button>
              }
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {parroquiaSchedule.items.map((item) => (
                <li key={item.id}>
                  <InfoCard
                    icon={scheduleIcons[item.id]}
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

      {/* Sacramentos */}
      <Section>
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title="Sacramentos"
              subtitle="La vida sacramental en el corazón de la comunidad"
            />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {parroquiaSacraments.map((item) => (
                <li key={item.id}>
                  <InfoCard title={item.title} description={item.description} />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Contacto y secretaría */}
      <Section className="bg-surface-alt">
        <Container size="lg">
          <div className="space-y-8">
            <SectionHeading
              title={parroquiaContact.heading.title}
              subtitle={parroquiaContact.heading.subtitle}
            />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="space-y-3">
                <MetaRow icon={<MapPinIcon className="h-full w-full" />}>
                  {contact.address}
                </MetaRow>
                <MetaRow icon={<PhoneIcon className="h-full w-full" />}>
                  {contact.phone}
                </MetaRow>
                <MetaRow icon={<MailIcon className="h-full w-full" />}>
                  {contact.email}
                </MetaRow>
                <MetaRow icon={<ClockIcon className="h-full w-full" />}>
                  Secretaría: {contact.officeHours}
                </MetaRow>
              </div>
              <div className="space-y-4">
                <p className="text-body-sm font-medium text-text-secondary">{parroquiaContact.pastor}</p>
                <p className="text-body-sm text-text-secondary">{parroquiaContact.note}</p>
                <Button href={parroquiaContact.cta.href} variant="secondary" size="sm">
                  {parroquiaContact.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
