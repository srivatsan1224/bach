import React from "react";
import { motion } from "framer-motion";
import LatestProductCard from "../../components/Rental/LatestProductCard";
import TestimonialCard from "../../components/Rental/TestimonialCard";
import CategoryButton from "../../components/Rental/CategoryButton";

// Import images directly from assets
import FurnitureImg from "../../assets/RentalImages/furniture.png";
import AppliancesImg from "../../assets/RentalImages/appliances.png";
import ElectronicsImg from "../../assets/RentalImages/electronics.png";
import FitnessImg from "../../assets/RentalImages/fitness.png";
import BackgroundImg from "../../assets/RentalImages/background.png";
import RefrigeratorImg from "../../assets/RentalImages/refrigerator.png";
import TableImg from "../../assets/RentalImages/table.png";
import LaptopTVImg from "../../assets/RentalImages/laptop_tv.png";
import ChairImg from "../../assets/RentalImages/chair.png";

const RentalHome = () => {
  const categories = [
    {
      id: 1,
      name: "Furniture",
      img: FurnitureImg,
      description: "Quality furniture at affordable prices",
      route: "/home/rental/furniture",
    },
    {
      id: 2,
      name: "Appliances",
      img: AppliancesImg,
      description: "Quality appliances at affordable prices",
      route: "/home/rental/appliances",
    },
    {
      id: 3,
      name: "Electronics",
      img: ElectronicsImg,
      description: "Quality electronics at affordable prices",
      route: "/home/rental/electronics",
    },
    {
      id: 4,
      name: "Fitness",
      img: FitnessImg,
      description: "Quality fitness equipment at affordable prices",
      route: "/home/rental/fitness",
    },
  ];

  const staticProducts = [
    {
      name: "Refrigerator",
      rent: "₹580/month",
      img: RefrigeratorImg,
      category: "appliances",
      id: "a2",
    },
    {
      name: "Modern Sofa",
      rent: "₹250/month",
      img: TableImg,
      category: "furniture",
      id: "f2",
    },
    {
      name: "Microwave Oven",
      rent: "₹1580/month",
      img: LaptopTVImg,
      category: "appliances",
      id: "a1",
    },
    {
      name: "Office Chair",
      rent: "₹150/month",
      img: ChairImg,
      category: "furniture",
      id: "f3",
    },
  ];

  const testimonials = [
    {
      name: "Kyle Roberts DVM",
      role: "Customer Web Consultant",
      text: "Renting furniture and appliances has never been this easy! I set up my new apartment in no time without spending a fortune. The quality and flexibility are perfect for bachelors like me.",
    },
    {
      name: "Sophia Anderson",
      role: "Internal Implementation Officer",
      text: "I love the hassle-free process. From selecting items to delivery, everything was smooth and quick. Renting appliances saved me money, and I didn’t have to worry about maintenance!",
    },
    {
      name: "Stephen Brekke",
      role: "Legacy Integration Producer",
      text: "This platform is a game-changer! I rented everything I needed for my new place – furniture, appliances, and even fitness equipment. Affordable, reliable, and so convenient!",
    },
  ];

  return (
    <div className="font-custom bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div
        className="w-full h-[400px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BackgroundImg})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative max-w-[1200px] mx-auto h-full flex flex-col justify-center items-center text-white text-center">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold mb-4"
          >
            Rent furniture and appliances
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl font-medium mb-4"
          >
            Home Essentials Without the Commitment.
          </motion.p>

          {/* Additional Sentence */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg font-light max-w-[800px]"
          >
            Finding furniture and appliances can be overwhelming, but we make it
            easy. With stylish, affordable rentals, you can set up your space
            hassle-free, without long-term burdens.
          </motion.p>
        </div>
      </div>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto p-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">On Rent</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <CategoryButton
                img={category.img}
                name={category.name}
                description={category.description}
                route={category.route}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Latest Products Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto p-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Latest Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {staticProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <LatestProductCard {...product} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto p-6"
      >
        <h2 className="text-2xl font-bold text-center text-primary">
          Our Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default RentalHome;
