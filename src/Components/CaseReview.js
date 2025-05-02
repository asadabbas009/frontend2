// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const CaseReview = () => {
// //   const [students, setStudents] = useState([]); // List of all students
// //   const [selectedStudent, setSelectedStudent] = useState(""); // Selected student
// //   const [cases, setCases] = useState([]); // Cases assigned to the selected student
// //   const [selectedCase, setSelectedCase] = useState(""); // Selected case ID
// //   const [caseDetails, setCaseDetails] = useState(null); // Details of the selected case
// //   const [error, setError] = useState(""); // Error message
// //   const [loading, setLoading] = useState(false); // Loading state

// //   // Fetch all students on component mount
// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/api/students");
// //         setStudents(response.data);
// //       } catch (err) {
// //         console.error("Error fetching students:", err);
// //         setError("Failed to fetch students.");
// //       }
// //     };
// //     fetchStudents();
// //   }, []);

// //   // Fetch cases when a student is selected
// //   useEffect(() => {
// //     if (selectedStudent) {
// //       const fetchCases = async () => {
// //         try {
// //           const response = await axios.get(
// //             `http://localhost:5000/api/student-assignments/${selectedStudent}`
// //           );
// //           setCases(response.data);
// //         } catch (err) {
// //           console.error("Error fetching cases:", err);
// //           setError("Failed to fetch cases.");
// //         }
// //       };
// //       fetchCases();
// //     }
// //   }, [selectedStudent]);

// //   // Fetch case details when "Search" is clicked
// // //   const handleSearch = async () => {
// // //     if (!selectedCase) {
// // //       setError("Please select a case.");
// // //       return;
// // //     }
// // //     setError("");
// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.get("http://localhost:5000/api/teacher-data", {
// // //         params: { studentName: selectedStudent, caseId: selectedCase },
// // //       });
// // //       setCaseDetails(response.data);
// // //     } catch (err) {
// // //       console.error("Error fetching case details:", err);
// // //       setError("Failed to fetch case details.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // const handleSearch = async () => {
// //     if (!selectedCase) {
// //         setError("Please select a case.");
// //         return;
// //     }
// //     try {
// //         const response = await axios.get("http://localhost:5000/api/teacher-data", {
// //             params: { studentName: selectedStudent, caseId: selectedCase },
// //         });
// //         setCaseDetails(response.data);
// //     } catch (err) {
// //         console.error("Error fetching case details:", err.message);
// //         setError("Failed to fetch case details.");
// //     }
// // };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Case Details</h2>

// //       {/* Dropdowns */}
// //       <div className="mb-6">
// //         {/* Select Student */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Select Student</label>
// //           <select
// //             value={selectedStudent}
// //             onChange={(e) => {
// //               setSelectedStudent(e.target.value);
// //               setCases([]); // Clear cases when student changes
// //               setCaseDetails(null); // Clear previous details
// //             }}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
// //           >
// //             <option value="">-- Select Student --</option>
// //             {students.map((student) => (
// //               <option key={student.id} value={student.name}>
// //                 {student.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Select Case */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Select Case</label>
// //           <select
// //             value={selectedCase}
// //             onChange={(e) => setSelectedCase(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
// //             disabled={!cases.length}
// //           >
// //             <option value="">-- Select Case --</option>
// //             {cases.map((caseItem) => (
// //               <option key={caseItem.caseId} value={caseItem.caseId}>
// //                 {caseItem.title || `Case ${caseItem.caseId}`}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <button
// //           onClick={handleSearch}
// //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           Search
// //         </button>
// //       </div>

// //       {/* Loading State */}
// //       {loading && <p>Loading case details...</p>}

// //       {/* Error Message */}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {/* Case Details */}
// //       {caseDetails && (
// //         <div className="p-6 bg-white border border-gray-200 rounded shadow-md">
// //           <h3 className="text-xl font-bold mb-4">Case Details</h3>
// //           <p><strong>Student Name:</strong> {caseDetails[0]?.student_name || "N/A"}</p>
// //           <p><strong>Case Title:</strong> {caseDetails[0]?.case_title || "N/A"}</p>
// //           <p><strong>Patient Name:</strong> {caseDetails[0]?.patient_name || "N/A"}</p>
// //           <h4 className="font-bold mt-4">Questions & Answers</h4>
// //           <ul className="list-disc pl-5">
// //             {caseDetails.map((detail, index) => (
// //               <li key={index}>
// //                 <strong>Q:</strong> {detail.question || "N/A"} <br />
// //                 <strong>A:</strong> {detail.answer || "N/A"}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CaseReview;


// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const CaseReview = () => {
// //   const [students, setStudents] = useState([]);
// //   const [selectedStudent, setSelectedStudent] = useState("");
// //   const [cases, setCases] = useState([]);
// //   const [selectedCase, setSelectedCase] = useState("");
// //   const [caseDetails, setCaseDetails] = useState(null);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [feedback, setFeedback] = useState("");

// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:8080/api/students");
// //         setStudents(response.data);
// //       } catch (err) {
// //         console.error("Error fetching students:", err);
// //         setError("Failed to fetch students.");
// //       }
// //     };
// //     fetchStudents();
// //   }, []);

// //   useEffect(() => {
// //     if (selectedStudent) {
// //       const fetchCases = async () => {
// //         try {
// //           const response = await axios.get(
// //             `http://localhost:8080/api/student-assignments/${selectedStudent}`
// //           );
// //           setCases(response.data);
// //         } catch (err) {
// //           console.error("Error fetching cases:", err);
// //           setError("Failed to fetch cases.");
// //         }
// //       };
// //       fetchCases();
// //     }
// //   }, [selectedStudent]);

// //   const handleSearch = async () => {
// //     if (!selectedCase) {
// //       setError("Please select a case.");
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       const response = await axios.get("http://localhost:8080/api/teacher-data", {
// //         params: { studentName: selectedStudent, caseId: selectedCase },
// //       });
// //       setCaseDetails(response.data);
// //     } catch (err) {
// //       console.error("Error fetching case details:", err.message);
// //       setError("Failed to fetch case details.");
// //     }
// //   };

// //   const handleFeedbackSubmit = async () => {
// //     try {
// //       await axios.post("http://localhost:8080/api/submit-feedback", {
// //         caseId: selectedCase,
// //         feedback,
// //       });
// //       alert("Feedback submitted successfully!");
// //       setFeedback("");
// //     } catch (err) {
// //       console.error("Error submitting feedback:", err);
// //       setError("Failed to submit feedback.");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-bold mb-4">Case Review</h2>

// //       <div className="mb-6">
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Select Student</label>
// //           <select
// //             value={selectedStudent}
// //             onChange={(e) => {
// //               setSelectedStudent(e.target.value);
// //               setCases([]);
// //               setCaseDetails(null);
// //             }}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
// //           >
// //             <option value="">-- Select Student --</option>
// //             {students.map((student) => (
// //               <option key={student.id} value={student.name}>
// //                 {student.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="mb-4">
// //           <label className="block text-sm font-medium text-gray-700">Select Case</label>
// //           <select
// //             value={selectedCase}
// //             onChange={(e) => setSelectedCase(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
// //             disabled={!cases.length}
// //           >
// //             <option value="">-- Select Case --</option>
// //             {cases.map((caseItem) => (
// //               <option key={caseItem.caseId} value={caseItem.caseId}>
// //                 {caseItem.title || `Case ${caseItem.caseId}`}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <button
// //           onClick={handleSearch}
// //           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //         >
// //           Search
// //         </button>
// //       </div>

// //       {loading && <p>Loading case details...</p>}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {caseDetails && (
// //         <div className="flex gap-4">
// //           <div className="p-6 bg-white border border-gray-200 rounded shadow-md w-1/2">
// //             <h3 className="text-xl font-bold mb-4">Registration Details</h3>
// //             <p><strong>Student Name:</strong> {caseDetails[0]?.student_name || "N/A"}</p>
// //             <p><strong>Case Title:</strong> {caseDetails[0]?.case_title || "N/A"}</p>
// //             <p><strong>Patient Name:</strong> {caseDetails[0]?.patient_name || "N/A"}</p>
// //           </div>
// //           <div className="p-6 bg-white border border-gray-200 rounded shadow-md w-1/2">
// //             <h4 className="font-bold mb-4">Questions & Answers</h4>
// //             <ul className="list-disc pl-5">
// //               {caseDetails.map((detail, index) => (
// //                 <li key={index}>
// //                   <strong>Q:</strong> {detail.question || "N/A"} <br />
// //                   <strong>A:</strong> {detail.answer || "N/A"}
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       )}

// //       {caseDetails && (
// //         <div className="mt-4 p-6 bg-white border border-gray-200 rounded shadow-md">
// //           <label className="block text-sm font-medium text-gray-700">Feedback</label>
// //           <input
// //             type="text"
// //             value={feedback}
// //             onChange={(e) => setFeedback(e.target.value)}
// //             className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
// //             placeholder="Enter feedback here"
// //           />
// //           <button
// //             onClick={handleFeedbackSubmit}
// //             className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// //           >
// //             Submit Feedback
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CaseReview;


// import React, { useState } from "react";

// const AssignModules = () => {
//   const [moduleList, setModuleList] = useState([
//     { id: 1, name: "Module A" },
//     { id: 2, name: "Module B" },
//     { id: 3, name: "Module C" },
//   ]);

//   const [selectedModuleId, setSelectedModuleId] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   const [students] = useState([
//     { id: "stud1", name: "Student 1" },
//     { id: "stud2", name: "Student 2" },
//     { id: "groupX", name: "Group X" },
//   ]);

//   const handleAssign = () => {
//     // Logic to assign the module to selected students/groups
//     console.log("Assigning module:", selectedModuleId, "to", selectedStudents);
//     // Clear selections
//     setSelectedModuleId("");
//     setSelectedStudents([]);
//   };

//   return (
//     <div>
//       <h2>Assign Modules</h2>
//       <div>
//         <label>Choose a Module: </label>
//         <select
//           value={selectedModuleId}
//           onChange={(e) => setSelectedModuleId(e.target.value)}
//         >
//           <option value="">-- Select --</option>
//           {moduleList.map((mod) => (
//             <option key={mod.id} value={mod.id}>
//               {mod.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div style={{ marginTop: "1rem" }}>
//         <label>Select Students/Groups: </label>
//         <select
//           multiple
//           value={selectedStudents}
//           onChange={(e) =>
//             setSelectedStudents(Array.from(e.target.selectedOptions, (option) => option.value))
//           }
//         >
//           {students.map((s) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button style={{ marginTop: "1rem" }} onClick={handleAssign}>
//         Assign
//       </button>
//     </div>
//   );
// };

// export default AssignModules;
import React, { useState } from "react";

const AssignModules = () => {
  // Removed the unused setModuleList to fix the ESLint warning
  const [moduleList] = useState([
    { id: 1, name: "Module A" },
    { id: 2, name: "Module B" },
    { id: 3, name: "Module C" },
  ]);

  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [students] = useState([
    { id: "stud1", name: "Student 1" },
    { id: "stud2", name: "Student 2" },
    { id: "groupX", name: "Group X" },
  ]);

  const handleAssign = () => {
    // Logic to assign the module to selected students/groups
    console.log("Assigning module:", selectedModuleId, "to", selectedStudents);
    // Clear selections
    setSelectedModuleId("");
    setSelectedStudents([]);
  };

  return (
    <div>
      <h2>Assign Modules</h2>
      <div>
        <label>Choose a Module: </label>
        <select
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
        >
          <option value="">-- Select --</option>
          {moduleList.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Select Students/Groups: </label>
        <select
          multiple
          value={selectedStudents}
          onChange={(e) =>
            setSelectedStudents(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <button style={{ marginTop: "1rem" }} onClick={handleAssign}>
        Assign
      </button>
    </div>
  );
};

export default AssignModules;
