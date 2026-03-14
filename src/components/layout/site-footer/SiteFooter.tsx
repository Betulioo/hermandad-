import Link from 'next/link';
import { Container } from '../container/Container';
import { siteConfig } from '@/lib/config/site';
import { footerNav } from '@/lib/config/navigation';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-text-inverse">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-heading text-h4 font-semibold">{siteConfig.shortName}</p>
            <p className="text-body-sm text-text-muted">{siteConfig.address}</p>
            <p className="text-body-sm text-text-muted">{siteConfig.city}</p>
            <div className="space-y-1 pt-1">
              <a
                href={`tel:${siteConfig.phone}`}
                className="block text-body-sm text-text-muted hover:text-text-inverse transition-colors"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block text-body-sm text-text-muted hover:text-text-inverse transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div key={group.label} className="space-y-4">
              <p className="text-caption font-semibold uppercase tracking-widest text-text-muted">
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted hover:text-text-inverse transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-5 sm:flex-row">
          <p className="text-caption text-text-muted">
            © {year} {siteConfig.name}
          </p>
          <div className="flex gap-5">
            <Link href="/privacidad" className="text-caption text-text-muted hover:text-text-inverse transition-colors">
              Privacidad
            </Link>
            <Link href="/aviso-legal" className="text-caption text-text-muted hover:text-text-inverse transition-colors">
              Aviso legal
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
