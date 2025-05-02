import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import img from "../../Assest/supine.jpeg"; // ✅ Main guide image (will appear after pop-up)
import confetti from 'canvas-confetti';



const Positioning = () => {
    const { topicId, courseId } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [showImage, setShowImage] = useState(false); // ✅ State to control when to show the image
    
    const [checkedSteps, setCheckedSteps] = useState({
        step1: false,
        step2: false,
        step3: false,
        step4: false,
        step5: false
    });

    const navigate = useNavigate();
    const location = useLocation();
    const registrationId = location.state?.registration_id || "";
    const reportId = location.state?.reportId;
    const assignmentId = location.state?.assignmentId;
    // Show Congratulations popup 30 seconds after step 2 is checked
    // useEffect(() => {
    //     let timer;
    //     if (checkedSteps.step2) {
    //         timer = setTimeout(() => {
    //             setShowPopup(true);
    //         }, 30000); // 30 seconds delay
    //     }
    //     return () => clearTimeout(timer);
    // }, [checkedSteps.step2]);
    useEffect(() => {
        let timer;
        if (checkedSteps.step2) {
            timer = setTimeout(() => {
                setShowPopup(true);
                
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }, 30000); // 30 seconds delay
        }
        return () => clearTimeout(timer);
    }, [checkedSteps.step2]);


    useEffect(() => {
        console.log('🚀 Passed reportId:', reportId);
    }, [reportId]);

    console.log('Assignment ID:', assignmentId);

    // After closing the pop-up, show the image in the guide section
    const handlePopupClose = () => {
        setShowPopup(false);
        setShowImage(true); // ✅ Show the main image after the pop-up is closed
    };

    const handleCheckboxChange = (step) => {
        setCheckedSteps((prev) => ({
            ...prev,
            [step]: !prev[step]
        }));
    };

    const handleNext = () => {
        if (!topicId || !courseId) {
            console.error("Missing topicId or courseId");
            return;
        }
        navigate(
            `/student-dashboard/courses/ongoing/${topicId}/protocols/image-acquisition/${courseId}`,
            { state: { registration_id: registrationId, reportId: reportId, assignmentId: assignmentId } }
        );
    };

    return (
        <div className="min-h-screen bg-gradient-hero pt-20 pb-24 px-4 md:px-8">
            <div className="relative max-w-4xl mx-auto">
                {/* Patient Position Guide Section */}
                <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden mb-20">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-4 px-6">
                        <h1 className="text-center text-2xl md:text-3xl font-bold text-white">
                            Patient Position Guide
                        </h1>
                    </div>
                    
                    <div className="p-6 space-y-6 text-center">
                        {/* ✅ Image appears only after the pop-up */}
                        {showImage && (
                            <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                                <img 
                                    src={img}  
                                    alt="Patient Position Guide" 
                                    className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105" 
                                />
                            </div>
                        )}

                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Ensure Correct Patient Positioning</h2>
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <p className="text-md text-blue-800">
                                Follow the instructions carefully to align the patient correctly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Steps Section with Checkboxes */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-12">
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-4 px-6">
                        <h2 className="text-center text-2xl md:text-3xl font-bold text-white">Patient Placement Steps</h2>
                    </div>
                    
                    <div className="p-8 space-y-6">
                        {[
                            { id: "step1", title: "Prepare the Couch", description: "Adjust and set up the examination couch for patient comfort and stability." },
                            { id: "step2", title: "Determine Patient Positioning", description: "Identify the correct placement based on pre-counseling instructions." },
                            { id: "step3", title: "Align the Patient", description: "Position the patient at the center of the couch to ensure proper alignment." },
                            { id: "step4", title: "Adjust Laser Marking", description: "Fine-tune the laser alignment for precise marking of the scanning area." },
                            { id: "step5", title: "Verify Positioning", description: "Check the display screen to confirm that the patient is correctly positioned." }
                        ].map((step, index) => (
                            <div className="flex items-center space-x-4" key={index}>
                                <input 
                                    type="checkbox" 
                                    id={step.id} 
                                    checked={checkedSteps[step.id]} 
                                    onChange={() => handleCheckboxChange(step.id)} 
                                    className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <div className="flex-1 bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                                    <label htmlFor={step.id} className="flex items-center space-x-2 cursor-pointer">
                                        <span className="font-semibold text-blue-800 text-lg">{step.title}</span>
                                    </label>
                                    <p className="text-gray-700">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Next Button */}
            <div className="fixed bottom-8 right-8">
                <button 
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold hover:bg-blue-700 transition-all"
                    onClick={handleNext}
                >
                    Next ➡️
                </button>
            </div>

            {/* Congratulations Popup (Appears 30s after step 2 is checked) */}
            {showPopup && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 text-center max-w-md mx-auto transform animate-fadeIn">
                        <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
                        <p className="text-lg text-gray-700 mt-4">Position detected successfully!</p>
                        <button
                            className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
                            onClick={handlePopupClose} // ✅ Close popup & show image
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Positioning;
