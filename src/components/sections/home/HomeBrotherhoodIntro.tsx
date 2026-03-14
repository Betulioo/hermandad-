import { IntroSection } from '@/components/sections/IntroSection';
import { homeBrotherhoodIntro } from '@/content/home';
import { siteConfig } from '@/lib/config/site';

export function HomeBrotherhoodIntro() {
  const { title, text, cta } = homeBrotherhoodIntro;
  return (
    <IntroSection
      title={title}
      text={text}
      cta={cta}
      imagePlaceholderLabel={siteConfig.shortName}
      colorScheme="navy-burgundy"
    />
  );
}
