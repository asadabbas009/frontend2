// // import React, { useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import { FaEye, FaSpinner, FaCheckCircle, FaCertificate } from 'react-icons/fa';
// // import { useUser } from '../UserContext';
// // import { useNavigate } from 'react-router-dom';

// // const ApprovedReport = () => {
// //   const { user } = useUser();
// //   const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

// //   const [reports, setReports]             = useState([]);
// //   const [loading, setLoading]             = useState(false);
// //   const [error, setError]                 = useState(null);
// //   const [selectedPdf, setSelectedPdf]     = useState(null);
// //   const [pdfUrls, setPdfUrls]             = useState({});
// //   const [loadingPdfIds, setLoadingPdfIds] = useState({});
// //   const navigate = useNavigate();

// //   // Fetch current user's approved reports
// //   const fetchReports = useCallback(async () => {
// //     if (!user?.username) return;
// //     setLoading(true);
// //     setError(null);
  
// //     try {
// //       const { data } = await axios.get(
// //         `${apiUrl}/api/get-all-report-pdf`,
// //         { params: { username: user.username } }
// //       );
  
// //       // only keep the approved ones
// //       const approvedOnly = data.filter(report => report.status === 'approved');
// //       setReports(approvedOnly);
// //     } catch (err) {
// //       console.error('Error fetching reports:', err);
// //       setError(err.message || 'Failed to fetch reports.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [apiUrl, user?.username]);
  
// //   useEffect(() => {
// //     fetchReports();
// //   }, [fetchReports]);

// //   const formatDate = (dateString) =>
// //     new Date(dateString).toLocaleString('en-US', {
// //       year: 'numeric', month: 'long', day: 'numeric',
// //       hour: '2-digit', minute: '2-digit'
// //     });

// //   // Toggle viewing a PDF: fetch blob if needed
// //   const toggleViewPdf = async report => {
// //     const id = report.id;
    
// //     // If already selected, hide it
// //     if (selectedPdf === id) {
// //       // Hide and revoke
// //       if (pdfUrls[id]) {
// //         URL.revokeObjectURL(pdfUrls[id]);
// //         setPdfUrls(u => {
// //           const copy = { ...u };
// //           delete copy[id];
// //           return copy;
// //         });
// //       }
// //       setSelectedPdf(null);
// //       return;
// //     }

// //     // Set selected PDF immediately to show loading state
// //     setSelectedPdf(id);
    
// //     // Already have URL?
// //     if (pdfUrls[id]) {
// //       return;
// //     }

// //     // Fetch PDF
// //     setLoadingPdfIds(ids => ({ ...ids, [id]: true }));
// //     try {
// //       const res = await fetch(`${apiUrl}/api/reports/${report.registration_id}/pdf`);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const blob = await res.blob();
// //       const url  = URL.createObjectURL(blob);
// //       setPdfUrls(u => ({ ...u, [id]: url }));
// //     } catch (err) {
// //       console.error('Error loading PDF:', err);
// //       alert('Failed to load PDF.');
// //     } finally {
// //       setLoadingPdfIds(ids => ({ ...ids, [id]: false }));
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
// //           <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-6">
// //             <h2 className="text-3xl font-bold text-white text-center">
// //               My Approved Reports
// //             </h2>
// //           </div>

// //           <div className="p-6">
// //             {loading ? (
// //               <div className="flex justify-center py-12">
// //                 <FaSpinner className="animate-spin text-4xl text-blue-600" />
// //               </div>
// //             ) : error ? (
// //               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
// //                 <strong>Error:</strong> {error}
// //               </div>
// //             ) : reports.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full bg-white border border-gray-200">
// //                   <thead>
// //                     <tr className="bg-gray-50 border-b">
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">S.No</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Approved By</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient ID</th>
// //                       <th className="text-center py-3 px-4 uppercase font-semibold text-sm">View Certificate</th>
// //                       <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {reports.map((report, idx) => (
// //                       <React.Fragment key={report.id || idx}>
// //                         <tr className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                           <td className="py-3 px-4">{idx + 1}</td>
// //                           <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
// //                           <td className="py-3 px-4">{report.teacher_username || 'Not specified'}</td>
// //                           <td className="py-3 px-4">{report.registration_id}</td>
// //                           <td className="py-3 px-4 text-center">
// //                             <button
// //                               onClick={() => {
// //                                 // Navigate to certificate page with parameters
// //                                 const certificateData = {
// //                                   username: user.username, // student name
// //                                   workshopTitle: "Role of the Radiographer in Emergency Neuro imaging",
// //                                   location: "Bhubaneswar",
// //                                   date: formatDate(report.reported_at).split(',')[0], // only take the date part
// //                                   certificateNo: report.registration_id,
// //                                   issueDate: formatDate(report.updated_at || report.reported_at).split(',')[0]
// //                                 };

// //                                 // Encode the data properly
// //                                 const params = new URLSearchParams();
// //                                 Object.entries(certificateData).forEach(([key, value]) => {
// //                                   params.append(key, value);
// //                                 });

// //                                 navigate(`/student-dashboard/certificate?${params.toString()}`);
// //                               }}
// //                               className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition mx-auto"
// //                             >
// //                               <FaCertificate /> View Certificate
// //                             </button>
// //                           </td>
// //                           <td className="py-3 px-4 text-center">
// //                             <button
// //                               onClick={() => toggleViewPdf(report)}
// //                               className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mx-auto"
// //                             >
// //                               <FaEye /> View Report
// //                             </button>
// //                           </td>
// //                         </tr>
// //                         {selectedPdf === report.id && (
// //                           <tr>
// //                             <td colSpan="5" className="border-t border-gray-200 p-4">
// //                               <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4 flex items-center">
// //                                 <div className="bg-green-100 p-2 rounded-full mr-3">
// //                                   <FaCheckCircle className="text-green-600 h-5 w-5" />
// //                                 </div>
// //                                 <div>
// //                                   <h3 className="text-lg font-semibold text-green-800">
// //                                     Report Approved
// //                                   </h3>
// //                                   <p className="text-sm text-green-700">
// //                                     Approved on {formatDate(report.updated_at || report.reported_at)}
// //                                   </p>
// //                                 </div>
// //                               </div>

// //                               {loadingPdfIds[report.id] ? (
// //                                 <div className="flex justify-center py-12">
// //                                   <FaSpinner className="animate-spin text-4xl text-blue-600" />
// //                                 </div>
// //                               ) : pdfUrls[report.id] ? (
// //                                 <iframe
// //                                   src={pdfUrls[report.id]}
// //                                   className="w-full h-[500px] mb-6 border border-gray-200 rounded"
// //                                   title={`PDF Report ${report.id}`}
// //                                 />
// //                               ) : (
// //                                 <div className="flex justify-center py-12">
// //                                   <FaSpinner className="animate-spin text-4xl text-green-600" />
// //                                 </div>
// //                               )}
// //                             </td>
// //                           </tr>
// //                         )}
// //                       </React.Fragment>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <h2 className="text-xl font-semibold text-gray-600">
// //                   No approved reports found
// //                 </h2>
// //                 <p className="text-gray-500">You have no approved reports at this time.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApprovedReport; 






// // import React, { useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import { FaEye, FaSpinner, FaCheckCircle, FaCertificate } from 'react-icons/fa';
// // import { useUser } from '../UserContext';
// // import { useNavigate } from 'react-router-dom';

// // const ApprovedReport = () => {
// //   const { user } = useUser();
// //   const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
// //   const navigate = useNavigate();
// //   const [reports, setReports] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [selectedPdf, setSelectedPdf] = useState(null);
// //   const [pdfUrls, setPdfUrls] = useState({});
// //   const [loadingPdfIds, setLoadingPdfIds] = useState({});
// //   const [courseNames, setCourseNames] = useState({});
// //   const [courseId, setCourseId] = useState([]);
 

// // useEffect(() => {
// //   console.log('reports', reports);
// //   console.log('courseId', courseId);
// //   console.log('courseNames', courseNames);
// // }, [reports, courseId, courseNames]);



// //   // Fetch current user's approved reports
// //   const fetchReports = useCallback(async () => {
// //     if (!user?.username) return;
// //     setLoading(true);
// //     setError(null);
  
// //     try {
// //       const { data } = await axios.get(
// //         `${apiUrl}/api/get-all-report-pdf`,
// //         { params: { username: user.username } }
// //       );

// //       // only keep the approved ones
// //       const approvedOnly = data.filter(report => report.status === 'approved');
// //       setReports(approvedOnly);

// //       const courseIds = approvedOnly.map(report => report.courseId);
// //       setCourseId(courseIds);
      

// //     } catch (err) {
// //       console.error('Error fetching reports:', err);
// //       setError(err.message || 'Failed to fetch reports.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [apiUrl, user?.username]);
  
// //   useEffect(() => {
// //     fetchReports();
// //   }, [fetchReports]);


// //   useEffect(() => {
// //     const fetchCourseNames = async () => {
// //       const response = await axios.get(
// //         `${process.env.REACT_APP_API_URL}/api/courses/${courseId}`
// //       );
// //       setCourseNames(response.data);
// //     };
// //     fetchCourseNames();
// //   }, [courseId]);

// //   const formatDate = (dateString) =>
// //     new Date(dateString).toLocaleString('en-US', {
// //       year: 'numeric', month: 'long', day: 'numeric',
// //       hour: '2-digit', minute: '2-digit'
// //     });

// //   // Toggle viewing a PDF: fetch blob if needed
// //   const toggleViewPdf = async report => {
// //     const id = report.id;
    
// //     // If already selected, hide it
// //     if (selectedPdf === id) {
// //       // Hide and revoke
// //       if (pdfUrls[id]) {
// //         URL.revokeObjectURL(pdfUrls[id]);
// //         setPdfUrls(u => {
// //           const copy = { ...u };
// //           delete copy[id];
// //           return copy;
// //         });
// //       }
// //       setSelectedPdf(null);
// //       return;
// //     }

// //     // Set selected PDF immediately to show loading state
// //     setSelectedPdf(id);
    
// //     // Already have URL?
// //     if (pdfUrls[id]) {
// //       return;
// //     }

// //     // Fetch PDF
// //     setLoadingPdfIds(ids => ({ ...ids, [id]: true }));
// //     try {
// //       const res = await fetch(`${apiUrl}/api/reports/${report.registration_id}/pdf`);
// //       console.log(res);
// //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
// //       const blob = await res.blob();
// //       const url  = URL.createObjectURL(blob);
// //       setPdfUrls(u => ({ ...u, [id]: url }));
// //     } catch (err) {
// //       console.error('Error loading PDF:', err);
// //       alert('Failed to load PDF.');
// //     } finally {
// //       setLoadingPdfIds(ids => ({ ...ids, [id]: false }));
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 px-4">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
// //           <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-6">
// //             <h2 className="text-3xl font-bold text-white text-center">
// //               My Approved Reports
// //             </h2>
// //           </div>

// //           <div className="p-6">
// //             {loading ? (
// //               <div className="flex justify-center py-12">
// //                 <FaSpinner className="animate-spin text-4xl text-blue-600" />
// //               </div>
// //             ) : error ? (
// //               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
// //                 <strong>Error:</strong> {error}
// //               </div>
// //             ) : reports.length > 0 ? (
// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full bg-white border border-gray-200">
// //                   <thead>
// //                     <tr className="bg-gray-50 border-b">
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">S.No</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Approved By</th>
// //                       <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient ID</th>
// //                       <th className="text-center py-3 px-4 uppercase font-semibold text-sm">View Certificate</th>
// //                       <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {reports.map((report, idx) => (
// //                       <React.Fragment key={report.id || idx}>
// //                         <tr className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
// //                           <td className="py-3 px-4">{idx + 1}</td>
// //                           <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
// //                           <td className="py-3 px-4">{report.teacher_username || 'Not specified'}</td>
// //                           <td className="py-3 px-4">{report.registration_id}</td>
// //                           <td className="py-3 px-4 text-center">
// //                             <button
// //                               onClick={() => {
// //                                 // Navigate to certificate page with parameters
// //                                 const certificateData = {
// //                                   username: user.username, // student name
// //                                   workshopTitle: "Role of the Radiographer in Emergency Neuro imaging",
// //                                   location: "Bhubaneswar",
// //                                   date: formatDate(report.reported_at).split(',')[0], // only take the date part
// //                                   certificateNo: report.registration_id,
// //                                   issueDate: formatDate(report.updated_at || report.reported_at).split(',')[0],
// //                                   courseName: report.courseNames
// //                                 };

// //                                 // Encode the data properly
// //                                 const params = new URLSearchParams();
// //                                 Object.entries(certificateData).forEach(([key, value]) => {
// //                                   params.append(key, value);
// //                                 });

// //                                 navigate(`/student-dashboard/certificate?${params.toString()}`);
// //                               }}
// //                               className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition mx-auto"
// //                             >
// //                               <FaCertificate /> View Certificate
// //                             </button>
// //                           </td>
// //                           <td className="py-3 px-4 text-center">
// //                             <button
// //                               onClick={() => toggleViewPdf(report)}
// //                               className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mx-auto"
// //                             >
// //                               <FaEye /> View Report
// //                             </button>
// //                           </td>
// //                         </tr>
// //                         {selectedPdf === report.id && (
// //                           <tr>
// //                             <td colSpan="6" className="border-t border-gray-200 p-4">
// //                               <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4 flex items-center">
// //                                 <div className="bg-green-100 p-2 rounded-full mr-3">
// //                                   <FaCheckCircle className="text-green-600 h-5 w-5" />
// //                                 </div>
// //                                 <div>
// //                                   <h3 className="text-lg font-semibold text-green-800">
// //                                     Report Approved
// //                                   </h3>
// //                                   <p className="text-sm text-green-700">
// //                                     Approved on {formatDate(report.updated_at || report.reported_at)}
// //                                   </p>
// //                                 </div>
// //                               </div>

// //                               {loadingPdfIds[report.id] ? (
// //                                 <div className="flex justify-center py-12">
// //                                   <FaSpinner className="animate-spin text-4xl text-blue-600" />
// //                                 </div>
// //                               ) : pdfUrls[report.id] ? (
// //                                 <iframe
// //                                   src={pdfUrls[report.id]}
// //                                   className="w-full h-[500px] mb-6 border border-gray-200 rounded"
// //                                   title={`PDF Report ${report.id}`}
// //                                 />
// //                               ) : (
// //                                 <div className="flex justify-center py-12">
// //                                   <FaSpinner className="animate-spin text-4xl text-green-600" />
// //                                 </div>
// //                               )}
// //                             </td>
// //                           </tr>
// //                         )}
// //                       </React.Fragment>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             ) : (
// //               <div className="text-center py-12">
// //                 <h2 className="text-xl font-semibold text-gray-600">
// //                   No approved reports found
// //                 </h2>
// //                 <p className="text-gray-500">You have no approved reports at this time.</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ApprovedReport;



// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { FaEye, FaSpinner, FaCheckCircle, FaCertificate } from 'react-icons/fa';
// import { useUser } from '../UserContext';
// import { useNavigate } from 'react-router-dom';

// const ApprovedReport = () => {
//   const { user } = useUser();
//   const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
//   const navigate = useNavigate();

//   const [reports, setReports]             = useState([]);
//   const [loading, setLoading]             = useState(false);
//   const [error, setError]                 = useState(null);
//   const [selectedPdf, setSelectedPdf]     = useState(null);
//   const [pdfUrls, setPdfUrls]             = useState({});
//   const [loadingPdfIds, setLoadingPdfIds] = useState({});

//   // Fetch approved reports (which now include course_name)
//   const fetchReports = useCallback(async () => {
//     if (!user?.username) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.get(
//         `${apiUrl}/api/reports/approved`,
//         { params: { username: user.username } }
//       );
//       setReports(data);
//     } catch (err) {
//       console.error('Error fetching reports:', err);
//       setError(err.message || 'Failed to fetch reports.');
//     } finally {
//       setLoading(false);
//     }
//   }, [apiUrl, user?.username]);

//   useEffect(() => {
//     fetchReports();
//   }, [fetchReports]);

//   const formatDate = dateString =>
//     new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric', month: 'long', day: 'numeric',
//       hour: '2-digit', minute: '2-digit'
//     });

//   const toggleViewPdf = async report => {
//     const id = report.id;

//     if (selectedPdf === id) {
//       // hide
//       if (pdfUrls[id]) URL.revokeObjectURL(pdfUrls[id]);
//       setPdfUrls(u => { const c = { ...u }; delete c[id]; return c; });
//       return setSelectedPdf(null);
//     }

//     setSelectedPdf(id);
//     if (pdfUrls[id]) return;

//     setLoadingPdfIds(ids => ({ ...ids, [id]: true }));
//     try {
//       const res = await fetch(`${apiUrl}/api/reports/${report.registration_id}/pdf`);
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const blob = await res.blob();
//       const url  = URL.createObjectURL(blob);
//       setPdfUrls(u => ({ ...u, [id]: url }));
//     } catch (err) {
//       console.error('Error loading PDF:', err);
//       alert('Failed to load PDF.');
//     } finally {
//       setLoadingPdfIds(ids => ({ ...ids, [id]: false }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
//           <div className="bg-gradient-to-r from-blue-600 p-6">
//             <h2 className="text-3xl font-bold text-white text-center">
//               My Approved Reports
//             </h2>
//           </div>

//           <div className="p-6">
//             {loading ? (
//               <div className="flex justify-center py-12">
//                 <FaSpinner className="animate-spin text-4xl text-blue-600" />
//               </div>
//             ) : error ? (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//                 <strong>Error:</strong> {error}
//               </div>
//             ) : reports.length > 0 ? (
//               <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-200">
//                   <thead>
//                     <tr className="bg-gray-50 border-b">
//                       <th className="py-3 px-4 text-left">S.No</th>
//                       <th className="py-3 px-4 text-left">Date</th>
//                       <th className="py-3 px-4 text-left">Approved By</th>
//                       <th className="py-3 px-4 text-left">Patient ID</th>
//                       <th className="py-3 px-4 text-center">Certificate</th>
//                       <th className="py-3 px-4 text-center">View Report</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reports.map((report, idx) => (
//                       <React.Fragment key={report.id}>
//                         <tr className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                           <td className="py-3 px-4">{idx + 1}</td>
//                           <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
//                           <td className="py-3 px-4">{report.teacher_username || 'N/A'}</td>
//                           <td className="py-3 px-4">{report.registration_id}</td>
//                           <td className="py-3 px-4 text-center">
//                             <button
//                               disabled={!report.course_name}
//                               onClick={() => {
//                                 const params = new URLSearchParams({
//                                   username:      user.username,
//                                   courseName:    report.course_name,
//                                   certificateNo: report.registration_id,
//                                   issueDate:     formatDate(report.updated_at || report.reported_at).split(',')[0],
//                                 });
//                                 navigate(`/student-dashboard/certificate?${params}`);
//                               }}
//                               className={`flex items-center justify-center gap-2 px-3 py-2 rounded transition ${
//                                 report.course_name
//                                   ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//                                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                               }`}
//                             >
//                               <FaCertificate /> View Certificate
//                             </button>
//                           </td>
//                           <td className="py-3 px-4 text-center">
//                             <button
//                               onClick={() => toggleViewPdf(report)}
//                               className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
//                             >
//                               <FaEye /> View Report
//                             </button>
//                           </td>
//                         </tr>

//                         {selectedPdf === report.id && (
//                           <tr>
//                             <td colSpan="6" className="border-t p-4">
//                               <div className="bg-green-50 border-green-200 p-4 rounded-lg mb-4 flex items-center">
//                                 <FaCheckCircle className="text-green-600 h-5 w-5 mr-2" />
//                                 <div>
//                                   <h3 className="font-semibold text-green-800">Report Approved</h3>
//                                   <p className="text-sm text-green-700">
//                                     Approved on {formatDate(report.updated_at || report.reported_at)}
//                                   </p>
//                                 </div>
//                               </div>

//                               {loadingPdfIds[report.id] ? (
//                                 <div className="flex justify-center py-12">
//                                   <FaSpinner className="animate-spin text-4xl text-blue-600" />
//                                 </div>
//                               ) : (
//                                 <iframe
//                                   src={pdfUrls[report.id]}
//                                   className="w-full h-[500px] border rounded"
//                                   title={`Report ${report.id}`}
//                                 />
//                               )}
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <h2 className="text-xl font-semibold text-gray-600">
//                   No approved reports found
//                 </h2>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApprovedReport;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEye, FaSpinner, FaCheckCircle, FaCertificate } from 'react-icons/fa';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const ApprovedReport = () => {
  const { user } = useUser();
  const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfUrls, setPdfUrls] = useState({});
  const [loadingPdfIds, setLoadingPdfIds] = useState({});

  // Fetch approved reports
  const fetchReports = useCallback(async () => {
    if (!user?.username) return;
    setLoading(true);
    setError(null);
  
    try {
      const { data } = await axios.get(
        `${apiUrl}/api/reports/approved`,
        { params: { username: user.username } }
      );
      setReports(data);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message || 'Failed to fetch reports.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, user?.username]);
  
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

  // Toggle viewing a PDF: fetch blob if needed
  const toggleViewPdf = async report => {
    const id = report.id;
    
    // If already selected, hide it
    if (selectedPdf === id) {
      // Hide and revoke
      if (pdfUrls[id]) {
        URL.revokeObjectURL(pdfUrls[id]);
        setPdfUrls(u => {
          const copy = { ...u };
          delete copy[id];
          return copy;
        });
      }
      setSelectedPdf(null);
      return;
    }

    // Set selected PDF immediately to show loading state
    setSelectedPdf(id);
    
    // Already have URL?
    if (pdfUrls[id]) {
      return;
    }

    // Fetch PDF
    setLoadingPdfIds(ids => ({ ...ids, [id]: true }));
    try {
      const res = await fetch(`${apiUrl}/api/reports/${report.registration_id}/pdf`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrls(u => ({ ...u, [id]: url }));
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('Failed to load PDF.');
    } finally {
      setLoadingPdfIds(ids => ({ ...ids, [id]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              My Approved Reports
            </h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <strong>Error:</strong> {error}
              </div>
            ) : reports.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">S.No</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Approved By</th>
                      <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Patient ID</th>
                      <th className="text-center py-3 px-4 uppercase font-semibold text-sm">View Certificate</th>
                      <th className="text-center py-3 px-4 uppercase font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, idx) => (
                      <React.Fragment key={report.id || idx}>
                        <tr className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4">{idx + 1}</td>
                          <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
                          <td className="py-3 px-4">{report.teacher_username || 'Not specified'}</td>
                          <td className="py-3 px-4">{report.registration_id}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              disabled={!report.course_name}
                              onClick={() => {
                                const params = new URLSearchParams({
                                  username: user.username,
                                  courseName: report.course_name,
                                  workshopTitle: "Role of the Radiographer in Emergency Neuro imaging",
                                  location: "Bhubaneswar",
                                  date: formatDate(report.reported_at).split(',')[0], // only take the date part
                                  certificateNo: report.registration_id,
                                  issueDate: formatDate(report.updated_at || report.reported_at).split(',')[0],
                                });
                                navigate(`/student-dashboard/certificate?${params}`);
                              }}
                              className={`flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition mx-auto ${
                                !report.course_name ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              <FaCertificate /> View Certificate
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => toggleViewPdf(report)}
                              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mx-auto"
                            >
                              <FaEye /> View Report
                            </button>
                          </td>
                        </tr>
                        {selectedPdf === report.id && (
                          <tr>
                            <td colSpan="6" className="border-t border-gray-200 p-4">
                              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4 flex items-center">
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  <FaCheckCircle className="text-green-600 h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-green-800">
                                    Report Approved
                                  </h3>
                                  <p className="text-sm text-green-700">
                                    Approved on {formatDate(report.updated_at || report.reported_at)}
                                  </p>
                                </div>
                              </div>

                              {loadingPdfIds[report.id] ? (
                                <div className="flex justify-center py-12">
                                  <FaSpinner className="animate-spin text-4xl text-blue-600" />
                                </div>
                              ) : pdfUrls[report.id] ? (
                                <iframe
                                  src={pdfUrls[report.id]}
                                  className="w-full h-[500px] mb-6 border border-gray-200 rounded"
                                  title={`PDF Report ${report.id}`}
                                />
                              ) : (
                                <div className="flex justify-center py-12">
                                  <FaSpinner className="animate-spin text-4xl text-green-600" />
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold text-gray-600">
                  No approved reports found
                </h2>
                <p className="text-gray-500">You have no approved reports at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedReport;