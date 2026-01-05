import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ChallengesSection from "@/components/landing/ChallengesSection";
import TransformationSection from "@/components/landing/TransformationSection";
import OfferSection from "@/components/landing/OfferSection";
import CredibilitySection from "@/components/landing/CredibilitySection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ChallengesSection />
        <TransformationSection />
        <OfferSection />
        <CredibilitySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
