'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore, selectCartTotalItems } from '@/store/cart-store';

export function SiteHeaderCartLink() {
  const items = useCartStore((s) => s.items);
  const count = selectCartTotalItems(items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayCount = mounted ? count : 0;

  return (
    <Link
      href="/tienda/carrito"
      className="relative inline-flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-body-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-brand-navy transition-colors"
      aria-label={displayCount > 0 ? `Carrito, ${displayCount} artículos` : 'Carrito'}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="h-5 w-5 shrink-0"
        aria-hidden
      >
        <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
      </svg>
      <span className="hidden sm:inline">Carrito</span>
      {displayCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-navy px-1.5 text-caption font-semibold text-text-inverse">
          {displayCount > 99 ? '99+' : displayCount}
        </span>
      )}
    </Link>
  );
}
