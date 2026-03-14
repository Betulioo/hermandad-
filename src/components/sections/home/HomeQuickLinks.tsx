import Link from 'next/link';
import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { homeQuickLinks } from '@/content/home';

const icons: Record<string, React.ReactNode> = {
  horarios: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  ),
  avisos: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  hermandad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  tienda: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  contacto: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export function HomeQuickLinks() {
  return (
    <Section spacing="compact" className="border-b border-border-soft bg-surface-card">
      <Container>
        <nav aria-label="Accesos rápidos">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
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
