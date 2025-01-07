
const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "🧑‍💼❌", // Replace with the actual icon or SVG
      title: "Avoid Brokers",
      description: "We directly connect you to verified owners to save brokerage",
    },
    {
      id: 2,
      icon: "🏠❤️", // Replace with the actual icon or SVG
      title: "Shortlist without Visit",
      description: "Extensive Information makes it easy",
    },
    {
      id: 3,
      icon: "📄", // Replace with the actual icon or SVG
      title: "Free Listing",
      description: "Easy listing process. Also using WhatsApp",
    },
    {
      id: 4,
      icon: "📜", // Replace with the actual icon or SVG
      title: "Rental Agreement",
      description: "Assistance in creating Rental agreement & Paperwork",
    },
  ];

  return (
    <div className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl text-gray-600">
                  {feature.icon}
                </div>
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
