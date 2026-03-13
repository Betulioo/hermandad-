'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { loginUser } from '@/services/auth.service';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin/avisos');
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (user) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { accessToken } = await loginUser({ email, password });
      await login(accessToken);
      router.push('/admin/avisos');
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 pt-8">
      <div>
        <h1 className="text-2xl font-semibold text-stone-800">Acceder</h1>
        <p className="mt-1 text-sm text-stone-500">
          Área restringida para el equipo de la parroquia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-stone-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-stone-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-800 outline-none focus:border-stone-600 focus:ring-1 focus:ring-stone-600"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-stone-800 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 disabled:opacity-50"
        >
          {submitting ? 'Accediendo…' : 'Acceder'}
        </button>
      </form>
    </div>
  );
}

function extractErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'response' in err) {
    const response = (err as { response?: { data?: { message?: unknown } } }).response;
    const msg = response?.data?.message;
    if (typeof msg === 'string') return msg;
  }
  return 'Error al iniciar sesión. Inténtalo de nuevo.';
}
