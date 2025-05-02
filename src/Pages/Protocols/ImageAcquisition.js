import React from "react";
import { useNavigate, useParams,useLocation  } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../../UserContext";

const ImageAcquisition = () => {
    const navigate = useNavigate();
    const { topicId, courseId } = useParams();
    const location = useLocation();
    // Retrieve registration_id from the location state
    const registrationId = location.state?.registration_id || "";
    const reportId = location.state?.reportId || ""; // Optional: if you need reportId as well
    const assignmentId = location.state?.assignmentId;
    const { user } = useUser();

    const handleNext = () => {
        // Pass registration_id via state to the next route
        navigate(
            `/student-dashboard/courses/ongoing/${topicId}/protocols/image-analysis/${courseId}`,
            { state: { registration_id: registrationId,reportId: reportId, assignmentId: assignmentId } }
        );
    };



    useEffect(() => {
        console.log('🚀 Passed reportId:', reportId);
    }, [reportId]);

    console.log('Assignment ID:', assignmentId);
    
    return (
        <div className="relative  flex flex-col items-center justify-center min-h-full bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mt-[-400px] text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl text-white">📷</span>
                </span>
                <span className="bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text">CT Image Acquisition Guide</span>
            </h1>

            
            <button
                onClick={handleNext}
                className="absolute bottom-6 right-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                Next ➡️
            </button>

           

            {/* Steps  */}
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Acquisition Process Guide
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 1: Login to the System</p>
                        <p className="text-sm text-gray-600">Ensure the student logs into the workstation using their assigned credentials.</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 2: Navigate to the CT Scan Simulator</p>
                        <p className="text-sm text-gray-600">Open the application on the master workstation and verify all components are functioning.</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 3: Enter Patient Details</p>
                        <p className="text-sm text-gray-600">UserId: {user.id} <br />ID: {registrationId}</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 4: Select Scan Protocol</p>
                        <p className="text-sm text-gray-600">Choose the appropriate protocol based on examination requirements.</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 5: Position the Patient</p>
                        <p className="text-sm text-gray-600">Verify proper positioning in the gantry with laser guidance.</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-medium text-blue-800">Step 6: Acquire Images</p>
                        <p className="text-sm text-gray-600">Initiate the scan sequence and monitor the process.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageAcquisition;
