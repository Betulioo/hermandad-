import type { Metadata } from 'next';
import { PedidoPageContent } from './PedidoPageContent';

export const metadata: Metadata = {
  title: 'Finalizar pedido — Santa María la Antigua',
  description: 'Confirma tu pedido en la tienda de la Hermandad.',
};

export default function PedidoPage() {
  return <PedidoPageContent />;
}
