import Link from 'next/link';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { ClockIcon, MapPinIcon, UsersIcon } from '@/components/ui/icons';
import { homeQuickLinks } from '@/content/home';

const icons: Record<string, React.ReactNode> = {
  horarios: <ClockIcon className="h-6 w-6" />,
  avisos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  hermandad: <UsersIcon className="h-6 w-6" />,
  tienda: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  contacto: <MapPinIcon className="h-6 w-6" />,
};

export function HomeQuickLinks() {
  return (
    <Section spacing="compact" className="border-b border-border-soft bg-surface-card">
      <Container>
        <nav aria-label="Accesos rápidos">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {homeQuickLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="flex flex-col items-center gap-2 rounded-md border border-border-soft p-4 text-center transition-colors hover:border-brand-navy/30 hover:bg-surface-alt"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-navy/8 text-brand-navy">
                    {icons[link.id]}
                  </span>
                  <span className="text-body-sm font-semibold text-text-primary">{link.label}</span>
                  <span className="text-caption text-text-muted">{link.microcopy}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  );
}
