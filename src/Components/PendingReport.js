import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaEye, FaSpinner, FaClock, FaExclamationCircle } from 'react-icons/fa';
import { useUser } from '../UserContext';
import ProtocolHistory from './ProtocolHistory';

const PendingReport = () => {
  const { user } = useUser();
  const apiUrl   = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

  const [reports, setReports]             = useState([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState(null);
  const [selectedPdf, setSelectedPdf]     = useState(null);
  const [pdfUrls, setPdfUrls]             = useState({});
  const [loadingPdfIds, setLoadingPdfIds] = useState({});
  const [showHistoryFor, setShowHistoryFor]     = useState(null);

  const [showRejectModal, setShowRejectModal]   = useState(false);
  const [rejectComment, setRejectComment]       = useState('');
  const [currentReportId, setCurrentReportId]   = useState(null);
  const [currentReport, setCurrentReport]       = useState(null);
  const [actionLoading, setActionLoading]       = useState(false);

  const fetchPendingReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`${apiUrl}/api/get-all-report-pdfs`);
      if (!res.ok) throw new Error('Failed to fetch PDF reports');
      const data = await res.json();
      const pending = data.filter(r => r.status === 'pending');
      setReports(pending);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError(err.message || 'Failed to fetch reports. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchPendingReports();
  }, [fetchPendingReports]);

  const formatDate = dateString => {
    const opts = { year:'numeric', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', opts);
  };

  const toggleViewReport = async report => {
    if (selectedPdf === report.id) {
      setSelectedPdf(null);
      return;
    }
    setSelectedPdf(report.id);
    if (pdfUrls[report.id]) return;

    try {
      setLoadingPdfIds(ids => ({ ...ids, [report.id]: true }));
      const res = await fetch(`${apiUrl}/api/reports/${report.registration_id}/pdf`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      setPdfUrls(urls => ({ ...urls, [report.id]: url }));
    } catch (err) {
      console.error('Error loading PDF:', err);
      alert('Failed to load report PDF.');
    } finally {
      setLoadingPdfIds(ids => ({ ...ids, [report.id]: false }));
    }
  };

  const handleAccept = async reportId => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return alert('Report not found');

    try {
      setActionLoading(true);

      // 1) Lookup the real assignment_id for this student + course
      const lookupRes = await axios.get(
        `${apiUrl}/api/assignment-for-student/${report.registration_id}/course/${report.course_id}`
      );
      const assignmentId = lookupRes.data.assignment_id;

      // 2) Update assignment_courses → completed
      await axios.patch(
        `${apiUrl}/api/assignment_courses/status`,
        {
          assignment_id: assignmentId,
          course_id:     report.course_id,
          status:        'completed'
        }
      );

      // 3) Record the report-action
      await axios.post(`${apiUrl}/api/report-action`, {
        reportId,
        studentUsername: report.username?.toLowerCase().replace(/\s+/g, '_'),
        teacherUsername: user?.username,
        action:          'accepted',
        status:          'approved'
      });

      alert('Report accepted successfully!');
      fetchPendingReports();
      setSelectedPdf(null);
    } catch (err) {
      console.error('Error accepting report:', err);
      alert(`Failed to accept report: ${err.message}`);
      setSelectedPdf(null);
    } finally {
      setActionLoading(false);
    }
  };

  const openRejectModal = reportId => {
    const report = reports.find(r => r.id === reportId);
    setCurrentReportId(reportId);
    setCurrentReport(report);
    setRejectComment('');
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectComment.trim()) {
      return alert('Please provide a reason for rejection');
    }
    try {
      setActionLoading(true);
      // Only log the rejection; do NOT change assignment_courses here
      await axios.post(`${apiUrl}/api/report-action`, {
        reportId:        currentReportId,
        studentUsername: currentReport.username?.toLowerCase().replace(/\s+/g, '_'),
        teacherUsername: user?.username,
        action:          'rejected',
        status:          'rejected',
        comment:         rejectComment
      });
      alert('Report rejected with comment!');
      setShowRejectModal(false);
      fetchPendingReports();
      setSelectedPdf(null);
    } catch (err) {
      console.error('Error rejecting report:', err);
      alert(`Failed to reject report: ${err.message}`);
      setSelectedPdf(null);
    } finally {
      setActionLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center">
              Pending Reports
            </h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-12">
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
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Student Name</th>
                      <th className="py-3 px-4 text-left uppercase font-semibold text-sm">Patient ID</th>
                      <th className="py-3 px-4 text-center uppercase font-semibold text-sm">Timing</th>
                      <th className="py-3 px-4 text-center uppercase font-semibold text-sm">View Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, i) => (
                      <React.Fragment key={report.id}>
                        <tr className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4">{i+1}</td>
                          <td className="py-3 px-4">{formatDate(report.reported_at)}</td>
                          <td className="py-3 px-4">{report.username || 'Unknown'}</td>
                          <td className="py-3 px-4">{report.registration_id}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={()=>setShowHistoryFor(report.registration_id)}
                              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition mx-auto"
                            >
                              <FaClock /> View Timings
                            </button>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={()=>toggleViewReport(report)}
                              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition mx-auto"
                            >
                              <FaEye /> View Report
                            </button>
                          </td>
                        </tr>

                        {selectedPdf === report.id && (
                          <tr>
                            <td colSpan="6" className="border-t border-gray-200 p-4">
                              {loadingPdfIds[report.id] ? (
                                <div className="flex justify-center py-12">
                                  <FaSpinner className="animate-spin text-4xl text-blue-600" />
                                </div>
                              ) : (
                                <>
                                  <iframe
                                    src={pdfUrls[report.id]}
                                    className="w-full h-[500px] mb-6 border border-gray-200 rounded"
                                    title={`PDF Report ${report.id}`}
                                  />

                                  <div className="flex justify-center items-center gap-4 mt-4">
                                    {actionLoading ? (
                                      <FaSpinner className="animate-spin text-2xl text-blue-600" />
                                    ) : (
                                      <>
                                        <button
                                          onClick={() => handleAccept(report.id)}
                                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                        >
                                          Accept
                                        </button>
                                        <button
                                          onClick={() => openRejectModal(report.id)}
                                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                        >
                                          Reject with Comment
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </>
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
                  No pending reports found
                </h2>
                <p className="text-gray-500">
                  There are no pending reports to review at this time
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaExclamationCircle className="text-blue-100" />
                Reject Report
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Reason for Rejection
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                rows="4"
                value={rejectComment}
                onChange={e => setRejectComment(e.target.value)}
                placeholder="Provide detailed feedback..."
              />
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="px-6 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center disabled:opacity-70"
                >
                  {actionLoading ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    'Reject Report'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryFor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={() => setShowHistoryFor(null)}
            >
              ✕
            </button>
            <ProtocolHistory registrationId={showHistoryFor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingReport;
