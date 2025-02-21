import { motion } from "framer-motion";
import { BookOpen, Home, Utensils, Calendar, Briefcase, Laptop } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Home className="w-8 h-8" />,
    title: "Premium Housing Solutions",
    description: "Discover luxury living spaces with our curated selection of verified properties",
    color: "from-emerald-500 to-teal-600",
    highlight: "2000+ Listings",
    route: "/housinghome"
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Gourmet Food Services",
    description: "Experience fine dining with our carefully selected food partners",
    color: "from-orange-500 to-red-600",
    highlight: "500+ Restaurants",
    route: "/foodhome"
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Exclusive Events",
    description: "Access premium events and networking opportunities",
    color: "from-purple-500 to-indigo-600",
    highlight: "Weekly Updates",
    route: "/eventshome"
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Elite Career Opportunities",
    description: "Connect with top employers for premium job positions",
    color: "from-blue-500 to-cyan-600",
    highlight: "100+ Companies",
    route: "/parttime/home"
  },
  {
    icon: <Laptop className="w-8 h-8" />,
    title: "Premium Tech Rentals",
    description: "Access the latest technology without the commitment",
    color: "from-pink-500 to-rose-600",
    highlight: "Latest Gadgets",
    route: "/home/rental/rental"
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Exclusive Discounts",
    description: "Get the best deals and offers tailored to your needs",
    color: "from-yellow-500 to-amber-600",
    highlight: "Best Offers",
    route: "/discount"
  }
];

const ServicesGrid = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
            Our Exclusive Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Premium Solutions for Modern Living
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience unparalleled service quality with our carefully curated solutions designed for your lifestyle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="group relative">
                {/* Card Background with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100">
                  {/* Service Icon with Gradient Background */}
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-white bg-gradient-to-r ${service.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  {/* Service Content */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  {/* Highlight Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${service.color} text-white`}>
                      {service.highlight}
                    </span>
                    
                    {/* Link to navigate to service page */}
                    <Link
                      to={service.route}
                      className="relative z-10 text-emerald-600 font-medium hover:text-emerald-700 transition-colors inline-flex items-center gap-2 group"
                    >
                      Learn More
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/services"
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300"
          >
            Explore All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;
