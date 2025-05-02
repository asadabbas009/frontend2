

// export default PatientPreparation;
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate,useLocation  } from "react-router-dom";

// Course Data Object
const courseData = {
  "101": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "102": {
    title: "Patient Preparation",
    duration: "25-30 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 25-30 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure IV line is properly placed and check for patency.",
      "Confirm patient has no contraindications for contrast (allergies, kidney issues).",
      "Verify premedication has been administered if required.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "103": {
    title: "Patient Preparation",
    duration: "20-25 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 20-25 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure IV line is properly placed and check for patency.",
      "Confirm patient has no contraindications for contrast (allergies, kidney issues).",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "104": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "108": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "201": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "202": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "203": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "204": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "301": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  },
  "302": {
    title: "Patient Preparation",
    duration: "15-20 minutes",
    instructions: [
      "Walk to the Master Workstation",
      "Use the microphone to clearly instruct the patient",
      "Ensure all preparation steps are completed before proceeding"
    ],
    patientInstructions: [
      "Please remove all metallic items (jewelry, glasses, dentures).",
      "The procedure will take approximately 15-20 minutes; you may hear some noise.",
      "Confirm patient is in a hospital gown.",
      "Ensure patient is correctly positioned (mentally and physically prepared)."
    ]
  }
};

function PatientPreparation() {
  const { topicId, courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve registration_id from location.state passed from previous page
  const registrationId = location.state?.registration_id || "";
  const reportId = location.state?.reportId || "";
  const assignmentId = location.state?.assignmentId;
  const courseDetails = courseData[courseId];
  const [checkedItems, setCheckedItems] = useState({});

  // Voice recording states and refs
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [isInteracting, setIsInteracting] = useState(false);

  console.log('assignmentId:', assignmentId);
  useEffect(() => {
    console.log('🚀 Passed reportId:', reportId);
}, [reportId]);
  if (!courseDetails) {
    return (
      <h2 className="text-center text-red-600 mt-10 text-2xl">
        ❌ Course Not Found
      </h2>
    );
  }

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const allItemsChecked = courseDetails.patientInstructions.every((_, index) => 
    checkedItems[index]
  );

  const handleNext = () => {
    if (!topicId || !courseId) {
      console.error("Missing topicId or courseId");
      return;
    }
    // Pass registration_id to the next page via state
    navigate(
      `/student-dashboard/courses/ongoing/${topicId}/protocols/patient-positioning/${courseId}`,
      { state: { registration_id: registrationId , reportId: reportId, assignmentId: assignmentId } }
    );
  };
   

  // Function to handle voice recording toggle
  const handleRecordClick = async () => {
    if (!isRecording) {
      // Start recording: request permission and initialize MediaRecorder
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recordedChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            recordedChunksRef.current.push(event.data);
          }
        });
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
          const url = URL.createObjectURL(audioBlob);
          setAudioURL(url);
          // Stop all tracks to free the mic
          stream.getTracks().forEach((track) => track.stop());
        });
        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const handleInteract = () => {
    setIsInteracting(true);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            {courseDetails.title}
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Prepare the patient for the CT scan procedure
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8 bg-gradient-to-br from-white/95 to-blue-50/95 shadow-inner">
          {/* Student Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 mb-8 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-blue-800 mb-3">Instructions to Student</h2>
            <ul className="space-y-2 list-disc pl-5">
              {courseDetails.instructions.map((instruction, index) => (
                <li key={index} className="text-blue-700 font-medium">
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {/* Interaction Button */}
          {!isInteracting ? (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleInteract}
                className="animate-pulse bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg text-xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Click here to Interact
              </button>
            </div>
          ) : (
            <div className="space-y-6 mb-8">
              {/* Patient Instructions Checklist */}
              <div className="bg-blue-50/80 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-blue-800">
                  Patient Instructions Checklist
                </h2>
              </div>
              <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50/40 to-purple-50/40 rounded-lg border border-blue-100/50 shadow-inner">
                {courseDetails.patientInstructions.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg border-l-4 border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[index] || false}
                      onChange={() => handleCheckboxChange(index)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="text-gray-700">{instruction}</span>
                  </div>
                ))}
              </div>

              {/* Voice Recording Section */}
              <div className="flex flex-col items-center mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Use Microphone to Instruct Patient</h3>
                <button
                  onClick={handleRecordClick}
                  className={`w-48 h-48 rounded-full flex items-center justify-center transition duration-200 shadow-lg ${
                    isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isRecording ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>
                <p className="mt-3 text-gray-600">
                  {isRecording ? "Recording... Click to stop" : "Click to start recording"}
                </p>
                {audioURL && (
                  <div className="mt-6 w-full">
                    <p className="text-gray-700 font-medium mb-2">Your recorded instructions:</p>
                    <audio controls src={audioURL} className="w-full"></audio>
                  </div>
                )}
              </div>
              
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-center mt-10 mb-6">
            <button
              onClick={handleNext}
              disabled={!allItemsChecked}
              className={`w-40 py-3 rounded-lg text-base font-medium transition duration-200 shadow-md ${
                allItemsChecked
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientPreparation;