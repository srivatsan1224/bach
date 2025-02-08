import React, { useState, useEffect } from "react";
import { Search, MapPin, ChevronRight, Star } from "lucide-react";
import DownloadSection from "../../components/HomePage/DownloadSection";

const FoodHome: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Popular areas in Chennai
  const initialCards = [
    { location: "T. Nagar", places: "387 places" },
    { location: "Nungambakkam", places: "338 places" },
    { location: "Velachery", places: "535 places" },
    { location: "Adyar", places: "233 places" },
  ];

  const moreCards = [
    { location: "Anna Nagar East", places: "392 places" },
    { location: "Thuraipakkam", places: "285 places" },
    { location: "Mylapore", places: "186 places" },
    { location: "Alwarpet", places: "153 places" },
  ];

  const [visibleCards, setVisibleCards] = useState(initialCards);

  const predefinedLocations = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli",
    "Salem", "Tirunelveli", "Vellore", "Thoothukudi",
    "Erode", "Tiruppur", "Dindigul", "Kanchipuram",
  ];

  // Handle Geolocation & Permissions
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation(`${latitude}, ${longitude}`);
            },
            (error) => {
              console.error("Geolocation error:", error);
              setUserLocation("Location not available");
            }
          );
        } else if (result.state === "prompt") {
          console.log("User needs to grant permission.");
        } else {
          console.log("User denied location access.");
          setUserLocation("Permission Denied");
        }
      });
    } else {
      console.warn("Geolocation is not supported by this browser.");
      setUserLocation("Not Supported");
    }
  }, []);

  const handleSeeMore = () => {
    setVisibleCards(showMore ? initialCards : [...visibleCards, ...moreCards]);
    setShowMore(!showMore);
  };

  const handleSearch = () => {
    if (location.trim() === "") {
      alert("Please enter or select a location.");
    } else {
      alert(`Searching for meals in ${location}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-white">
              Delicious Food,{" "}
              <span className="relative">
                Delivered
              </span>{" "}
              to Your Door
            </h1>
            
            <p className="text-xl mb-8 text-orange-100">
              Fresh, tasty meals crafted for busy professionals. Quick delivery, amazing taste.
            </p>

            <div className="relative max-w-2xl mx-auto">
              <div className="flex items-center bg-white rounded-lg shadow-lg">
                <MapPin className="text-gray-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Enter your delivery location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                  className="flex-1 px-4 py-3 text-gray-700 focus:outline-none rounded-l-lg"
                />
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-8 py-3 rounded-r-lg hover:bg-orange-600"
                >
                  <Search size={20} className="mr-2" />
                  Find Food
                </button>
              </div>

              {dropdownVisible && (
                <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg">
                  {predefinedLocations.map((loc) => (
                    <div
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setDropdownVisible(false);
                      }}
                      className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-gray-700 flex items-center"
                    >
                      <MapPin size={16} className="mr-2 text-orange-500" />
                      {loc}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Display User Location */}
            <div className="mt-4 text-white">
              {userLocation ? (
                <p>Your Location: {userLocation}</p>
              ) : (
                <p>Fetching your location...</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Localities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Areas in <span className="text-orange-500">Chennai</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCards.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">{item.location}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.places}</p>
                  </div>
                  <ChevronRight className="text-orange-500" size={20} />
                </div>
              </div>
            ))}
            <button
              onClick={handleSeeMore}
              className="bg-orange-500 text-white p-6 rounded-xl hover:bg-orange-600 transition-colors"
            >
              <span className="font-semibold">{showMore ? "Show Less" : "See More"}</span>
            </button>
          </div>
        </div>
      </section>

      <DownloadSection />
    </div>
  );
};

export default FoodHome;
