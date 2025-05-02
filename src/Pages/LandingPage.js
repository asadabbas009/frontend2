// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import backgroundImage from '../Assest/landing-bg.jpg';
// import { FaGraduationCap, FaLaptopMedical, FaHandsHelping, FaChevronRight, FaArrowDown, FaUserCircle } from 'react-icons/fa';

// function LandingPage() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userType, setUserType] = useState('');

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     const user = localStorage.getItem('user');
//     if (user) {
//       setIsLoggedIn(true);
//       try {
//         const userData = JSON.parse(user);
//         setUserType(userData.userType || '');
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//       }
//     }
//   }, []);

//   const clickHandler = () => {
//     console.log("Navigating to signup");
//     navigate('/signup');
//   };

//   const loginHandler = () => {
//     console.log("Navigating to login");
//     navigate('/login');
//   };

//   const dashboardHandler = () => {
//     if (userType === 'teacher') {
//       navigate('/teacher-dashboard/home');
//     } else {
//       navigate('/student-dashboard/home');
//     }
//   };

//   const scrollToFeatures = () => {
//     document.getElementById('features-section').scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <div className="min-h-screen w-full">
//       {/* Hero Section */}
//       <div className="bg-gradient-hero min-h-screen flex items-center relative overflow-hidden">
//         <div className="container mx-auto px-4 py-16">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-10">
//             {/* Text Section */}
//             <div className="w-full md:w-[45%] text-center md:text-left">
//               <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
//                 Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">ONE Simulation!</span>
//               </h1>
              
//               <p className="text-xl md:text-2xl font-medium mb-6 text-blue-100">
//                 Revolutionizing Healthcare Training with Cutting-Edge Simulation
//               </p>
              
//               <p className="mb-8 text-base md:text-lg text-white/90">
//                 Experience the future of medical education with state-of-the-art simulators designed to enhance clinical skills, improve patient outcomes, and transform learning experiences.
//               </p>
              
//               <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mb-6">
//                 {isLoggedIn ? (
//                   <button 
//                     type="button"
//                     onClick={dashboardHandler} 
//                     className="bg-white text-custom-purple hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center cursor-pointer z-20"
//                   >
//                     Go to Dashboard <FaUserCircle className="ml-2" />
//                   </button>
//                 ) : (
//                   <>
//                     <button 
//                       type="button"
//                       onClick={clickHandler} 
//                       className="bg-white text-custom-purple hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center cursor-pointer z-20"
//                     >
//                       Get Started <FaChevronRight className="ml-2" />
//                     </button>
//                     <button 
//                       type="button"
//                       onClick={loginHandler} 
//                       className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors duration-300 cursor-pointer z-20"
//                     >
//                       Sign In
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Image Section */}
//             <div className="w-full md:w-[50%] flex justify-center">
//               <img 
//                 src={backgroundImage} 
//                 alt="Medical Simulation" 
//                 className="w-full max-w-lg rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 object-cover" 
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Background Elements */}
//         <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        
//         {/* Scroll Down Indicator */}
//         <div className="absolute bottom-8 left-0 w-full flex justify-center">
//           <button 
//             type="button"
//             onClick={scrollToFeatures} 
//             className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 animate-bounce cursor-pointer z-20"
//           >
//             <FaArrowDown className="text-white text-xl" />
//           </button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features-section" className="bg-white py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-800 mb-4">
//               Why Choose <span className="text-blue-600">ONE Simulation</span>
//             </h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
//               Our platform offers unparalleled training experiences for healthcare professionals
//             </p>
//             <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
//               <div className="text-blue-500 text-5xl mb-6 flex justify-center">
//                 <FaLaptopMedical />
//               </div>
//               <h4 className="text-2xl font-semibold mb-4 text-center">Realistic Simulations</h4>
//               <p className="text-gray-600 text-center">Realistic, High-Fidelity Medical Simulations that mimic real-world scenarios with exceptional accuracy</p>
//             </div>
            
//             <div className="bg-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
//               <div className="text-indigo-500 text-5xl mb-6 flex justify-center">
//                 <FaGraduationCap />
//               </div>
//               <h4 className="text-2xl font-semibold mb-4 text-center">Innovative Training</h4>
//               <p className="text-gray-600 text-center">Innovative Training Solutions for Healthcare Professionals at all levels of expertise and specialization</p>
//             </div>
            
//             <div className="bg-purple-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
//               <div className="text-purple-500 text-5xl mb-6 flex justify-center">
//                 <FaHandsHelping />
//               </div>
//               <h4 className="text-2xl font-semibold mb-4 text-center">Theory & Practice</h4>
//               <p className="text-gray-600 text-center">Bridging the Gap Between Theory & Practice through hands-on experience in a safe, controlled environment</p>
//             </div>
//           </div>
          
//           <div className="text-center mb-16">
//             <p className="text-xl text-gray-700 max-w-4xl mx-auto">
//               Join us in shaping the future of medical training with advanced simulation technology.
//             </p>
//           </div>
          
//           <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-10 rounded-2xl text-white text-center shadow-xl">
//             <h3 className="text-4xl font-bold mb-4">
//               <strong>Discover. Learn. Excel.</strong>
//             </h3>
//             <p className="text-xl mb-8 max-w-2xl mx-auto">Take the first step towards transforming healthcare education and elevating patient care standards</p>
//             {isLoggedIn ? (
//               <button 
//                 type="button"
//                 onClick={dashboardHandler}
//                 className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer z-20"
//               >
//                 Go to Dashboard
//               </button>
//             ) : (
//               <button 
//                 type="button"
//                 onClick={clickHandler}
//                 className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer z-20"
//               >
//                 Get Started Today
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Add global styles to ensure buttons are clickable */}
//       <style jsx="true">{`
//         button {
//           cursor: pointer !important;
//           position: relative;
//           z-index: 20 !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default LandingPage;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../Assest/landing-bg.jpg";
import {
  FaGraduationCap,
  FaLaptopMedical,
  FaHandsHelping,
  FaArrowDown,
  FaUserCircle,
} from "react-icons/fa";
import { useUser } from "../UserContext"; // Import UserContext

function LandingPage() {
  const navigate = useNavigate();
  const { user } = useUser(); // Use the UserContext to get the user state
  const [userType, setUserType] = useState("");

  // Update userType whenever user changes
  useEffect(() => {
    if (user) {
      setUserType(user.userType || "");
    } else {
      setUserType("");
    }
  }, [user]); // This effect runs whenever the user state changes

  const loginHandler = () => {
    console.log("Navigating to login");
    navigate("/login");
  };

  const dashboardHandler = () => {
    if (userType === "teacher") {
      navigate("/teacher-dashboard/home");
    } else {
      navigate("/student-dashboard/home");
    }
  };

  const scrollToFeatures = () => {
    document
      .getElementById("features-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="bg-gradient-hero min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text Section */}
            <div className="w-full md:w-[45%] text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                Welcome to{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                  ONE Simulation!
                </span>
              </h1>

              <p className="text-xl md:text-2xl font-medium mb-6 text-blue-100">
                Revolutionizing Healthcare Training with Cutting-Edge Simulation
              </p>

              <p className="mb-8 text-base md:text-lg text-white/90">
                Experience the future of medical education with state-of-the-art
                simulators designed to enhance clinical skills, improve patient
                outcomes, and transform learning experiences.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 mb-6">
                {user ? (
                  <button
                    type="button"
                    onClick={dashboardHandler}
                    className="bg-white text-custom-purple hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center cursor-pointer z-20"
                  >
                    Go to Dashboard <FaUserCircle className="ml-2" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={loginHandler}
                      className="border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors duration-300 cursor-pointer z-20"
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-[50%] flex justify-center">
              <img
                src={backgroundImage}
                alt="Medical Simulation"
                className="w-full max-w-lg rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center">
          <button
            type="button"
            onClick={scrollToFeatures}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 animate-bounce cursor-pointer z-20"
          >
            <FaArrowDown className="text-white text-xl" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">ONE Simulation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
              Our platform offers unparalleled training experiences for
              healthcare professionals
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-blue-500 text-5xl mb-6 flex justify-center">
                <FaLaptopMedical />
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Realistic Simulations
              </h4>
              <p className="text-gray-600 text-center">
                Realistic, High-Fidelity Medical Simulations that mimic
                real-world scenarios with exceptional accuracy
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-indigo-500 text-5xl mb-6 flex justify-center">
                <FaGraduationCap />
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Innovative Training
              </h4>
              <p className="text-gray-600 text-center">
                Innovative Training Solutions for Healthcare Professionals at
                all levels of expertise and specialization
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-purple-500 text-5xl mb-6 flex justify-center">
                <FaHandsHelping />
              </div>
              <h4 className="text-2xl font-semibold mb-4 text-center">
                Theory & Practice
              </h4>
              <p className="text-gray-600 text-center">
                Bridging the Gap Between Theory & Practice through hands-on
                experience in a safe, controlled environment
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Join us in shaping the future of medical training with advanced
              simulation technology.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-10 rounded-2xl text-white text-center shadow-xl">
            <h3 className="text-4xl font-bold mb-4">
              <strong>Discover. Learn. Excel.</strong>
            </h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the first step towards transforming healthcare education and
              elevating patient care standards
            </p>
            {user ? (
              <button
                type="button"
                onClick={dashboardHandler}
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer z-20"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={loginHandler}
                className="bg-white text-blue-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer z-20"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Add global styles to ensure buttons are clickable */}
      <style jsx="true">{`
        button {
          cursor: pointer !important;
          position: relative;
          z-index: 20 !important;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;