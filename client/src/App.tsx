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
import PropertyDashboard from './pages/Housing/PostProperty';
import PostProperty from './pages/Housing/PostProperty';

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
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
        <Route path='/foodhome' element={<FoodHome/>} />
        <Route path='/housinghome' element={<HousingHome/>} />
        <Route path='/propertydashboard' element={<PostProperty/>} />
      </Routes>
      <Footer/>
    </GoogleOAuthProvider>
  );
};

export default App;
