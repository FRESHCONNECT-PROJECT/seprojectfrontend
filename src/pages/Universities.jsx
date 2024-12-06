import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Ensure you have `react-icons` installed

const SearchUniversities = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample universities data
  const universities = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA, USA',
      programs: ['Computer Science', 'Law', 'Business Administration'],
    },
    {
      name: 'University of Oxford',
      location: 'Oxford, UK',
      programs: ['Philosophy', 'Physics', 'Law'],
    },
    {
      name: 'Stanford University',
      location: 'Stanford, CA, USA',
      programs: ['Engineering', 'Physics', 'Economics'],
    },
  ];

  // Filter universities based on search query
  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Go Back to Home Navigation */}
      <button
        onClick={() => (window.location.href = '/')} // Navigate to home
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Home
      </button>

      {/* Search Section */}
      <h1 className="text-2xl font-bold text-center mb-6">Search Universities</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-2 rounded-l border-gray-300 focus:outline-none focus:ring focus:ring-accent"
          placeholder="Search for universities"
        />
        <button className="bg-blue-600 p-2 rounded-r text-white hover:bg-blue-700">
          Search
        </button>
      </div>

      {/* University Results Section */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredUniversities.length === 0 ? (
          <p className="text-center text-gray-600">No universities found.</p>
        ) : (
          filteredUniversities.map((university, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{university.name}</h2>
              <p className="text-gray-600">{university.location}</p>
              <div className="mt-2">
                <h4 className="font-bold">Programs Offered:</h4>
                <ul className="list-disc pl-5">
                  {university.programs.map((program, idx) => (
                    <li key={idx} className="text-gray-600">
                      {program}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Link for "View Details" */}
              <Link
                to={`/university/${university.name
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchUniversities;
