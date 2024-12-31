import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import ProtectedRoute from './components/ProtectedRoute';
import FoodHome from './pages/FoodHome';
import HousingHome from './pages/Housing/HousingHome';
import Footer from './components/Footer';
import PostProperty from './pages/Housing/PostProperty';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import DiscountPage from './pages/DiscountPage/DiscountPage';
import SearchPage from './pages/DiscountSearch/SearchPage';

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  // Function to check if the user is authenticated
  const isAuthenticated = (): boolean => {
    const user = localStorage.getItem('user');
    return user !== null; // Returns true if user data is present in localStorage
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Navbar />
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Sign Page */}
        <Route path="/SignUp" element={<SignupPage />} />

        {/* Home Page (Protected) */}
        <Route
          path="/"
          element={
           
              <Home />
          }
        />

        {/* User Details Page (Protected) */}
        <Route
          path="/profile"
          element={
            isAuthenticated() ? (
              <UserDetails />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Food Home */}
        <Route path="/foodhome" element={<FoodHome />} />

        {/* Housing Home */}
        <Route path="/housinghome" element={<HousingHome />} />

       {/* Housing Home */}
        <Route path="/discount" element={<DiscountPage />} />

             {/* Housing Home */}
        <Route path="/discountsearch" element={<SearchPage />} />

        {/* Property Dashboard */}
        <Route
          path="/propertydashboard"
          element={
            isAuthenticated() ? (
              <PostProperty />
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
      <Footer />
    </GoogleOAuthProvider>
  );
};

export default App;
