// // import React from 'react'
// // import { useNavigate,useParams } from 'react-router-dom'


// // function PostCounselling() {

// //   const { topicId, courseId } = useParams();
// //   const navigate = useNavigate();


// //   const handleNext = () => {
// //     navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`);
// //   }


// //   return (
// //     <div className="flex relative min-h-full " >
// //       <h1 className='text-center  w-full  items-center text-[30px]'>Post-Conselling</h1>
// //       <button onClick={handleNext}
// //       className="mt-4 absolute bottom-0 mr-10 mb-10 right-0 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all">Take Quiz</button>
// //     </div>
   
// //   )
// // }

// // export default PostCounselling

// // import React from 'react';
// // import { useNavigate, useParams, useLocation } from 'react-router-dom';

// // function PostCounselling() {
// //   const { topicId, courseId } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // Retrieve registration_id from the previous page's state
// //   const registrationId = location.state?.registration_id || "";

// //   const handleNext = () => {
// //     navigate(
// //       `/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`,
// //       { state: { registration_id: registrationId } }
// //     );
// //   };

// //   return (
// //     <div className="flex relative min-h-full">
// //       <h1 className="text-center w-full items-center text-[30px]">Post-Conselling</h1>
// //       <button
// //         onClick={handleNext}
// //         className="mt-4 absolute bottom-0 mr-10 mb-10 right-0 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
// //       >
// //         Take Quiz
// //       </button>
// //     </div>
// //   );
// // }

// // export default PostCounselling;



// import React from 'react'
// import { useNavigate, useParams, useLocation } from 'react-router-dom';


// function PostCounselling() {
//   const { topicId, courseId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Retrieve registration_id from the previous page's state
//   const registrationId = location.state?.registration_id || "";

//   const handleNext = () => {
//     navigate(
//       `/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`,
//       { state: { registration_id: registrationId } }
//     );
//   };


//   // Post-counselling data for different course IDs
//   const counsellingData = {
//     "101": {
//       title: "Post-Care",
//       mainPoints: [
//         "Patient is shifted carefully.",
//         "Patient is comfortable.",
//         "Patient is aware when and where to collect the report."
//       ],
//       instructions: []
//     },
//     "102": {
//       title: "Post-Care",
//       mainPoints: [
//         "Patient is shifted carefully.",
//         "Patient is comfortable.",
//         "Patient is aware when and where to collect the report."
//       ],
//       instructions: [
//         {
//           title: "Post Control Instructions to Patients",
//           points: [
//             "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
//             "Drink about 5 glasses of water."
//           ]
//         },
//         {
//           title: "Home Care Instructions",
//           points: [
//             "Redness, swelling or soreness around injection area?",
//             "Apply warm wet towel 4 times a day for 15-20 mins.",
//             "If continues more than 48 hours - call your doctor."
//           ]
//         }
//       ]
//     },
//     "103": {
//       title: "Post-Care",
//       mainPoints: [
//         "Patient is shifted carefully.",
//         "Patient is comfortable.",
//         "Patient is aware when and where to collect the report."
//       ],
//       instructions: [
//         {
//           title: "Post Control Instructions to Patients",
//           points: [
//             "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
//             "Drink about 5 glasses of water."
//           ]
//         },
//         {
//           title: "Home Care Instructions",
//           points: [
//             "Redness, swelling or soreness around injection area?",
//             "Apply warm wet towel 4 times a day for 15-20 mins.",
//             "If continues more than 48 hours - call your doctor."
//           ]
//         }
//       ]
//     }
//   };

//   // Get data for current course or use a default if not found
//   const currentData = counsellingData[courseId] || {
//     title: "Post-Care",
//     mainPoints: ["No specific post-care instructions available for this course."],
//     instructions: []
//   };

//   return (
//     <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center mb-8">
//           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
//             <span className="text-xl text-white">🩺</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-800">Post-Counselling</h1>
//         </div>

//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
//           <div className="bg-blue-600 px-6 py-4">
//             <h2 className="text-xl font-semibold text-white">{currentData.title}</h2>
//           </div>

//           <div className="p-6 space-y-6">
//             {/* Main points */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Ensure That:</h3>
//               <ul className="space-y-2 list-disc list-inside text-gray-700 ml-2">
//                 {currentData.mainPoints.map((point, index) => (
//                   <li key={index} className="pl-2">{point}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* Additional instructions */}
//             {currentData.instructions.map((section, index) => (
//               <div key={index} className="mt-4">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h3>
//                 <ul className="space-y-2 list-disc list-inside text-gray-700 ml-2">
//                   {section.points.map((point, idx) => (
//                     <li key={idx} className="pl-2">{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleNext}
//             className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all flex items-center gap-2"
//           >
//             Proceed to Quiz
//             <span className="text-xl">➡️</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostCounselling

// import React from 'react'
// import { useNavigate,useParams } from 'react-router-dom'


// function PostCounselling() {

//   const { topicId, courseId } = useParams();
//   const navigate = useNavigate();


//   const handleNext = () => {
//     navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`);
//   }


//   return (
//     <div className="flex relative min-h-full " >
//       <h1 className='text-center  w-full  items-center text-[30px]'>Post-Conselling</h1>
//       <button onClick={handleNext}
//       className="mt-4 absolute bottom-0 mr-10 mb-10 right-0 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all">Take Quiz</button>
//     </div>
   
//   )
// }

// export default PostCounselling

// import React from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';

// function PostCounselling() {
//   const { topicId, courseId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Retrieve registration_id from the previous page's state
//   const registrationId = location.state?.registration_id || "";

//   const handleNext = () => {
//     navigate(
//       `/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`,
//       { state: { registration_id: registrationId } }
//     );
//   };

//   return (
//     <div className="flex relative min-h-full">
//       <h1 className="text-center w-full items-center text-[30px]">Post-Conselling</h1>
//       <button
//         onClick={handleNext}
//         className="mt-4 absolute bottom-0 mr-10 mb-10 right-0 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
//       >
//         Take Quiz
//       </button>
//     </div>
//   );
// }

// export default PostCounselling;



import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';


function PostCounselling() {
  const { topicId, courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve registration_id from the previous page's state
  const registrationId = location.state?.registration_id || "";

  const handleNext = () => {
    navigate(
      `/student-dashboard/courses/ongoing/${topicId}/protocols/quiz/${courseId}`,
      { state: { registration_id: registrationId } }
    );
  };


  // Post-counselling data for different course IDs
  const counsellingData = {
    "101": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: []
    },
    "102": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: [
        {
          title: "Post Control Instructions to Patients",
          points: [
            "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
            "Drink about 5 glasses of water."
          ]
        },
        {
          title: "Home Care Instructions",
          points: [
            "Redness, swelling or soreness around injection area?",
            "Apply warm wet towel 4 times a day for 15-20 mins.",
            "If continues more than 48 hours - call your doctor."
          ]
        }
      ]
    },
    "103": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: [
        {
          title: "Post Control Instructions to Patients",
          points: [
            "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
            "Drink about 5 glasses of water."
          ]
        },
        {
          title: "Home Care Instructions",
          points: [
            "Redness, swelling or soreness around injection area?",
            "Apply warm wet towel 4 times a day for 15-20 mins.",
            "If continues more than 48 hours - call your doctor."
          ]
        }
      ]
    },
    "105": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: []
    },
    "201": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: [
        {
          title: "Post Control Instructions to Patients",
          points: [
            "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
            "Drink about 5 glasses of water."
          ]
        },
        {
          title: "Home Care Instructions",
          points: [
            "Redness, swelling or soreness around injection area?",
            "Apply warm wet towel 4 times a day for 15-20 mins.",
            "If continues more than 48 hours - call your doctor."
          ]
        }
      ]
    },
    "202": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: [
        {
          title: "Post Control Instructions to Patients",
          points: [
            "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
            "Drink about 5 glasses of water."
          ]
        },
        {
          title: "Home Care Instructions",
          points: [
            "Redness, swelling or soreness around injection area?",
            "Apply warm wet towel 4 times a day for 15-20 mins.",
            "If continues more than 48 hours - call your doctor."
          ]
        }
      ]
    },
    "203": {
      title: "Post-Care",
      mainPoints: [
        "Patient is shifted carefully.",
        "Patient is comfortable.",
        "Patient is aware when and where to collect the report."
      ],
      instructions: [
        {
          title: "Post Control Instructions to Patients",
          points: [
            "After your CT scan you will be observed for any complications by the hospital staff for 15-20 minutes.",
            "Drink about 5 glasses of water."
          ]
        },
        {
          title: "Home Care Instructions",
          points: [
            "Redness, swelling or soreness around injection area?",
            "Apply warm wet towel 4 times a day for 15-20 mins.",
            "If continues more than 48 hours - call your doctor."
          ]
        }
      ]
    },
  };

  // Get data for current course or use a default if not found
  const currentData = counsellingData[courseId] || {
    title: "Post-Care",
    mainPoints: ["No specific post-care instructions available for this course."],
    instructions: []
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl text-white">🩺</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Post-Counselling</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">{currentData.title}</h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Main points */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Ensure That:</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700 ml-2">
                {currentData.mainPoints.map((point, index) => (
                  <li key={index} className="pl-2">{point}</li>
                ))}
              </ul>
            </div>

            {/* Additional instructions */}
            {currentData.instructions.map((section, index) => (
              <div key={index} className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700 ml-2">
                  {section.points.map((point, idx) => (
                    <li key={idx} className="pl-2">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10 mb-6">
          <button
            onClick={handleNext}
            className="w-40 py-3 rounded-lg text-base font-medium transition duration-200 shadow-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCounselling