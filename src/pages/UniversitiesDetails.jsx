import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Ensure you have `react-icons` installed

const UniversitiesDetails = () => {
  const { universityName } = useParams(); // Extract the dynamic parameter from the URL

  // Sample universities data with photos
  const universities = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA, USA',
      programs: ['Computer Science', 'Law', 'Business Administration'],
      photo: 'https://www.sangenbd.com/images/harvard-university-admission-requirements-for-bangladeshi-students.webp',
    },
    {
      name: 'University of Oxford',
      location: 'Oxford, UK',
      programs: ['Philosophy', 'Physics', 'Law'],
      photo: 'https://www.ox.ac.uk/sites/files/oxford/styles/ow_large_feature/s3/field/field_image_main/b_AllSoulsquad.jpg?itok=tTcH-5ix',
    },
    {
      name: 'Stanford University',
      location: 'Stanford, CA, USA',
      programs: ['Engineering', 'Physics', 'Economics'],
      photo: 'https://olmsted.org/wp-content/uploads/2023/06/Screen-Shot-2022-12-14-at-2.44.08-PM.png ',
    },
  ];

  // Find the university by name
  const university = universities.find(
    (uni) =>
      uni.name.toLowerCase().replace(/\s+/g, '-') === universityName.toLowerCase()
  );

  if (!university) {
    return <p className="text-center text-red-500">University not found!</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back to Search Navigation */}
      <button
        onClick={() => window.history.back()} // Navigate to the previous page
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to Search
      </button>

      <h1 className="text-3xl font-bold mb-4">{university.name}</h1>
      <img
        src={university.photo}
        alt={university.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {university.location}
      </p>
      <div>
        <h2 className="text-xl font-bold mb-2">Programs Offered:</h2>
        <ul className="list-disc pl-5 text-gray-600">
          {university.programs.map((program, idx) => (
            <li key={idx}>{program}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UniversitiesDetails;
