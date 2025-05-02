import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCamera, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useUser } from "../UserContext";
import axios from "axios";

const Account = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    // phone: "",
    // address: "",
    // password: "",
    // confirmPassword: "",
    profilePicture: ""
  });
  
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "" // "success" or "error"
  });
  
  const { user, updateProfilePicture } = useUser();

  // Load user data from sessionStorage if available
  useEffect(() => {
    try {
      const userStr = sessionStorage.getItem("user");
      if (!userStr) {
        return;
      }
      
      const storedUser = JSON.parse(userStr);
      if (storedUser) {
        // Make sure to properly map the user data to the form fields
        setUserData({
          username: storedUser.name || "", // Map the name from user to username field
          email: storedUser.email || "",
          phone: storedUser.phone || "",
          address: storedUser.address || "",
          profilePicture: storedUser.profilePicture || ""
        });
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, []);

  // Hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({
          ...userData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_URL;
      const profileData = {
        userId: user.id,
        profilePicture: userData.profilePicture
      };
      
      
      updateProfilePicture(userData.profilePicture);

      // Update profile picture in the API
      await axios.post(`${apiBaseUrl}/api/users/update-profile-picture`, profileData);
      
      
      
      
     
      setNotification({
        show: true,
        message: "Profile picture updated successfully!",
        type: "success"
      });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      
      setNotification({
        show: true,
        message: "Failed to update profile picture. Please try again.",
        type: "error"
      });
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
        
        {/* Notification */}
        {notification.show && (
          <div className={`p-4 mb-4 text-white flex items-center justify-between ${notification.type === "success" ? "bg-green-500" : "bg-red-500"} rounded-md shadow-md transition-all duration-300`}>
            <div className="flex items-center">
              {notification.type === "success" ? (
                <FaCheckCircle className="mr-2" />
              ) : (
                <FaTimesCircle className="mr-2" />
              )}
              <span>{notification.message}</span>
            </div>
            <button 
              onClick={() => setNotification({...notification, show: false})}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        )}
        
        {/* Main Content */}
        <div className="bg-white p-8 rounded-b-lg shadow-lg border border-gray-200">
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
                className="border border-gray-300 p-3 text- rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" 
                name="email" 
                type="email" 
                value={userData.email}
                placeholder="Enter your email" 
                onChange={handleChange}
              />
            </div>
            
            {/* <div className="flex flex-col">
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
            </div> */}

            {/* Profile Picture Upload */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1 flex items-center">
                <FaCamera className="mr-2 text-blue-600" /> Profile Picture
              </label>
              <div>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  id="profile-upload"
                  onChange={handleProfilePictureChange}
                />
                <label 
                  htmlFor="profile-upload"
                  className="block w-full px-4 py-2 text-sm text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
                >
                  Upload Photo
                </label>
                {userData.profilePicture && (
                  <div className="mt-4">
                    <img 
                      src={userData.profilePicture} 
                      alt="Profile Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* <div className="flex flex-col">
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
            </div> */}
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
            <button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all" 
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;