import Link from 'next/link';
import { mainNav } from '@/lib/config/navigation';

export function SiteNav() {
  return (
    <nav aria-label="Navegación principal">
      <ul className="flex items-center gap-7">
        {mainNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-body-sm font-medium text-text-secondary hover:text-brand-navy transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
