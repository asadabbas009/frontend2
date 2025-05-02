// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const TopicCard = ({ topic }) => {
//   // const [assignments, setAssignments] = useState([]);
//   // const [loadingAssignments, setLoadingAssignments] = useState(false);
//   // const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       setLoadingAssignments(true);
//       try {
//         const apiUrl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(`${apiUrl}/api/assignments/topic/${topic.id}`);
//         setAssignments(response.data);
//       } catch (err) {
//         console.error(`Error fetching assignments for topic ${topic.id}:`, err);
//         // setError('Failed to load assignments.');
//       } finally {
//         setLoadingAssignments(false);
//       }
//     };

//     fetchAssignments();
//   }, [topic.id]);

//   const handleTopicClick = () => {
//     sessionStorage.setItem("selectedTopicId", topic.id);
//     navigate(`/student-dashboard/courses/ongoing/${topic.id}`);
//   };

//   return (
//     <div className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
//       <h2 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
//       <p className="text-gray-600 mb-4">{topic.description}</p>
//       <button
//         className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md mb-4"
//         onClick={handleTopicClick}
//       >
//         Start Module
//       </button>
//       {/* <div>
//         <h3 className="text-lg font-semibold text-gray-800 mb-2">Assignments</h3>
//         {loadingAssignments && <p className="text-gray-600">Loading assignments...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {(!loadingAssignments && assignments.length === 0) && (
//           <p className="text-gray-600">No assignments published.</p>
//         )}
//         <ul className="list-disc list-inside">
//           {assignments.map((assignment) => (
//             <li key={assignment.assignmentId} className="text-sm text-gray-700">
//               Assignment #{assignment.assignmentId} 
//               {assignment.courseIds && (
//                 <span> (Courses: {assignment.courseIds.split(',').join(', ')})</span>
//               )}
//               <br />
//               <span className="text-xs text-gray-500">
//                 {new Date(assignment.created_at).toLocaleString()}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div> */}
//     </div>
//   );
// };

// export default TopicCard;
import React from 'react';
import { useNavigate } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const navigate = useNavigate();

  const handleTopicClick = () => {
    sessionStorage.setItem("selectedTopicId", topic.id);
    navigate(`/student-dashboard/courses/ongoing/${topic.id}`);
  };

  return (
    <div className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h2>
      <p className="text-gray-600 mb-4">{topic.description}</p>
      <button
        className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md mb-4"
        onClick={handleTopicClick}
      >
        Start Module
      </button>
    </div>
  );
};

export default TopicCard;