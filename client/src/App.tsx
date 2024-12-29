import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FormProvider } from "./pages/Housing/PropertyForm/FormContext"; // Ensure correct import path for FormProvider
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import FoodHome from "./pages/FoodHome";
import HousingHome from "./pages/Housing/HousingHome";
import PropertyDashboard from "./pages/Housing/PostProperty";
import PostProperty from "./pages/Housing/PostProperty";
import Main from "./pages/Housing/PropertyForm/Main";
import PropertyDetailsForm from "./pages/Housing/PropertyForm/PropertyDetails";
import LocalityDetailsForm from "./pages/Housing/PropertyForm/LocalityDetails";
import Gallery from "./pages/Housing/PropertyForm/Gallery";
import AmenitiesForm from "./pages/Housing/PropertyForm/Amenities";
import RentalDetailsForm from "./pages/Housing/PropertyForm/RentalDetails";

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <FormProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/user-details"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/foodhome" element={<FoodHome />} />
          <Route path="/housinghome" element={<HousingHome />} />
          <Route path="/propertydashboard" element={<PostProperty />} />
          <Route path="/propertyform" element={<Main />} />
          <Route path="/propertydetails" element={<PropertyDetailsForm />} />
          <Route path="/locality" element={<LocalityDetailsForm />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/amenities" element={<AmenitiesForm />} />
          <Route path="/rentaldetails" element={<RentalDetailsForm />} />
        </Routes>
        <Footer />
      </FormProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
