import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaBus, FaTrain, FaPlane, FaTaxi } from 'react-icons/fa'; // React icons for transport
import apiClient, { apiEndpoints } from './Apis'; // Import your API client

const TransportDetails = () => {
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [transportData, setTransportData] = useState(null);
  const [allTransports, setAllTransports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch transport data on component mount
  useEffect(() => {
    const fetchTransportData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(apiEndpoints.transport); // Use the correct transport API endpoint
        setAllTransports(response.data.transports); // Store all transport data
      } catch (err) {
        console.error('Error fetching transport data:', err);
        setError('Failed to fetch transport data.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransportData();
  }, []);

  // Generate "From" location options dynamically from the transport data
  const fromLocationOptions = Array.from(
    new Set(allTransports.map((transport) => transport.from))
  ).map((from) => ({
    value: from,
    label: from,
  }));

  // Handle change for "From" location
  const handleFromChange = (selectedOption) => {
    setFromLocation(selectedOption);
    setToLocation(null); // Reset "To" location when "From" is changed
  };

  // Handle change for "To" location
  const handleToChange = (selectedOption) => {
    setToLocation(selectedOption);
  };

  // Filter "To" locations based on the selected "From" location
  const toLocationOptions = fromLocation
    ? Array.from(
        new Set(
          allTransports
            .filter((transport) => transport.from === fromLocation.value)
            .map((transport) => transport.to)
        )
      ).map((to) => ({
        value: to,
        label: to,
      }))
    : [];

  // Fetch transport details based on selected "From" and "To" locations
  const fetchTransportDetails = () => {
    if (!fromLocation || !toLocation) {
      setError('Please select both from and to locations');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const transport = allTransports.find(
        (item) =>
          item.from === fromLocation.value && item.to === toLocation.value
      );
      setTransportData(transport);
    } catch (err) {
      console.error('Error fetching transport details:', err);
      setError('Failed to fetch transport details.');
    } finally {
      setLoading(false);
    }
  };

  // Render Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Transport Details</h1>

      <div className="mb-4 flex justify-between">
        {/* From Location */}
        <div className="w-1/2 pr-2">
          <Select
            value={fromLocation}
            onChange={handleFromChange}
            options={fromLocationOptions}
            placeholder="Select From Location"
          />
        </div>

        {/* To Location */}
        <div className="w-1/2 pl-2">
          <Select
            value={toLocation}
            onChange={handleToChange}
            options={toLocationOptions}
            placeholder="Select To Location"
            isDisabled={!fromLocation} // Disable To select until From is selected
          />
        </div>
      </div>

      {/* Button to fetch details */}
      <div className="text-center">
        <button
          onClick={fetchTransportDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Check Transportation
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Transport details card */}
      {transportData && (
        <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-bold mb-4">
            Transport from {transportData.from} to {transportData.to}
          </h2>

          {/* Displaying transport details */}
          <div className="flex items-center gap-4">
            <FaBus className="text-green-500" />
            <div>
              <h3 className="font-semibold">Bus: </h3>
              <p>{transportData.busDetails}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <FaTrain className="text-red-500" />
            <div>
              <h3 className="font-semibold">Train: </h3>
              <p>{transportData.trainDetails}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <FaPlane className="text-blue-500" />
            <div>
              <h3 className="font-semibold">Flight: </h3>
              <p>{transportData.flightDetails}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <FaTaxi className="text-yellow-500" />
            <div>
              <h3 className="font-semibold">Cab: </h3>
              <p>{transportData.cabDetails}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Description: </h3>
            <p>{transportData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransportDetails;
