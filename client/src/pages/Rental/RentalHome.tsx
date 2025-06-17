import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Bell, MessageCircle, Plus, Loader2 } from "lucide-react"; // Added Loader2

// Assuming components are in src/components/Rental/
import LatestProductCard from "../../components/Rental/LatestProductCard";
import CategoryButton from "../../components/Rental/CategoryButton"; // Using the actual component
import TestimonialCard from "../../components/Rental/TestimonialCard"; // Using the actual component

import DownloadSection from "../../components/HomePage/DownloadSection"; // Assuming this exists
import apiService from "../../services/apiService"; // Your API service
import { RentalItem, DisplayCategory, CategoryName } from "../../types"; // Our shared types

// Placeholder images - consider moving to a config or helper
import BackgroundImg from "../../assets/RentalImages/background.png";
import DefaultCategoryImg from "../../assets/RentalImages/default-category.png"; // A default image for categories
import DefaultProductImg from "../../assets/RentalImages/default-product.png"; // A default image for products

// Font Choices (already present)
import "@fontsource/inter";
import "@fontsource/lato";
import "@fontsource/montserrat";

// Helper function to get a placeholder image for a category
// In a real app, categories might have their own image URLs from the backend
const getCategoryImage = (categoryName: string): string => {
  // Simple mapping - extend as needed or fetch from backend if categories have images
  const name = categoryName.toLowerCase();
  if (name.includes("furniture")) return "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (name.includes("appliances")) return "https://plus.unsplash.com/premium_photo-1718043036192-b874bb43c64f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (name.includes("electronics")) return "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  if (name.includes("fitness")) return "https://img.pikbest.com/wp/202408/bodybuilding-equipment-3d-illustration-of-and-dumbbells-on-a-fitness-background-with-room-for-text_9778557.jpg!w700wp";
  return DefaultCategoryImg;
};

const RentalHome: React.FC = () => {
  const navigate = useNavigate();
  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<RentalItem[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentalData = async () => {
      setIsLoadingCategories(true);
      setIsLoadingProducts(true);
      setError(null);

      try {
        // Fetch Categories
        const categoriesResponse = await apiService.get<CategoryName[]>("/categories");
        const fetchedCategoryNames = categoriesResponse.data;
        const formattedCategories: DisplayCategory[] = fetchedCategoryNames.map((name) => ({
          id: name, // Use name as unique key
          name: name,
          img: getCategoryImage(name),
          description: `Quality ${name.toLowerCase()} at affordable prices`,
          // Ensure route matches your frontend routing structure for category pages
          route: `/home/rental/${name.toLowerCase().replace(/\s+/g, "-")}`, // Example route
        }));
        setDisplayCategories(formattedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories.");
      } finally {
        setIsLoadingCategories(false);
      }

      try {
        // Fetch Featured Products (e.g., from 'electronics' category, limit 4)
        // Adjust the category or create a dedicated '/featured' endpoint in backend for better curation
        const productsResponse = await apiService.get<RentalItem[]>("/items/filter/Electronics", {
          params: { limit: 4 }, // Assuming your backend supports a 'limit' param. If not, fetch all and slice.
        });
        // If backend doesn't support limit, slice here: setFeaturedProducts(productsResponse.data.slice(0, 4));
        setFeaturedProducts(productsResponse.data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        // Not setting global error for this, as categories might still load
        setFeaturedProducts([]); // Set to empty on error
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchRentalData();
  }, []);

  // Static testimonials for now
  const testimonials = [
    {
      name: "Kyle Roberts DVM",
      role: "Customer Web Consultant",
      text: "Renting furniture and appliances has never been this easy! I set up my new apartment in no time without spending a fortune. The quality and flexibility are perfect for bachelors like me.",
    },
    {
      name: "Sophia Anderson",
      role: "Internal Implementation Officer",
      text: "I love the hassle-free process. From selecting items to delivery, everything was smooth and quick. Renting appliances saved me money, and I didn't have to worry about maintenance!",
    },
    {
      name: "Stephen Brekke",
      role: "Legacy Integration Producer",
      text: "This platform is a game-changer! I rented everything I needed for my new place – furniture, appliances, and even fitness equipment. Affordable, reliable, and so convenient!",
    },
  ];

  const handleProductCardClick = (category: string, id: string) => {
    // Ensure category name is URL-friendly for navigation if it contains spaces
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    navigate(`/home/rental/${categorySlug}/${id}`);
  };


  return (
    <div className="font-inter bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div
        className="w-full h-[600px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <nav className="relative z-10 pt-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="hidden md:flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white">Bangalore</span> {/* Static for now */}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <Bell className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => navigate("/post-ad")}
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Ad</span>
                </motion.button>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-[calc(100%-80px)] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              Rent Furnishings & Appliances with Ease
            </h2>
            <p className="text-xl text-gray-200 mb-4">Your Home, Simplified.</p>
            <p className="text-lg text-gray-300 mb-8">
              Discover a hassle-free way to furnish your space with our curated
              selection of stylish and affordable rentals.
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full px-6 py-4 pl-12 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto py-20 px-4"
      >
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Explore Categories
        </h2>
        {isLoadingCategories ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
           <p className="text-center text-red-500">{error}</p>
        ) : displayCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <CategoryButton {...category} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories found.</p>
        )}
      </motion.section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Products
          </h2>
          {isLoadingProducts ? (
             <div className="flex justify-center items-center h-60">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100,
                  }}
                  onClick={() => handleProductCardClick(product.category, product.id) }
                  className="cursor-pointer"
                >
                  {/* Ensure LatestProductCard props match RentalItem structure */}
                  <LatestProductCard
                    id={product.id}
                    name={product.name}
                    img={product.imageUrl || DefaultProductImg}
                    price={product.price} // Changed from 'rent'
                    category={product.category}
                    // originalPrice={product.originalPrice} // Add if LatestProductCard supports it
                    // discount={product.discount} // Add if LatestProductCard supports it
                  />
                </motion.div>
              ))}
            </div>
          ) : (
             <p className="text-center text-gray-500">No featured products available at the moment.</p>
          )}
        </div>
      </section>

      <DownloadSection />

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index} // Using index as key for static list is fine
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalHome;