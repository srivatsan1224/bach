import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "./FormContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const [localState, setLocalState] = useState(formData.gallery || {
    photos: [],
    startTime: "",
    endTime: "",
    availableAllDay: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateFormData("gallery", localState);
  }, [localState]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const uploadedPhotos: string[] = [];
    const files = Array.from(e.target.files);

    // Display a toast while uploading
    toast.info("Uploading photos...");

    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:3000/api/upload-photos", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload photo: ${response.statusText}`);
        }

        const data = await response.json();
        uploadedPhotos.push(data.filePath); // Assuming `filePath` is the URL of the uploaded photo
      } catch (error) {
        console.error("Photo upload failed:", error);
        toast.error("Failed to upload one or more photos.");
      }
    }

    // Update local state with the uploaded photos
    setLocalState((prevState) => ({
      ...prevState,
      photos: [...prevState.photos, ...uploadedPhotos],
    }));

    toast.success("Photos uploaded successfully!");
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    toast.info("Submitting your form, please wait...");

    try {
      // Retrieve user info from localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user || !user.email) {
        throw new Error("User information not found. Please log in again.");
      }

      // Attach the email to form data
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

      const result = await response.json();
      toast.success("Form data submitted successfully!");
      navigate("/propertydashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error submitting form data:", error.message);
        toast.error(error.message || "An unknown error occurred.");
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <div className="flex items-center mb-4">
        <button className="text-sm text-gray-600 font-semibold">Back</button>
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
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="mb-4"
            />
            <div className="flex flex-wrap gap-4">
              {localState.photos.map((photo, index) => (
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
            disabled={isSubmitting}
            className={`mt-6 w-full px-4 py-2 text-sm font-medium rounded shadow ${
              isSubmitting ? "bg-gray-500 text-gray-200" : "bg-black text-white hover:bg-gray-800"
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
