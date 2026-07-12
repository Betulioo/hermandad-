import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell/PageShell";
import { Section } from "@/components/layout/section/Section";
import { Container } from "@/components/layout/container/Container";
import { PageHeading } from "@/components/ui/typography/PageHeading";
import { Badge } from "@/components/ui/data-display/Badge";
import { Button } from "@/components/ui/buttons/Button";
import { ProductAddToCart } from "@/components/tienda/ProductAddToCart";
import { getProductBySlug } from "@/services/products.service";
import { formatPrice } from "@/lib/utils/formatPrice";
import { productCategoryLabels, type ProductCategory } from "@/content/tienda";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProductBySlug(slug);
    return {
      title: `${product.name} — Tienda — Santa María la Antigua`,
    };
  } catch {
    return { title: "Producto — Tienda — Santa María la Antigua" };
  }
}

export default async function ProductoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  const categoryLabel =
    product.category && product.category in productCategoryLabels
      ? productCategoryLabels[product.category as ProductCategory]
      : product.category;

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

            {/* Cabecera del producto */}
            <div className="space-y-3">
              {categoryLabel && (
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default">{categoryLabel}</Badge>
                </div>
              )}
              <PageHeading title={product.name} />
              <p className="font-heading text-h3 font-semibold text-brand-navy">
                {formatPrice(product.priceCents)}
              </p>
            </div>

            {/* Imagen + descripción */}
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
              {/* Imagen placeholder */}
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-surface-alt">
                <span className="text-body-sm text-text-muted">
                  Imagen próximamente
                </span>
              </div>

              {/* Descripción y disponibilidad */}
              <div className="space-y-6">
                <p className="text-body-md leading-relaxed text-text-secondary">
                  {product.description}
                </p>

                <ProductAddToCart
                  productId={product.id}
                  slug={product.slug}
                  name={product.name}
                  priceCents={product.priceCents}
                  stock={product.stock}
                />

                {/* Bloque de disponibilidad */}
                <div className="space-y-3 rounded-md border border-border-soft bg-surface-alt p-4">
                  <p className="text-body-sm font-medium text-text-primary">
                    Disponible en secretaría parroquial
                  </p>
                  <p className="text-body-sm text-text-secondary">
                    Lunes a viernes: 10:00 – 13:00 h · C/ Virgen de la Antigua,
                    nº 9
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
