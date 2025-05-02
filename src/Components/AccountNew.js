import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaSpinner } from "react-icons/fa";
import axios from 'axios';

const AccountNew = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePicture: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState('');
  const fileInputRef = React.useRef(null);

  // Load user data from sessionStorage if available
  useEffect(() => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (!userStr) {
        console.log("No user in sessionStorage");
        return;
      }
      
      const storedUser = JSON.parse(userStr);
      if (storedUser) {
        setUserData({
          username: storedUser.name || "",
          email: storedUser.email || "",
          phone: storedUser.phone || "",
          address: storedUser.address || "",
          profilePicture: storedUser.profilePicture || ""
        });
        setPreview(storedUser.profilePicture || '');
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
        setError('Please upload a valid image file (JPEG, PNG)');
        return;
      }
      setError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        handleUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (file) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/upload-profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setUserData(prev => ({ ...prev, profilePicture: response.data.profilePicture }));
        setSuccess('Profile picture updated successfully');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to upload profile picture');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading profile picture');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/update-profile`,
        userData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        setSuccess('Profile updated successfully');
        // Update session storage
        const updatedUser = { ...JSON.parse(sessionStorage.getItem("user")), ...userData };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 py-10">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center">Account Settings</h1>
          <p className="text-center mt-2 text-blue-100">Manage your personal information and account preferences</p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white p-8 rounded-b-lg shadow-lg border border-gray-200">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <FaCamera className="text-4xl text-white" />
                  </div>
                )}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin text-xl" />
                  ) : (
                    <FaCamera className="text-xl" />
                  )}
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/jpg"
              className="hidden"
            />
            {error && (
              <p className="mt-2 text-red-500 text-sm">{error}</p>
            )}
            {success && (
              <p className="mt-2 text-green-500 text-sm">{success}</p>
            )}
          </div>
          
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center">
                <FaUser className="mr-2 text-blue-600" /> Username
              </label>
              <input 
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                name="username" 
                value={userData.username}
                placeholder="Enter your username" 
                onChange={handleChange}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center">
                <FaEnvelope className="mr-2 text-blue-600" /> Email
              </label>
              <input 
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                name="email" 
                type="email" 
                value={userData.email}
                placeholder="Enter your email" 
                onChange={handleChange}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center">
                <FaPhone className="mr-2 text-blue-600" /> Phone Number
              </label>
              <input 
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                name="phone" 
                type="tel" 
                value={userData.phone}
                placeholder="Enter your phone number" 
                onChange={handleChange}
              />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-600" /> Address
              </label>
              <input 
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                name="address" 
                value={userData.address}
                placeholder="Enter your address" 
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountNew; 