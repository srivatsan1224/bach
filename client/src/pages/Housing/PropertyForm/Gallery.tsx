import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!formData.gallery) {
      updateFormData("gallery", { photos: [], startTime: "", endTime: "", availableAllDay: false });
    }
  }, [formData.gallery, updateFormData]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const uploadedPhotos: string[] = [];
    const files = Array.from(e.target.files);

    setIsUploading(true);
    toast.info("Uploading photos...");

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("photos", file); // Ensure the key matches the backend field name

        const response = await fetch("http://localhost:3000/api/upload-photos", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to upload photo: ${errorMessage}`);
        }

        const data: { photoUrl: string } = await response.json();
        uploadedPhotos.push(data.photoUrl);
      } catch (error) {
        console.error("Photo upload failed:", error);
        toast.error("Failed to upload one or more photos.");
      }
    }

    updateFormData("gallery", {
      ...formData.gallery,
      photos: [...(formData.gallery?.photos || []), ...uploadedPhotos],
    });

    toast.success("Photos uploaded successfully!");
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    toast.info("Submitting your form, please wait...");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user || !user.email) {
        throw new Error("User information not found. Please log in again.");
      }

      const formDataWithEmail = {
        ...formData,
        email: user.email,
      };

      const response = await fetch("http://localhost:3000/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithEmail),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to submit form data: ${errorMessage}`);
      }

      toast.success("Form data submitted successfully!");
      navigate("/propertydashboard");
    } catch (error: any) {
      console.error("Error submitting form data:", error);
      toast.error(error.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/previous-page")}
          className="text-sm text-gray-600 font-semibold hover:text-gray-800"
        >
          Back
        </button>
        <div className="flex-grow h-2 bg-gray-200 mx-4 rounded">
          <div className="h-full bg-green-500 rounded" style={{ width: "90%" }}></div>
        </div>
        <span className="text-sm font-semibold">Completed</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <nav className="col-span-3">
          <ul className="space-y-4 text-sm font-medium">
            <li className="text-gray-600">Property Details</li>
            <li className="text-gray-600">Locality Details</li>
            <li className="text-gray-600">Rental Details</li>
            <li className="text-gray-600">Amenities</li>
            <li className="text-gray-900 font-bold">Gallery</li>
            <li className="text-gray-600">Schedule</li>
          </ul>
        </nav>

        <div className="col-span-9">
          <div className="p-6 bg-gray-50 rounded mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Gallery</h2>
            <p className="text-sm text-gray-600 mb-4">
              Add photos to get 5X more responses. 90% tenants contact on properties with photos.
            </p>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="mb-4"
              disabled={isUploading}
            />
            {isUploading && <p className="text-sm text-gray-500">Uploading...</p>}
            <div className="flex flex-wrap gap-4">
              {formData.gallery?.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Uploaded ${index + 1}`}
                  className="h-24 w-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className={`mt-6 w-full px-4 py-2 text-sm font-medium rounded shadow ${
              isSubmitting || isUploading
                ? "bg-gray-500 text-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
