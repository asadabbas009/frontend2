import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBook, FaClipboardCheck, FaPlay } from "react-icons/fa";

const StudentCaseScenario = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        setLoading(true);
        
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        const userId = user.id;
        
        if (!userId) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/student/assignments/case/${user.id}`
        );
        console.log("response", response?.data);
        

        setAssignments(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching assigned cases:", error);
        setError("Failed to load assigned cases");
        setLoading(false);
      }
    };

    fetchAssignedCases();
  }, []);

  const handleStartModule = (moduleId, courseId) => {
    
    localStorage.setItem("selectedTopicId", moduleId);
    localStorage.setItem("selectedCourseId", courseId);
    
    
    navigate(`/student-dashboard/courses/ongoing/${moduleId}/protocols/course-overview/${courseId}`);
  };

  const viewCaseDetails = (caseData) => {
    setSelectedCase(caseData);
  };

  const closeDetails = () => {
    setSelectedCase(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div 
          className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden transition-all hover:shadow-xl"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
              <FaBook className="mr-4 text-blue-200" />
              Assigned Case Scenarios
            </h2>
            <p className="text-blue-100 text-center mt-3 text-lg">
              View your assigned case scenarios and start working on modules
            </p>
          </div>
        </div>

        {/* Error display */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-5 mb-8 rounded-md shadow">
            <p>{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Case listing */}
            {assignments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-10 text-center">
                <p className="text-gray-600 text-lg">No case scenarios assigned yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-800">{assignment.title}</h3>
                        <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">{assignment.moduleName}</span>
                      </div>
                      <p className="text-gray-600 mb-6 line-clamp-2">{assignment.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mt-auto">
                        <button
                          onClick={() => viewCaseDetails(assignment)}
                          className="flex items-center justify-center px-5 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-medium"
                        >
                          <FaClipboardCheck className="mr-2" />
                          View Details
                        </button>
                        
                        <button
                          onClick={() => handleStartModule(assignment.moduleId, assignment.courseId)}
                          className="flex items-center justify-center px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <FaPlay className="mr-2" />
                          Start Module
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Case details modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{selectedCase.title}</h3>
                <button
                  onClick={closeDetails}
                  className="text-white hover:text-red-200 transition p-2 rounded-full hover:bg-white/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Assignment Details</h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">{selectedCase.description}</p>
                    
                    <div className="bg-blue-50 p-5 rounded-xl mb-4 border border-blue-100">
                      <h5 className="font-medium text-blue-800 mb-2 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Evaluation Criteria
                      </h5>
                      <p className="text-blue-700">{selectedCase.criteria}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Module Information</h4>
                    <ul className="space-y-4">
                      <li key="module-name" className="flex items-start">
                        <span className="font-medium text-gray-700 mr-2 min-w-[100px]">Module:</span>
                        <span className="text-gray-600">{selectedCase.moduleName}</span>
                      </li>
                      <li key="course-name" className="flex items-start">
                        <span className="font-medium text-gray-700 mr-2 min-w-[100px]">Course:</span>
                        <span className="text-gray-600">{selectedCase.courseNames}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => {
                      handleStartModule(selectedCase.moduleId, selectedCase.courseId);
                      closeDetails();
                    }}
                    className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-lg"
                  >
                    <FaPlay className="mr-3" />
                    Start Module Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCaseScenario; 