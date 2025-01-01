import React from "react";
import { FaShippingFast, FaHeadset, FaShieldAlt } from "react-icons/fa";
import ad from "../../assets/DiscountPage/ads.png"

const AdSection: React.FC = () => {
  return (
    <div className="container mx-auto w-[90%] my-8">
      {/* Ad Section */}
      <div className="w-full h-auto rounded-lg overflow-hidden">
        <img
          src={ad}// Replace with your actual ad image URL
          alt="Ad"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-3 gap-8 mt-12">
        {/* Free and Fast Delivery */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-300 rounded-full">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FaShippingFast className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">FREE AND FAST DELIVERY</h3>
          <p className="text-sm text-gray-500">
            Free delivery for all orders over ₹10k
          </p>
        </div>

        {/* 24/7 Customer Service */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-300 rounded-full">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FaHeadset className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">24/7 CUSTOMER SERVICE</h3>
          <p className="text-sm text-gray-500">
            Friendly 24/7 customer support
          </p>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gray-300 rounded-full">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-white text-2xl" />
            </div>
          </div>
          <h3 className="text-lg font-semibold mt-4">MONEY BACK GUARANTEE</h3>
          <p className="text-sm text-gray-500">
            We return money within 30 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdSection;
