import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { 
    FaTachometerAlt, FaLayerGroup, FaComments, 
    FaEnvelope, FaUser, FaChevronDown, FaChevronUp, FaBook, FaGraduationCap,  FaFileAlt
} from "react-icons/fa";

import { useUser } from '../UserContext'; // Import the UserContext hook



const StudentDashboard = () => {
    const { topicId, courseId } = useParams(); 
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isProtocolsOpen, setIsProtocolsOpen] = useState(false);
    const [studentName, setStudentName] = useState("Student");
    const location = useLocation();
    const { user, profilePicture: contextProfilePicture } = useUser(); // Get user and profilePicture from context

    useEffect(() => {
        if (location.pathname.includes("/courses")) setIsCoursesOpen(true);
        if (location.pathname.includes("/protocols")) setIsProtocolsOpen(true);
        
        // Get student name from UserContext
        if (user) {
            if (user.name) {
                setStudentName(user.name);
            } else if (user.username) {
                setStudentName(user.username);
            }
        }
    }, [location.pathname, user]); // Added user as dependency

    const selectedTopicId = localStorage.getItem("selectedTopicId") || "defaultTopicId";

    const isActive = (path) => {
        const currentPath = location.pathname;
        
        // For Assignments section - keep selected for all assignment related pages
        if (path === '/student-dashboard/student-existing-modules') {
            return currentPath.includes('/student-dashboard/student-assignments') || 
                   currentPath.includes('/student-dashboard/student-existing-modules') ||
                   currentPath.includes('/student-dashboard/student-new-modules');
        }
        
        // For Dashboard and Account - exact path matching
        if (path === '/student-dashboard/home' || path === '/student-dashboard/account') {
            return currentPath === path;
        }
        
        // For all other paths
        return currentPath.startsWith(path);
    };

    return (
        <div className="flex w-[100%] h-[100%] min-h-screen bg-gray-100">
            
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-blue-800 to-purple-900 text-white flex flex-col shadow-lg">
                
                {/* Enhanced Profile Section */}
                <div className="p-6 text-center border-b border-blue-700 bg-gradient-to-r from-blue-900 to-purple-900">
                    <div className="relative inline-block">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-white overflow-hidden">
                            {contextProfilePicture ? (
                                <img 
                                    src={contextProfilePicture} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaGraduationCap className="text-3xl text-white" />
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">Welcome!</h2>
                    <p className="text-lg font-semibold text-blue-200 mb-1">{studentName}</p>
                    <div className="bg-blue-700/30 rounded-full px-3 py-1 text-xs text-blue-100 inline-block mt-1">
                        Student
                    </div>
                </div>

                {/* Sidebar Menu */}
                <nav className="mt-4 px-4 space-y-1">
                    <SidebarLink to="/student-dashboard/home" icon={FaTachometerAlt} label="Dashboard" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/topic" icon={FaLayerGroup} label="All Modules" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/case-scenarios" icon={FaFileAlt} label="Case Scenarios" isActive={isActive} />
                    {/* <SidebarLink to="/student-dashboard/messages" icon={FaEnvelope} label="Messages" isActive={isActive} /> */}

                    {/* Courses - Expandable */}
                    <div>
                        <button 
                            onClick={() => setIsCoursesOpen(!isCoursesOpen)} 
                            className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-purple-700 rounded-lg transition"
                        >
                            <div className="flex items-center">
                                <FaBook className="mr-3" />
                                        <span className='ml-2' >Courses</span> 
                            </div>
                            {isCoursesOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>

                        {isCoursesOpen && (
                            <div className="ml-4 mt-2 space-y-1 pl-4">
                                <SidebarLink 
                                    to={`/student-dashboard/courses/ongoing/${selectedTopicId}`} 
                                    label="📘 Ongoing Modules" 
                                    isActive={isActive} 
                                    extraClass="text-sm"
                                />

                                {/* Protocols Dropdown */}
                                <div>
                                    <button 
                                        onClick={() => setIsProtocolsOpen(!isProtocolsOpen)} 
                                        className="w-full flex items-center justify-between text-white hover:bg-purple-700 px-3 py-2 rounded-lg transition"
                                    >
                                        <span>Select Protocol</span>
                                        {isProtocolsOpen ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>

                                    {isProtocolsOpen && (
                                        <div className="ml-4 mt-2 pointer-events-none space-y-1 pl-4">
                                            {[
                                                "course-overview", "patient-registration", "consent", "patient-preparation",
                                                "patient-positioning", "positioning", "image-acquisition", "image-analysis",
                                                "image-reporting", "post-counselling", "quiz"
                                            ].map((protocol) => {
                                                // Custom labels for specific protocols
                                                let displayLabel = protocol.replace("-", " ");
                                                if (protocol === "patient-positioning") {
                                                    displayLabel = "Patient Positioning Setup";
                                                } else if (protocol === "positioning") {
                                                    displayLabel = "Patient Placement";
                                                } else {
                                                    displayLabel = protocol.replace(/-/g, " ");
                                                }
                                                
                                                return (
                                                    <SidebarLink 
                                                        key={protocol}
                                                        to={`/student-dashboard/courses/ongoing/${topicId}/protocols/${protocol}/${courseId}`}
                                                        label={displayLabel}
                                                        isActive={isActive}
                                                        extraClass="text-sm capitalize"
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <SidebarLink to="/student-dashboard/rejected-assignments" icon={FaFileAlt} label="Rejected Assignments" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/approved-assignments" icon={FaFileAlt} label="Approved Assignments" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/forums" icon={FaComments} label="Forum" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/account" icon={FaUser} label="Account" isActive={isActive} />
                    <SidebarLink to="/student-dashboard/student-messages" icon={FaEnvelope} label="Messages" isActive={isActive} />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-grow min-h-screen bg-white shadow-lg">
                <Outlet />
            </main>
        </div>
    );
};

// Sidebar Link Component (Reusable)
const SidebarLink = ({ to, icon: Icon, label, isActive, extraClass = "" }) => (
    <Link
        to={to}
        className={`flex items-center space-x-2 px-4 py-3 text-white hover:bg-purple-700 rounded-lg transition ${isActive(to) ? "bg-purple-600" : ""} ${extraClass}`}
    >
        {Icon && <Icon className="mr-3" />}
        <span>{label}</span>
    </Link>
);

export default StudentDashboard;