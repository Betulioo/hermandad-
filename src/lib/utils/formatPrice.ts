const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
});

export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100);
}
