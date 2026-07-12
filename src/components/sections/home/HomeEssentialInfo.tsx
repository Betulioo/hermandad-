import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { Button } from '@/components/ui/buttons/Button';
import { ClockIcon, MapPinIcon, PhoneIcon } from '@/components/ui/icons';
import { parishInfoToContact } from '@/lib/mappers/parish-info.mapper';
import { getParishInfo } from '@/services/parish-info.service';
import { getPrayerSchedules } from '@/services/prayer-schedules.service';

export async function HomeEssentialInfo() {
  let contact;
  try {
    const parishInfo = await getParishInfo();
    contact = parishInfoToContact(parishInfo);
  } catch {
    contact = parishInfoToContact(null);
  }

  let hasPublishedSchedules = false;
  try {
    const schedules = await getPrayerSchedules(1, 1);
    hasPublishedSchedules = schedules.length > 0;
  } catch {
    hasPublishedSchedules = false;
  }

  const horariosText = contact.massScheduleSummary.trim();

  const items = [
    ...(horariosText || hasPublishedSchedules
      ? [
          {
            title: 'Misas y horarios',
            text:
              horariosText ||
              'Consulta los horarios de misas y actividades publicados.',
            href: '/horarios',
            cta: 'Ver horarios',
            icon: <ClockIcon className="h-6 w-6" />,
          },
        ]
      : []),
    {
      title: 'Dónde estamos',
      text: contact.address,
      href: '#contacto',
      cta: 'Cómo llegar',
      icon: <MapPinIcon className="h-6 w-6" />,
    },
    {
      title: 'Contacto directo',
      text: contact.phone,
      href: `tel:${contact.phone}`,
      cta: 'Llamar',
      icon: <PhoneIcon className="h-6 w-6" />,
    },
  ];

  return (
    <Section spacing="compact" className="border-b border-border-soft bg-surface-base">
      <Container>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="flex h-full flex-col gap-4 rounded-md border border-border-soft bg-surface-card p-5 shadow-card">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm bg-brand-navy/8 text-brand-navy" aria-hidden>
                  {item.icon}
                </span>
                <div className="space-y-1">
                  <h2 className="font-heading text-h4 font-semibold text-text-primary">{item.title}</h2>
                  <p className="text-body-sm text-text-secondary">{item.text}</p>
                </div>
              </div>
              <div className="mt-auto">
                <Button href={item.href} variant="ghost" size="sm" className="px-0 hover:bg-transparent hover:underline">
                  {item.cta} →
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
