import React, { useState } from "react";

interface ParttimeFilterProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const ParttimeFilter: React.FC<ParttimeFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    location: "",
    salaryRange: "",
    datePosted: "",
    jobType: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      {/* Location Filter */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-700 mb-2">Location</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleFilterChange("location", e.target.value)}
        >
          <option value="">Any Location</option>
          <option value="near_me">Near Me</option>
          <option value="remote">Remote</option>
          <option value="exact">Exact Location</option>
        </select>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-700 mb-2">Salary Range</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleFilterChange("salaryRange", e.target.value)}
        >
          <option value="">Any</option>
          <option value="<30000">Below ₹30,000</option>
          <option value="30000-100000">₹30,000 - ₹1,00,000</option>
          <option value=">100000">Above ₹1,00,000</option>
        </select>
      </div>

      {/* Date Posted Filter */}
      <div className="mb-4">
        <h3 className="font-bold text-gray-700 mb-2">Date of Posting</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleFilterChange("datePosted", e.target.value)}
        >
          <option value="">All Time</option>
          <option value="24h">Last 24 Hours</option>
          <option value="3d">Last 3 Days</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* Job Type Filter */}
      <div>
        <h3 className="font-bold text-gray-700 mb-2">Type of Employment</h3>
        <select
          className="w-full p-2 border border-gray-300 rounded-md"
          onChange={(e) => handleFilterChange("jobType", e.target.value)}
        >
          <option value="">Any</option>
          <option value="part_time">Part-Time</option>
          <option value="full_time">Full-Time</option>
        </select>
      </div>
    </div>
  );
};

export default ParttimeFilter;
