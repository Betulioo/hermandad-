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
          <div className="space-y-6 rounded-md border border-border-soft bg-surface-card p-6 shadow-card">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">Dónde estamos</h2>
            <div className="space-y-3">
              <MetaRow icon={<MapPinIcon />} className="text-text-secondary">
                {contact.address}
              </MetaRow>
              <MetaRow icon={<PhoneIcon />} className="text-text-secondary">
                <a href={`tel:${contact.phone}`} className="hover:text-brand-navy transition-colors">
                  {contact.phone}
                </a>
              </MetaRow>
              <MetaRow icon={<MailIcon />} className="text-text-secondary">
                <a href={`mailto:${contact.email}`} className="hover:text-brand-navy transition-colors">
                  {contact.email}
                </a>
              </MetaRow>
            </div>

            {(contact.officeHours || contact.massScheduleSummary) && (
              <div className="space-y-2 rounded-md border border-border-soft bg-surface-alt p-4">
                <p className="text-caption font-semibold uppercase tracking-wider text-text-secondary">Horarios de atención</p>
                {contact.officeHours && (
                  <MetaRow icon={<ClockIcon />} className="text-text-secondary">{contact.officeHours}</MetaRow>
                )}
                {contact.massScheduleSummary && (
                  <MetaRow icon={<ClockIcon />} className="text-text-secondary">{contact.massScheduleSummary}</MetaRow>
                )}
              </div>
            )}

            <Button href={`mailto:${contact.email}`} variant="primary">
              Contactar
            </Button>
          </div>

          {/* Mapa */}
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-md border border-border-soft bg-surface-card shadow-card">
              <iframe
                title="Ubicación de la Parroquia de Santa María la Antigua en Google Maps"
                src={contact.mapsEmbedSrc}
                className="aspect-[4/3] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm font-medium text-brand-blue hover:underline"
            >
              Ver en Google Maps →
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
