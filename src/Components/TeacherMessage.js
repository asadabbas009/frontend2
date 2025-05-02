import React, { useState } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaUsers, FaUser, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';
import StudentSelection from './StudentSelection';
import { useUser } from '../UserContext';

const TeacherMessage = () => {
  const { user } = useUser();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('individual');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (messageType === 'individual' && selectedStudents.length === 0) {
        setErrorMessage('Please select at least one student');
        setIsSubmitting(false);
        return;
      }

      if (!message.trim()) {
        setErrorMessage('Please enter a message');
        setIsSubmitting(false);
        return;
      }

      const currentDate = new Date();
      const messageData = {
        message,
        type: messageType,
        senderId: user.id,
        senderName: user.name,
        senderUsername: user.username,
        timestamp: currentDate.toISOString(),
        ...(messageType === 'individual' && {
          studentIds: selectedStudents,
        }),
      };

      const apiBaseUrl = process.env.REACT_APP_API_URL;
      await axios.post(`${apiBaseUrl}/api/send-message`, messageData);
      setSuccessMessage('Message sent successfully!');
      setMessage('');
      setSelectedStudents([]);
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full transform hover:scale-110 transition-transform duration-300">
                  <FaPaperPlane className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Send Message to Students</h1>
                  <p className="text-blue-100 text-sm">Communicate with your students effectively</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                <div className="flex items-center space-x-2">
                  <FaCheck className="text-green-500" />
                  <p className="text-green-600">{successMessage}</p>
                </div>
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <div className="flex items-center space-x-2">
                  <FaTimes className="text-red-500" />
                  <p className="text-red-600">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Message Type Selection */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setMessageType('individual')}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                    messageType === 'individual'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FaUser className="text-lg" />
                    <span>Individual Message</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMessageType('broadcast')}
                  className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 ${
                    messageType === 'broadcast'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <FaUsers className="text-lg" />
                    <span>Broadcast Message</span>
                  </div>
                </button>
              </div>

              {/* Student Selection (only for individual messages) */}
              {messageType === 'individual' && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                  <StudentSelection 
                    selectedStudents={selectedStudents}
                    onStudentSelect={handleStudentSelect}
                  />
                </div>
              )}

              {/* Message Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 min-h-[150px]"
                  placeholder="Type your message here..."
                  required
                />
                <p className="text-sm text-gray-500">
                  {message.length} characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin text-lg" />
                  ) : (
                    <FaPaperPlane className="text-lg" />
                  )}
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMessage;