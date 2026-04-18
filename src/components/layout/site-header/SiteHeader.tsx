import Link from 'next/link';
import { Container } from '../container/Container';
import { SiteNav } from './SiteNav';
import { SiteHeaderMobile } from './SiteHeaderMobile';
import { SiteHeaderActions } from './SiteHeaderActions';
import { SiteHeaderCartLink } from './SiteHeaderCartLink';
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

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <SiteNav />
            </div>
            <SiteHeaderCartLink />
            <div className="hidden md:block">
              <SiteHeaderActions />
            </div>
            <SiteHeaderMobile />
          </div>
        </div>
      </Container>
    </header>
  );
}
