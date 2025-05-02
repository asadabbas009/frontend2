import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext'; // Import the custom hook from UserContext'



const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser(); // Updated to use the renamed loginUser function



  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // For testing, bypass the API call and use the onLogin prop directly
    if (!process.env.REACT_APP_API_URL) {
      // Use the onLogin prop from App.js
      if (onLogin) {
        onLogin();
      } else {
        // Fallback to UserContext if onLogin is not provided
        const userData = {
          id: "123",
          name: "Test User",
          username: "testuser",
          email: email || "test@example.com",
          role: activeRole,
          token: "test-token",
          profilePicture: "https://via.placeholder.com/150"
        };
        loginUser(userData);
        
        if (activeRole === 'teacher') {
          navigate('/teacher-dashboard/home');
        } else {
          navigate('/student-dashboard/home');
        }
      }
      return;
    }
    
    // Normal API login flow
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {
            email,
            password,
            role: activeRole,
        });
      
        // Proceed with your logic for handling response
        const userData = {
            id: response.data.user.id,
            name: response.data.user.name,
            username: response.data.user.username,
            email: response.data.user.email,
            role: activeRole,
            token: response.data.user.token,
            profilePicture: response.data.user.profilePicture || "" // Add profilePicture from API response
        };
        loginUser(userData);

        if (activeRole === 'teacher') {
            navigate('/teacher-dashboard/home');
        } else {
            navigate('/student-dashboard/home');
        }
    } catch (err) {
        setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
};

  return (
<div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center bg-gradient-hero text-white overflow-x-hidden"
     style={{ backgroundImage: "" }}>

      <h1 className="text-4xl font-bold mb-6 text-white">
        Welcome to <span className="text-300 text-white">ONE</span> Simulation
      </h1>

      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-200 p-1 rounded-lg flex w-full">
            <button
              className={`w-1/2 py-3 font-bold rounded-lg transition-all duration-300 ${
                activeRole === 'student'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveRole('student')}
            >
              Student
            </button>
            <button
              className={`w-1/2 py-3 font-bold rounded-lg transition-all duration-300 ${
                activeRole === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setActiveRole('teacher')}
            >
              Faculty
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-white mb-4 text-center">Welcome Back!</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 w-full">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/70"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white/70"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white rounded-lg bg-blue-600 shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Login
          </button>
        </form>

        {/* <p className="mt-6 text-white text-center">
          Don't have an account? <Link to="/signup" className="text-blue-300 hover:text-black font-semibold">Register</Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;