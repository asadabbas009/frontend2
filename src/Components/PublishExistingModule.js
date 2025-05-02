import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PublishExistingModule = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/topics`
        );
        setModules(response.data);
        console.log("Modules fetched:", response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModules();
  }, []);

  const handleModuleClick = (moduleId) => {
    console.log("Navigating to module:", moduleId);
    navigate('/teacher-dashboard/teacher-new-modules', { 
      state: { moduleId: moduleId } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Available Modules
            </h2>
          </div>
          
          {/* Description */}
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <p className="text-blue-800 text-center">
              Select a module to assign to students
            </p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {module.description}
                  </p>
                </div>
                <button
                  onClick={() => handleModuleClick(module.id)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Select Module</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {modules.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No modules available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishExistingModule;





// use, prams 

// const {id} = useParams();