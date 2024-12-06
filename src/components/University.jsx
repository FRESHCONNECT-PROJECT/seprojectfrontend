import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import apiClient, { apiEndpoints } from './Apis';

const InterestSection = () => {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [tempUniversity, setTempUniversity] = useState(''); // Temporary selection for modal
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [universities, setUniversities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!email) {
      setError('No email found. Please log in.');
      setLoading(false);
      return;
    }

    // Predefined universities data
    const universitiesData = [
        { state: "Alabama", university: "University of Alabama" },
        { state: "Alabama", university: "Auburn University" },
        { state: "Alabama", university: "Samford University" },
        { state: "Alaska", university: "University of Alaska Fairbanks" },
        { state: "Alaska", university: "University of Alaska Anchorage" },
        { state: "Alaska", university: "Alaska Pacific University" },
        { state: "Arizona", university: "Arizona State University" },
        { state: "Arizona", university: "University of Arizona" },
        { state: "Arizona", university: "Northern Arizona University" },
        { state: "Arkansas", university: "University of Arkansas" },
        { state: "Arkansas", university: "Arkansas State University" },
        { state: "Arkansas", university: "Harding University" },
        { state: "California", university: "Stanford University" },
        { state: "California", university: "University of California, Berkeley" },
        { state: "California", university: "University of Southern California" },
        { state: "California", university: "California Institute of Technology" },
        { state: "Colorado", university: "University of Colorado Boulder" },
        { state: "Colorado", university: "Colorado State University" },
        { state: "Colorado", university: "Colorado College" },
        { state: "Colorado", university: "University of Denver" },
        { state: "Connecticut", university: "Yale University" },
        { state: "Connecticut", university: "University of Connecticut" },
        { state: "Connecticut", university: "Wesleyan University" },
        { state: "Connecticut", university: "Trinity College" },
        { state: "Delaware", university: "University of Delaware" },
        { state: "Delaware", university: "Delaware State University" },
        { state: "Delaware", university: "Wilmington University" },
        { state: "Florida", university: "University of Florida" },
        { state: "Florida", university: "Florida State University" },
        { state: "Florida", university: "University of Miami" },
        { state: "Florida", university: "University of Central Florida" },
        { state: "Florida", university: "Florida Atlantic University" },
        { state: "Georgia", university: "University of Georgia" },
        { state: "Georgia", university: "Georgia Institute of Technology" },
        { state: "Georgia", university: "Emory University" },
        { state: "Georgia", university: "Mercer University" },
        { state: "Hawaii", university: "University of Hawaii at Manoa" },
        { state: "Hawaii", university: "Hawaii Pacific University" },
        { state: "Hawaii", university: "Brigham Young University–Hawaii" },
        { state: "Idaho", university: "University of Idaho" },
        { state: "Idaho", university: "Boise State University" },
        { state: "Idaho", university: "Idaho State University" },
        { state: "Illinois", university: "University of Chicago" },
        { state: "Illinois", university: "Northwestern University" },
        { state: "Illinois", university: "University of Illinois Urbana-Champaign" },
        { state: "Illinois", university: "Illinois Institute of Technology" },
        { state: "Indiana", university: "Indiana University Bloomington" },
        { state: "Indiana", university: "Purdue University" },
        { state: "Indiana", university: "University of Notre Dame" },
        { state: "Indiana", university: "Ball State University" },
        { state: "Iowa", university: "University of Iowa" },
        { state: "Iowa", university: "Iowa State University" },
        { state: "Iowa", university: "Drake University" },
        { state: "Kansas", university: "University of Kansas" },
        { state: "Kansas", university: "Kansas State University" },
        { state: "Kansas", university: "Wichita State University" },
        { state: "Kentucky", university: "University of Kentucky" },
        { state: "Kentucky", university: "University of Louisville" },
        { state: "Kentucky", university: "Berea College" },
        { state: "Louisiana", university: "Louisiana State University" },
        { state: "Louisiana", university: "Tulane University" },
        { state: "Louisiana", university: "University of Louisiana at Lafayette" },
        { state: "Maine", university: "University of Maine" },
        { state: "Maine", university: "Bowdoin College" },
        { state: "Maine", university: "Bates College" },
        { state: "Maryland", university: "University of Maryland" },
        { state: "Maryland", university: "Johns Hopkins University" },
        { state: "Maryland", university: "Towson University" },
        { state: "Massachusetts", university: "Harvard University" },
        { state: "Massachusetts", university: "Massachusetts Institute of Technology" },
        { state: "Massachusetts", university: "Boston University" },
        { state: "Massachusetts", university: "University of Massachusetts Amherst" },
        { state: "Michigan", university: "University of Michigan" },
        { state: "Michigan", university: "Michigan State University" },
        { state: "Michigan", university: "Wayne State University" },
        { state: "Michigan", university: "Calvin University" },
        { state: "Minnesota", university: "University of Minnesota" },
        { state: "Minnesota", university: "Carleton College" },
        { state: "Minnesota", university: "Macalester College" },
        { state: "Mississippi", university: "University of Mississippi (Ole Miss)" },
        { state: "Mississippi", university: "Mississippi State University" },
        { state: "Mississippi", university: "Jackson State University" },
        { state: "Missouri", university: "University of Missouri" },
        { state: "Missouri", university: "Washington University in St. Louis" },
        { state: "Missouri", university: "Saint Louis University" },
        { state: "Montana", university: "University of Montana" },
        { state: "Montana", university: "Montana State University" },
        { state: "Montana", university: "Carroll College" },
        { state: "Nebraska", university: "University of Nebraska–Lincoln" },
        { state: "Nebraska", university: "Creighton University" },
        { state: "Nebraska", university: "Nebraska Wesleyan University" },
        { state: "Nevada", university: "University of Nevada, Reno" },
        { state: "Nevada", university: "University of Nevada, Las Vegas" },
        { state: "Nevada", university: "Nevada State College" },
        { state: "New Hampshire", university: "Dartmouth College" },
        { state: "New Hampshire", university: "University of New Hampshire" },
        { state: "New Hampshire", university: "Keene State College" },
        { state: "New Jersey", university: "Princeton University" },
        { state: "New Jersey", university: "Rutgers University" },
        { state: "New Jersey", university: "Stevens Institute of Technology" },
        { state: "New Mexico", university: "University of New Mexico" },
        { state: "New Mexico", university: "New Mexico State University" },
        { state: "New Mexico", university: "New Mexico Institute of Mining and Technology" },
        { state: "New York", university: "Columbia University" },
        { state: "New York", university: "New York University" },
        { state: "New York", university: "Cornell University" },
        { state: "New York", university: "University at Buffalo (SUNY)" },
        { state: "North Carolina", university: "University of North Carolina at Chapel Hill" },
        { state: "North Carolina", university: "Duke University" },
        { state: "North Carolina", university: "North Carolina State University" },
        { state: "North Carolina", university: "Wake Forest University" },
        { state: "North Dakota", university: "University of North Dakota" },
        { state: "North Dakota", university: "North Dakota State University" },
        { state: "North Dakota", university: "Minot State University" },
        { state: "Ohio", university: "Ohio State University" },
        { state: "Ohio", university: "Case Western Reserve University" },
        { state: "Ohio", university: "University of Cincinnati" },
        { state: "Ohio", university: "Oberlin College" },
        { state: "Oklahoma", university: "University of Oklahoma" },
        { state: "Oklahoma", university: "Oklahoma State University" },
        { state: "Oklahoma", university: "University of Tulsa" },
        { state: "Oregon", university: "University of Oregon" },
        { state: "Oregon", university: "Oregon State University" },
        { state: "Oregon", university: "Willamette University" },
        { state: "Pennsylvania", university: "University of Pennsylvania" },
        { state: "Pennsylvania", university: "Pennsylvania State University" },
        { state: "Pennsylvania", university: "Carnegie Mellon University" },
        { state: "Pennsylvania", university: "Temple University" },
        { state: "Rhode Island", university: "Brown University" },
        { state: "Rhode Island", university: "University of Rhode Island" },
        { state: "Rhode Island", university: "Providence College" },
        { state: "South Carolina", university: "University of South Carolina" },
        { state: "South Carolina", university: "Clemson University" },
        { state: "South Carolina", university: "Furman University" },
        { state: "South Dakota", university: "University of South Dakota" },
        { state: "South Dakota", university: "South Dakota State University" },
        { state: "Tennessee", university: "Vanderbilt University" },
        { state: "Tennessee", university: "University of Tennessee" },
        { state: "Tennessee", university: "Rhodes College" },
        { state: "Texas", university: "University of Texas at Austin" },
        { state: "Texas", university: "Rice University" },
        { state: "Texas", university: "Texas A&M University" },
        { state: "Texas", university: "Baylor University" },
        { state: "Utah", university: "University of Utah" },
        { state: "Utah", university: "Brigham Young University" },
        { state: "Utah", university: "Utah State University" },
        { state: "Vermont", university: "University of Vermont" },
        { state: "Vermont", university: "Middlebury College" },
        { state: "Virginia", university: "University of Virginia" },
        { state: "Virginia", university: "Virginia Tech" },
        { state: "Virginia", university: "James Madison University" },
        { state: "Washington", university: "University of Washington" },
        { state: "Washington", university: "Washington State University" },
        { state: "Washington", university: "Gonzaga University" },
        { state: "West Virginia", university: "West Virginia University" },
        { state: "West Virginia", university: "Marshall University" },
        { state: "Wisconsin", university: "University of Wisconsin-Madison" },
        { state: "Wisconsin", university: "Marquette University" },
        { state: "Wisconsin", university: "University of Wisconsin–Milwaukee" },
        { state: "Wyoming", university: "University of Wyoming" },
        { state: "Wyoming", university: "Wyoming State University" }
      ];

    setUniversities(universitiesData);

    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
        setSelectedUniversity(response.data.university || '');
        setUserData(response.data);
      } catch (err) {
        setError('No data found or error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email]);

  const toggleModal = () => {
    setTempUniversity(selectedUniversity); // Set temp value to current selection
    setIsModalOpen(!isModalOpen);
  };

  const handleSaveUniversity = async () => {
    try {
      const formData = {
        university: tempUniversity,
        email,
      };
      const response = await apiClient.put(apiEndpoints.updateuniversity, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      Swal.fire('Success', 'University preference updated successfully!', 'success');
      setSelectedUniversity(tempUniversity); // Save the selection
      toggleModal();
    } catch (err) {
      console.error('Error updating university:', err.response || err);
      Swal.fire('Error', 'Failed to update university preference.', 'error');
    }
  };

  // Convert universities to the format react-select expects
  const universityOptions = universities.map((uni) => ({
    value: uni.university,
    label: `${uni.university} (${uni.state})`,
  }));

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">My University</h2>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && (
        <div className="alert alert-warning text-center mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-4">
        {selectedUniversity ? (
          <div>
            <p className="text-gray-500">{selectedUniversity}</p>
            <button
              onClick={toggleModal}
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="alert alert-warning text-center mb-4">
            <p>No university is set. Please set your university here.</p>
            <button
              onClick={toggleModal}
              className="mt-2 py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Set University
            </button>
          </div>
        )}
      </div>

      {/* Modal for university selection */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-700 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="mb-4">
              <Select
                options={universityOptions}
                value={universityOptions.find((option) => option.value === tempUniversity)}
                onChange={(option) => setTempUniversity(option ? option.value : '')}
                placeholder="Select University"
                isSearchable
              />
            </div>
            <button
              onClick={handleSaveUniversity}
              className="mt-2 py-2 px-4 bg-green-500 text-white rounded-md mr-2"
            >
              Save
            </button>
            <button
              onClick={toggleModal}
              className="mt-2 py-2 px-4 bg-red-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestSection;
