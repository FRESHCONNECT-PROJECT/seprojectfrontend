import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBus, FaBed, FaUniversity, FaUser, FaSignOutAlt, FaChartBar } from "react-icons/fa";
import logoImage from "../assets/logo.png"; // Add a demo image

import apiClient, { apiEndpoints, Base_url } from "./Apis";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: "", profilePic: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user details on component mount
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetchUserData(email);
    } else {
      setError("No email found in local storage.");
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
      const data = response.data;

      setUserDetails({
        name: data.name || "User",
        profilePic: data.profilePic || "",
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src={logoImage} alt="Logo" className="h-12" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden block text-2xl bg-white text-black p-3 rounded-full hover:bg-green-400 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="hover:text-green-400 flex items-center space-x-2">
            <FaHome />
            <span>Home</span>
          </a>
          <a href="/seacrh-grocery" className="hover:text-green-400 flex items-center space-x-2">
            <FaShoppingCart />
            <span>Grocery</span>
          </a>
          <a href="/search-transport" className="hover:text-green-400 flex items-center space-x-2">
            <FaBus />
            <span>Transport</span>
          </a>
          <a href="/searchby-universities" className="hover:text-green-400 flex items-center space-x-2">
            <FaBed />
            <span>Accommodation</span>
          </a>
         
          <a href="/my-account" className="hover:text-green-400 flex items-center space-x-2">
            <FaUser />
            <span>My Profile</span>
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-10">
          <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-t from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg">
            <button
              className="text-white mb-6 font-bold text-2xl hover:text-red-400 transition"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
            {/* Profile Section */}
            <div className="flex items-center space-x-4 mb-6">
              <img
                 src={
                  userDetails.profilePic
                    ? `${Base_url}${userDetails.profilePic}`
                    : "https://smaabacus.com/themes/user/assets_old/img/avatar/male.png"
                }
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{loading ? "Loading..." : userDetails.name}</span>
            </div>
            {/* Navigation Links */}
            <nav className="space-y-6">
         
              <a href="/search-grocery" className="block hover:text-green-400 flex items-center space-x-2">
                <FaShoppingCart />
                <span>View Grocery</span>
              </a>
              <a href="/search-transport" className="block hover:text-green-400 flex items-center space-x-2">
                <FaBus />
                <span>Check Transport</span>
              </a>
              <a href="/search-accomidation" className="block hover:text-green-400 flex items-center space-x-2">
                <FaBed />
                <span>Check Accommodation</span>
              </a>
              <a href="/post-accomidation" className="block hover:text-green-400 flex items-center space-x-2">
                <FaBed />
                <span>Post Accommodation</span>
              </a>
              <a href="/myposts" className="block hover:text-green-400 flex items-center space-x-2">
                <FaBed />
                <span>My Posts</span>
              </a>
              <a href="/searchby-universities" className="block hover:text-green-400 flex items-center space-x-2">
                <FaUniversity />
                <span>Search All By Universities</span>
              </a>
              <a href="/my-account" className="block hover:text-green-400 flex items-center space-x-2">
                <FaUser />
                <span>My Profile</span>
              </a>
              <a href="/group-chat" className="block hover:text-green-400 flex items-center space-x-2">
                <FaChartBar />
                <span>Group Chat</span>
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded w-full text-left hover:bg-red-600 transition flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
