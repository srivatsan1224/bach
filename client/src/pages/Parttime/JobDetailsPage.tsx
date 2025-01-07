import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await apiService.get(`/jobs/${id}`);
        setJob(response.data.data); // Assuming the response format
      } catch (error) {
        console.error("Failed to fetch job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Location: {job.location}</p>
      <p>
        Salary: {job.salaryRange.min} - {job.salaryRange.max}{" "}
        {job.salaryRange.unit}
      </p>
      <p>Company: {job.companyName}</p>
    </div>
  );
};

export default JobDetailsPage;
