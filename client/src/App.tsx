import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FormProvider } from "./pages/Housing/PropertyForm/FormContext"; // Ensure correct import path for FormProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import HousingHome from "./pages/Housing/HousingHome";
import PostProperty from "./pages/Housing/PostProperty";
import Main from "./pages/Housing/PropertyForm/Main";
import PropertyDetailsForm from "./pages/Housing/PropertyForm/PropertyDetails";
import LocalityDetailsForm from "./pages/Housing/PropertyForm/LocalityDetails";
import Gallery from "./pages/Housing/PropertyForm/Gallery";
import AmenitiesForm from "./pages/Housing/PropertyForm/Amenities";
import RentalDetailsForm from "./pages/Housing/PropertyForm/RentalDetails";
import PropertyList from "./pages/Housing/PropertyList";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import DiscountPage from "./pages/DiscountPage/DiscountPage";
import SearchPage from "./pages/DiscountSearch/SearchPage";
import FiltersPage from "./components/Foods/FiltersPage";
import RestaurantDetails from "./components/Foods/RestaurantDetails";
import VendorDashboard from "./components/Foods/VendorDashboard";
import RestaurantList from "./components/Foods/RestaurantList";
import FoodList from "./components/Foods/FoodList";
import RentalRoutes from "./routes/rentalRoutes";
import FoodHome from "./components/Foods/FoodHome";
import ParttimeRoutes from "./routes/parttimeRoutes";
const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  // Function to check if the user is authenticated
  const isAuthenticated = (): boolean => {
    const user = localStorage.getItem("user");
    return user !== null; // Returns true if user data is present in localStorage
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <FormProvider>
        <Navbar />
        <Routes>
          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Sign Up Page */}
          <Route path="/SignUp" element={<SignupPage />} />

          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Rental Routes */}
          <Route path="/home/rental/*" element={<RentalRoutes />} />
          {/* Part-Time Routes */}
          <Route path="/parttime/*" element={<ParttimeRoutes />} />
          {/* User Details Page (Protected) */}
          <Route
            path="/profile"
            element={isAuthenticated() ? <UserDetails /> : <LoginPage />}
          />

          {/* Food Home */}
          <Route path="/foodhome" element={<FoodHome />} />

          {/* Restaurant Pages */}
          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/restaurant/:id" element={<FoodList />} />
          <Route path="/foodvendor" element={<VendorDashboard />} />
          <Route path="/filters" element={<FiltersPage />} />
          <Route path="/restaurant1/:id" element={<RestaurantDetails />} />

          {/* Housing Home */}
          <Route path="/housinghome" element={<HousingHome />} />

          {/* Discount Page */}
          <Route path="/discount" element={<DiscountPage />} />

          {/* Discount Search Page */}
          <Route path="/discountsearch" element={<SearchPage />} />

          {/* Property Dashboard */}
          <Route
            path="/propertydashboard"
            element={isAuthenticated() ? <PostProperty /> : <LoginPage />}
          />

          {/* Property Forms */}
          <Route path="/propertyform" element={<Main />} />
          <Route path="/propertydetails" element={<PropertyDetailsForm />} />
          <Route path="/locality" element={<LocalityDetailsForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/amenities" element={<AmenitiesForm />} />
          <Route path="/rentaldetails" element={<RentalDetailsForm />} />
          <Route path="/propertylist" element={<PropertyList />} />
        </Routes>
        <Footer />
      </FormProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
