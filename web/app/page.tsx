import { HeroSectionV2 } from "@/components/sections/HeroSectionV2";
import { LogoCloudSection } from "@/components/sections/LogoCloudSection";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { SplitHighlightSection } from "@/components/sections/SplitHighlightSection";
import { StatsCounterSection } from "@/components/sections/StatsCounterSection";
import { TrustPillarsSection } from "@/components/sections/TrustPillarsSection";
import { RoiSimulatorSection } from "@/components/sections/RoiSimulatorSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SolutionsCalculator } from "@/components/sections/SolutionsCalculator";
import { UseCasesSection } from "@/components/sections/UseCasesSection";
import { SecurityGuaranteesSection } from "@/components/sections/SecurityGuaranteesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { BannerCtaV2 } from "@/components/sections/BannerCtaV2";

export default function Home() {
  return (
    <>
      <HeroSectionV2 />
      <LogoCloudSection />
      <ServicesBentoGrid />
      <SplitHighlightSection />
      <StatsCounterSection />
      <TrustPillarsSection />
      <RoiSimulatorSection />
      <WorkflowSection />
      <ComparisonSection />
      <SolutionsCalculator />
      <UseCasesSection />
      <SecurityGuaranteesSection />
      <FaqSection />
      <BannerCtaV2 />
    </>
  );
}
