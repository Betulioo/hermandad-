import { Container } from "@/components/layout/container/Container";
import { Section } from "@/components/layout/section/Section";
import { SectionHeading } from "@/components/ui/typography/SectionHeading";
import { CommunityCarousel } from "@/components/ui/carousel/CommunityCarousel";
import { communitySection, communitySlides } from "@/content/comunidad";
import type { CommunitySlide } from "@/content/comunidad";

interface CommunitySectionProps {
  title?: string;
  subtitle?: string;
  slides?: CommunitySlide[];
  className?: string;
}

export function CommunitySection({
  title = communitySection.title,
  subtitle = communitySection.subtitle,
  slides = communitySlides,
  className,
}: CommunitySectionProps) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <Section className={className}>
      <Container>
        <div className="space-y-8">
          <SectionHeading title={title} subtitle={subtitle} />
          <CommunityCarousel slides={slides} />
        </div>
      </Container>
    </Section>
  );
}
