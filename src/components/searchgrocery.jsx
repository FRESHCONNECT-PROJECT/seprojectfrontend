import React, { useEffect, useState } from 'react';
import apiClient, { apiEndpoints } from './Apis';
import Loader from './Loader'; // Import the Loader component

const GroceryView = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    university: '',
    profilePic: '',
  });
  const [groceries, setGroceries] = useState([]);
  const [filteredGroceries, setFilteredGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user details on component mount
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetchUserData(email);
    } else {
      setError('No email found in local storage.');
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
      const data = response.data;

      setUserDetails({
        name: data.name || '',
        email: data.email || '',
        university: data.university || '',
        profilePic: data.profilePic || '',
      });
      fetchGroceries(data.university);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user data.');
      setLoading(false);
    }
  };

  const fetchGroceries = async (university) => {
    try {
      const response = await apiClient.get(apiEndpoints.groceries);
      const allGroceries = response.data.groceries; // Access the 'groceries' key

      // Ensure 'allGroceries' is an array before filtering
      if (Array.isArray(allGroceries)) {
        const matchedGroceries = allGroceries.filter(
          (grocery) => grocery.university === university
        );
        setGroceries(allGroceries);
        setFilteredGroceries(matchedGroceries);
      } else {
        throw new Error('Unexpected response format: groceries is not an array');
      }
    } catch (err) {
      console.error('Error fetching groceries:', err);
      setError('Failed to fetch groceries.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />; // Use the Loader component here
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        Groceries Near {userDetails.university}
      </h1>
      {filteredGroceries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGroceries.map((grocery) => (
            <div
              key={grocery._id}
              className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-4 transition-transform transform hover:scale-105"
            >
              {/* Grocery Image */}
              <img
                src={'https://cdn-icons-png.flaticon.com/512/8711/8711710.png'} // Add a default image if none provided
                alt={grocery.groceryName}
                className="w-16 h-16 object-cover rounded-full"
              />
              
              {/* Grocery Content */}
              <div>
                <h2 className="text-lg font-bold">{grocery.groceryName}</h2>
                <p className="text-gray-600">Distance: {grocery.distance} km</p>
                <br />
                {/* Visit Shop Button */}
                <a
                  href={grocery.shopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Shop
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No nearby groceries found.</p>
      )}
    </div>
  );
};

export default GroceryView;
