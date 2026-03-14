import { HeroMain } from '@/components/ui/hero/HeroMain';
import { HomeQuickLinks } from '@/components/sections/home/HomeQuickLinks';
import { HomeUpcomingEvents } from '@/components/sections/home/HomeUpcomingEvents';
import { HomeLatestAnnouncements } from '@/components/sections/home/HomeLatestAnnouncements';
import { HomeBrotherhoodIntro } from '@/components/sections/home/HomeBrotherhoodIntro';
import { HomeFeaturedProducts } from '@/components/sections/home/HomeFeaturedProducts';
import { HomeParticipation } from '@/components/sections/home/HomeParticipation';
import { HomeLocationContact } from '@/components/sections/home/HomeLocationContact';
import { homeHero } from '@/content/home';

export default function HomePage() {
  return (
    <>
      <HeroMain
        title={homeHero.title}
        subtitle={homeHero.subtitle}
        ctaPrimary={homeHero.ctaPrimary}
        ctaSecondary={homeHero.ctaSecondary}
      />
      <HomeQuickLinks />
      <HomeUpcomingEvents />
      <HomeLatestAnnouncements />
      <HomeBrotherhoodIntro />
      <HomeFeaturedProducts />
      <HomeParticipation />
      <HomeLocationContact />
    </>
  );
}
