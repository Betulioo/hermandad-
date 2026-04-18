'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function SiteHeaderActions() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) return <div className="h-8 w-24" />;

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-body-sm font-medium text-text-secondary hover:text-brand-navy transition-colors"
      >
        Acceder
      </Link>
    );
  }

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <div className="flex items-center gap-4">
      {user.role === 'ADMIN' && (
        <Link
          href="/admin/avisos"
          className="text-body-sm font-medium text-brand-blue hover:text-brand-navy transition-colors"
        >
          Panel admin
        </Link>
      )}
      <button
        onClick={handleLogout}
        className="text-body-sm font-medium text-text-muted hover:text-text-primary transition-colors"
      >
        Salir
      </button>
    </div>
  );
}
