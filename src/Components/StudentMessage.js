import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEnvelope, FaUser, FaClock, FaBroadcastTower, FaSearch, FaFilter } from 'react-icons/fa';
import { useUser } from '../UserContext';

const StudentMessage = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages`);
        
        if (response.data) {
          const studentMessages = response.data.filter(message => 
            message.type === 'broadcast' || 
            (message.type === 'individual' && message.recipient_ids.includes(user.id.toString()))
          );
          setMessages(studentMessages);
        }
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchMessages();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || message.type === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Loading messages...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full transform hover:scale-110 transition-transform">
                  <FaEnvelope className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Messages from Teachers</h1>
                  <p className="text-blue-100">Stay updated with important announcements</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="bg-white/20 text-white placeholder-blue-100 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-3 text-blue-100" />
                </div>
                <div className="relative">
                  <select
                    className="bg-white/20 text-white rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Messages</option>
                    <option value="broadcast">Broadcast</option>
                    <option value="individual">Individual</option>
                  </select>
                  <FaFilter className="absolute right-3 top-3 text-blue-100" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-blue-50 p-6 rounded-full inline-block mb-4 transform hover:scale-110 transition-transform">
                  <FaEnvelope className="text-blue-500 text-5xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No messages found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((message) => (
                  <div 
                    key={message.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Message Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 p-2 rounded-full transform hover:scale-110 transition-transform">
                            <FaUser className="text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{message.sender}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <FaClock className="text-gray-400" />
                              <span>{formatDate(message.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                        {message.type === 'broadcast' && (
                          <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm transform hover:scale-105 transition-transform">
                            <FaBroadcastTower className="text-blue-600" />
                            <span>Broadcast</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Message Content */}
                    <div className="p-4 bg-white">
                      <p className="text-gray-700 leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMessage;
