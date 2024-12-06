import { Link } from "react-router-dom";

const Explore = () => (
  <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold text-center mb-6">Explore Our Services</h1>
    
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Grocery Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnMdsJor3FFP2hmL4OWRepAS-yzpWxw6ltw&s"
          alt="Grocery"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">Grocery</h3>
          <p className="text-gray-600 mt-2">
            Explore nearby grocery stores and get fresh produce and essentials.
          </p>
          <Link
            to="/grocery"
            className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Explore Grocery
          </Link>
        </div>
      </div>

      {/* Transport Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://res.klook.com/image/upload/q_85/c_fill,w_750/v1709786177/tqzfqno4aqirybga7p48.jpg"
          alt="Transport"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">Transport</h3>
          <p className="text-gray-600 mt-2">
            Find transport options to help you commute more efficiently.
          </p>
          <Link
            to="/transport"
            className="mt-4 inline-block bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition"
          >
            Explore Transport
          </Link>
        </div>
      </div>

      {/* Accommodation Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://www.goodenough.ac.uk/wp-content/uploads/2024/05/Student-Bedroom-4-e1716550263213.jpg"
          alt="Accommodation"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">Accommodation</h3>
          <p className="text-gray-600 mt-2">
            Find nearby accommodations for a comfortable stay.
          </p>
          <Link
            to="/accommodation"
            className="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Explore Accommodation
          </Link>
        </div>
      </div>

      {/* Universities Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src="https://www.oxfordscholastica.com/wp-content/uploads/2023/07/cambridge-college.jpg"
          alt="Universities"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">Universities</h3>
          <p className="text-gray-600 mt-2">
            Explore top universities and higher education opportunities.
          </p>
          <Link
            to="/universities"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Explore Universities
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Explore;
