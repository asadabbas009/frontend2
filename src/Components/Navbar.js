
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import UserContext
import  logo  from '../Assest/logo2.png'

const Navbar = ({ isLoggedIn, handleLogout }) => {
    const { user, logoutUser } = useUser(); // Updated to use the renamed logoutUser function
    const navigate = useNavigate(); // Initialize navigate hook

    const handleLogoutClick = () => {
        logoutUser(); // Clear login state and sessionStorage
        handleLogout(); // Call the App's handleLogout function
        navigate('/'); // Redirect to landing page
    };

    return (
        <div className="w-full bg-gradient-hero">
          <div className="container mx-auto flex items-center justify-between py-4 px-1">

          
            {/* Logo Section */}
            

              
                <img
                  src= {logo}
                  alt="ONE Simulation"
                  className="w-44 h-auto transition-opacity duration-300 hover:opacity-80 select-none"
                  draggable="false"
                />
              
      

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {!user ? (
                <>
                  <Link to="/login">
                    <button className="px-5 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
                      Login
                    </button>
                  </Link>
                  {/* <Link to="/signup">
                    <button className="px-5 py-2 text-lg font-medium text-white bg-green-500 rounded-lg shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg">
                      Signup
                    </button>
                  </Link> */}
                </>
              ) : (
                <>
                  <span className="text-gray-800 font-semibold">
                    Welcome, {user.name || "User"}
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className="px-5 py-2 text-lg font-medium text-white bg-red-500 rounded-lg shadow-md transition-all duration-300 hover:bg-red-600 hover:shadow-lg"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
};

export default Navbar;