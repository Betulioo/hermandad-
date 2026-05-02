'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Container } from '@/components/layout/container/Container';

const adminNav = [
  { label: 'Avisos', href: '/admin/avisos' },
  { label: 'Productos', href: '/admin/productos' },
  { label: 'Pedidos', href: '/admin/pedidos' },
  { label: 'Info parroquia', href: '/admin/parish-info' },
  { label: 'Horarios', href: '/admin/horarios' },
  { label: 'Eventos', href: '/admin/eventos' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading) return null;
  if (!user) return null;

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Barra admin */}
      <div className="border-b border-border-soft bg-surface-card">
        <Container>
          <div className="flex min-h-12 flex-wrap items-center justify-between gap-3 py-2">
            <nav className="flex flex-wrap items-center gap-1" aria-label="Navegación admin">
              {adminNav.map((item) => {
                const isActive =
                  item.href === '/admin/pedidos'
                    ? pathname === '/admin/pedidos' ||
                      pathname.startsWith('/admin/pedidos/')
                    : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={[
                      'rounded-sm px-3 py-1.5 text-body-sm font-medium transition-colors',
                      isActive
                        ? 'bg-surface-alt text-text-primary'
                        : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary',
                    ].join(' ')}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="text-body-sm text-text-muted hover:text-text-primary transition-colors"
            >
              Salir
            </button>
          </div>
        </Container>
      </div>

      {/* Contenido de cada sección admin */}
      <Container>
        <div className="py-8">
          {children}
        </div>
      </Container>
    </div>
  );
}
