import './App.css';
import Navbar from './Components/Navbar';
import { UserProvider } from "./UserContext";
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import StudentDashboard from './Pages/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import Assignments from './Components/Assignment';
import TeacherHome from './Components/TeacherHome';
import StudentHome from './Components/StudentHome';
import TeacherCaseLibrary from './Components/TeacherCaseLibrary';
import Chatbot from './Components/Chatbot';
import { useState, useEffect } from 'react';
import ImageAnalysis from './Pages/Protocols/ImageAnalysis';
import CaseReview from './Components/CaseReview';
import PatientRegistration from './Pages/Protocols/PatientRegistration';
import ConsentForm from './Pages/Protocols/ConsentForm';
import PatientPreparation from './Pages/Protocols/PatientPreparation';
import PatientPositioning from './Pages/Protocols/PatientPositioning';
import ImageAcquisition from './Pages/Protocols/ImageAcquisition';
import PostCounselling from './Pages/Protocols/PostCounselling';
import ImageReporting from './Pages/Protocols/ImageReporting';
import Account from './Components/Account';
import Positioning from './Pages/Protocols/Positioning';
import CourseOverview from './Pages/Protocols/CourseOverview';
import Topic from './Components/Topic';
import Quiz from './Pages/Protocols/Quiz';
import Forum from './Components/Forum';
import LogoLoader from './Components/LogoLoader';
import AccessDenied from './Components/AccessDenied';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Loading time for the LogoLoader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check for existing session
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      console.log("User is logged in:", user);
    } else {
      setIsLoggedIn(false);
      console.log("User is not logged in");
    }

    // Clear user data when tab is closed
    const handleTabClose = () => {
      localStorage.removeItem('user');
    };

    // Add event listener for tab close
    window.addEventListener('beforeunload', handleTabClose);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem('user', 'loggedIn');
    setIsLoggedIn(true);
    console.log("User logged in successfully");
    navigate("/student-dashboard/home");
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <UserProvider>
      <div>
        {loading ? (
          <LogoLoader />
        ) : (
          <>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <Routes>
              <Route path='/login' element={<Login onLogin={handleLogin} />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/' element={<LandingPage />} />
              <Route path='/access-denied' element={<AccessDenied />} />
              
              {/* Protected Student Dashboard */}
              <Route 
                path='/student-dashboard/*' 
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              >
                <Route path='home' element={<StudentHome />} />
                <Route path='topic' element={<Topic/>} />
                <Route path='forums' element={<Forum/>} />
                <Route path="courses/ongoing/:topicId" element={<Assignments studentName={localStorage.getItem("studentName")} />}/>
                <Route path='account' element={<Account/>} />
                <Route path='report' element={<Chatbot />} />
                {/* Protocol Routes inside Courses */}
                <Route path="courses/ongoing/:topicId/protocols/course-overview/:courseId" element={<CourseOverview />} />
                <Route path="courses/ongoing/:topicId/protocols/patient-registration/:courseId" element={<PatientRegistration />} />
                <Route path="courses/ongoing/:topicId/protocols/patient-preparation/:courseId" element={<PatientPreparation />} />
                <Route path="courses/ongoing/:topicId/protocols/consent/:courseId" element={<ConsentForm />} />
                <Route path="courses/ongoing/:topicId/protocols/patient-positioning/:courseId" element={<PatientPositioning />} />
                <Route path="courses/ongoing/:topicId/protocols/positioning/:courseId" element={<Positioning />} />
                <Route path="courses/ongoing/:topicId/protocols/image-acquisition/:courseId" element={<ImageAcquisition />} />
                <Route path="courses/ongoing/:topicId/protocols/post-counselling/:courseId" element={<PostCounselling />} />
                <Route path="courses/ongoing/:topicId/protocols/image-reporting/:courseId" element={<ImageReporting />} />
                <Route path="courses/ongoing/:topicId/protocols/image-analysis/:courseId" element={<ImageAnalysis />} />
                <Route path="courses/ongoing/:topicId/protocols/quiz/:courseId" element={<Quiz />} />
              </Route>
              
              {/* Protected Teacher Dashboard */}
              <Route 
                path='/teacher-dashboard/*' 
                element={
                  <ProtectedRoute>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path='home' element={<TeacherHome />} />
                <Route path='case-library' element={<TeacherCaseLibrary />} />
                <Route path='report' element={<CaseReview />} />
                <Route path='account' element={<Account />} />
              </Route>
              
              {/* Fallback to access denied */}
              <Route path="*" element={<AccessDenied />} />
            </Routes>
          </>
        )}
      </div>
    </UserProvider>
  );
}

export default App;