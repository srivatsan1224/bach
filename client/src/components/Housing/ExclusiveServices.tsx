
const ExclusiveServices = () => {
  const services = [
    {
      id: 1,
      icon: "📦",
      title: "Packers & Movers",
      label: "Lowest Price",
    },
    {
      id: 2,
      icon: "💳",
      title: "Pay rent",
      label: "New Offers",
    },
    {
      id: 3,
      icon: "📜",
      title: "Rental Agreement",
      label: "Flat 30% off",
    },
    {
      id: 4,
      icon: "💸",
      title: "Click & Earn",
      label: "New",
    },
    {
      id: 5,
      icon: "🖌️",
      title: "Painting & Cleaning",
      label: "New",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 py-12 md:py-16">
      {/* Title Section */}
      <div className="relative flex flex-col items-center justify-center mb-12 px-4">
        <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mb-6" />
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 drop-shadow-lg tracking-tight text-center">
          Our Exclusive Services
        </h2>
        <p className="mt-4 text-base md:text-xl text-gray-600 font-normal text-center max-w-2xl">
          Discover our premium offerings tailored for you
        </p>
      </div>

      {/* Services Horizontal Scroll */}
      <div className="w-full">
        <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 snap-x snap-mandatory scrollbar-none px-4 md:px-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group flex-shrink-0 w-[280px] md:w-[320px] snap-center overflow-hidden hover:shadow-xl transition-all duration-300 rounded-xl bg-white/50 backdrop-blur-sm first:ml-auto last:mr-auto"
            >
              <div className="p-6 md:p-8">
                <div className="relative flex flex-col items-center">
                  {/* Label Badge */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1.5 text-xs md:text-sm font-medium rounded-full bg-gradient-to-r from-emerald-400/10 to-teal-500/10 text-emerald-700">
                      {service.label}
                    </span>
                  </div>

                  {/* Icon Container */}
                  <div className="mt-8 mb-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-gray-800 font-semibold text-lg md:text-xl group-hover:text-emerald-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default ExclusiveServices;