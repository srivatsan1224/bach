"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export default function UserForm() {
  const { data: session } = useSession();
  const [details, setDetails] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      alert("You must be logged in to submit the form.");
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          details: details,
        }),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setDetails("");
      } else {
        throw new Error("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
    >
      <h2 className="text-lg font-semibold text-gray-700">Submit Details</h2>
      <input
        type="text"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Enter some details"
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
