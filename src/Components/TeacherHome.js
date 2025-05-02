import React, { useState, useEffect } from "react";
import {
  FaUserCircle,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { useUser } from '../UserContext';

const TeacherHome = () => {
  const { user } = useUser();
  const [dashboardStats, setDashboardStats] = useState({
    pendingApproval: 0,
    approvedAssignments: 0,
    referredBack: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const fetchPendingReports = async () => {
    setLoading(true);
    try {
      const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();
      const response = await fetch(`${apiUrl}/api/report-stats`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch PDF reports');
      }
      
      const data = await response.json();
      console.log('Fetched reports:', data);
      
      const pendingReports = data.filter(report => report.status === 'pending');
      const approvedReports = data.filter(report => report.status === 'approved');
      const rejectedReports = data.filter(report => report.status === 'rejected');
      
      setDashboardStats(prev => ({
        ...prev,
        pendingApproval: pendingReports.length,
        approvedAssignments: approvedReports.length,
        referredBack: rejectedReports.length
      }));
    } catch (err) {
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-32">
      {/* Main Card */}
      <div className="w-[90%] mx-auto bg-white p-6 shadow-2xl backdrop-blur-lg border border-gray-300 rounded-xl">
        
        {user && user.role === "teacher" ? (
          <div className="text-center">
            {/* Profile Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue-600 text-white p-3 rounded-full mb-4">
                <FaUserCircle className="text-7xl drop-shadow-md" />
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">
                  Welcome, {user.name || user.username}
                </h1>
                <p className="text-lg mt-1">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </p>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <div className="stat-card bg-purple-50 border border-purple-300 text-purple-900 p-6 rounded-lg shadow-lg">
                <FaClipboardList className="text-4xl mx-auto text-purple-600 mb-2" />
                <h3 className="text-lg font-semibold">Pending Approval</h3>
                {loading ? (
                  <div className="flex justify-center py-2">
                    <FaSpinner className="animate-spin text-2xl text-purple-600" />
                  </div>
                ) : (
                  <p className="text-3xl font-bold">{dashboardStats.pendingApproval}</p>
                )}
              </div>
  
              <div className="stat-card bg-green-50 border border-green-300 text-green-900 p-6 rounded-lg shadow-lg">
                <FaExclamationTriangle className="text-4xl mx-auto text-green-600 mb-2" />
                <h3 className="text-lg font-semibold">Approved Assignments</h3>
                <p className="text-3xl font-bold">{dashboardStats.approvedAssignments}</p>
              </div>
  
              <div className="stat-card bg-orange-50 border border-orange-300 text-orange-900 p-6 rounded-lg shadow-lg">
                <FaCheckCircle className="text-4xl mx-auto text-orange-600 mb-2" />
                <h3 className="text-lg font-semibold">Referred Back</h3>
                <p className="text-3xl font-bold">{dashboardStats.referredBack}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Access Denied. Please log in as a teacher.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherHome;