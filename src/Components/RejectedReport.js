

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaSpinner, FaRedo, FaTimesCircle } from 'react-icons/fa';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const RejectedReport = () => {
  const { user } = useUser();
  const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

  const [reports, setReports]             = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);
  const [selectedPdf, setSelectedPdf]     = useState(null);
  const [pdfUrls, setPdfUrls]             = useState({});
  const [loadingPdfIds, setLoadingPdfIds] = useState({});
  const [actionLoading, setActionLoading] = useState(false);

  
  useEffect(() => {
    if (!user?.username) return;
    setLoading(true);
    axios
      .get(`${apiUrl}/api/get-all-report-pdf`, { params: { username: user.username } })
      .then(res => {
        const rejectedOnly = res.data.filter(r => r.status === 'rejected');
        setReports(rejectedOnly);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || 'Failed to fetch reports.');
      })
      .finally(() => setLoading(false));
  }, [apiUrl, user?.username]);

  console.log('ReportID:', reports);
  
  const formatDate = dateString =>
    new Date(dateString).toLocaleString('en-US', {
      year:   'numeric',
      month:  'long',
      day:    'numeric',
      hour:   '2-digit',
      minute: '2-digit'
    });


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
      const url  = URL.createObjectURL(blob);
      setPdfUrls(u => ({ ...u, [id]: url }));
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('Failed to load PDF.');
    } finally {
      setLoadingPdfIds(ids => ({ ...ids, [id]: false }));
    }
  };
  console.log('PDF URLs:', pdfUrls);

  const navigate = useNavigate();
  const handleReattempt = async reportId => {
    setActionLoading(true);
    setError(null);
    try {
      const report = reports.find(r => r.id === reportId);
      if (!report) throw new Error('Report not found');
  
      const { moduleId, courseId } = report;
  
      // Pass reportId along in location.state
      navigate(
        `/student-dashboard/courses/ongoing/${moduleId}/protocols/course-overview/${courseId}`,
        { state: { reportId } }
      );
    } catch (error) {
      console.error('Error navigating to course overview:', error);
      setError('Failed to navigate to course overview.');
    } finally {
      setActionLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              My Rejected Reports
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
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">S.No</th>
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Date</th>
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Rejected By</th>
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Patient ID</th>
                      <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, idx) => (
                      <React.Fragment key={report.id}>  
                        <tr className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4">{idx + 1}</td>
                          <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
                          <td className="py-3 px-4">{report.teacher_username || 'Not specified'}</td>
                          <td className="py-3 px-4">{report.registration_id}</td>
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
                            <td colSpan="5" className="border-t border-gray-200 p-4">
                              {report.comment && (
                                <div className="bg-red-50 border border-red-200 p-5 rounded-lg mb-6 shadow-sm">
                                  <div className="flex items-center mb-3">
                                    <div className="bg-red-100 p-2 rounded-full">
                                      <FaTimesCircle className="text-red-600 h-5 w-5" />
                                    </div>
                                    <h3 className="ml-3 text-lg font-bold text-red-800">
                                      Reason for Rejection
                                    </h3>
                                  </div>
                                  <div className="bg-white p-4 rounded-md border border-red-100 shadow-inner">
                                    <p className="text-gray-800 whitespace-pre-wrap break-words">
                                      {report.comment}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {loadingPdfIds[report.id] ? (
                                <div className="flex justify-center py-12">
                                  <FaSpinner className="animate-spin text-4xl text-red-600" />
                                </div>
                              ) : pdfUrls[report.id] ? (
                                <iframe
                                  src={pdfUrls[report.id]}
                                  className="w-full h-[500px] mb-6 border border-gray-200 rounded"
                                  title={`PDF Report ${report.id}`}
                                />
                              ) : (
                                <div className="flex justify-center py-12">
                                  <FaSpinner className="animate-spin text-4xl text-red-600" />
                                </div>
                              )}

                              <div className="flex justify-center mt-4">
                                {actionLoading ? (
                                  <FaSpinner className="animate-spin text-2xl text-blue-600" />
                                ) : (
                                  <button
                                    onClick={() => handleReattempt(report.id)}
                                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                                  >
                                    <FaRedo /> Reattempt
                                  </button>
                                )}
                              </div>
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
                  No rejected reports found
                </h2>
                <p className="text-gray-500">You have no rejected reports at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectedReport;