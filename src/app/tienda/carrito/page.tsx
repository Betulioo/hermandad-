import type { Metadata } from 'next';
import { CartPageContent } from './CartPageContent';

export const metadata: Metadata = {
  title: 'Carrito — Santa María la Antigua',
  description: 'Revisa los artículos de la tienda de la Hermandad.',
};

export default function CarritoPage() {
  return <CartPageContent />;
}
