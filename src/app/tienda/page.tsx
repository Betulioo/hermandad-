import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell/PageShell';
import { Section } from '@/components/layout/section/Section';
import { Container } from '@/components/layout/container/Container';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { HeroPage } from '@/components/ui/hero/HeroPage';
import { ProductCard } from '@/components/ui/cards/ProductCard';
import {
  mockProductos,
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

const categories: ProductCategory[] = ['devocionario', 'publicaciones', 'indumentaria'];

export default function TiendaPage() {
  return (
    <PageShell>
      <HeroPage title={tiendaHero.title} subtitle={tiendaHero.subtitle} />

      {/* Aviso de disponibilidad */}
      <Section spacing="compact" className="border-b border-border-soft bg-surface-card">
        <Container>
          <p className="text-body-sm text-text-muted">{tiendaNote}</p>
        </Container>
      </Section>

      {/* Categorías */}
      {categories.map((category, index) => {
        const products = mockProductos.filter((p) => p.category === category);
        if (products.length === 0) return null;
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
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        href={`/tienda/${product.id}`}
                        featured={product.featured}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </Container>
          </Section>
        );
      })}
    </PageShell>
  );
}
