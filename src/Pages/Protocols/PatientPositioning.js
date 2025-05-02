
import React, { useState , useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function PatientPositioning() {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve registration_id from location.state passed from previous page
  const registrationId = location.state?.registration_id || "";
  const reportId = location.state?.reportId;
  const assignmentId = location.state?.assignmentId;
  const { topicId, courseId } = useParams();
  const [checkedItems, setCheckedItems] = useState({});

  const courseData = {
    "101": {
      title: "Patient Positioning Setup - CT Brain Scan",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with head secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust scanner settings for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back with arms at the sides.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "102": {
      title: "Patient Positioning Setup - CT Brain Contrast Scan",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head-first: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "103": {
      title: "Patient Positioning Setup - CT Stroke Evaluation",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "104": {
      title: "Patient Positioning Setup - CT Brain Head Injury",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement of Head and Neck always.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests, Neck collar  or straps to minimize movement."
          ]
        }
      ]
    },
    "108": {
      title: "Patient Positioning Setup - CT Para Nasal Sinus",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "201": {
      title: "Patient Positioning Setup - 'CT Chest Plain",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "202": {
      title: "Patient Positioning Setup - CT Chest Contrast",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests or straps to minimize movement."
          ]
        }
      ]
    },
    "203": {
      title: "Patient Positioning Setup - CT HRCT Chest",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Head First: Head enters the gantry first.",
            "Centered: Head is positioned in the center of the gantry.",
            "Immobilized: Head is secured with headrests with both hand above or beside the head or straps to minimize movement."
          ]
        }
      ]
    },
    "204": {
      title: "Patient Positioning Setup - CT Coronary Artery Calcium Scoring",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Feet-first: Feet enters the gantry first.",
            "Centered: Chest is positioned in the center of the gantry.",
            "Immobilized: both hand above or beside the head."
          ]
        }
      ]
    },
    "301": {
      title: "Patient Positioning Setup - CT Abdomen Plain",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Feet-first: Feet enters the gantry first.",
            "Centered: Abdomen is positioned in the center of the gantry.",
            "Immobilized: Leg support , both hands are beside the head, proper breathing exercise."
          ]
        }
      ]
    },
    "302": {
      title: "Patient Positioning Setup - CT Abdomen Contrast",
      sections: [
        {
          heading: "Setup",
          items: [
            "Ensure patient is positioned supine with the head and Neck secured in the gantry.",
            "Use immobilizers or cushions to prevent movement.",
            "Adjust the scanner for the brain region."
          ]
        },
        {
          heading: "Standard Positioning",
          items: [
            "Supine: Patient lies flat on the back.",
            "Feet-first: Feet enters the gantry first.",
            "Centered: Abdomen is positioned in the center of the gantry.",
            "Immobilized: Leg support , both hands are beside the head, proper breathing exercise."
          ]
        }
      ]
    },
  };

  useEffect(() => {
    console.log('🚀 Passed reportId:', reportId);
}, [reportId]);

console.log('assignmentId:', assignmentId);
  const courseDetails = courseData[courseId];



  if (!courseDetails) {
    return <h2 className="text-center text-red-600 mt-10 text-2xl">❌ Course Not Found</h2>;
  }

  const handleCheckboxChange = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const allItemsChecked = courseDetails.sections.every((section, sectionIndex) =>
    section.items.every((_, itemIndex) => checkedItems[`${sectionIndex}-${itemIndex}`])
  );

  const handleNext = () => {
    if (!topicId || !courseId) {
      console.error("Missing topicId or courseId");
      return;
    }
    // Pass registration_id to the next page via state
    navigate(
      `/student-dashboard/courses/ongoing/${topicId}/protocols/positioning/${courseId}`,
      { state: { registration_id: registrationId, reportId: reportId, assignmentId: assignmentId } }
    );
  };




  return (
    <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            {courseDetails.title}
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Please complete all required steps
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8 bg-gradient-to-br from-white/95 to-blue-50/95 shadow-inner">
          {/* Clear Instruction Banner */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-lg shadow-sm">
            <p className="text-yellow-800 font-medium text-lg flex items-center">
              <span className="text-yellow-600 text-2xl mr-2">⚠️</span>
              <span>Please go to the patient and place him on the couch as per the instruction below</span>
            </p>
            <p className="text-yellow-700 mt-2 text-sm italic">
              Follow each step carefully and check off once completed
            </p>
          </div>
          
          {courseDetails.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8">
              <div className="bg-blue-50/80 p-4 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-blue-800">{section.heading}</h2>
              </div>
              <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50/40 to-purple-50/40 rounded-lg border border-blue-100/50 shadow-inner">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-4 bg-white p-4 rounded-lg border-l-4 border-blue-300 hover:shadow-md transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={checkedItems[`${sectionIndex}-${itemIndex}`] || false}
                      onChange={() => handleCheckboxChange(sectionIndex, itemIndex)}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                    />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

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

export default PatientPositioning;