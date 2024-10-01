import React from "react";
import HeroSection from "@/components/others/HeroSection";
import FeatureSection from "@/components/others/FeatureSecton";
import FeatureSection2 from "@/components/others/FeatureSection2";
import BentoGrid from "@/components/others/BentoGrid";

const HomePage = () => {
  return(
    <>
      <HeroSection />
      <FeatureSection/>
      <FeatureSection2/>
      <BentoGrid/>
    </>
  ) ;
  
};

export default HomePage;
