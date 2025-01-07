
const HomesNearYou = () => {
  const homes = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200", // Replace with actual image URLs
      title: "ABC Apartment in Chromepet",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "5 mins ago",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200", // Replace with actual image URLs
      title: "AJ Flats in Pallavaram",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "10 mins ago",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200", // Replace with actual image URLs
      title: "Ruby Builders West Tambaram",
      address: "Flat No. 402, Green Valley Apartments ....",
      rent: "₹ 10,000",
      deposit: "₹40,000",
      area: "1,100 sqft",
      details: "Semi Furnished | 2BHK | Bachelor | Ready to Move",
      updated: "15 mins ago",
    },
  ];

  return (
    <div className="bg-gray-50 py-10 px-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Homes Near You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {homes.map((home) => (
          <div
            key={home.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <img
              src={home.image}
              alt={home.title}
              className="w-full h-48 object-cover"
            />
            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {home.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{home.address}</p>
              {/* Pricing */}
              <div className="flex items-center justify-between text-gray-700 mb-4">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{home.rent}</span>{" "}
                    <span className="text-xs">(Rent Non-Negotiable)</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">{home.deposit}</span>{" "}
                    <span className="text-xs">Deposit</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">{home.area}</span>{" "}
                    <span className="text-xs">Builtup</span>
                  </p>
                </div>
              </div>
              {/* Details */}
              <p className="text-sm text-gray-600 mb-4">{home.details}</p>
              {/* Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button className="w-1/2 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">
                  Contact Owner
                </button>
                <button className="w-1/2 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">
                  Schedule Visit
                </button>
              </div>
            </div>
            {/* Footer */}
            <div className="bg-gray-100 text-xs text-gray-500 text-center py-2">
              Last updated {home.updated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomesNearYou;
