import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import apiClient, { apiEndpoints } from '../components/Apis';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Import eye icons for password visibility toggle
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '', // Date of Birth state
  });
  const [loading, setLoading] = useState(false); // State to manage loading
  const [passwordVisible, setPasswordVisible] = useState(false); // State to manage password visibility

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form submission
 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // Set loading state

  // Basic validation
  if (!formData.name || !formData.email || !formData.password || !formData.dob) {
    Swal.fire({
      icon: 'error',
      title: 'All fields are required!',
    });
    setLoading(false); // Reset loading state
    return;
  }

  try {
    // Send the form data to the API endpoint
    const response = await apiClient.post(`${apiEndpoints.register}`, formData);

    // Check the response for success
    if (response.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Redirecting to login page...',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate('/login'); // Redirect to login
      });
    } else {
      // If the response indicates the user already exists
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        text: response.data.message || 'Something went wrong.',
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: error.response?.data?.message || 'An error occurred. Please try again.',
    });
  } finally {
    setLoading(false); // Reset loading state
  }
};


  return (
    <>
    <Navbar />

    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-2xl font-bold mb-4 text-center">Register</h2>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none"
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-300 mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none pr-12"
              placeholder="Create a password"
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-300"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={loading} // Disable button during loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-gray-400 mt-4 text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-green-500">
            Login
          </a>
        </p>
      </form>
    </div>
    
    </>
  );
};

export default Register;
