// import axios from "axios";
// import React, { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useUser } from "../UserContext";
// import {
//   FaBook,
//   FaTasks,
//   FaChartBar,
//   FaEnvelope,
//   FaUserCircle,
//   FaClipboardList,
//   FaExclamationTriangle,
//   FaCheckCircle,
// } from "react-icons/fa";

// const StudentHome = () => {
//   const [studentDetails, setStudentDetails] = useState(null);
//   const { user } = useUser();
//   // Since the dashboardStats values are static here, we declare them as a constant
//   const [dashboardStats, setDashboardStats] = useState({  
//     approvedAssignments: 0,
//     rejectedAssignments: 0,
//   });

//   const [topics, setTopics] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPendingReports = useCallback(async () => {
//     setLoading(true);
//     try {
//       const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
//       const { data } = await axios.get(
//         `${apiUrl}/api/get-all-report-pdf`,
//         { params: { username: user?.username } }
//       );
//       console.log("data", data);
      
//       // const pendingReports = data.filter(report => report.status === 'pending');
//       const approvedReports = data.filter(report => report.status === 'approved');
//       console.log("approvedReports", approvedReports);
//       const rejectedReports = data.filter(report => report.status === 'rejected');
//       console.log("rejectedReports", rejectedReports);
      
//       setDashboardStats(prev => ({
//         ...prev,
        
//         approvedAssignments: approvedReports.length,
//         rejectedAssignments: rejectedReports.length
//       }));
//     } catch (err) {
//       console.error('Error fetching reports:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [user]);

//   useEffect(() => {
//     fetchPendingReports();
//   }, [fetchPendingReports]);

//   // ✅ Fetch Student Details from sessionStorage
//   useEffect(() => {
//     try {
//       const userStr = sessionStorage.getItem("user");
//       console.log("User from sessionStorage:", userStr);
//       if (!userStr) {
//         console.log("No user in sessionStorage");
//         return;
//       }

//       const storedUser = JSON.parse(userStr);
//       if (storedUser && storedUser.name) {
//         setStudentDetails(storedUser);
//       }
//     } catch (error) {
//       console.error("Error parsing user data:", error);
//     }
//   }, []);

//   // Fetch Topics Data
//   useEffect(() => {
//     const fetchTopics = async () => {
//       try {
//         setLoading(true);
//         const userStr = sessionStorage.getItem("user");
//         if (!userStr) {
//           throw new Error("User not logged in");
//         }

//         const storedUser = JSON.parse(userStr);
//         const apiUrl = process.env.REACT_APP_API_URL;
//         const response = await fetch(`${apiUrl}/api/student/topics/${storedUser.id}`);

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setTopics(data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching topics:", err);
//         setError("Failed to load topics data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (studentDetails && studentDetails.id) {
//       fetchTopics();
//     }
//   }, [studentDetails]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       {/* Main Card */}
//       <div
//         className="w-[90%] mx-auto bg-white p-10 shadow-2xl 
//                    backdrop-blur-lg border border-gray-300 rounded-xl"
//       >
//         {studentDetails ? (
//           <div className="text-center">
//             {/* Profile Section */}
//             <div className="flex flex-col items-center mb-8">
//               <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
//                 <FaUserCircle className="text-7xl drop-shadow-md" />
//               </div>
//               <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md">
//                 <h1 className="text-3xl font-bold">
//                   Welcome, {studentDetails.name}
//                 </h1>
//                 <p className="text-lg mt-1">{studentDetails.role}</p>
//               </div>
//             </div>

//             {/* Statistics Section */}
//             {loading ? (
//               <p className="text-center text-gray-700">Loading topics data...</p>
//             ) : error ? (
//               <p className="text-center text-red-500">{error}</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
//                 <div className="stat-card bg-blue-50 border border-blue-300 text-blue-900 p-6 rounded-lg shadow-lg">
//                   <FaClipboardList className="text-4xl mx-auto text-blue-600 mb-2" />
//                   <h3 className="text-lg font-semibold">Available Topics</h3>
//                   <p className="text-3xl font-bold">{topics.length}</p>
//                 </div>

//                 <div className="stat-card bg-green-50 border border-green-300 text-green-900 p-6 rounded-lg shadow-lg">
//                   <FaExclamationTriangle className="text-4xl mx-auto text-green-600 mb-2" />
//                   <h3 className="text-lg font-semibold">Approved Assignments</h3>
//                   <p className="text-3xl font-bold">
//                     {dashboardStats.approvedAssignments}
//                   </p>
//                 </div>

//                 <div className="stat-card bg-red-50 border border-red-300 text-red-900 p-6 rounded-lg shadow-lg">
//                   <FaCheckCircle className="text-4xl mx-auto text-red-600 mb-2" />
//                   <h3 className="text-lg font-semibold">Rejected Assignments</h3>
//                   <p className="text-3xl font-bold">
//                     {dashboardStats.rejectedAssignments}
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Action Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
//               <Link
//                 to="/student-dashboard/topic"
//                 className="group flex flex-col items-center justify-center gap-3 p-6 
//                            bg-gradient-to-r from-blue-500 to-blue-400 text-white 
//                            rounded-xl shadow-md transition-all duration-300 
//                            cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50"
//               >
//                 <FaBook className="text-4xl group-hover:scale-110 transition-all duration-300" />
//                 <span className="text-lg font-semibold tracking-wide">
//                   My Courses
//                 </span>
//               </Link>

//               <Link
//                 to="/student-dashboard/courses/ongoing"
//                 className="group flex flex-col items-center justify-center gap-3 p-6 
//                            bg-gradient-to-r from-green-500 to-teal-400 text-white 
//                            rounded-xl shadow-md transition-all duration-300 
//                            cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-green-400/50"
//               >
//                 <FaTasks className="text-4xl group-hover:scale-110 transition-all duration-300" />
//                 <span className="text-lg font-semibold tracking-wide">
//                   Report Generation
//                 </span>
//               </Link>

//               <Link
//                 to="/student-dashboard/forums"
//                 className="group flex flex-col items-center justify-center gap-3 p-6 
//                            bg-gradient-to-r from-yellow-500 to-orange-400 text-white 
//                            rounded-xl shadow-md transition-all duration-300 
//                            cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/50"
//               >
//                 <FaChartBar className="text-4xl group-hover:scale-110 transition-all duration-300" />
//                 <span className="text-lg font-semibold tracking-wide">
//                   Forums
//                 </span>
//               </Link>

//               <Link
//                 to="/student-dashboard/student-messages"
//                 className="group flex flex-col items-center justify-center gap-3 p-6 
//                            bg-gradient-to-r from-purple-500 to-pink-500 text-white 
//                            rounded-xl shadow-md transition-all duration-300 
//                            cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-pink-400/50"
//               >
//                 <FaEnvelope className="text-4xl group-hover:scale-110 transition-all duration-300" />
//                 <span className="text-lg font-semibold tracking-wide">
//                   Messages
//                 </span>
//               </Link>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-red-500">
//             Access Denied. Please log in.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentHome;
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../UserContext";
import {
  FaBook,
  FaTasks,
  FaChartBar,
  FaEnvelope,
  FaUserCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const StudentHome = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const { user } = useUser();
  // Since the dashboardStats values are static here, we declare them as a constant
  const [dashboardStats, setDashboardStats] = useState({  
    approvedAssignments: 0,
    rejectedAssignments: 0,
    assignedCases: 0,
  });

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingReports = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
      const { data } = await axios.get(
        `${apiUrl}/api/get-all-report-pdf`,
        { params: { username: user?.username } }
      );
      console.log("data", data);
      
      
      const approvedReports = data.filter(report => report.status === 'approved');
      console.log("approvedReports", approvedReports);
      const rejectedReports = data.filter(report => report.status === 'rejected');
      console.log("rejectedReports", rejectedReports);
      
      setDashboardStats(prev => ({
        ...prev,
        
        approvedAssignments: approvedReports.length,
        rejectedAssignments: rejectedReports.length
      }));
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPendingReports();
  }, [fetchPendingReports]);

  // ✅ Fetch Student Details from sessionStorage
  useEffect(() => {
    try {
      const userStr = sessionStorage.getItem("user");
      console.log("User from sessionStorage:", userStr);
      if (!userStr) {
        console.log("No user in sessionStorage");
        return;
      }

      const storedUser = JSON.parse(userStr);
      if (storedUser && storedUser.name) {
        setStudentDetails(storedUser);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Fetch Topics Data
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const userStr = sessionStorage.getItem("user");
        if (!userStr) {
          throw new Error("User not logged in");
        }

        const storedUser = JSON.parse(userStr);
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/student/topics/${storedUser.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTopics(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics data.");
      } finally {
        setLoading(false);
      }
    };

    if (studentDetails && studentDetails.id) {
      fetchTopics();
    }
  }, [studentDetails]);


  useEffect(() => {
    // don’t run until we actually have an ID
    if (!user?.id) return;
  
    const fetchAssignedCases = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/student/assignments/case/${user.id}`
        );
        console.log("response", response?.data.length);
        setDashboardStats(prev => ({
          ...prev,
          assignedCases: response?.data.length
        }));
      } catch (error) {
        console.error("Error fetching assigned cases:", error);
      }
    };
  
    fetchAssignedCases();
  }, [user.id]);    // ← add user.id here
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Main Card */}
      <div
        className="w-[90%] mx-auto bg-white p-10 shadow-2xl 
                   backdrop-blur-lg border border-gray-300 rounded-xl"
      >
        {studentDetails ? (
          <div className="text-center">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <FaUserCircle className="text-7xl drop-shadow-md" />
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">
                  Welcome, {studentDetails.name}
                </h1>
                <p className="text-lg mt-1">{studentDetails.role}</p>
              </div>
            </div>

            {/* Statistics Section */}
            {loading ? (
              <p className="text-center text-gray-700">Loading topics data...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="stat-card bg-blue-50 border border-blue-300 text-blue-900 p-6 rounded-lg shadow-lg">
                  <FaClipboardList className="text-4xl mx-auto text-blue-600 mb-2" />
                  <h3 className="text-lg font-semibold">Available Topics</h3>
                  <p className="text-3xl font-bold">{topics.length + dashboardStats.assignedCases}</p>
                </div>

                <div className="stat-card bg-green-50 border border-green-300 text-green-900 p-6 rounded-lg shadow-lg">
                  <FaExclamationTriangle className="text-4xl mx-auto text-green-600 mb-2" />
                  <h3 className="text-lg font-semibold">Approved Assignments</h3>
                  <p className="text-3xl font-bold">
                    {dashboardStats.approvedAssignments}
                  </p>
                </div>

                <div className="stat-card bg-red-50 border border-red-300 text-red-900 p-6 rounded-lg shadow-lg">
                  <FaCheckCircle className="text-4xl mx-auto text-red-600 mb-2" />
                  <h3 className="text-lg font-semibold">Rejected Assignments</h3>
                  <p className="text-3xl font-bold">
                    {dashboardStats.rejectedAssignments}
                  </p>
                </div>
              </div>
            )}

            {/* Action Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <Link
                to="/student-dashboard/topic"
                className="group flex flex-col items-center justify-center gap-3 p-6 
                           bg-gradient-to-r from-blue-500 to-blue-400 text-white 
                           rounded-xl shadow-md transition-all duration-300 
                           cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-blue-400/50"
              >
                <FaBook className="text-4xl group-hover:scale-110 transition-all duration-300" />
                <span className="text-lg font-semibold tracking-wide">
                  My Courses
                </span>
              </Link>

              <Link
                to="/student-dashboard/courses/ongoing"
                className="group flex flex-col items-center justify-center gap-3 p-6 
                           bg-gradient-to-r from-green-500 to-teal-400 text-white 
                           rounded-xl shadow-md transition-all duration-300 
                           cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-green-400/50"
              >
                <FaTasks className="text-4xl group-hover:scale-110 transition-all duration-300" />
                <span className="text-lg font-semibold tracking-wide">
                  Report Generation
                </span>
              </Link>

              <Link
                to="/student-dashboard/forums"
                className="group flex flex-col items-center justify-center gap-3 p-6 
                           bg-gradient-to-r from-yellow-500 to-orange-400 text-white 
                           rounded-xl shadow-md transition-all duration-300 
                           cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/50"
              >
                <FaChartBar className="text-4xl group-hover:scale-110 transition-all duration-300" />
                <span className="text-lg font-semibold tracking-wide">
                  Forums
                </span>
              </Link>

              <Link
                to="/student-dashboard/student-messages"
                className="group flex flex-col items-center justify-center gap-3 p-6 
                           bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-xl shadow-md transition-all duration-300 
                           cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-pink-400/50"
              >
                <FaEnvelope className="text-4xl group-hover:scale-110 transition-all duration-300" />
                <span className="text-lg font-semibold tracking-wide">
                  Messages
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">
            Access Denied. Please log in.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentHome;