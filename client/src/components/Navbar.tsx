import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Check if the user is authenticated by checking for user data in localStorage
  const isAuthenticated = !!localStorage.getItem("user");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <span
            className="text-xl font-bold cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img
              src={logo}
              alt="Bachelors Logo"
              className="h-20" // Replace with actual logo path
            />
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/all-services")}
            className="px-4 py-2 border border-black rounded-full text-black font-medium hover:bg-black hover:text-white transition"
          >
            All Service
          </button>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
