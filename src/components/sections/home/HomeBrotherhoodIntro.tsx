import { IntroSection } from "@/components/sections/IntroSection";
import { homeBrotherhoodIntro } from "@/content/home";

export function HomeBrotherhoodIntro() {
  const { title, text, cta } = homeBrotherhoodIntro;
  return (
    <IntroSection
      title={title}
      text={text}
      cta={cta}
      colorScheme="navy-burgundy"
    />
  );
}
