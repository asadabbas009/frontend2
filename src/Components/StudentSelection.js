// import React, { useState, useEffect } from "react";
// // import axios from "axios";
// import { FaUsers, FaChevronDown, FaSearch } from "react-icons/fa";

// const StudentSelection = ({ selectedStudents, onStudentSelect }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [students, setStudents] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredStudents, setFilteredStudents] = useState([]);

//   // Hardcoded years data (will be fetched from API later)
//   const years = [
//     { id: "1", name: "1st Year" },
//     { id: "2", name: "2nd Year" },
//     { id: "3", name: "3rd Year" },
//     { id: "4", name: "4th Year" },
//   ];

//   // Hardcoded students data (will be fetched from API later)
//   const studentsByYear = {
//     "1": [
//       { id: "1", name: "Syed Sharique", username: "syedsharique" },
//       { id: "2", name: "Asad Abbas", username: "asadabbas" },
//       { id: "3", name: "Shams Khan", username: "shamskhan" },
//     ],
//     "2": [
//       { id: "4", name: "Priya Sharma", username: "priyasharma" },
//       { id: "5", name: "Mohammed Ali", username: "mohammedali" },
//       { id: "6", name: "Anjali Patel", username: "anjalipatel" },
//     ],
//     "3": [
//       { id: "7", name: "Rahul Verma", username: "rahulverma" },
//       { id: "8", name: "Fatima Khan", username: "fatimakhan" },
//       { id: "9", name: "Arjun Singh", username: "arjunsingh" },
//     ],
//     "4": [
//       { id: "10", name: "Zara Ahmed", username: "zaraahmed" },
//       { id: "11", name: "Aditya Kumar", username: "adityakumar" },
//       { id: "12", name: "Aisha Khan", username: "aishakhan" },
//     ],
//   };

//   // When year is selected, set the students for that year
//   useEffect(() => {
//     if (selectedYear) {
//       setStudents(studentsByYear[selectedYear] || []);
//       setFilteredStudents(studentsByYear[selectedYear] || []);
//     } else {
//       setStudents([]);
//       setFilteredStudents([]);
//     }
//   }, [selectedYear]);

//   // Filter students based on search query
//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setFilteredStudents(students);
//     } else {
//       const filtered = students.filter(
//         (student) =>
//           student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           student.username.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredStudents(filtered);
//     }
//   }, [searchQuery, students]);

//   const handleSelectAll = () => {
//     if (filteredStudents.length === 0) return;
    
//     const allFilteredIds = filteredStudents.map(student => student.id);
//     const allSelected = allFilteredIds.every(id => selectedStudents.includes(id));
    
//     if (allSelected) {
//       // Deselect all filtered students
//       // const newSelected = selectedStudents.filter(id => !allFilteredIds.includes(id));
//       allFilteredIds.forEach(id => onStudentSelect(id));
//     } else {
//       // Select all filtered students
//       allFilteredIds.forEach(id => {
//         if (!selectedStudents.includes(id)) {
//           onStudentSelect(id);
//         }
//       });
//     }
//   };

//   return (
//     <div>
//       <div
//         className="flex items-center justify-between cursor-pointer"
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//       >
//         <div className="flex items-center">
//           <FaUsers className="mr-2 text-blue-600" />
//           <h3 className="text-xl font-semibold text-gray-800">Select Students</h3>
//         </div>
//         <FaChevronDown
//           className={`transform transition-transform ${
//             isDropdownOpen ? "rotate-180" : ""
//           }`}
//         />
//       </div>

//       {isDropdownOpen && (
//         <div className="mt-4 space-y-4">
//           {/* Year Selection */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Year
//             </label>
//             <select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Select a year</option>
//               {years.map((year) => (
//                 <option key={year.id} value={year.id}>
//                   {year.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Search Bar */}
//           {selectedYear && (
//             <div className="relative">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search students..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//           )}

//           {/* Select All Button */}
//           {selectedYear && filteredStudents.length > 0 && (
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSelectAll}
//                 className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//               >
//                 {filteredStudents.every(student => selectedStudents.includes(student.id))
//                   ? "Deselect All"
//                   : "Select All"}
//               </button>
//             </div>
//           )}

//           {/* Students Grid */}
//           {selectedYear && (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {filteredStudents.map((student) => (
//                 <div
//                   key={student.id}
//                   className={`bg-gray-50 p-4 rounded-lg border-2 transition-all duration-200 ${
//                     selectedStudents.includes(student.id)
//                       ? "border-blue-500 shadow-md"
//                       : "border-gray-200 hover:border-blue-300"
//                   }`}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedStudents.includes(student.id)}
//                       onChange={() => onStudentSelect(student.id)}
//                       className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
//                     />
//                     <div>
//                       <h4 className="font-medium text-gray-900">{student.name}</h4>
//                       <p className="text-sm text-gray-600 mt-1">@{student.username}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentSelection;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaChevronDown, FaSearch } from "react-icons/fa";

const StudentSelection = ({ selectedStudents, onStudentSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Hardcoded years data (optional: you can also fetch this from an API)
  const years = [
    { id: "1", name: "1st Year" },
    { id: "2", name: "2nd Year" },
    { id: "3", name: "3rd Year" },
    { id: "4", name: "4th Year" },
  ];

  // Fetch student data from API when a year is selected.
  useEffect(() => {
    if (selectedYear) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/students?year=${selectedYear}`)
        .then((response) => {
          // Use a default empty array if response.data.students is undefined.
          const fetchedStudents = response.data.students || [];
          setStudents(fetchedStudents);
          setFilteredStudents(fetchedStudents);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
          setStudents([]);
          setFilteredStudents([]);
        });
    } else {
      setStudents([]);
      setFilteredStudents([]);
    }
  }, [selectedYear]);
  

  // Filter students based on search query.
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const handleSelectAll = () => {
    if (filteredStudents.length === 0) return;
    
    const allFilteredIds = filteredStudents.map((student) => student.id);
    const allSelected = allFilteredIds.every((id) =>
      selectedStudents.includes(id)
    );
    
    if (allSelected) {
      // Deselect all filtered students
      allFilteredIds.forEach((id) => onStudentSelect(id));
    } else {
      // Select all filtered students
      allFilteredIds.forEach((id) => {
        if (!selectedStudents.includes(id)) {
          onStudentSelect(id);
        }
      });
    }
  };

  return (
    <div>
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center">
          <FaUsers className="mr-2 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Select Students</h3>
        </div>
        <FaChevronDown
          className={`transform transition-transform ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isDropdownOpen && (
        <div className="mt-4 space-y-4">
          {/* Year Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          {selectedYear && (
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}

          {/* Select All Button */}
          {selectedYear && filteredStudents.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {filteredStudents.every((student) =>
                  selectedStudents.includes(student.id)
                )
                  ? "Deselect All"
                  : "Select All"}
              </button>
            </div>
          )}

          {/* Students Grid */}
          {selectedYear && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`bg-gray-50 p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedStudents.includes(student.id)
                      ? "border-blue-500 shadow-md"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => onStudentSelect(student.id)}
                      className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {student.name}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        @{student.username}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentSelection;
