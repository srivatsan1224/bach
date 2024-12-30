import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';
import FoodHome from "./components/Foods/FoodHome"
import FiltersPage from "./components/Foods/FiltersPage"
import RestaurantDetails from "./components/Foods/RestaurantDetails"
import VendorDashboard from "./components/Foods/VendorDashboard"
import RestaurantList from './components/Foods/RestaurantList';
import FoodList from './components/Foods/FoodList';
const App: React.FC = () => {

  

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<FoodList />} />
        <Route path="/foodvendor" element={<VendorDashboard/>} />
        <Route path="/foodhome" element={<FoodHome />} />
        <Route path="/filters" element={<FiltersPage />} />
        <Route path="/restaurant1/:id" element={<RestaurantDetails />} />
        <Route
          path="/user-details"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
