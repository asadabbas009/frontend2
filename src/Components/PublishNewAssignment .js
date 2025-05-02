// import React, { useState } from 'react';  
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaBook, FaPaperPlane } from 'react-icons/fa';
// import StudentSelection from './StudentSelection';

// const PublishNewAssignment = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const moduleId = location.state?.moduleId;
//   const [courses, setCourses] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);
  
//   const handleCourseSelect = (courseId) => {
//     setSelectedCourses(prev => {
//       if (prev.includes(courseId)) {
//         return prev.filter(id => id !== courseId);
//       } else {
//         return [...prev, courseId];
//       }
//     });
//   };

//   const handleStudentSelect = (studentId) => {
//     setSelectedStudents(prev => {
//       if (prev.includes(studentId)) {
//         return prev.filter(id => id !== studentId);
//       } else {
//         return [...prev, studentId];
//       }
//     });
//   };

//   const handlePublish = async () => {
//     try {
//       const completeData = {
//         selectedCourses,
//         selectedStudents,
//         moduleId
//       };

//       console.log("Complete assignment data:", completeData);
      
//       // yaha pe api daalna hai
//       // const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/assignments`, completeData);
      
//       alert("Assignment published successfully!");
//       navigate('/teacher-dashboard', { state: { moduleData: completeData } });
//     } catch (error) {
//       console.error("Error publishing assignment:", error);
//       alert("Failed to publish assignment. Please try again.");
//     }
//   };

//   // fetch courses from the database
//   useEffect(() => {
//     const fetchCourses = async() => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/courses/${moduleId}`);
//         console.log("Courses data:", response.data);
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     }
//     fetchCourses();
//   }, [moduleId]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
//           <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
//             <FaBook className="mr-3" />
//             Assign Course
//           </h2>
//         </div>

//         <div className="p-6">
//           {/* Courses Grid */}
//           <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Courses</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {courses.map((course) => (
//                 <div 
//                   key={course.id}
//                   className={`bg-white p-4 rounded-lg border-2 transition-all duration-200 ${
//                     selectedCourses.includes(course.id)
//                       ? 'border-blue-500 shadow-md'
//                       : 'border-gray-200 hover:border-blue-300'
//                   }`}
//                 >
//                   <div className="flex items-start space-x-3">
//                     <input
//                       type="checkbox"
//                       checked={selectedCourses.includes(course.id)}
//                       onChange={() => handleCourseSelect(course.id)}
//                       className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
//                     />
//                     <div>
//                       <h4 className="font-medium text-gray-900">{course.title}</h4>
//                       <p className="text-sm text-gray-600 mt-1">{course.description}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Student Selection Section - Separate Card */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6">
//             <StudentSelection 
//               selectedStudents={selectedStudents}
//               onStudentSelect={handleStudentSelect}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Publish Button Section */}
//       <div className="max-w-4xl mx-auto mt-6">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div className="p-6">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
//                 <p className="text-gray-600 mt-1">
//                   {selectedCourses.length} courses selected • {selectedStudents.length} students selected
//                 </p>
//               </div>
//               <button
//                 onClick={handlePublish}
//                 disabled={selectedCourses.length === 0 || selectedStudents.length === 0}
//                 className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//                   selectedCourses.length === 0 || selectedStudents.length === 0
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
//                 }`}
//               >
//                 <FaPaperPlane className="mr-2" />
//                 Publish Assignment
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublishNewAssignment;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBook, FaPaperPlane } from 'react-icons/fa';
import StudentSelection from './StudentSelection';

const PublishNewAssignment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleId = location.state?.moduleId; // Passed from previous faculty view
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState('');

  // Fetch courses for the given module/topic
  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingCourses(true);
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/courses/${moduleId}`);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to fetch courses.");
      } finally {
        setLoadingCourses(false);
      }
    };

    if (moduleId) fetchCourses();
  }, [moduleId]);

  const handleCourseSelect = (courseId) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handlePublish = async () => {
    try {
      const completeData = {
        moduleId,
        selectedCourses,
        selectedStudents,
      };

      console.log("Complete assignment data:", completeData);

      // POST the assignment data to the backend
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiUrl}/api/assignments`, completeData);

      alert("Assignment published successfully!");
      navigate('/teacher-dashboard/teacher-existing-modules', { state: { moduleData: completeData } });
    } catch (error) {
      console.error("Error publishing assignment:", error);
      alert("Failed to publish assignment. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
            <FaBook className="mr-3" />
            Assign Course
          </h2>
        </div>

        <div className="p-6">
          {/* Courses Grid */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Courses</h3>
            {loadingCourses && <p className="text-center text-gray-600">Loading courses...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div 
                    key={course.id}
                    className={`bg-white p-4 rounded-lg border-2 transition-all duration-200 ${
                      selectedCourses.includes(course.id)
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => handleCourseSelect(course.id)}
                        className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900">{course.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (!loadingCourses && <p className="text-gray-600 text-center col-span-full">
                  No courses available for this module.
                </p>)
              }
            </div>
          </div>
        </div>
      </div>

      {/* Student Selection Section - Separate Card */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <StudentSelection 
              selectedStudents={selectedStudents}
              onStudentSelect={handleStudentSelect}
            />
          </div>
        </div>
      </div>

      {/* Publish Button Section */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
                <p className="text-gray-600 mt-1">
                  {selectedCourses.length} courses selected • {selectedStudents.length} students selected
                </p>
              </div>
              <button
                onClick={handlePublish}
                disabled={selectedCourses.length === 0 || selectedStudents.length === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCourses.length === 0 || selectedStudents.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <FaPaperPlane className="mr-2" />
                Publish Assignment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishNewAssignment;
