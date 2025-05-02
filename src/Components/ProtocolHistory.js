// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaSpinner } from 'react-icons/fa';

// export default function ProtocolHistory({ registrationId }) {
//   const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     if (!registrationId) {
//       setError('No patient selected.');
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     axios.get(`${apiUrl}/api/protocol-times`, {
//       params: { registration_id: registrationId }
//     })
//     .then(res => setRecords(res.data))
//     .catch(err => {
//       console.error(err);
//       setError('Failed to load protocol history');
//     })
//     .finally(() => setLoading(false));
//   }, [apiUrl, registrationId]);

//   return (
//     <div className="p-6 bg-white rounded shadow-lg max-h-[70vh] overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Protocol History</h2>

//       {!registrationId ? (
//         <p className="text-red-600">No patient selected.</p>
//       ) : loading ? (
//         <div className="flex justify-center py-8">
//           <FaSpinner className="animate-spin text-3xl text-gray-600" />
//         </div>
//       ) : error ? (
//         <p className="text-red-600">{error}</p>
//       ) : records.length === 0 ? (
//         <p className="text-gray-600">No history for this patient yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-gray-50 border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="px-4 py-2 text-left">Protocol</th>
//                 <th className="px-4 py-2 text-left">Start</th>
//                 <th className="px-4 py-2 text-left">End</th>
//                 <th className="px-4 py-2 text-left">Duration (s)</th>
//                 <th className="px-4 py-2 text-left">Logged At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((r,i) => (
//                 <tr key={i} className={i%2 ? 'bg-white' : 'bg-gray-50'}>
//                   <td className="px-4 py-2">{r.protocolId}</td>
//                   <td className="px-4 py-2">
//                     {new Date(r.startTime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">
//                     {new Date(r.endTime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">{r.durationSeconds}</td>
//                   <td className="px-4 py-2">
//                     {new Date(r.loggedAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSpinner, FaClock, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export default function ProtocolHistory({ registrationId }) {
  const apiUrl = (process.env.REACT_APP_API_URL || 'http://localhost:5001').trim();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);


  useEffect(() => {
    if (!registrationId) {
      setError('No patient selected.');
      return;
    }
    setLoading(true);
    setError(null);

    axios.get(`${apiUrl}/api/protocol-times`, {
      params: { registration_id: registrationId }
    })
    .then(res => setRecords(res.data))
    .catch(err => {
      console.error(err);
      setError('Failed to load protocol history');
    })
    .finally(() => setLoading(false));
  }, [apiUrl, registrationId]);

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h2 className="text-2xl font-bold text-white">Protocol History</h2>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {!registrationId ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <FaExclamationCircle className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-red-600 font-medium">No patient selected</p>
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="animate-spin text-4xl text-blue-600" />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <FaExclamationCircle className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        ) : records.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <FaInfoCircle className="text-gray-400 text-4xl mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600">No Protocol History Found</h3>
            <p className="text-gray-500 mt-2">There are no protocol records available for this patient.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {records.map((record, index) => (
              <div
                key={index}
                className={`relative pl-8 pb-6 ${index !== records.length - 1 ? 'border-l-2 border-blue-200' : ''}`}
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2" />
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Protocol {record.protocolId}</h3>
                      <p className="text-sm text-gray-500">Duration: {formatDuration(record.durationSeconds)}</p>
                    </div>
                    <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                      <FaClock className="text-blue-500 mr-2" />
                      <span>Completed</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Start Time</p>
                      <p className="font-medium text-gray-800">{formatTime(record.startTime)}</p>
                      <p className="text-xs text-gray-400">{formatDate(record.startTime)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">End Time</p>
                      <p className="font-medium text-gray-800">{formatTime(record.endTime)}</p>
                      <p className="text-xs text-gray-400">{formatDate(record.endTime)}</p>
                    </div>

                  </div>
                  <div className="mt-4 bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Logged At</p>
                    <p className="font-medium text-gray-800">{formatTime(record.loggedAt)}</p>
                    <p className="text-xs text-gray-400">{formatDate(record.loggedAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}