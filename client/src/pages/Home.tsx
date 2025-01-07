import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import HeroCarousel from "../components/HomePage/HeroCarousel";
import { features } from "../assets/HomePage/features";
import ExclusiveServices from "../components/HomePage/ExclusiveServices";
import HomeCard from "../components/HomePage/HomeCard";
import Testimonials from "../components/HomePage/Testimonials";
import DownloadSection from "../components/HomePage/DownloadSection";
import FAQ from "../components/HomePage/Faq";

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section Start */}
      <HeroCarousel />
      {/* Hero Section Icons */}
      <div className="flex flex-wrap justify-between gap-3 py-4 bg-gray-50 w-[90vw] mx-auto">
        {features.map((feature, index) => (
          <Link
            to={feature.route || "/"} // Provide a fallback route
            key={index}
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-56 h-48 hover:shadow-xl transition-shadow duration-300"
          >
            <div
              className="text-4xl mb-4"
              dangerouslySetInnerHTML={{ __html: feature.icon }}
            ></div>
            <p className="text-lg font-medium text-gray-800">{feature.label}</p>
          </Link>
        ))}
      </div>

      {/* Hero Section end */}

      {/* Services Section Start */}
      <ExclusiveServices />
      {/* Services Section end */}

      {/* Nearby Homes */}
      <HomeCard />
      {/* Nearby Homes */}

      <DownloadSection />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
