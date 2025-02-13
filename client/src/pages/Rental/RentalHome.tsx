import { motion } from "framer-motion";
import LatestProductCard from "./LatestProductCard";
import TestimonialCard from "./TestimonialCardProps";
import CategoryButton from "./CategoryButtonProps";
import { MapPin, Search, Bell, MessageCircle, Plus } from "react-feather";
import DownloadSection from "../../components/HomePage/DownloadSection";


import BackgroundImg from "../../assets/RentalImages/background.png";
import RefrigeratorImg from "../../assets/RentalImages/refrigerator.png";
import TableImg from "../../assets/RentalImages/table.png";
import LaptopTVImg from "../../assets/RentalImages/laptop_tv.png";
import ChairImg from "../../assets/RentalImages/chair.png";

// Font Choices
import "@fontsource/inter";
import "@fontsource/lato";
import "@fontsource/montserrat";

const RentalHome = () => {
  const categories = [
    {
      id: 1,
      name: "Furniture",
      img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: "Quality furniture at affordable prices",
      route: "/home/rental/furniture",
    },
    {
      id: 2,
      name: "Appliances",
      img: 'https://plus.unsplash.com/premium_photo-1718043036192-b874bb43c64f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: "Quality appliances at affordable prices",
      route: "/home/rental/appliances",
    },
    {
      id: 3,
      name: "Electronics",
      img: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: "Quality electronics at affordable prices",
      route: "/home/rental/electronics",
    },
    {
      id: 4,
      name: "Fitness",
      img: 'https://img.pikbest.com/wp/202408/bodybuilding-equipment-3d-illustration-of-and-dumbbells-on-a-fitness-background-with-room-for-text_9778557.jpg!w700wp',
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
      text: "I love the hassle-free process. From selecting items to delivery, everything was smooth and quick. Renting appliances saved me money, and I didn't have to worry about maintenance!",
    },
    {
      name: "Stephen Brekke",
      role: "Legacy Integration Producer",
      text: "This platform is a game-changer! I rented everything I needed for my new place – furniture, appliances, and even fitness equipment. Affordable, reliable, and so convenient!",
    },
  ];

  return (
    <div className="font-inter bg-gray-100 min-h-screen">
      {/* Hero Section */}
     <div
  className="w-full h-[600px] bg-cover bg-center relative"
  style={{
    backgroundImage: `url(${BackgroundImg})`, // Added the closing parenthesis
  }}
>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        
        {/* Navigation */}
        <nav className="relative z-10 pt-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                
                <div className="hidden md:flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white">Bangalore</span>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <Bell className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                <MessageCircle className="w-6 h-6 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Post Ad</span>
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
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
            <p className="text-xl text-gray-200 mb-4">
              Your Home, Simplified.
            </p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            >
              <CategoryButton {...category} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {staticProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
              >
                <LatestProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
<DownloadSection/>
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
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