import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the icon for the back button

// Sample accommodation data with images
const initialAccommodationList = [
  { id: 1, name: "Hotel Paradise", details: "Luxury hotel with great views.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgDtXr2s8qbyNiek9Lbr7sublrOjqpxFwpBA&s" },
  { id: 2, name: "City Inn", details: "Affordable rooms in the city center.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQljrJKRySDDaS-U79Vuvt4q3sdEXw2bqr6yw&s" },
  { id: 3, name: "Beach Resort", details: "Beachfront property with all amenities.", image: "https://www.amazingbeachhotels.com/wp-content/uploads/2023/07/voyage-sorgun-hotel-beach1-1.jpg" },
];

const Accommodation = () => {
  const [accommodationList, setAccommodationList] = useState(initialAccommodationList);
  const [newAccommodation, setNewAccommodation] = useState({ name: "", details: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Function to add accommodation
  const handleAddAccommodation = () => {
    if (newAccommodation.name.trim() && newAccommodation.details.trim()) {
      const newAccommodationItem = {
        id: accommodationList.length + 1,
        name: newAccommodation.name,
        details: newAccommodation.details,
        image: "https://via.placeholder.com/300x200?text=New+Accommodation", // Example image URL
      };

      setAccommodationList([...accommodationList, newAccommodationItem]);

      // Reset input fields after adding
      setNewAccommodation({ name: "", details: "" });
    } else {
      alert("Please fill in both fields!");
    }
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Filter accommodation list based on the search term
  const filteredAccommodationList = accommodationList.filter((accommodation) =>
    accommodation.name.toLowerCase().includes(searchTerm) ||
    accommodation.details.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-4">
      {/* Go Back to Home Navigation */}
      <button
        onClick={() => window.location.href = "/"} // Replace with your home route
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" /> {/* Arrow icon */}
        Back to Home
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Accommodation</h1>

      {/* Search Form */}
      <div className="flex items-center mb-4 justify-center">
        <input
          type="text"
          className="p-2 border rounded w-64 sm:w-80 md:w-96"
          placeholder="Search accommodation..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Add Accommodation Form */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 sm:space-y-0 mb-4">
        <input
          type="text"
          className="p-2 border rounded w-full sm:w-64"
          placeholder="Accommodation name"
          value={newAccommodation.name}
          onChange={(e) => setNewAccommodation({ ...newAccommodation, name: e.target.value })}
        />
        <input
          type="text"
          className="p-2 border rounded w-full sm:w-64"
          placeholder="Accommodation details"
          value={newAccommodation.details}
          onChange={(e) => setNewAccommodation({ ...newAccommodation, details: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleAddAccommodation}
        >
          Add Accommodation
        </button>
      </div>

      {/* Accommodation List Display */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredAccommodationList.map((accommodation) => (
          <div
            key={accommodation.id}
            className="bg-white p-4 rounded shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            <img
              src={accommodation.image}
              alt={accommodation.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-bold">{accommodation.name}</h2>
            <p className="text-gray-600">{accommodation.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accommodation;
