import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[80vh] bg-peach-200 text-white flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-10">
      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold">Welcome to Our Platform</h1>
      <p className="text-base sm:text-lg mt-4">Your one-stop solution for all needs</p>

      {/* About Section */}
      <div className="about-section mt-8 mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">About Us</h2>
        <p className="text-sm sm:text-lg mt-2 max-w-lg mx-auto">
          We are dedicated to providing you with the best services to meet all
          your needs. Whether you are looking for groceries, transport options,
          accommodation, or university courses, we have you covered. Explore
          our platform and find everything in one place!
        </p>
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <Link
          to="/explore"
          className="bg-yellow-600 text-white px-6 py-3 rounded hover:bg-yellow-700 transition w-full sm:w-auto"
        >
          Explore Now
        </Link>

        <a
          href="/register"
          className="bg-green-600 px-6 py-3 rounded text-white hover:bg-green-700 transition w-full sm:w-auto"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Hero;
