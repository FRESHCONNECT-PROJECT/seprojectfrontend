import React, { useState, useEffect } from 'react';
import apiClient, { apiEndpoints } from './Apis';
import { FaMapMarkerAlt, FaPhoneAlt, FaDollarSign, FaExternalLinkAlt } from 'react-icons/fa'; // React Icons

const AccommodationDetails = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [userUniversity, setUserUniversity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Retrieve the university name directly from the URL
  const pathname = window.location.pathname;
  const segments = pathname.split('/'); // Split the URL into parts
  const university = decodeURIComponent(segments[2]); // Decode the university name (the third part of the URL)

  // Fetch user data and events on component mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // Get user email from local storage
    if (email) {
      fetchUserUniversity(email);
    } else {
      setError('No email found in local storage.');
    }
  }, []);

  // Fetch user university based on email
  const fetchUserUniversity = async (email) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
      const universityy = response.data.university;
      setUserUniversity(university);
      fetchEvents(university);
    } catch (err) {
      console.error('Error fetching user university:', err);
      setError('Failed to fetch user university.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch events data
  const fetchEvents = async (university) => {
    setLoading(true);
    try {
      const response = await apiClient.get(apiEndpoints.events);
      const activeEvents = response.data.events.filter(
        (event) => event.university === university // Filter events by the university
      );
      setEvents(response.data.events); // Store all events
      setFilteredEvents(activeEvents); // Store only active events
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  // Render loader while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20 font-poppins">
      <h1 className="text-3xl font-bold text-center mb-6 uppercase text-gray-800">
        Events of {university}
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Display events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src="https://cdn.prod.website-files.com/620e4101b2ce12a1a6bff0e8/65e80f722774b7ae68fbecdb_samantha-gades-fIHozNWfcvs-unsplash%20(1).jpg"
                alt="Event"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{event.eventName}</h2>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="font-medium">Date: </span> {new Date(event.date).toLocaleDateString()}
              </p>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaPhoneAlt className="mr-2 text-red-500" />
                <span className="font-medium">Time: </span> {event.time}
              </p>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaDollarSign className="mr-2 text-green-500" />
                <span className="font-medium">Pass Fee: </span> ${event.passFee}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={`https://www.google.com/search?q=${event.eventName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center transition"
                >
                  View <FaExternalLinkAlt className="ml-2" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No events found for this university.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccommodationDetails;
