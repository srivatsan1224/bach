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
  const handleSeeMore = () => {
    if (!showMore) {
      setVisibleCards([...visibleCards, ...moreCards]);
    } else {
      setVisibleCards(initialCards);
    }
    setShowMore(!showMore);
  };
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
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(`Detected location: ${latitude}, ${longitude}`);
          // You can use an API like OpenCageData or Google Maps to convert lat/lng to a city name
        },
        () => {
          setUserLocation("Location permission denied.");
        }
      );
    } else {
      setUserLocation("Geolocation is not supported by your browser.");
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
      {/* Navbar */}
      

      {/* Hero Section */}
      <section className="relative bg-orange-500 text-white px-6 py-12 text-center">
        {/* Background and Content */}
        <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">Tasty Food, Anytime, Anywhere.</h1>
        <h2 className="mt-2 text-lg">Tasty Solutions for the Busy Bachelor!</h2>
        <p className="mt-4 text-lg">
          We get that food can be a challenge for busy bachelors. That’s why our
          platform delivers fresh, tasty, and convenient meals designed just for
          you.
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
        
      </div>

        {/* Left Side Image */}
        <div
          className="absolute top-0 left-0 h-full w-1/4"
          style={{
            backgroundImage: "url('/src/assets/Foodimg/topleft.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "polygon(0 0, 100% 0, 70% 100%, 0% 100%)",
          }}
        ></div>

        {/* Right Side Image */}
        <div
          className="absolute top-0 right-0 h-full w-1/4"
          style={{
            backgroundImage: "url('/src/assets/Foodimg/FoodHomeright.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>
      </section>

      {/* Choose What You Love Section */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-center text-3xl font-bold mb-8">Choose What You Love!!!</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {[
            { title: "Home Foods", desc: "Tastes Just Like Home", extra: "FREE DELIVERY", image: "src/assets/Foodimg/card1.png" },
            { title: "Restaurants", desc: "Food at Your Fingertips", extra: "FREE DELIVERY", image: "src/assets/Foodimg/card2.png" },
            { title: "Dine - In", desc: "Savor Every Bite Here", extra: "FREE DELIVERY", image: "src/assets/Foodimg/card3.png" },
            { title: "Party Orders", desc: "Celebrate With Great Food", extra: "FREE DELIVERY", image: "src/assets/Foodimg/card4.png" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 text-left rounded-lg bg-orange-500 text-white shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              <div
                className="h-40 w-full bg-cover bg-center rounded-t-md"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="mt-4">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm">{item.desc}</p>
                <p className="mt-1 text-sm font-medium">{item.extra}</p>
              </div>
              <span className="absolute bottom-4 right-4 text-xl">&rarr;</span>
            </div>
          ))}
        </div>
      </section>
      <section className="py-12 bg-gray-50">
  <h2 className="text-center text-3xl font-bold mb-8">Explore More Tasty Options</h2>
  <div className="flex flex-wrap justify-center gap-6 px-6">
    {[
      { title: "Healthy", image: "src/assets/Foodimg/healthy.png" },
      { title: "Home style", image: "src/assets/Foodimg/HomeStyle.png" },
      { title: "Biriyani", image: "src/assets/Foodimg/biriyani.png" },
      { title: "Pizza", image: "src/assets/Foodimg/pizza.png" },
      { title: "Chicken", image: "src/assets/Foodimg/chicken.png" },
      { title: "Burger", image: "src/assets/Foodimg/Burger.png" },
      { title: "Momo", image: "src/assets/Foodimg/momo.png" },
      { title: "Rolls", image: "src/assets/Foodimg/rolls.png" },
    ].map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center"
      >
        <div
          className="h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-cover bg-center rounded-full"
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        <p className="text-sm md:text-base lg:text-lg mt-2 text-center">{item.title}</p>
      </div>
    ))}
  </div>
</section>
<section className="py-12 bg-gray-50">
  <h2 className="text-center text-3xl font-bold mb-8">Super Delicious</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
    {[
      { title: "Spinach and Cheese Pasta", image: "src/assets/Foodimg/spinachnoodles.png", rating: "★★★★★" },
      { title: "Fancy Glazed Donuts", image: "src/assets/Foodimg/fancydonut.png", rating: "★★★★★" },
      { title: "Mighty Cheesy Breakfast Burger", image: "src/assets/Foodimg/breakfastburge.png", rating: "★★★★★" },
    ].map((item, index) => (
      <div
        key={index}
        className="rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105"
      >
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        <div className="p-4">
          <p className="text-sm text-orange-500">{item.rating}</p>
          <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
        </div>
      </div>
    ))}
  </div>
</section>
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

    {/* Footer */}
      <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold">BACHELORS</h1>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            High level experience in web design and development knowledge,
            producing quality work.
          </p>
          <p className="mt-4 text-sm text-gray-500">© 2025 All Rights Reserved</p>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow us</h3>
          <div className="flex items-center space-x-4 mb-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-telegram-plane"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-globe"></i>
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Call us <br />
            <a href="tel:+18008543680" className="hover:underline">
              +1 800 854-36-80
            </a>
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Landing Page
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Popup Builder
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Web-design
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Content
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Integrations
              </a>
            </li>
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Web-designers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Marketers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Small Business
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Website Builder
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Teams
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-400 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Links */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-sm text-gray-500 text-center">
        <a href="#" className="mx-2 hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="mx-2 hover:underline">
          Terms of Use
        </a>
        <a href="#" className="mx-2 hover:underline">
          Sales and Refunds
        </a>
        <a href="#" className="mx-2 hover:underline">
          Legal
        </a>
        <a href="#" className="mx-2 hover:underline">
          Site Map
        </a>
      </div>
    </footer>
    </div>
  );
};

export default FoodHome;
