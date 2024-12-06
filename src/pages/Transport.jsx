import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import the arrow icon
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

const Transport = () => {
  // State to hold the input values for From and To
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // Default center point

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on submit
    setSubmitted(true); // Update state to show the submitted values
    calculateRoute(); // Calculate the route when submitted
  };

  // Function to calculate the route using Google Maps Directions API
  const calculateRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: from,
        destination: to,
        travelMode: window.google.maps.TravelMode.DRIVING, // You can change the mode to WALKING, BICYCLING, etc.
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result); // Store the directions result in state

          // Calculate the center of the route
          const route = result.routes[0];
          const bounds = new window.google.maps.LatLngBounds();
          route.legs.forEach((leg) => {
            bounds.extend(leg.start_location);
            bounds.extend(leg.end_location);
          });

          // Set the center of the map based on the route's bounds
          setCenter(bounds.getCenter());
        } else {
          console.error("Error fetching directions", result);
        }
      }
    );
  };

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

      <h1 className="text-2xl font-bold text-center mb-6">Transport Services</h1>

      {/* Form to enter pickup and drop-off points */}
      <form
        className="bg-gray-100 p-4 rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block font-bold mb-2">From</label>
          <input
            type="text"
            className="w-full p-2 rounded border-gray-300 focus:outline-blue-500"
            placeholder="Enter starting point"
            value={from}
            onChange={(e) => setFrom(e.target.value)} // Update state on change
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">To</label>
          <input
            type="text"
            className="w-full p-2 rounded border-gray-300 focus:outline-blue-500"
            placeholder="Enter destination"
            value={to}
            onChange={(e) => setTo(e.target.value)} // Update state on change
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 p-2 rounded text-white w-full hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Display the submitted pickup and drop-off points */}
      {submitted && (
        <div className="mt-6 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Your Route</h2>
          <p className="text-lg">
            <strong>From:</strong> {from}
          </p>
          <p className="text-lg">
            <strong>To:</strong> {to}
          </p>
        </div>
      )}

      {/* Google Map displaying the route */}
      {directions && (
        <div className="mt-6">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={center} // Dynamically set the map's center
              zoom={12}
            >
              {/* DirectionsRenderer displays the route on the map */}
              <DirectionsRenderer directions={directions} />
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </div>
  );
};

export default Transport;
