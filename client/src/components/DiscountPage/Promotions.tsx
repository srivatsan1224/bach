import React from "react";
import tree from "../../assets/DiscountPage/tree.png";
import gift from "../../assets/DiscountPage/gift.png";
import shoe from "../../assets/DiscountPage/shoe.png";
import app from "../../assets/DiscountPage/app.png";
import man from "../../assets/DiscountPage/man.png";

const Promotions: React.FC = () => {
  return (
    <div className="container mx-auto w-[90%] my-8 grid grid-cols-10 gap-4">
      {/* First Column (60% Width) */}
      <div className="col-span-8 grid grid-rows-2 gap-4">
        {/* First Row (Two Equal Grids) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Mega Christmas Off */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white p-6 rounded-lg relative h-64">
            <h3 className="text-2xl font-semibold">Mega Christmas Off</h3>
            <img
              src={tree}
              alt="Christmas Tree"
              className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%]"
            />
          </div>

          {/* Unbelievable Gift */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white p-6 rounded-lg relative h-64">
            <h3 className="text-2xl font-semibold">Unbelievable Gift</h3>
            <img
              src={gift}
              alt="Gifts"
              className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%]"
            />
          </div>
        </div>

        {/* Second Row (Two Grids) */}
        <div className="grid grid-cols-2     gap-4">
          {/* Men's Shoe */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white p-6 rounded-lg relative h-64">
            <h3 className="text-xl font-semibold">Men's Shoe 20% Off</h3>
            <img
              src={shoe}
              alt="Shoe"
              className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%]"
            />
          </div>

          {/* Top Selling Electronics */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-950 text-white p-6 rounded-lg relative h-64">
            <h3 className="text-xl font-semibold">Top Selling Electronics</h3>
            <img
              src={app}
              alt="Electronics"
              className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%]"
            />
          </div>
        </div>
      </div>

      {/* Second Column (30% Width) */}
      <div className="col-span-2 bg-gradient-to-r from-blue-700 to-blue-950 text-white p-6 rounded-lg relative h-128">
        <h3 className="text-2xl font-semibold">Fashion</h3>
        <img
          src={man}
          alt="Fashion Model"
          className="absolute bottom-0 right-0 max-w-[80%] max-h-[80%] object-cover"
        />
      </div>
    </div>
  );
};

export default Promotions;
