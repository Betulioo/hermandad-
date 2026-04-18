import { Button } from "@/components/ui/buttons/Button";
import { Container } from "@/components/layout/container/Container";
import Image from "next/image";
interface HeroMainProps {
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export function HeroMain({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroMainProps) {
  return (
    <section className="bg-surface-alt">
      <Container>
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 md:items-center md:py-20 lg:py-24">
          {/* Text */}
          <div className="space-y-6">
            <h1 className="font-heading text-h1 font-semibold leading-tight text-text-primary md:text-display-lg">
              {title}
            </h1>
            <p className="text-body-lg text-text-secondary md:max-w-md">
              {subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={ctaPrimary.href} variant="primary" size="md">
                {ctaPrimary.label}
              </Button>
              <Button href={ctaSecondary.href} variant="secondary" size="md">
                {ctaSecondary.label}
              </Button>
            </div>
          </div>

          {/* Decorative image placeholder — replace with <Image> when available */}

          <div className="order-first md:order-last">
            <Image
              src="https://res.cloudinary.com/dz80dokn1/image/upload/v1776002894/IMG-20260404-WA0099_pjuonf.jpg"
              width={700}
              height={700}
              alt="parroquia"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
