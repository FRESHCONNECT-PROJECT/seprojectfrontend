import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient, { apiEndpoints } from "../components/Apis"; // Import your API client
import Swal from "sweetalert2"; // For success alert
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState(""); // Email field
  const [password, setPassword] = useState(""); // Password field
  const [error, setError] = useState(""); // Error state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/my-account"); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(apiEndpoints.login, {
        email: email,
        password: password,
      });

      // Log the entire response data for debugging
      console.log("Response Data:", response.data);

      const data = response.data;

      if (response.status === 200) {
        
        localStorage.setItem("authToken", data.token);
        // Store user details in localStorage
        const { _id, name, email, dob } = data.user;
        localStorage.setItem("userId", _id);
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userDob", dob);

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "Redirecting to the dashboard...",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          navigate("/my-account");
        });
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login failed", err.response ? err.response.data : err);

      if (err.response) {
        // Check the error response and set error accordingly
        switch (err.response.status) {
          case 400:
            if (err.response.data.message.includes("required")) {
              setError("Both email and password are required.");
            } else if (err.response.data.message === "User not found") {
              setError("User not found. Please check your email.");
            } else if (err.response.data.message === "Invalid credentials") {
              setError("Invalid credentials. Please check your password.");
            }
            break;
          case 500:
            setError("An error occurred during login. Please try again later.");
            break;
          default:
            setError("An unexpected error occurred.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center h-screen bg-gray-900">
        <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl font-bold mb-4 text-center">Login</h2>

          {/* Display error message only when needed */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Correct the handler to update email
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="bg-accent w-full p-2 rounded bg-green-700 text-white hover:bg-gray-700">
            Login
          </button>
          <p className="text-gray-400 mt-4 text-sm text-center">
            Don’t have an account? <a href="/register" className="text-accent">Register</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
