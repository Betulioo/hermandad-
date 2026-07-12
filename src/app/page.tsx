import { HeroMain } from "@/components/ui/hero/HeroMain";
import { HomeEssentialInfo } from "@/components/sections/home/HomeEssentialInfo";
import { HomeUpcomingEvents } from "@/components/sections/home/HomeUpcomingEvents";
import { HomeLatestAnnouncements } from "@/components/sections/home/HomeLatestAnnouncements";
import { HomeBrotherhoodIntro } from "@/components/sections/home/HomeBrotherhoodIntro";
import { HomeFeaturedProducts } from "@/components/sections/home/HomeFeaturedProducts";
import { HomeParticipation } from "@/components/sections/home/HomeParticipation";
import { HomeLocationContact } from "@/components/sections/home/HomeLocationContact";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { homeHero } from "@/content/home";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroMain
        title={homeHero.title}
        subtitle={homeHero.subtitle}
        ctaPrimary={homeHero.ctaPrimary}
        ctaSecondary={homeHero.ctaSecondary}
      />
      <CommunitySection />
      <HomeEssentialInfo />
      <HomeUpcomingEvents />
      <HomeLatestAnnouncements />
      <HomeParticipation />
      <HomeBrotherhoodIntro />
      <HomeFeaturedProducts />
      <HomeLocationContact />
    </>
  );
}
