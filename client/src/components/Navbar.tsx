import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User icon
import logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  // Check if the user is authenticated by checking for user data in localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAuthenticated = !!user?.name;

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Check if the current route is `/propertylist` or `/housinghome`
  const showPostFreePropertyButton =
    location.pathname === "/propertylist" || location.pathname === "/housinghome";

  return (
    <nav className="bg-white shadow-md flex justify-center relative z-50">
      <div className="w-[90vw] pr-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Bachelors Logo"
            className="h-20 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6 relative">
          {showPostFreePropertyButton && (
            <Link
              to="/propertydashboard"
              className="px-4 py-2 border border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition"
            >
              Post Free Property
            </Link>
          )}
          <button
            onClick={() => navigate("/all-services")}
            className="px-4 py-2 border border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition"
          >
            All Services
          </button>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              {/* Profile Picture or User Icon */}
              <div
                className="cursor-pointer"
                onClick={toggleDropdown} // Toggle dropdown on click
              >
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt="User Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-md"
                  />
                ) : (
                  <FaUserCircle className="w-10 h-10 text-gray-600" />
                )}
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-40 z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
