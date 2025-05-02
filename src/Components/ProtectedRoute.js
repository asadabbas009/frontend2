// import React from 'react';
// import AccessDenied from './AccessDenied';

// const ProtectedRoute = ({ children }) => {
//   const user = localStorage.getItem('user');
//   if (!user) {
//     console.log("Access denied - no user found in localStorage");
//     return <AccessDenied />;
//   }
//   return children;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking in sessionStorage
  // This persists during page refresh but is cleared when tab is closed
  try {
    const user = sessionStorage.getItem('user');
    if (!user) {
      console.log("Access denied - no user found in sessionStorage");
      return <Navigate to="/login" />;
    }
    
    // Try to parse the user (this will verify it's valid JSON)
    JSON.parse(user);
    
    // If we got here, the user is logged in and data is valid
    return children;
    
  } catch (error) {
    console.error("Invalid user data in sessionStorage:", error);
    // Clear the invalid data
    sessionStorage.removeItem('user');
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;