import React, { useEffect, useState } from "react";
import axios from "axios";
import ParttimeJobCard from "../../components/Parttime/ParttimeJobCard";
import ParttimeSearch from "../../components/Parttime/ParttimeSearch";
import ParttimeFilter from "../../components/Parttime/ParttimeFilter";
import parttimeApiService from "../../services/parttimeApiService";
interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  jobType: string;
  companyName: string;
  postedDate: string;
  tags?: string[];
}

const ParttimeHome: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Initialize with empty array
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchParams, setSearchParams] = useState({
    keywords: "",
    location: "",
  });

  // Fetch jobs from API
  const fetchJobs = async (params = {}) => {
    try {
      const response = await parttimeApiService.get("/jobs", { params }); // Use the part-time API service
      setJobs(response.data.data); // Assuming `response.data.data` contains jobs
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]); // Fallback to empty array on error
    }
  };

  // Fetch jobs on initial load
  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle search
  const handleSearch = (keywords: string, location: string) => {
    setSearchParams({ keywords, location });
    fetchJobs({ ...filters, keywords, location });
  };

  // Handle filters
  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    fetchJobs({ ...newFilters, ...searchParams });
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Find Part-Time Jobs</h1>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-8">
        <ParttimeSearch onSearch={handleSearch} />
        <ParttimeFilter onFilterChange={handleFilterChange} />
      </div>

      {/* Job Listings */}
      <div className="grid gap-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <ParttimeJobCard key={job.id} job={job} />)
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default ParttimeHome;
