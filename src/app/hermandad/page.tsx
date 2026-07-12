import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell/PageShell";
import { Section } from "@/components/layout/section/Section";
import { Container } from "@/components/layout/container/Container";
import { SectionHeading } from "@/components/ui/typography/SectionHeading";
import { HeroPage } from "@/components/ui/hero/HeroPage";
import { IntroSection } from "@/components/sections/IntroSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { InfoCard } from "@/components/ui/cards/InfoCard";
import { UsersIcon } from "@/components/ui/icons";
import {
  hermandadHero,
  hermandadIntro,
  hermandadParticipation,
} from "@/content/hermandad";

export const metadata: Metadata = {
  title: "Hermandad — Santa María la Antigua",
  description:
    "Conoce la Hermandad de Santa María la Antigua: cultos, procesión, historia y cómo unirte.",
};

const participationIcons: Record<string, React.ReactNode> = {
  hermano: <UsersIcon className="h-5 w-5" />,
  joven: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  voluntariado: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

const participationAnchors: Record<string, string> = {
  hermano: "unirse",
  joven: "joven",
  voluntariado: "voluntariado",
};

export default function HermandadPage() {
  return (
    <PageShell>
      {/* Cabecera de sección */}
      <HeroPage title={hermandadHero.title} subtitle={hermandadHero.subtitle} />

      {/* Presentación de la Hermandad */}
      <IntroSection
        title={hermandadIntro.title}
        text={hermandadIntro.text}
        cta={hermandadIntro.cta}
        colorScheme="navy-burgundy"
      />

      {/* Nuestra comunidad */}
      <CommunitySection />

      {/* Participación */}
      <Section>
        <Container>
          <div className="space-y-8">
            <SectionHeading
              title="Participa"
              subtitle="Hay un lugar para ti en la Hermandad"
              align="center"
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hermandadParticipation.map((item) => (
                <li
                  key={item.id}
                  id={participationAnchors[item.id]}
                  className="scroll-mt-24"
                >
                  <InfoCard
                    icon={participationIcons[item.id]}
                    title={item.title}
                    description={item.description}
                    cta={item.cta}
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
