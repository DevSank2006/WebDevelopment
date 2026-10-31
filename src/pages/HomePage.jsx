import HeroSection from "../components/home/HeroSection.jsx";
import PaymentMarquee from "../components/home/PaymentMarquee.jsx";
import CategoriesSection from "../components/home/CategoriesSection.jsx";
import FeaturedPackagesSection from "../components/home/FeaturedPackagesSection.jsx";
import HowItWorksSection from "../components/home/HowItWorksSection.jsx";
import TestimonialsSection from "../components/home/TestimonialsSection.jsx";
import CallToActionSection from "../components/home/CallToActionSection.jsx";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PaymentMarquee />
      <CategoriesSection />
      <FeaturedPackagesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CallToActionSection />
    </>
  );
}
