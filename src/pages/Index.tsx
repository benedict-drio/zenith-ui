import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { SocialProof } from "@/components/landing/SocialProof";
import { WidgetShowcase } from "@/components/landing/WidgetShowcase";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <SocialProof />
      <WidgetShowcase />
      <Footer />
    </div>
  );
};

export default Index;
