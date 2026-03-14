import { Container } from '@/components/layout/container/Container';
import { Section } from '@/components/layout/section/Section';
import { SectionHeading } from '@/components/ui/typography/SectionHeading';
import { Button } from '@/components/ui/buttons/Button';
import { ProductCard } from '@/components/ui/cards/ProductCard';
import { homeFeaturedProducts } from '@/content/home';

export function HomeFeaturedProducts() {
  return (
    <Section className="bg-surface-alt">
      <Container>
        <div className="space-y-8">
          <SectionHeading
            title="Tienda"
            subtitle="Artículos y recuerdos de la Hermandad"
            action={
              <Button href="/tienda" variant="ghost" size="sm">
                Ir a la tienda →
              </Button>
            }
          />
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {homeFeaturedProducts.map((product) => (
              <li key={product.id}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  href={product.href}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
