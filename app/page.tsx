import { getContent } from "@/content";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TrustBar } from "@/components/TrustBar";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { ProductionFlexibilitySection } from "@/components/ProductionFlexibilitySection";
import { ProductionCalculator } from "@/components/ProductionCalculator";
import { ProductionStagesSection } from "@/components/ProductionStagesSection";
import { AddOnsSection } from "@/components/AddOnsSection";
import { ManufacturingTimeline } from "@/components/ManufacturingTimeline";
import { SiteRequirementsSection } from "@/components/SiteRequirementsSection";
import { LeadQualificationForm } from "@/components/LeadQualificationForm";
import { NoFixedPriceSection } from "@/components/NoFixedPriceSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";

export default function HomePage() {
  const content = getContent("en");

  return (
    <>
      <Header content={content} />
      <main>
        <HeroSection content={content} />
        <TrustBar content={content} />
        <ProblemSection content={content} />
        <SolutionSection content={content} />
        <ProductionFlexibilitySection content={content} />
        <ProductionCalculator content={content} />
        <ProductionStagesSection content={content} />
        <AddOnsSection content={content} />
        <ManufacturingTimeline content={content} />
        <SiteRequirementsSection content={content} />
        <LeadQualificationForm content={content} />
        <NoFixedPriceSection content={content} />
        <FinalCTA content={content} />
      </main>
      <Footer content={content} />
      <StickyCTA />
    </>
  );
}
