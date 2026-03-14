import Link from 'next/link';
import { Container } from '../container/Container';
import { SiteNav } from './SiteNav';
import { SiteHeaderMobile } from './SiteHeaderMobile';
import { siteConfig } from '@/lib/config/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-soft bg-surface-card">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-heading text-h4 font-semibold tracking-wide text-brand-navy hover:text-brand-blue transition-colors"
          >
            {siteConfig.shortName}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <SiteNav />
          </div>

          <SiteHeaderMobile />
        </div>
      </Container>
    </header>
  );
}
