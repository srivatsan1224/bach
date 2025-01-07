import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1496252223350-db9ad24b108c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1551717256-ad2ac9ab0261?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1657302156653-a08a4681f449?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const cities = ["Chennai", "Bangalore", "Mumbai", "Hyderabad", "Delhi", "Pune"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [rentType, setRentType] = useState("PG/Hostel");
  const [bhkType, setBhkType] = useState("1 BHK");
  const [location, setLocation] = useState("Chennai");
  const [citySearch, setCitySearch] = useState("");
  const [filteredCities, setFilteredCities] = useState(cities);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Update filtered cities on city search input change
  useEffect(() => {
    setFilteredCities(
      cities.filter((city) =>
        city.toLowerCase().includes(citySearch.toLowerCase())
      )
    );
  }, [citySearch]);

  return (
    <div className="flex justify-center items-center p-5 w-full">
      <div
        className="relative w-full p-8 rounded-md shadow-lg bg-cover bg-center pt-56 pb-56 transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        <div className="relative z-10 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Safer Homes, Better Community
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            The Bachelor's Housing Solution You Can Rely On!
          </p>

          <div className="mt-6 bg-white rounded-full shadow-lg px-4 py-2 flex items-center justify-between max-w-5xl mx-auto space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow text-gray-700 placeholder-gray-500 px-4 py-3 bg-transparent focus:outline-none rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={rentType}
              onChange={(e) => setRentType(e.target.value)}
              className="px-4 py-3 bg-gray-100 rounded-full text-gray-700 focus:outline-none"
            >
              <option>PG/Hostel</option>
              <option>Flat</option>
            </select>

            <select
              value={bhkType}
              onChange={(e) => setBhkType(e.target.value)}
              className="px-4 py-3 bg-gray-100 rounded-full text-gray-700 focus:outline-none"
            >
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="City"
                className="px-4 py-3 bg-gray-100 rounded-full text-gray-700 focus:outline-none"
                value={location}
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                onChange={(e) => setCitySearch(e.target.value)}
              />
              {showCityDropdown && (
                <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search city"
                    className="w-full px-4 py-2 text-sm text-gray-700 border-b border-gray-200 focus:outline-none"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                  />
                  {filteredCities.map((city, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setLocation(city);
                        setShowCityDropdown(false);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
              <Link to='/propertylist'>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
              Search
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
