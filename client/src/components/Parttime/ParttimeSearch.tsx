import React, { useState } from "react";

interface ParttimeSearchProps {
  onSearch: (keywords: string, location: string) => void;
}

const ParttimeSearch: React.FC<ParttimeSearchProps> = ({ onSearch }) => {
  const [keywords, setKeywords] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSearch = () => {
    onSearch(keywords, location);
  };

  return (
    <div className="flex gap-4 items-center bg-white shadow-md p-4 rounded-lg">
      {/* Job Keywords */}
      <input
        type="text"
        placeholder="What type of part-time job?"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Search Job
      </button>
    </div>
  );
};

export default ParttimeSearch;
