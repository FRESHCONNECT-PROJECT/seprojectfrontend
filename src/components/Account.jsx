import React, { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import apiClient, { apiEndpoints, Base_url } from './Apis';
import InterestSection from './InterestSection';
import University from './University';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    dob: '',
    profilePic: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
        dob: data.dob ? new Date(data.dob).toLocaleDateString() : '',
        profilePic: data.profilePic || '',
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
      <div className="flex justify-center items-center relative">
        <div className="relative">
          {userDetails.profilePic ? (
            <img
              src={`${Base_url}${userDetails.profilePic}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 text-white flex items-center justify-center text-xl font-bold">
              {userDetails.name ? userDetails.name[0].toUpperCase() : 'P'}
            </div>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-16 right-0 bg-transparent p-1 text-blue-500 hover:text-blue-700 transition duration-300"
          >
            <FaPen className="text-xl" />
          </button>
        </div>
      </div>

      <h1 className="text-2xl font-semibold text-center mt-4">Profile Information</h1>

      <div className="mt-6">
        <div className="flex justify-between items-center py-2">
          <label className="font-semibold">Name:</label>
          <p>{userDetails.name}</p>
        </div>
        <div className="flex justify-between items-center py-2">
          <label className="font-semibold">Email:</label>
          <p>{userDetails.email}</p>
        </div>
        <div className="flex justify-between items-center py-2">
          <label className="font-semibold">Date of Birth:</label>
          <p>{userDetails.dob}</p>
        </div>
      </div>

      {isModalOpen && (
        <ProfileModal
          setIsModalOpen={setIsModalOpen}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>

      <University />
      <InterestSection />
    </div>
  );
};

export default Profile;
