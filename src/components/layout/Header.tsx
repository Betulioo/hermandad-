'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-stone-800">
          Santa María la Antigua
        </Link>
        <nav className="flex items-center gap-4 text-sm text-stone-600">
          <Link href="/avisos" className="hover:text-stone-900">
            Avisos
          </Link>
          <Link href="/horarios" className="hover:text-stone-900">
            Horarios
          </Link>
          {user?.role === 'ADMIN' && (
            <>
              <Link href="/admin/avisos" className="hover:text-stone-900">
                Admin avisos
              </Link>
              <Link href="/admin/parish-info" className="hover:text-stone-900">
                Admin parroquia
              </Link>
            </>
          )}
          {user ? (
            <button onClick={logout} className="hover:text-stone-900">
              Cerrar sesión
            </button>
          ) : (
            <Link href="/login" className="hover:text-stone-900">
              Acceder
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
