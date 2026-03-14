import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { PageHeading } from '@/components/ui/typography/PageHeading';
import { Badge } from '@/components/ui/data-display/Badge';
import { Button } from '@/components/ui/buttons/Button';
import { mockProductos, productCategoryLabels } from '@/content/tienda';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = mockProductos.find((p) => p.id === id);
  const title = product
    ? `${product.name} — Tienda — Santa María la Antigua`
    : 'Producto — Tienda — Santa María la Antigua';
  return { title };
}

export default async function ProductoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = mockProductos.find((p) => p.id === id);

  if (!product) {
    return (
      <PageShell>
        <Section>
          <Container size="md">
            <div className="space-y-6">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-1 text-body-sm text-text-muted transition-colors hover:text-text-primary"
              >
                ← Volver a la tienda
              </Link>
              <p className="text-body-md text-text-secondary">
                Este producto no está disponible.
              </p>
              <Button href="/tienda" variant="secondary" size="sm">
                Ver todos los productos
              </Button>
            </div>
          </Container>
        </Section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <Section>
        <Container size="lg">
          <div className="space-y-8">
            {/* Navegación de vuelta */}
            <Link
              href="/tienda"
              className="inline-flex items-center gap-1 text-body-sm text-text-muted transition-colors hover:text-text-primary"
            >
              ← Volver a la tienda
            </Link>

            {/* Cabecera del producto — ancho completo */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">
                  {productCategoryLabels[product.category]}
                </Badge>
                {product.featured && <Badge variant="important">Destacado</Badge>}
              </div>
              <PageHeading title={product.name} />
              <p className="font-heading text-h3 font-semibold text-brand-navy">
                {product.price}
              </p>
            </div>

            {/* Imagen + descripción */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
              {/* Imagen placeholder */}
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-surface-alt">
                <span className="text-body-sm text-text-muted">Imagen próximamente</span>
              </div>

              {/* Descripción y disponibilidad */}
              <div className="space-y-6">
                <p className="text-body-md leading-relaxed text-text-secondary">
                  {product.fullDescription}
                </p>

                {/* Bloque de disponibilidad — no funcional */}
                <div className="space-y-3 rounded-md border border-border-soft bg-surface-alt p-4">
                  <p className="text-body-sm font-medium text-text-primary">
                    Disponible en secretaría parroquial
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    Lunes a viernes: 10:00 – 13:00 h · Plaza de Santa María, s/n
                  </p>
                  <p className="text-caption text-text-muted">
                    La venta online estará disponible próximamente.
                  </p>
                </div>

                <Button href="/tienda" variant="secondary" size="md">
                  ← Ver más productos
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
