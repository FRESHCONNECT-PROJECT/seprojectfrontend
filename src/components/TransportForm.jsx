import React, { useState } from "react";

const TransportForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    transportType: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass formData to the parent component
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-4">Transport Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleChange}
            placeholder="Enter starting location"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={formData.to}
            onChange={handleChange}
            placeholder="Enter destination"
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-yellow-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="transportType" className="block text-sm font-medium text-gray-700">
            Transport Type
          </label>
          <select
            id="transportType"
            name="transportType"
            value={formData.transportType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-yellow-400"
            required
          >
            <option value="">Select a transport type</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
            <option value="cab">Cab</option>
            <option value="flight">Flight</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700"
          >
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any specific requirements or notes..."
            className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-yellow-400"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransportForm;
