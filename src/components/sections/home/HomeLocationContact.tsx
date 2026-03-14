import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { Button } from '@/components/ui/buttons/Button';
import { MetaRow } from '@/components/ui/data-display/MetaRow';
import { homeLocationContact } from '@/content/home';

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  );
}

export function HomeLocationContact() {
  const data = homeLocationContact;

  return (
    <Section id="contacto" className="bg-surface-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">Dónde estamos</h2>
            <div className="space-y-3">
              <MetaRow icon={<MapPinIcon />}>
                {data.address}, {data.city}
              </MetaRow>
              <MetaRow icon={<PhoneIcon />}>
                <a href={`tel:${data.phone}`} className="hover:text-brand-navy transition-colors">
                  {data.phone}
                </a>
              </MetaRow>
              <MetaRow icon={<MailIcon />}>
                <a href={`mailto:${data.email}`} className="hover:text-brand-navy transition-colors">
                  {data.email}
                </a>
              </MetaRow>
            </div>

            <div className="space-y-2 rounded-md border border-border-soft bg-surface-card p-4">
              <p className="text-caption font-semibold uppercase tracking-wider text-text-muted">Horarios de atención</p>
              <MetaRow icon={<ClockIcon />}>{data.officeHours}</MetaRow>
              <MetaRow icon={<ClockIcon />}>{data.massScheduleSummary}</MetaRow>
            </div>

            <Button href={`mailto:${data.email}`} variant="primary">
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
                  href={data.mapsUrl}
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
