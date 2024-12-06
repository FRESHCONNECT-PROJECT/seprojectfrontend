import { useState } from "react";
import logoImage from "../assets/logo.png"; // Add a demo image

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo with Image */}
        <div className="text-2xl font-bold">
          <img src={logoImage} alt="Logo" className="h-12" />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden block text-2xl bg-white text-black p-3 rounded-full hover:bg-green-400 transition"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "✖" : "☰"} {/* Toggle between Hamburger and Close */}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-green-400 transition duration-300">Home</a>

          <a href="/register" className="hover:text-green-400 transition duration-300">Register</a>
          <a href="/login" className="hover:text-green-400 transition duration-300">Login</a>
        </nav>
      </div>

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-10">
          <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-t from-gray-800 via-gray-900 to-black text-white p-6 shadow-lg transform transition-transform ease-in-out duration-300">
            <button
              className="text-white mb-6 font-bold text-2xl hover:text-red-400 transition"
              onClick={() => setSidebarOpen(false)}
            >
              ✖
            </button>
            <nav className="space-y-6">
              <a href="/" className="block hover:text-green-400 transition duration-300">Home</a>

              <a href="/register" className="block hover:text-green-400 transition duration-300">Register</a>
              <a href="/login" className="block hover:text-green-400 transition duration-300">Login</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
