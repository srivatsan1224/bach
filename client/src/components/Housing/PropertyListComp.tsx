import React, { useState, useEffect } from "react";

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
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 mt-4">
          <div className="flex flex-wrap gap-4">
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="">Select Availability</option>
              <option value="available">Available</option>
              <option value="not-available">Not Available</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              value={preferredTenants}
              onChange={(e) => setPreferredTenants(e.target.value)}
            >
              <option value="">Preferred Tenants</option>
              <option value="bachelors">Bachelors</option>
              <option value="family">Family</option>
            </select>
            <select
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
            >
              <option value="">Furnishing</option>
              <option value="semi">Semi-Furnished</option>
              <option value="fully">Fully-Furnished</option>
            </select>
          </div>
          <div>
            <label htmlFor="rentRange" className="text-gray-500">
              Rent Range: ₹{rentRange}
            </label>
            <input
              id="rentRange"
              type="range"
              min="0"
              max="50000"
              value={rentRange}
              onChange={(e) => setRentRange(Number(e.target.value))}
              className="ml-2"
              step="500"
            />
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="container mx-auto py-6">
        <h2 className="text-2xl font-bold mb-6">Recent Searches</h2>

        {/* Grid of Properties */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={property?.gallery?.photos?.[0] || "/placeholder.jpg"}
                alt={property?.propertyDetails?.apartmentType || "Property"}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">
                  {property?.propertyDetails?.apartmentType || "Apartment"}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {property?.localityDetails?.city},{" "}
                  {property?.localityDetails?.locality}
                </p>
                <p className="text-sm text-gray-500">
                  Rent: ₹{property?.rentalDetails?.expectedRent || "10,000"} |{" "}
                  Deposit: ₹
                  {property?.rentalDetails?.expectedDeposit || "50,000"}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <button className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
                    Contact Owner
                  </button>
                  <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600">
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
