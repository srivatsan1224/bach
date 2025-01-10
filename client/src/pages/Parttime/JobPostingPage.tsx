import React, { useState } from "react";

const JobPostingPage: React.FC = () => {
  // Form state (replace with backend submission later)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsibilities: "",
    location: "",
    requiredEducation: "",
    requiredSkills: "",
    salaryMin: "",
    salaryMax: "",
    salaryUnit: "month", // Default salary unit
    jobType: "",
    workSchedule: "",
    companyName: "",
    email: "",
    phone: "",
    tags: "",
    perks: "",
  });

  // Handle form input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Placeholder form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Job posted successfully (mock). Replace with API call.");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Post a Job</h1>
      <form onSubmit={handleSubmit}>
        {/* Job Title */}
        <div className="mb-4">
          <label className="block font-medium">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <label className="block font-medium">
            Responsibilities <span className="text-red-500">*</span>
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block font-medium">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Salary */}
        <div className="mb-4 flex gap-4">
          <div>
            <label className="block font-medium">
              Salary Min <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium">
              Salary Max <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block font-medium">Unit</label>
            <select
              name="salaryUnit"
              value={formData.salaryUnit}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="month">Month</option>
              <option value="day">Day</option>
              <option value="hour">Hour</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            Post Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingPage;
