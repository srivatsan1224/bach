import React from "react";

const ExclusiveServices = () => {
  const services = [
    {
      id: 1,
      icon: "📦", // Replace with the actual icon image or SVG
      title: "Packers & Movers",
      label: "Lowest Price",
    },
    {
      id: 2,
      icon: "💳", // Replace with the actual icon image or SVG
      title: "Pay rent",
      label: "New Offers",
    },
    {
      id: 3,
      icon: "📜", // Replace with the actual icon image or SVG
      title: "Rental Agreement",
      label: "Flat 30% off",
    },
    {
      id: 4,
      icon: "💸", // Replace with the actual icon image or SVG
      title: "Click & Earn",
      label: "New",
    },
    {
      id: 5,
      icon: "🖌️", // Replace with the actual icon image or SVG
      title: "Painting & Cleaning",
      label: "New",
    },
  ];

  return (
    <div className="bg-white py-16">
      {/* Title Section */}
      <div className="relative flex items-center justify-center">
        <div className="absolute left-0 top-1/2 w-1/4 h-px bg-pink-400"></div>
        <h2 className="text-3xl font-bold text-gray-800 px-4 z-10 bg-white">
          Our Exclusive Services
        </h2>
        <div className="absolute right-0 top-1/2 w-1/4 h-px bg-pink-400"></div>
      </div>

      {/* Services Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center text-center bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Badge */}
            <div className="relative inline-block mb-6">
              <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-100 text-orange-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {service.label}
              </span>
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-600">
                {service.icon}
              </div>
            </div>
            {/* Title */}
            <p className="text-gray-800 font-semibold text-sm">{service.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveServices;
