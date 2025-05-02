// // // import React, { useState, useEffect } from 'react';
// // // import { useNavigate } from "react-router-dom";

// // // const Topic = () => {
// // //   const [topics, setTopics] = useState([]);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchTopics = async () => {
// // //       try {
// // //         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/topics`);
// // //         if (!response.ok) {
// // //           throw new Error(`HTTP error! status: ${response.status}`);
// // //         }
// // //         const data = await response.json();
// // //         setTopics(data);
// // //       } catch (error) {
// // //         console.error('Error fetching topics:', error);
// // //         setError('Failed to fetch topics. Please try again later.');
// // //       }
// // //     };

// // //     fetchTopics();
// // //   }, []);

// // //   const navigate = useNavigate();

// // //   const handleSeeCourses = (topicId, topicTitle) => {
// // //     localStorage.setItem("selectedTopicId", topicId);
// // //     navigate(`/student-dashboard/courses/ongoing/${topicId}`, {
// // //       state: { title: topicTitle }
// // //     });
// // //   };

// // //   return (
// // //     <div className="container mx-auto p-6">
// // //       {/* Heading */}
// // //       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
// // //         Scenarios
// // //       </h1>
  
// // //       {error && <p className="text-red-500 text-center">{error}</p>}
  
// // //       {/* Topics Grid */}
// // //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // //         {topics.map((topic) => (
// // //           <div
// // //             key={topic.id}
// // //             className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
// // //           >
// // //             {/* Card Content */}
// // //             <h2 className="text-xl font-semibold text-gray-900 mb-2">
// // //               {topic.title}
// // //             </h2>
// // //             <p className="text-gray-600 mb-4">{topic.description}</p>
  
// // //             {/* Button */}
// // //             <button
// // //               className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
// // //               onClick={() => handleSeeCourses(topic.id, topic.title)}
// // //             >
// // //               Start Module
// // //             </button>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
  
// // // };

// // // export default Topic;
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from "react-router-dom";

// // const Topic = () => {
// //   const [topics, setTopics] = useState([]);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchTopics = async () => {
// //       try {
// //         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/topics`);
// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }
// //         const data = await response.json();
// //         setTopics(data);
// //       } catch (error) {
// //         console.error('Error fetching topics:', error);
// //         setError('Failed to fetch topics. Please try again later.');
// //       }
// //     };

// //     fetchTopics();
// //   }, []);

// //   const navigate = useNavigate();

// //   const handleTopicClick = (topicId) => {
// //     sessionStorage.setItem("selectedTopicId", topicId);
// //     navigate(`/student-dashboard/courses/ongoing/${topicId}`);
// //   };

// //   return (
// //     <div className="container mx-auto p-6">
// //       {/* Heading */}
// //       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
// //         Scenarios
// //       </h1>
  
// //       {error && <p className="text-red-500 text-center">{error}</p>}
  
// //       {/* Topics Grid */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {topics.map((topic) => (
// //           <div
// //             key={topic.id}
// //             className="relative p-6 bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
// //           >
// //             {/* Card Content */}
// //             <h2 className="text-xl font-semibold text-gray-900 mb-2">
// //               {topic.title}
// //             </h2>
// //             <p className="text-gray-600 mb-4">{topic.description}</p>
  
// //             {/* Button */}
// //             <button
// //               className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
// //               onClick={() => handleTopicClick(topic.id)}
// //             >
// //               Start Module
// //             </button>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
  
// // };

// // export default Topic;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
// import TopicCard from './TopicCard';

// const Topic = () => {
//   const [topics, setTopics] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_API_URL}/api/topics`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setTopics(data);
//       } catch (error) {
//         console.error('Error fetching topics:', error);
//         setError('Failed to fetch topics. Please try again later.');
//       }
//     };

//     fetchTopics();
//   }, []);

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         Scenarios
//       </h1>
//       {error && <p className="text-red-500 text-center">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {topics.map((topic) => (
//           <TopicCard key={topic.id} topic={topic} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Topic;
import React, { useState, useEffect } from 'react';
// import { useNavigate } from "react-router-dom";
import TopicCard from './TopicCard';
import { useUser } from '../UserContext'; // Adjust the path as needed

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/student/topics/${user.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setError('Failed to fetch topics. Please try again later.');
      }
    };

    if (user && user.id) {
      fetchTopics();
    } else {
      setError('User not logged in.');
    }
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Your Modules
      </h1>
  
      {error && <p className="text-red-500 text-center">{error}</p>}
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))
        ) : (
          !error && <p className="text-center text-gray-600 col-span-full">No modules assigned.</p>
        )}
      </div>
    </div>
  );
};

export default Topic;
