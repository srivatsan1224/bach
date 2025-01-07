import React from "react";
import banner1 from "../../assets/DiscountPage/banner1.png";

// Sample Images (Replace these with your actual image paths)
import groceryImg from "../../assets/DiscountPage/gro.png";
import mobileImg from "../../assets/DiscountPage/mob.png";
import fashionImg from "../../assets/DiscountPage/drs.png";
import watchImg from "../../assets/DiscountPage/watch.png";
import furnitureImg from "../../assets/DiscountPage/fur.png";
import cosmeticsImg from "../../assets/DiscountPage/cos.png";
import accessoriesImg from "../../assets/DiscountPage/acc.png";

const Banner: React.FC = () => {
  return (
    <div className="w-[90%] mx-auto my-8">
      {/* Banner Section */}
      <div className="flex">
        {/* Left Navigation */}
        <div className="w-1/5 bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-4">
            <li className="font-medium hover:text-black cursor-pointer">
              Woman's Fashion
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Men's Fashion
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Electronics
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Home & Lifestyle
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Medicine
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Sports & Outdoor
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Baby's & Toys
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Groceries & Pets
            </li>
            <li className="font-medium hover:text-black cursor-pointer">
              Health & Beauty
            </li>
          </ul>
        </div>

        {/* Right Content (Image with Text Overlay) */}
        <div className="w-4/5 relative">
          <img
            src={banner1}
            alt="Banner"
            className="w-full h-auto rounded-lg object-cover"
          />
          <div className="absolute bottom-4 left-4">
            <button className="bg-transparent text-white font-semibold py-2 px-4 rounded-lg shadow-md">
              Shop Now →
            </button>
          </div>
        </div>
      </div>

        {/* Categories Grid Section */}
<div className="flex justify-between items-center mt-12">
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={groceryImg}
        alt="Grocery"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Grocery</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={mobileImg}
        alt="Mobile"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Mobile</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={fashionImg}
        alt="Fashion"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Fashion</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={watchImg}
        alt="Watch"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Watch</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={furnitureImg}
        alt="Furniture"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Furniture</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={cosmeticsImg}
        alt="Cosmetics"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Cosmetics</p>
  </div>
  <div className="text-center">
    <div className="w-32 h-32 mx-auto flex items-center justify-center bg-gray-100 rounded-full">
      <img
        src={accessoriesImg}
        alt="Accessories"
        className="max-w-[80%] max-h-[80%] object-contain"
      />
    </div>
    <p className="mt-2 font-medium">Accessories</p>
  </div>
</div>

  
    </div>

  );
};

export default Banner;
