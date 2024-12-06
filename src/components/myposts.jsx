import React, { useState, useEffect } from 'react';
import apiClient, { apiEndpoints } from './Apis';
import { FaMapMarkerAlt, FaPhoneAlt, FaDollarSign, FaExternalLinkAlt } from 'react-icons/fa'; // React Icons

const AccommodationDetails = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [userUniversity, setUserUniversity] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch user data and accommodations on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    console.log('User Email:', storedEmail); // Log the email here

    if (storedEmail) {
      setEmail(storedEmail); // Set email globally in the state
      fetchUserUniversity(storedEmail); // Pass email to fetch user university
    } else {
      setError('No email found in local storage.');
    }
  }, []); // Only run once on component mount

  // Fetch user university based on email
  const fetchUserUniversity = async (email) => {
    setLoading(true);
    try {
      const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
      const university = response.data.university;
      setUserUniversity(university);
      fetchAccommodations(email); // Pass email for filtering accommodations
    } catch (err) {
      console.error('Error fetching user university:', err);
      setError('Failed to fetch user university.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAccommodations = async (email) => {
    setLoading(true);
    try {
      const response = await apiClient.get(apiEndpoints.accomidations);

      // Filter accommodations based on the Useremail
      const activeAccommodations = response.data.accommodations.filter(
        (acc) => acc.Useremail === email // Use the email variable directly
      );

      // Log the filtered accommodations to check if they match the email
      console.log('Filtered Accommodations:', activeAccommodations);

      setAccommodations(response.data.accommodations);
      setFilteredAccommodations(activeAccommodations);
    } catch (err) {
      console.error('Error fetching accommodations:', err);
      setError('Failed to fetch accommodations.');
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
        Accommodation Details
      </h1>

      {/* Error message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Display accommodations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((acc) => (
            <div
              key={acc._id}
              className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src="https://content3.jdmagicbox.com/v2/comp/hyderabad/l6/040pxx40.xx40.120825181127.t6l6/catalogue/hyderabad-youth-hostel-nallakunta-hyderabad-hotels-4wwmg3z8ar.jpg"
                alt="Accommodation"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{acc.placeName}</h2>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                <span className="font-medium">Space: </span> {acc.space}
              </p>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaDollarSign className="mr-2 text-green-500" />
                <span className="font-medium">Rent: </span> ${acc.rent}
              </p>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaPhoneAlt className="mr-2 text-red-500" />
                <span className="font-medium">Contact: </span> {acc.contact}
              </p>
              
              <p className="flex items-center text-gray-600 mb-1">
                <FaMapMarkerAlt className="mr-2 text-purple-500" />
                <span className="font-medium">Distance: </span> {acc.distance} km
              </p>
              
              {/* Accommodation Status */}
              <p className={`text-lg font-medium mb-2 ${acc.status.toLowerCase() === 'active' ? 'text-green-500' : 'text-gray-500'}`}>
                {acc.status.toLowerCase() === 'active' ? 'Active' : 'Inactive'}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <a
                  href={acc.placeLink}
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
            No accommodations found with your account.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccommodationDetails;
