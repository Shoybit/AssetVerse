import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";
import PackagesSection from "../components/PackagesSection";
import FeaturesShowcase from "../components/FeaturesShowcase";
import TestimonialsStats from "../components/TestimonialsStats";
import Loader from "../components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroBanner />
      <AboutSection />
      <PackagesSection />
      <FeaturesShowcase />
      <TestimonialsStats />
    </>
  );
}
