import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient, { apiEndpoints } from './Apis';
import Swal from 'sweetalert2'; // Import SweetAlert for notifications

const InterestSection = () => {
  const [accommodationNeed, setAccommodationNeed] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);


  const email = localStorage.getItem('userEmail'); // Ensure email is stored in localStorage

  useEffect(() => {
    if (!email) {
      setError('No email found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
        console.log('Fetched data:', response.data); // Log fetched data
        const { accommodation } = response.data;
        setAccommodationNeed(accommodation || '');
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err); // Log error to the console
        setError('No data found or error fetching user data.');
      } finally {
        setLoading(false);
      }
    };



    fetchUserData();
  }, [email]);



  const handleAccommodationChange = async (value) => {
    setAccommodationNeed(value); // Update state immediately
    
    try {
      // Prepare the form data, including the email
      const formData = { 
        accommodation: value, 
        email: localStorage.getItem('userEmail')  // Include email from localStorage
      };
  
      // Use apiClient to make the PUT request
      const response = await apiClient.put(apiEndpoints.updateAccommodation, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log(response.data); // Handle the response, maybe show a success message
      Swal.fire('Success', 'Accommodation preference updated successfully!', 'success');
    } catch (err) {
      console.error('Error updating accommodation:', err.response || err); // Handle error
      Swal.fire('Error', 'Failed to update accommodation preference.', 'error');
    }
  };

  // Open/close modal
  const toggleModal = () => setIsModalOpen(!isModalOpen);


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">

      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {error && (
        <div className="alert alert-warning text-center mb-4">
          <p>{error}</p>
        </div>
      )}


      <div className="mb-4">
        <label className="block font-semibold mb-2">Accommodation Need:</label>
        <p>If you are seeking accommodation, click the button below.</p><br />
        <div className="flex items-center">
          <button
            onClick={() => handleAccommodationChange('Need')}
            className={`px-4 py-2 rounded-full mr-4 transition duration-300 ${
              accommodationNeed === 'Need' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            Need
          </button>
          <button
            onClick={() => handleAccommodationChange('No Need')}
            className={`px-4 py-2 rounded-full transition duration-300 ${
              accommodationNeed === 'No Need' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            No Need
          </button>
        </div>
      </div>

      {accommodationNeed === '' && !userData && (
        <div className="text-red-500 mt-4">No accommodation data found.</div>
      )}

      
    </div>
  );
};

export default InterestSection;
