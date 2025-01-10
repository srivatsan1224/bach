import { Routes, Route } from "react-router-dom";
import ParttimeHome from "../pages/Parttime/ParttimeHome";
import JobDetailsPage from "../pages/Parttime/JobDetailsPage";
import JobPostingPage from "../pages/Parttime/JobPostingPage";

const ParttimeRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<ParttimeHome />} />
      <Route path="/:id" element={<JobDetailsPage />} />
      <Route path="/new" element={<JobPostingPage />} />
    </Routes>
  );
};

export default ParttimeRoutes;
