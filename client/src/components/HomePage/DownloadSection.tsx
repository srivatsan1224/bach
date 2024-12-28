import React from "react";
import ddbg from "../../assets/HomePage/ddbg.png";
import AppStore from "../../assets/HomePage/APPSTORE.png";
import PlayStore from "../../assets/HomePage/PLAYSTORE.png";
const DownloadBanner = () => {
  return (
    <div className="flex justify-center items-center h-[526px] bg-gray-50 ">
      <div
        className="flex w-[1370PX] justify-between items-center h-full bg-cover bg-center px-10 rounded-3xl"
        style={{
          backgroundImage: `url(${ddbg})`,
        }}
      >
        {/* Left Text Section */}
        <div className="flex flex-col justify-center items-start w-1/2">
          <h1 className="text-4xl font-semibold text-black mb-6">
            One App, Endless Possibilities –
            <br /> Download Now!
          </h1>
          <div className="flex flex-wrap space-x-4">
            <a
              href="#"
              className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-lg  hover:bg-gray-800"
            >
              <img
                src={AppStore}
                alt="App Store"
                className="w-6 h-6 mr-2"
              />
              <span>Download on the App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center bg-white text-black  px-6 py-3 rounded-lg shadow-md hover:bg-gray-800"
            >
              <img
                src={PlayStore}
                alt="Google Play"
                className="w-6 h-6 mr-2"
              />
              <span>Get it on Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadBanner;
