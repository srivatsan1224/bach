import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  Building,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
} from "lucide-react";
import parttimeApiService from "../../services/parttimeApiService";

interface Job {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  location: string;
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  jobType: string;
  workSchedule: string;
  companyName: string;
  contactDetails: {
    email: string;
    phone?: string;
  };
  requiredEducation?: string;
  applicationDeadline?: string;
  postedDate: string;
  tags?: string[];
}

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await parttimeApiService.get(`/jobs/${id}`);
        setJob(response.data.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Job not found</h2>
        <p className="text-gray-600 mt-2">
          The job you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Back button */}
      <div className="max-w-5xl mx-auto px-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Jobs
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-semibold text-gray-500">
                    {job.companyName.charAt(0)}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {job.companyName}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>{job.jobType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{job.workSchedule}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Apply Now
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Job Description */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Job Overview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Calendar size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Posted Date
                      </p>
                      <p className="text-sm">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {job.applicationDeadline && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Application Deadline
                        </p>
                        <p className="text-sm">
                          {new Date(
                            job.applicationDeadline
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600">
                    <Building size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Education
                      </p>
                      <p className="text-sm">
                        {job.requiredEducation || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Company Details
                </h3>
                <div className="space-y-4">
                  {job.contactDetails.phone && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Phone
                        </p>
                        <p className="text-sm">{job.contactDetails.phone}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm">{job.contactDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <Globe size={18} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Website
                      </p>
                      <a
                        href={`https://${job.companyName.toLowerCase()}.com`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {`${job.companyName.toLowerCase()}.com`}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
