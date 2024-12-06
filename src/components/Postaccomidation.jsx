import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select"; // Import react-select
import apiClient, { apiEndpoints } from "./Apis"; // Adjust imports
import { useNavigate } from "react-router-dom"; // Import useNavigate

const universitiesData = [
  { state: "Alabama", university: "University of Alabama" },
  { state: "Alabama", university: "Auburn University" },
];

const universityOptions = universitiesData.map((uni) => ({
  value: uni.university,
  label: uni.university,
}));

const AccommodationManagement = () => {
  const [accommodationData, setAccommodationData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState({
    placeLink: "",
    space: "",
    rent: "",
    placeName: "",
    university: "",
    contact: "",
    distance: "",
    status: "inactive", // Default status to 'inactive'
    Useremail: localStorage.getItem('userEmail') || '', // Get the user email from localStorage
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleUniversityChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, university: selectedOption.value }));
  };

  useEffect(() => {
    fetchAccommodationData();
  }, [currentPage, search]);

  const fetchAccommodationData = async () => {
    try {
      const params = { page: currentPage, search }; // Send search query and page
      const response = await apiClient.get(apiEndpoints.accommodationlist, {
        params,
      });
      setAccommodationData(response.data.accommodations); // Assuming response contains the accommodation list
      setTotalPages(response.data.totalPages); // Assuming pagination info in response
    } catch (error) {
      console.error("Error fetching accommodation data:", error);
    }
  };

  const handleAddAccommodation = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        apiEndpoints.accommodationadd,
        formData
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Accommodation data added successfully!",
        }).then(() => {
          navigate("/myposts"); // Redirect to /myposts after success
        });
        fetchAccommodationData(); // Refresh data
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add accommodation data!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add accommodation data!",
      });
      console.error("Error adding accommodation data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Accommodation Management
        </h2>

        {/* Directly Display the Add Accommodation Form */}
        <h2 className="text-xl font-semibold mb-4 text-center">Add Accommodation</h2>
        <form onSubmit={handleAddAccommodation}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Place Link
            </label>
            <input
              type="text"
              value={formData.placeLink}
              onChange={(e) =>
                setFormData({ ...formData, placeLink: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Space
            </label>
            <input
              type="text"
              value={formData.space}
              onChange={(e) =>
                setFormData({ ...formData, space: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Rent
            </label>
            <input
              type="text"
              value={formData.rent}
              onChange={(e) =>
                setFormData({ ...formData, rent: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Place Name
            </label>
            <input
              type="text"
              value={formData.placeName}
              onChange={(e) =>
                setFormData({ ...formData, placeName: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Select Near By College
            </label>
            <Select
              options={universityOptions}
              onChange={handleUniversityChange}
              value={
                universityOptions.find(
                  (option) => option.value === formData.university
                ) || null
              }
              placeholder="Select a College"
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Distance to the College
            </label>
            <input
              type="text"
              value={formData.distance}
              onChange={(e) =>
                setFormData({ ...formData, distance: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Contact Details
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <br />
          <div className="flex w-full items-center space-x-3">
            <select
              id="status"
              name="status"
              hidden
              className="bg-white border px-4 py-3 w-full mb-2 border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  hover:border-gray-400 transition-all duration-200 shadow-sm"
              value={formData.status} // Use formData.status here
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value,
                })) // Update status in formData
              }
            >
              <option value="inactive">Inactive</option>
              {/* Other statuses could be added here */}
            </select>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Add Accommodation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccommodationManagement;
