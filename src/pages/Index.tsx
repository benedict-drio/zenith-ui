import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { SocialProof } from "@/components/landing/SocialProof";
import { WidgetShowcase } from "@/components/landing/WidgetShowcase";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <PricingSection />
      <FAQSection />
      <SocialProof />
      <WidgetShowcase />
      <Footer />
    </div>
  );
};

export default Index;
