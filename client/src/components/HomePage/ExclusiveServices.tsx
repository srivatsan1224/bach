import { services } from "../../assets/HomePage/services";
import {places} from "../../assets/HomePage/places"
const ExclusiveServices: React.FC = () => {
    return (
      <div className="p-6 bg-gray-50">
        {/* Section Title */}
        <h2 className="text-2xl lg:text-4xl font-bold text-center mb-8">
          Our Exclusive Services
        </h2>
  
      {/* Services Section */}
<div className="w-[70vw] flex flex-wrap justify-center gap-6 mb-12 mx-auto">
  {services.map((service, index) => (
    <div
      key={index}
      className={`relative w-60 h-60 p-4 rounded-xl text-white shadow-xl flex flex-col justify-between overflow-hidden ${service.bgColor}`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Title */}
      <h3 className="relative z-10 text-lg font-bold text-left">
        {service.title}
      </h3>

      {/* Image or SVG */}
      <div
        className="relative z-10 w-full h-32 flex items-center justify-center rounded-lg overflow-hidden"
        dangerouslySetInnerHTML={{ __html: service.svg }}
      />

      {/* Bottom Decorative Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </div>
  ))}
</div>

  
        {/* Places Section */}
        <div className="flex flex-wrap justify-center gap-10">
  {places.map((place, index) => (
    <div key={index} className="flex flex-col items-center">
      <div
        className="w-32 h-32 rounded-full overflow-hidden shadow-lg flex items-center justify-center bg-gray-50 border border-gray-300"
        dangerouslySetInnerHTML={{ __html: place.svg }}
      />
      <p className="mt-4 text-center font-semibold text-gray-900">
        {place.name}
      </p>
    </div>
  ))}
</div>


      </div>
    );
  };

  
  export default ExclusiveServices;