import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SignUp from './Components/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import StudentDashboard from './Pages/StudentDashboard';
import TeacherDashboard from './Pages/TeacherDashboard';
import Assignments from './Components/Assignment';
import TeacherHome from './Components/TeacherHome';
import StudentHome from './Components/StudentHome';
import StudentMessage from './Components/StudentMessage';
// import TeacherAssignments from './Components/TeacherAssignments';
import Chatbot from './Components/Chatbot';
import { useState, useEffect } from 'react';
import ImageAnalysis from './Pages/Protocols/ImageAnalysis';
import PublishNewAssignment from './Components/PublishNewAssignment ';
import PublishExistingModule from './Components/PublishExistingModule';
// import CreateNewAssignment from './Components/CreateNewAssignment ';
import TeacherReport from './Components/TeacherReport';
import TeacherMessage from './Components/TeacherMessage';
// import PublishNewAssignment from './Components/PublishNewAssignment';
// import PublishExistingModule from './Components/PublishExistingModule';
// import CreateNewAssignment from './Components/CreateNewAssignment';
// import TeacherReport from './Components/TeacherReport';
// import CaseReview from './Components/CaseReview';
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
// import LogoLoader from './Components/LogoLoader';
// import AccessDenied from './Components/AccessDenied';

import ProtectedRoute from './Components/ProtectedRoute';
import AllReports from './Components/Allreport';
import QuizResult from './Pages/Protocols/QuizResult';
import PendingReport from './Components/PendingReport';
import RejectedReport from './Components/RejectedReport';
import ApprovedReport from './Components/ApprovedReport';
import CaseScenario from './Components/CaseScenario';
import StudentCaseScenario from './Components/StudentCaseScenario';
import { withTimer } from './Components/withTimer';
import Certificate from './Components/Certificate';
// import ReportGeneration from './Components/ReportGeneration';


const PatientPreparationTimed = withTimer(PatientPreparation,   "patient-preparation");
const ConsentFormTimed        = withTimer(ConsentForm,          "consent");
const PatientPositioningTimed = withTimer(PatientPositioning,   "patient-positioning");
const PositioningTimed        = withTimer(Positioning,          "positioning");
const ImageAcqTimed           = withTimer(ImageAcquisition,     "image-acquisition");
const PostCounselTimed        = withTimer(PostCounselling,      "post-counselling");
const ImageReportingTimed     = withTimer(ImageReporting,       "image-reporting");
const ImageAnalysisTimed      = withTimer(ImageAnalysis,        "image-analysis");
const QuizTimed               = withTimer(Quiz,                 "quiz");
const QuizResultTimed         = withTimer(QuizResult,           "quiz-result");














function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      console.log("User is logged in:", user);
    } else {
      setIsLoggedIn(false);
      console.log("User is not logged in");
    }
  }, []);

  const handleLogin = () => {
    // Store user data as a valid JSON object
    sessionStorage.setItem('user', JSON.stringify({
      isLoggedIn: true,
      name: "User",
      role: "student"
    }));
    setIsLoggedIn(true);
    console.log("User logged in successfully");
    navigate("/student-dashboard/home");
  };

  const handleLogout = () => {
    // Clear from sessionStorage
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    console.log("User logged out");
    navigate("/login");
  };

  return (
    <div>
        <>
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <Routes>
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/' element={<LandingPage />} />
            {/* <Route path='/access-denied' element={<AccessDenied />} /> */}
            
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
              <Route path='certificate' element={<Certificate />} />
              <Route path='topic' element={<Topic/>} />
              <Route path='rejected-assignments' element={<RejectedReport />} />
              <Route path='approved-assignments' element={<ApprovedReport />} />
              <Route path='case-scenarios' element={<StudentCaseScenario />} />
              <Route path='forums' element={<Forum/>} />
              <Route path="courses/ongoing/" element={<AllReports />}/>
              <Route path="courses/ongoing/:topicId" element={<Assignments studentName={sessionStorage.getItem("studentName")} />}/>
              <Route path="student-messages" element={<StudentMessage />} />
              <Route path='account' element={<Account/>} />
              <Route path='report' element={<Chatbot />} />
              {/* Protocol Routes inside Courses */}
              <Route path="courses/ongoing/:topicId/protocols/course-overview/:courseId" element={<CourseOverview />} />
              <Route path="courses/ongoing/:topicId/protocols/patient-registration/:courseId" element={<PatientRegistration />} />
              <Route
                   path="courses/ongoing/:topicId/protocols/patient-preparation/:courseId"
                   element={<PatientPreparationTimed />} 
              />
              <Route path="courses/ongoing/:topicId/protocols/consent/:courseId" element={<ConsentFormTimed/>} />
              <Route
                 path="courses/ongoing/:topicId/protocols/patient-positioning/:courseId"
                 element={<PatientPositioningTimed />}
              />
              <Route
    path="courses/ongoing/:topicId/protocols/positioning/:courseId"
    element={<PositioningTimed />}
  />
              <Route
    path="courses/ongoing/:topicId/protocols/image-acquisition/:courseId"
    element={<ImageAcqTimed />}
  />
  <Route
    path="courses/ongoing/:topicId/protocols/post-counselling/:courseId"
    element={<PostCounselTimed />}  
  />
  <Route
    path="courses/ongoing/:topicId/protocols/image-reporting/:courseId"
    element={<ImageReportingTimed />}
  />
  <Route
    path="courses/ongoing/:topicId/protocols/image-analysis/:courseId"
    element={<ImageAnalysisTimed />}
  />
  <Route
    path="courses/ongoing/:topicId/protocols/quiz/:courseId"
    element={<QuizTimed />}
  />
  <Route
    path="courses/ongoing/:topicId/protocols/quiz-result/:courseId"
    element={<QuizResultTimed />} 
  />
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
                <Route path='teacher-new-modules' element={<PublishNewAssignment />} />
                <Route path='teacher-existing-modules' element={<PublishExistingModule />} />
                <Route path='case-scenario' element={<CaseScenario />} />
                <Route path="teacher-pending-report" element={<PendingReport />} />
                <Route path="teacher-report" element={<TeacherReport />} />
                <Route path="teacher-message" element={<TeacherMessage />} />
                <Route path='account' element={<Account />} />
              </Route>
            
            {/* Fallback to access denied */}
            {/* <Route path="*" element={<AccessDenied />} /> */}
          </Routes>
        </>
    </div>
  );
}

export default App;