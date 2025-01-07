import React from "react";

// Job model interface
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

interface JobCardProps {
  job: Job;
}

const ParttimeJobCard: React.FC<JobCardProps> = ({ job }) => {
  // Helper function to format date difference
  const getTimeAgo = (date: string) => {
    const postedDate = new Date(date);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - postedDate.getTime()) / 60000
    );

    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  return (
    <div className="flex items-start bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Company Logo */}
      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
        <img
          src={`https://via.placeholder.com/64?text=${job.companyName.charAt(
            0
          )}`} // Placeholder logo
          alt={job.companyName}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Job Info */}
      <div className="flex-1">
        {/* Company Name */}
        <p className="text-gray-600 text-sm font-medium">{job.companyName}</p>

        {/* Job Title */}
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          {job.title}
          {job.tags?.includes("New post") && (
            <span className="ml-2 text-sm text-purple-500 bg-purple-100 px-2 py-1 rounded">
              New post
            </span>
          )}
        </h3>

        {/* Meta Info (Location, Job Type, Salary, Posted Time) */}
        <div className="text-gray-500 text-sm mt-1 flex flex-wrap items-center gap-2">
          <span>📍 {job.location}</span>
          <span>• {job.jobType}</span>
          <span>
            • ₹{job.salaryRange.min}–{job.salaryRange.max} /{" "}
            {job.salaryRange.unit}
          </span>
          <span>• {getTimeAgo(job.postedDate)}</span>
        </div>

        {/* Job Description Snippet */}
        <p className="text-gray-700 text-sm mt-2">
          {job.description.length > 100
            ? `${job.description.substring(0, 100)}...`
            : job.description}
        </p>
      </div>
    </div>
  );
};

export default ParttimeJobCard;
