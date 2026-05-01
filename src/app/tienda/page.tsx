import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { HeroPage } from '@/components/ui/hero/HeroPage';
import { ProductCard } from '@/components/ui/cards/ProductCard';
import { getProducts } from '@/services/products.service';
import { formatPrice } from '@/lib/utils/formatPrice';
import {
  productCategoryLabels,
  productCategoryDescriptions,
  tiendaHero,
  tiendaNote,
  type ProductCategory,
} from '@/content/tienda';

export const metadata: Metadata = {
  title: 'Tienda — Santa María la Antigua',
  description:
    'Artículos devocionales, libros y ropa oficial de la Hermandad de Santa María la Antigua.',
};

const CATEGORIES: ProductCategory[] = ['devocionario', 'rosarios', 'publicaciones', 'indumentaria'];

export default async function TiendaPage() {
  let products = await getProducts().catch(() => []);

  return (
    <PageShell>
      <HeroPage title={tiendaHero.title} subtitle={tiendaHero.subtitle} />

      {/* Aviso de disponibilidad */}
      <Section spacing="compact" className="border-b border-border-soft bg-surface-card">
        <Container>
          <p className="text-body-sm text-text-muted">{tiendaNote}</p>
        </Container>
      </Section>

      {products.length === 0 ? (
        <Section>
          <Container>
            <p className="text-body-md text-text-secondary">
              No hay productos disponibles en este momento.
            </p>
          </Container>
        </Section>
      ) : (
        CATEGORIES.map((category, index) => {
          const categoryProducts = products.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null;
          const isAlt = index % 2 === 1;
          return (
            <Section key={category} className={isAlt ? 'bg-surface-alt' : undefined}>
              <Container>
                <div className="space-y-8">
                  <SectionHeading
                    title={productCategoryLabels[category]}
                    subtitle={productCategoryDescriptions[category]}
                  />
                  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {categoryProducts.map((product) => (
                      <li key={product.id}>
                        <ProductCard
                          name={product.name}
                          price={formatPrice(product.priceCents)}
                          description={product.description}
                          href={`/tienda/${product.slug}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </Container>
            </Section>
          );
        })
      )}
    </PageShell>
  );
}
