import React from "react";
import HeroCarousel from "../components/HomePage/HeroCarousel";

import { features } from "../assets/HomePage/features";
import ExclusiveServices from "../components/HomePage/ExclusiveServices";
import HomeCard from "../components/HomePage/HomeCard";
import Testimonials from "../components/HomePage/Testimonials";
import DownloadSection from "../components/HomePage/DownloadSection";


const Home: React.FC = () => {
  return <>
  {/*Hero Section Start*/}
  <HeroCarousel/>
  {/*Hero Section Icons*/}
  <div className="flex flex-wrap justify-center gap-6 py-8 bg-gray-50 w-full mx-auto">
  {features.map((feature, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-40 h-40 hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className="text-4xl mb-4"
        dangerouslySetInnerHTML={{ __html: feature.icon }}
      ></div>
      <p className="text-lg font-medium text-gray-800">{feature.label}</p>
    </div>
  ))}
</div>

    {/*Hero Section end*/}
    
    {/*Services Section Start*/}
    <ExclusiveServices/>
    {/*Services Section end*/}

    {/*Nearby Homes*/}
    <HomeCard/>
    {/*Nearby Homes*/}

    <DownloadSection/>

      {/* Phone Ads Section */}
      {/* Phone Ads Section */}
 <Testimonials/>

      {/* Phone Ads Section */}
  </>;
};

export default Home;
