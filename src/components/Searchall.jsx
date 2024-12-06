import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStore, FaCalendarAlt, FaBed } from "react-icons/fa";

// University Data
const universitiesData = [
    { state: "Alabama", label: "University of Alabama" },
    { state: "Alabama", label: "Auburn University" },
    { state: "Alabama", label: "Samford University" },
    { state: "Alaska", label: "University of Alaska Fairbanks" },
    { state: "Alaska", label: "University of Alaska Anchorage" },
    { state: "Alaska", label: "Alaska Pacific University" },
    { state: "Arizona", label: "Arizona State University" },
    { state: "Arizona", label: "University of Arizona" },
    { state: "Arizona", label: "Northern Arizona University" },
    { state: "Arkansas", label: "University of Arkansas" },
    { state: "Arkansas", label: "Arkansas State University" },
    { state: "Arkansas", label: "Harding University" },
    { state: "California", label: "Stanford University" },
    { state: "California", label: "University of California, Berkeley" },
    { state: "California", label: "University of Southern California" },
    { state: "California", label: "California Institute of Technology" },
    { state: "Colorado", label: "University of Colorado Boulder" },
    { state: "Colorado", label: "Colorado State University" },
    { state: "Colorado", label: "Colorado College" },
    { state: "Colorado", label: "University of Denver" },
    { state: "Connecticut", label: "Yale University" },
    { state: "Connecticut", label: "University of Connecticut" },
    { state: "Connecticut", label: "Wesleyan University" },
    { state: "Connecticut", label: "Trinity College" },
    { state: "Delaware", label: "University of Delaware" },
    { state: "Delaware", label: "Delaware State University" },
    { state: "Delaware", label: "Wilmington University" },
    { state: "Florida", label: "University of Florida" },
    { state: "Florida", label: "Florida State University" },
    { state: "Florida", label: "University of Miami" },
    { state: "Florida", label: "University of Central Florida" },
    { state: "Florida", label: "Florida Atlantic University" },
    { state: "Georgia", label: "University of Georgia" },
    { state: "Georgia", label: "Georgia Institute of Technology" },
    { state: "Georgia", label: "Emory University" },
    { state: "Georgia", label: "Mercer University" },
    { state: "Hawaii", label: "University of Hawaii at Manoa" },
    { state: "Hawaii", label: "Hawaii Pacific University" },
    { state: "Hawaii", label: "Brigham Young University–Hawaii" },
    { state: "Idaho", label: "University of Idaho" },
    { state: "Idaho", label: "Boise State University" },
    { state: "Idaho", label: "Idaho State University" },
    { state: "Illinois", label: "University of Chicago" },
    { state: "Illinois", label: "Northwestern University" },
    { state: "Illinois", label: "University of Illinois Urbana-Champaign" },
    { state: "Illinois", label: "Illinois Institute of Technology" },
    { state: "Indiana", label: "Indiana University Bloomington" },
    { state: "Indiana", label: "Purdue University" },
    { state: "Indiana", label: "University of Notre Dame" },
    { state: "Indiana", label: "Ball State University" },
    { state: "Iowa", label: "University of Iowa" },
    { state: "Iowa", label: "Iowa State University" },
    { state: "Iowa", label: "Drake University" },
    { state: "Kansas", label: "University of Kansas" },
    { state: "Kansas", label: "Kansas State University" },
    { state: "Kansas", label: "Wichita State University" },
    { state: "Kentucky", label: "University of Kentucky" },
    { state: "Kentucky", label: "University of Louisville" },
    { state: "Kentucky", label: "Berea College" },
    { state: "Louisiana", label: "Louisiana State University" },
    { state: "Louisiana", label: "Tulane University" },
    { state: "Louisiana", label: "University of Louisiana at Lafayette" },
    { state: "Maine", label: "University of Maine" },
    { state: "Maine", label: "Bowdoin College" },
    { state: "Maine", label: "Bates College" },
    { state: "Maryland", label: "University of Maryland" },
    { state: "Maryland", label: "Johns Hopkins University" },
    { state: "Maryland", label: "Towson University" },
    { state: "Massachusetts", label: "Harvard University" },
    { state: "Massachusetts", label: "Massachusetts Institute of Technology" },
    { state: "Massachusetts", label: "Boston University" },
    { state: "Massachusetts", label: "University of Massachusetts Amherst" },
    { state: "Michigan", label: "University of Michigan" },
    { state: "Michigan", label: "Michigan State University" },
    { state: "Michigan", label: "Wayne State University" },
    { state: "Michigan", label: "Calvin University" },
    { state: "Minnesota", label: "University of Minnesota" },
    { state: "Minnesota", label: "Carleton College" },
    { state: "Minnesota", label: "Macalester College" },
    { state: "Mississippi", label: "University of Mississippi (Ole Miss)" },
    { state: "Mississippi", label: "Mississippi State University" },
    { state: "Mississippi", label: "Jackson State University" },
    { state: "Missouri", label: "University of Missouri" },
    { state: "Missouri", label: "Washington University in St. Louis" },
    { state: "Missouri", label: "Saint Louis University" },
    { state: "Montana", label: "University of Montana" },
    { state: "Montana", label: "Montana State University" },
    { state: "Montana", label: "Carroll College" },
    { state: "Nebraska", label: "University of Nebraska–Lincoln" },
    { state: "Nebraska", label: "Creighton University" },
    { state: "Nebraska", label: "Nebraska Wesleyan University" },
    { state: "Nevada", label: "University of Nevada, Reno" },
    { state: "Nevada", label: "University of Nevada, Las Vegas" },
    { state: "Nevada", label: "Nevada State College" },
    { state: "New Hampshire", label: "Dartmouth College" },
    { state: "New Hampshire", label: "University of New Hampshire" },
    { state: "New Hampshire", label: "Keene State College" },
    { state: "New Jersey", label: "Princeton University" },
    { state: "New Jersey", label: "Rutgers University" },
    { state: "New Jersey", label: "Stevens Institute of Technology" },
    { state: "New Mexico", label: "University of New Mexico" },
    { state: "New Mexico", label: "New Mexico State University" },
    { state: "New Mexico", label: "New Mexico Institute of Mining and Technology" },
    { state: "New York", label: "Columbia University" },
    { state: "New York", label: "New York University" },
    { state: "New York", label: "Cornell University" },
    { state: "New York", label: "University at Buffalo (SUNY)" },
    { state: "North Carolina", label: "University of North Carolina at Chapel Hill" },
    { state: "North Carolina", label: "Duke University" },
    { state: "North Carolina", label: "North Carolina State University" },
    { state: "North Carolina", label: "Wake Forest University" },
    { state: "North Dakota", label: "University of North Dakota" },
    { state: "North Dakota", label: "North Dakota State University" },
    { state: "North Dakota", label: "Minot State University" },
    { state: "Ohio", label: "Ohio State University" },
    { state: "Ohio", label: "Case Western Reserve University" },
    { state: "Ohio", label: "University of Cincinnati" },
    { state: "Ohio", label: "Oberlin College" },
    { state: "Oklahoma", label: "University of Oklahoma" },
    { state: "Oklahoma", label: "Oklahoma State University" },
    { state: "Oklahoma", label: "University of Tulsa" },
    { state: "Oregon", label: "University of Oregon" },
    { state: "Oregon", label: "Oregon State University" },
    { state: "Oregon", label: "Willamette University" },
    { state: "Pennsylvania", label: "University of Pennsylvania" },
    { state: "Pennsylvania", label: "Pennsylvania State University" },
    { state: "Pennsylvania", label: "Carnegie Mellon University" },
    { state: "Pennsylvania", label: "Temple University" },
    { state: "Rhode Island", label: "Brown University" },
    { state: "Rhode Island", label: "University of Rhode Island" },
    { state: "Rhode Island", label: "Providence College" },
    { state: "South Carolina", label: "University of South Carolina" },
    { state: "South Carolina", label: "Clemson University" },
    { state: "South Carolina", label: "Furman University" },
    { state: "South Dakota", label: "University of South Dakota" },
    { state: "South Dakota", label: "South Dakota State University" },
    { state: "Tennessee", label: "Vanderbilt University" },
    { state: "Tennessee", label: "University of Tennessee" },
    { state: "Tennessee", label: "Rhodes College" },
    { state: "Texas", label: "University of Texas at Austin" },
    { state: "Texas", label: "Rice University" },
    { state: "Texas", label: "Texas A&M University" },
    { state: "Texas", label: "Baylor University" },
    { state: "Utah", label: "University of Utah" },
    { state: "Utah", label: "Brigham Young University" },
    { state: "Utah", label: "Utah State University" },
    { state: "Vermont", label: "University of Vermont" },
    { state: "Vermont", label: "Middlebury College" },
    { state: "Virginia", label: "University of Virginia" },
    { state: "Virginia", label: "Virginia Tech" },
    { state: "Virginia", label: "James Madison University" },
    { state: "Washington", label: "University of Washington" },
    { state: "Washington", label: "Washington State University" },
    { state: "Washington", label: "Gonzaga University" },
    { state: "West Virginia", label: "West Virginia University" },
    { state: "West Virginia", label: "Marshall University" },
    { state: "Wisconsin", label: "University of Wisconsin-Madison" },
    { state: "Wisconsin", label: "Marquette University" },
    { state: "Wisconsin", label: "University of Wisconsin–Milwaukee" },
    { state: "Wyoming", label: "University of Wyoming" },
    { state: "Wyoming", label: "Wyoming State University" }
  ];



const UniversitySearch = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const navigate = useNavigate();

  const handleUniversitySelect = (selectedOption) => {
    setSelectedUniversity(selectedOption);
    setModalIsOpen(false);
  };

  const handleRedirect = (path) => {
    if (selectedUniversity) {
      navigate(`${path}/${encodeURIComponent(selectedUniversity.label)}`);
    } else {
      alert("Please select a university first.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-20 mb-20">
      <h2 className="text-2xl font-semibold text-center mb-6">Select Your University</h2>
      
      {!selectedUniversity ? (
        <button
          onClick={() => setModalIsOpen(true)}
          className="w-full py-3 px-4 text-white bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaSearch />
          Select University
        </button>
      ) : (
        <div>
          <button
            onClick={() => setModalIsOpen(true)}
            className="w-full py-3 px-4 text-white bg-red-600 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <FaSearch />
            Select University
          </button>

          <h3 className="text-xl font-medium text-center mb-4">
            Selected University: <span className="text-blue-600">{selectedUniversity.label}</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleRedirect("/view-groceries")}
              className="w-full sm:w-auto py-3 px-6 text-white bg-green-500 rounded-md flex items-center justify-center gap-2 hover:bg-green-600 transition"
            >
              <FaStore />
              Check Groceries
            </button>
            <button
              onClick={() => handleRedirect("/view-events")}
              className="w-full sm:w-auto py-3 px-6 text-white bg-yellow-500 rounded-md flex items-center justify-center gap-2 hover:bg-yellow-600 transition"
            >
              <FaCalendarAlt />
              Check Events
            </button>
            <button
              onClick={() => handleRedirect("/view-accommodations")}
              className="w-full sm:w-auto py-3 px-6 text-white bg-teal-500 rounded-md flex items-center justify-center gap-2 hover:bg-teal-600 transition"
            >
              <FaBed />
              Check Accommodations
            </button>
          </div>
        </div>
      )}

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-medium mb-4">Select Your University</h2>
            <Select
              options={universitiesData}
              onChange={handleUniversitySelect}
              placeholder="Search for a university..."
              className="mb-4"
            />
            <button
              onClick={() => setModalIsOpen(false)}
              className="w-full py-3 px-4 text-white bg-red-600 rounded-md hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversitySearch;
