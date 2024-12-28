import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Carousel1 from "../../assets/HomePage/Carousel1.jpg"

const HeroCarousel = () => {
  return (
    <div className="w-full h-[60vh] flex justify-center items-start mt-8 bg-gray-50">
      {/* Carousel Container */}
      <div className="w-[66vw] h-[60vh] overflow-hidden rounded-3xl shadow-lg">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          loop
          className="w-full h-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
          <div
  className="w-full h-full bg-cover bg-center relative"
  style={{
    backgroundImage:
      `url(${Carousel1})`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
  <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
  <div className="absolute inset-0 flex flex-col justify-end mb-5 px-10 md:px-20 text-white">
    <h1 className="text-4xl md:text-5xl font-bold">
      Find Perfect Housing Options for <br /> Bachelors
    </h1>
    <p className="mt-4 text-lg md:text-xl">
      We understand the unique challenges bachelors face when searching for a
      home.<br/> Our platform is designed to simplify the process and offer
      reliable, verified options <br/>tailored to your needs.
    </p>
    <div className="mt-4 self-start">
    <button
        type="submit"
        className="flex flex-row text-black justify-start gap-2 items-center shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-black hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
      >
        Explore
        <svg
          className="w-8 h-8 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
          viewBox="0 0 16 19"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            className="fill-gray-800 group-hover:fill-gray-800"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>

          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
          <div
  className="w-full h-full bg-cover bg-center relative"
  style={{
    backgroundImage:
      `url(${Carousel1})`,
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
  <div className="absolute inset-0 flex flex-col justify-end mb-5 px-10 md:px-20 text-white">
    <h1 className="text-4xl md:text-5xl font-bold">
      Find Perfect Housing Options for <br /> Bachelors
    </h1>
    <p className="mt-4 text-lg md:text-xl">
      We understand the unique challenges bachelors face when searching for a
      home.<br/> Our platform is designed to simplify the process and offer
      reliable, verified options <br/>tailored to your needs.
    </p>
    <div className="mt-4 self-start">
    <button
  type="submit"
  className="flex flex-row shadow-xl text-lg bg-gray-50 lg:font-semibold border-gray-50 px-6 py-3 text-black rounded-full border-2"
>
  Explore
  
</button>

    </div>
  </div>
</div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HeroCarousel;
