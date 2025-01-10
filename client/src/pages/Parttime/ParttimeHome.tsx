import React, { useEffect, useState } from "react";
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchParams, setSearchParams] = useState({
    keywords: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (params = {}) => {
    setLoading(true);
    try {
      const response = await parttimeApiService.get("/jobs", { params });
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (keywords: string, location: string) => {
    setSearchParams({ keywords, location });
    fetchJobs({ ...filters, keywords, location });
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    fetchJobs({ ...newFilters, ...searchParams });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Part Time Jobs
          </h1>
          <p className="text-gray-600 mt-2">
            Thousands of jobs are waiting for you
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-6">
          <ParttimeSearch onSearch={handleSearch} />
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Filters */}
          <aside className="hidden md:block">
            <ParttimeFilter onFilterChange={handleFilterChange} />
          </aside>

          {/* Job Listings */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="mb-4 flex justify-between items-center">
              <span className="text-gray-600">{jobs.length} jobs found</span>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Most Recent</option>
                <option>Most Relevant</option>
              </select>
            </div>

            {/* Job Cards */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-32 bg-gray-100 animate-pulse rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <ParttimeJobCard key={job.id} job={job} />
                ))}
                {jobs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">
                      No jobs found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParttimeHome;
