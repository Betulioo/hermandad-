import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/layout/container/Container";
import { Section } from "@/components/layout/section/Section";
import { Button } from "@/components/ui/buttons/Button";
import Image from "next/image";

type ColorScheme = "navy-burgundy" | "navy-blue";

const colorSchemeClasses: Record<ColorScheme, string> = {
  "navy-burgundy": "from-brand-navy/80 to-brand-burgundy",
  "navy-blue": "from-brand-navy to-brand-blue",
};

interface IntroSectionProps {
  title: string;
  text: string;
  cta: { label: string; href: string };
  colorScheme?: ColorScheme;
  className?: string;
}

export function IntroSection({
  title,
  text,
  cta,
  colorScheme = "navy-burgundy",
  className,
}: IntroSectionProps) {
  return (
    <Section className={className}>
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <h2 className="font-heading text-h2 font-semibold text-text-primary">
              {title}
            </h2>
            <p className="text-body-md text-text-secondary leading-relaxed">
              {text}
            </p>
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>

          <div
            className={cn(
              "aspect-[4/3] flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br",
              colorSchemeClasses[colorScheme],
            )}
          >
            <Image
              src="https://res.cloudinary.com/dz80dokn1/image/upload/v1776002891/IMG-20260404-WA0095_jtss8p.jpg"
              width={800}
              height={800}
              alt="parroquia"
              className="rounded-md"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
