import React, { useState } from 'react';
import apiClient, { apiEndpoints } from './Apis';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ProfileModal = ({ setIsModalOpen, userDetails, setUserDetails }) => {
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePicUpdate = async () => {
    const formData = new FormData();
    formData.append('profilePic', profilePicFile);
    formData.append('email', userDetails.email); // Add the email to the form data
  
    try {
      const response = await apiClient.put(apiEndpoints.updateprofile, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        // Save the URL of the profile picture and update the state
        setUserDetails((prev) => ({ ...prev, profilePic: response.data.profilePicUrl }));
        
        // Show success popup with SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Your profile picture has been updated.',
          icon: 'success',
          confirmButtonText: 'Cool',
        });

        setIsModalOpen(false); // Close modal after update
      }
    } catch (error) {
      console.error('Error updating profile picture:', error);
      
      // Show error popup if something goes wrong
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue updating your profile picture. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Update Profile Picture</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
        {profilePicPreview && (
          <div className="mb-4">
            <img
              src={profilePicPreview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleProfilePicUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
