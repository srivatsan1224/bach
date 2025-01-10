import React, { useState, useEffect } from "react";
import Placeholder from "../../assets/HousingHome/H1.jpg";
import h1 from "../../assets/HousingHome/H1.jpg";
import h2 from "../../assets/HousingHome/H2.jpg";
import h3 from "../../assets/HousingHome/H3.jpg";

// Define the Property interface
interface Property {
  id: string;
  email: string;
  rentalDetails: {
    expectedRent: string;
    expectedDeposit: string;
    rentNegotiable: boolean;
    furnishing: string;
    preferredTenants: string[];
  };
  localityDetails: {
    city: string;
    locality: string;
  };
  gallery: {
    photos: string[];
  };
  propertyDetails: {
    apartmentType: string;
    bhkType: string;
  };
}

const PropertyListComp = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [searchText, setSearchText] = useState("");
  const [availability, setAvailability] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [preferredTenants, setPreferredTenants] = useState("");
  const [rentRange, setRentRange] = useState<number>(50000);

  // Alternate placeholders
  const placeholders = [h1, h2, h3];

  // Fetch properties from the API
  const fetchProperties = async (queryParams = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/properties/sushase74@gmail.com${queryParams}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch properties: ${response.statusText}`);
      }
      const data = await response.json();
      setProperties(data.properties || []);
      console.log(data.properties);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Apply filters and search
  const applyFilters = () => {
    const filters: Record<string, string> = {};
    if (searchText) filters.searchText = searchText;
    if (availability) filters.availability = availability;
    if (propertyType) filters.propertyType = propertyType;
    if (furnishing) filters.furnishing = furnishing;
    if (preferredTenants) filters.preferredTenants = preferredTenants;
    if (rentRange) filters.rentRange = rentRange.toString();

    const queryParams = new URLSearchParams(filters).toString();
    fetchProperties(`?${queryParams}`);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading properties...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">Error: {error}</div>
    );
  }

  return (
    <div className="bg-gray-100">
      {/* Search Bar & Filters */}
      <div className="bg-white shadow-md py-4 px-6 mb-6">
        <div className="container mx-auto flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Enter to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-300"
          />
          <button
            onClick={applyFilters}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Recent Searches</h2>

        {/* Grid of Properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <img
                src={property?.gallery?.photos?.[0] || placeholders[index % placeholders.length]}
                alt={property?.propertyDetails?.apartmentType || "Property"}
                className="w-full h-48 object-cover"
              />
              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {property?.propertyDetails?.apartmentType || "Apartment"}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {property?.localityDetails?.city}, {property?.localityDetails?.locality}
                </p>
                {/* Pricing */}
                <div className="flex items-center justify-between text-gray-700 mb-4">
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold">
                        ₹{property?.rentalDetails?.expectedRent || "10,000"}
                      </span>{" "}
                      <span className="text-xs">(Rent Non-Negotiable)</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">
                        ₹{property?.rentalDetails?.expectedDeposit || "50,000"}
                      </span>{" "}
                      <span className="text-xs">Deposit</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <button className="w-1/2 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">
                    Show More
                  </button>
                  <button className="w-1/2 bg-black text-white text-sm py-2 rounded-lg hover:bg-gray-800 transition">
                    Schedule Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListComp;
