import { services } from "../../assets/HomePage/services";

const ExclusiveServices = () => {
  
  const videoUrl = "https://www.youtube.com/embed/8gcRTMr-rlg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=8gcRTMr-rlg";

  const cities = [
    { name: "Mumbai", image: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f" },
    { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5" },
    { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2" },
    { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220" },
    { name: "Kolkata", image: "https://images.unsplash.com/photo-1558431382-27e303142255" },
    { name: "Hyderabad", image: "https://images.unsplash.com/photo-1600577916048-804c9191e36c" },
  ].slice(0, 6);

  return (
    <>
     
  
    <div className=" bg-gray-50 p-16 px-28 flex flex-col lg:flex-row items-center justify-center gap-8 px-6">
      {/* Video Section */}
      <div className="w-full lg:w-1/2 h-96 relative shadow-lg rounded-xl overflow-hidden">
        {/* YouTube Video Embed */}
        <iframe
          src={videoUrl}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4 text-white">
          <h2 className="text-xl font-bold animate-fade-up">Find Perfect Housing Options</h2>
          <p className="text-sm animate-fade-up delay-100">
            Discover your ideal living space with verified listings and transparent pricing.
          </p>
        </div>
      </div>

      {/* Cities Section */}
      <div className="w-full lg:w-1/2">
     
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cities.map((city) => (
            <div
              key={city.name}
              className="group relative h-40 rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all duration-500">
                <div className="absolute bottom-0 left-0 p-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-lg font-bold text-white">{city.name}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    
      {/* Services Section */}
<div className="w-[70vw] flex flex-wrap justify-center gap-6 mb-12 mx-auto py-10">
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
    </>
  );
};

export default ExclusiveServices;
