import React, { useState, useEffect } from "react";

const FoodHome: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const initialCards = [
    { location: "T. Nagar", places: "387 places" },
    { location: "Nungambakkam", places: "338 places" },
    { location: "Velachery", places: "535 places" },
    { location: "Adyar", places: "233 places" },
    { location: "Anna Nagar East", places: "392 places" },
    { location: "Thuraipakkam", places: "285 places" },
    { location: "Mylapore", places: "186 places" },
    { location: "Alwarpet", places: "153 places" },
  ];

  const moreCards = [
    { location: "Tambaram", places: "289 places" },
    { location: "Perambur", places: "210 places" },
    { location: "Kodambakkam", places: "332 places" },
    { location: "Guindy", places: "254 places" },
    { location: "Egmore", places: "196 places" },
    { location: "Saidapet", places: "142 places" },
    { location: "Vadapalani", places: "310 places" },
    { location: "Porur", places: "278 places" },
  ];

  const [visibleCards, setVisibleCards] = useState(initialCards);

  const predefinedLocations = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Vellore",
    "Thoothukudi",
    "Erode",
    "Tiruppur",
    "Dindigul",
    "Kanchipuram",
    "Thanjavur",
    "Cuddalore",
    "Nagercoil",
  ];

  const handleSeeMore = () => {
    if (!showMore) {
      setVisibleCards([...visibleCards, ...moreCards]);
    } else {
      setVisibleCards(initialCards);
    }
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((response) => response.json())
            .then((data) => {
              const city =
                data?.address?.city ||
                data?.address?.town ||
                data?.address?.village ||
                "Unknown City";
              setUserLocation(city);
              setLocation(city); // Pre-fill the location field with the detected city
            })
            .catch(() => {
              setUserLocation("Unable to detect location");
            });
        },
        () => {
          setUserLocation("Location access denied");
        }
      );
    } else {
      setUserLocation("Geolocation is not supported by your browser");
    }
  }, []);

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
      <section className="relative bg-orange-500 text-white px-6 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Tasty Food, Anytime, Anywhere.</h1>
          <h2 className="mt-2 text-lg">Tasty Solutions for the Busy Bachelor!</h2>
          <p className="mt-4 text-lg">
            We get that food can be a challenge for busy bachelors. That’s why
            our platform delivers fresh, tasty, and convenient meals designed
            just for you.
          </p>
          <div className="flex items-center justify-center mt-6 relative">
            {/* Input Field */}
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onFocus={() => setDropdownVisible(true)}
                className="px-4 py-2 border rounded-l-md w-full text-black"
              />
              {/* Dropdown */}
              {dropdownVisible && (
                <ul
                  className="absolute bg-white text-black border rounded-md mt-1 w-full z-10"
                  onMouseLeave={() => setDropdownVisible(false)}
                >
                  {predefinedLocations.map((loc) => (
                    <li
                      key={loc}
                      onClick={() => {
                        setLocation(loc);
                        setDropdownVisible(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                        location === loc ? "bg-gray-300 text-black font-bold" : ""
                      }`}
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 transition-all"
            >
              Search
            </button>
          </div>
          {/* User Location */}
          {userLocation && (
            <p className="mt-4 text-sm text-gray-200">
              Detected Location: <span className="font-semibold">{userLocation}</span>
            </p>
          )}
        </div>
      </section>

      {/* Localities Section */}
      <section className="py-12 bg-white">
        <h2 className="text-center text-3xl font-bold mb-8">
          Popular localities in and around{" "}
          <span className="text-orange-500">Chennai</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
          {visibleCards.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg bg-gray-50 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold">{item.location}</h3>
              <p className="text-sm text-gray-600">{item.places}</p>
              <span className="mt-2 text-orange-500 text-right cursor-pointer">→</span>
            </div>
          ))}
          <div
            className="p-4 border rounded-lg bg-orange-500 text-white hover:shadow-lg transition-shadow flex items-center justify-center cursor-pointer"
            onClick={handleSeeMore}
          >
            <h3 className="text-lg font-semibold">
              {showMore ? "Show Less" : "See More"}
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodHome;
