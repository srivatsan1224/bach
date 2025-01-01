import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

// Image imports
import Carousel1 from "../../assets/HomePage/Carousel1.jpg";
import Carousel2 from "../../assets/HomePage/Carousel2.jpg";
import Carousel3 from "../../assets/HomePage/Carousel3.jpeg";
import Carousel4 from "../../assets/HomePage/Carousel4.jpg";
import Carousel5 from "../../assets/HomePage/Carousel5.jpg";
import Carousel6 from "../../assets/HomePage/Carousel6.jpg";

const slides = [
  {
    image: Carousel1,
    title: "Find Perfect Housing Options for Bachelors",
    description: `We understand the unique challenges bachelors face when searching for a home. Our platform is designed to simplify the process, offering reliable, verified options tailored to your needs. With a commitment to transparency and trust, we ensure you find the perfect space to call your own.`,
    link: "/housinghome",
  },
  {
    image: Carousel2,
    title: "Healthy and Tasty Home Food Options",
    description: `Discover delicious and healthy meals prepared with love, tailored for bachelors who value quality and taste.`,
    link: "/foodhome",
  },
  {
    image: Carousel3,
    title: "Perfect Events to Spend Your Time",
    description: `Find exciting events happening near you and make the most of your leisure time.`,
    link: "/events",
  },
  {
    image: Carousel4,
    title: "Find Things at Perfect Cost",
    description: `Explore affordable and verified housing options, tailored to your budget and needs.`,
    link: "/discount",
  },
  {
    image: Carousel5,
    title: "Find Latest Part-Time Jobs Near You",
    description: `Your one-stop platform for exploring part-time job opportunities suited to your skills and preferences.`,
    link: "/jobs",
  },
  {
    image: Carousel6,
    title: "All-in-One Place for Gadgets at Best Prices",
    description: `Rent or buy the latest gadgets at unbeatable prices, tailored for your convenience.`,
    link: "/gadgets",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center mt-4 bg-gray-50">
      <div className="w-[90vw] h-[70vh] overflow-hidden rounded-3xl shadow-lg">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end mb-5 px-10 md:px-20 text-white">
                  <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
                  <p className="mt-4 text-lg md:text-xl">{slide.description}</p>
                  <button
                    onClick={() => navigate(slide.link)}
                    className="mt-4 self-start flex flex-row items-center gap-2 px-4 py-2 text-black bg-gray-50 border-2 rounded-full shadow-xl group relative hover:text-gray-50"
                  >
                    Explore
                    <svg
                      className="w-8 h-8 p-2 transition-transform duration-300 border border-gray-700 rounded-full group-hover:bg-gray-50 group-hover:rotate-90"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 19"
                    >
                      <path
                        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        className="fill-gray-800 group-hover:fill-gray-800"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
