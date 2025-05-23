import { FeatureSection } from "@/components/feature-section";
import { HeroSection } from "@/components/hero";
import { SupportSection } from "@/components/support-section/support-section";

export default function Home() {
  return (
    <article className="flex flex-col">
      <HeroSection />
      <FeatureSection />
      <SupportSection />
    </article>
  );
}