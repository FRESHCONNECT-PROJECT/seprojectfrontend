import { Link } from "react-router-dom"; // Import Link for navigation
import Hero from "../components/Hero"; // Ensure the path to Hero is correct
import Navbar from "../components/Navbar";

const Home = () => (
  <>
  
  <Navbar />
  <div className="bg-gradient-to-r from-green-400 to-cyan-500 text-white p-9 min-h-screen">
    {/* Hero Section */}
    <Hero /> {/* Include Hero section here */}
    
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
      <p className="text-lg mt-4">Your one-stop solution for all needs</p>
    </div>
    
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Grocery Link */}
      <div className="bg-blue-700 rounded-lg p-6 text-center animate-fade-in">
        <h3 className="text-xl font-semibold">Grocery</h3>
        <p className="mt-2 text-gray-200">Find nearby grocery stores for all your shopping needs.</p>
        <Link
          to="/grocery"
          className="mt-4 inline-block bg-amber-500 text-white px-6 py-2 rounded hover:bg-amber-600 transition"
        >
          Shop Now
        </Link>
      </div>

      {/* Transport Link */}
      <div className="bg-teal-600 rounded-lg p-6 text-center animate-fade-in animation-delay-100">
        <h3 className="text-xl font-semibold">Transport</h3>
        <p className="mt-2 text-gray-200">Explore nearby transport facilities for your commute.</p>
        <Link
          to="/transport"
          className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Find Transport
        </Link>
      </div>

      {/* Accommodation Link */}
      <div className="bg-indigo-600 rounded-lg p-6 text-center animate-fade-in animation-delay-200">
        <h3 className="text-xl font-semibold">Accommodation</h3>
        <p className="mt-2 text-gray-200">Find nearby accommodations and housing options.</p>
        <Link
          to="/accommodation"
          className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
        >
          Find Housing
        </Link>
      </div>

      {/* Universities Link */}
      <div className="bg-purple-700 rounded-lg p-6 text-center animate-fade-in animation-delay-300">
        <h3 className="text-xl font-semibold">Universities</h3>
        <p className="mt-2 text-gray-200">Explore top universities and higher education options.</p>
        <Link
          to="/universities"
          className="mt-4 inline-block bg-lime-500 text-white px-6 py-2 rounded hover:bg-lime-600 transition"
        >
          Explore Universities
        </Link>
      </div>
    </div>
  </div>
  
  </>
 
  );

export default Home;
