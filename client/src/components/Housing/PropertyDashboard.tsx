import React from "react";

const RentProperty = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">


      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-1 bg-gray-800 text-white rounded-lg p-6 relative">
          <div className="relative z-10">
            <h2 className="text-lg font-bold mb-4">Why to post ad ?</h2>
            <div className="mb-4 flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded-md">
                📁
              </div>
              <span className="text-sm">Zero Brokerage</span>
            </div>
            <div className="mb-6 flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded-md">
                🏠
              </div>
              <span className="text-sm">Fast Tenants</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Trusted by 1Lac+ bachelors</h3>
            <p className="text-sm leading-relaxed">
              bachelor.com is revolutionizing the rental scene for bachelors,
              making it easier than ever to find a place to call home. Gone are
              the days of struggling with judgmental landlords and endless
              searches for a roommate-friendly space. Bachelor.com offers a
              wide range of options tailored to the needs of singles and young
              professionals.
            </p>
          </div>
          <img
            src="https://via.placeholder.com/400x300"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-lg"
          />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2">
          {/* Looking for a Property */}
          <div className="flex justify-end mb-4">
            <a
              href="#"
              className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Looking for a property? <span className="font-bold">Click Here</span>
            </a>
          </div>

          {/* Tabs */}
          <h2 className="text-xl font-bold mb-4">
            You have already posted 1 property
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              "All",
              "Rent",
              "Sale",
              "Commercial-Rent",
              "Commercial-Sale",
              "PG/Hostel",
              "Flatmates",
              "Land/Plot",
            ].map((tab) => (
              <button
                key={tab}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 text-sm"
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Property Card */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-md">
                Inactive
              </span>
              <span className="text-xs text-yellow-500 font-bold">For Rent</span>
            </div>
            <h3 className="text-lg font-bold mb-2">
              1 BHK House for Rent in Chennai
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              Independent House, 28/6, 16th cross road, Chennai
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Rent: ₹22 · <span className="font-medium">Chennai</span>
            </p>
            <div className="flex items-center space-x-4 mb-4">
              <button className="bg-gray-100 px-4 py-2 rounded-md text-sm">
                Edit
              </button>
              <button className="bg-gray-100 px-4 py-2 rounded-md text-sm">
                Upload Media
              </button>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 rounded-md">
              Go Premium
            </button>
          </div>

          {/* Divider */}
          <div className="relative text-center mb-8">
            <hr className="border-gray-300" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
              OR
            </span>
          </div>

          {/* New Property Section */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-4">New Property?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Post your property for free
            </p>
            <button className="bg-red-500 text-white px-6 py-3 rounded-md">
              Post Now
            </button>
          </div>

          {/* Illustration */}
          <div className="flex justify-center mt-6">
            <img
              src="https://via.placeholder.com/200x150"
              alt="Illustration"
              className="w-40"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentProperty;
