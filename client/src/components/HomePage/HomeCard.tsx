import React from "react";
import { homes } from "../../assets/HomePage/homes";
const HomeCard: React.FC = () => {


  return (
    <div className="p-6 bg-gray-50">
    <div className="w-4/5 flex justify-start">
      <h2 className="text-2xl font-semibold ml-64 mb-6 text-right">Homes Near you</h2>
    </div>
    <div className="grid grid-cols-1 w-[70vw] md:grid-cols-3 gap-6 justify-items-center mx-auto">
      {homes.map((home) => (
        <div
          key={home.id}
          className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200"
        >
          <img
            src={home.image}
            alt={home.title}
            className="w-full h-50 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {home.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{home.description}</p>
            <div className="flex justify-between text-sm text-gray-700 mb-3">
              <div>
                <p>Deposit: {home.rent}</p>
                <p>Rent: {home.deposit}</p>
              </div>
              <p>Buildup: {home.builtup}</p>
            </div>
            <p className="text-sm text-gray-500 mb-3">{home.features}</p>
            <div className="flex justify-between">
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Contact Owner
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-md">
                Schedule Visit
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">{home.updated}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  

  );
};

export default HomeCard;
