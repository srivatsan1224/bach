import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import RentalRoutes from "./routes/rentalRoutes";

const App: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Navbar />
      <Routes>
        {/* Rental Route */}
        <Route path="/home/rental/*" element={<RentalRoutes />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
