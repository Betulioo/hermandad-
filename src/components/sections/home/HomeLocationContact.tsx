import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { Button } from '@/components/ui/buttons/Button';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon } from '@/components/ui/icons';
import { getParishInfo } from '@/services/parish-info.service';
import { parishInfoToContact } from '@/lib/mappers/parish-info.mapper';

export async function HomeLocationContact() {
  let contact;
  try {
    const parishInfo = await getParishInfo();
    contact = parishInfoToContact(parishInfo);
  } catch {
    contact = parishInfoToContact(null);
  }

  return (
    <Section id="contacto" className="bg-surface-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">Dónde estamos</h2>
            <div className="space-y-3">
              <MetaRow icon={<MapPinIcon />}>
                {contact.address}
              </MetaRow>
              <MetaRow icon={<PhoneIcon />}>
                <a href={`tel:${contact.phone}`} className="hover:text-brand-navy transition-colors">
                  {contact.phone}
                </a>
              </MetaRow>
              <MetaRow icon={<MailIcon />}>
                <a href={`mailto:${contact.email}`} className="hover:text-brand-navy transition-colors">
                  {contact.email}
                </a>
              </MetaRow>
            </div>

            <div className="space-y-2 rounded-md border border-border-soft bg-surface-card p-4">
              <p className="text-caption font-semibold uppercase tracking-wider text-text-muted">Horarios de atención</p>
              <MetaRow icon={<ClockIcon />}>{contact.officeHours}</MetaRow>
              <MetaRow icon={<ClockIcon />}>{contact.massScheduleSummary}</MetaRow>
            </div>

            <Button href={`mailto:${contact.email}`} variant="primary">
              Contactar
            </Button>
          </div>

          {/* Map placeholder */}
          <div className="overflow-hidden rounded-md border border-border-soft bg-surface-card">
            <div className="flex aspect-[4/3] items-center justify-center bg-surface-alt">
              <div className="flex flex-col items-center gap-3 text-center text-text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 opacity-40" aria-hidden>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-body-sm">Mapa próximamente</p>
                <a
                  href={contact.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-brand-blue hover:underline"
                >
                  Ver en Google Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
