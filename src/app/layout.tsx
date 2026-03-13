import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'Parroquia Santa María la Antigua',
  description: 'Web de la Parroquia Santa María la Antigua',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geist.variable}>
      <body className="flex min-h-screen flex-col bg-stone-50 font-sans antialiased">
        <AuthProvider>
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
