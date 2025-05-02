// import React, { useState } from "react";

// const Questions = ({ caseId, questions = [] }) => {
//     const [answers, setAnswers] = useState({}); // Store selected answers

//     const handleOptionChange = (questionId, option) => {
//         setAnswers((prevAnswers) => ({
//             ...prevAnswers,
//             [questionId]: prevAnswers[questionId]?.includes(option)
//                 ? prevAnswers[questionId].filter((opt) => opt !== option) // Uncheck
//                 : [...(prevAnswers[questionId] || []), option], // Check
//         }));
//     };

//     const handleSubmit = () => {
//         console.log("Answers Submitted:", answers);
//         alert("Answers Submitted! Check the console for details.");
//     };

//     // Validate `questions` is an array before mapping
//     if (!Array.isArray(questions)) {
//         return <p className="text-red-500">Invalid questions format.</p>;
//     }

//     return (
//         <div>
//             <h3 className="text-xl font-bold mb-4">Questions for Case ID: {caseId}</h3>
//             {questions.length > 0 ? (
//                 questions.map((question, index) => (
//                     <div key={question.id || index} className="mb-6">
//                         <p className="text-lg font-semibold mb-2">
//                             Q{index + 1}: {question.text || "No question text available"}
//                         </p>
//                         {Array.isArray(question.options) && question.options.length > 0 ? (
//                             <ul className="list-disc pl-6">
//                                 {question.options.map((option, idx) => (
//                                     <li key={idx} className="flex items-center space-x-2">
//                                         <input
//                                             type="checkbox"
//                                             id={`${question.id}_${idx}`}
//                                             className="form-checkbox"
//                                             onChange={() => handleOptionChange(question.id, option)}
//                                             checked={answers[question.id]?.includes(option) || false}
//                                         />
//                                         <label htmlFor={`${question.id}_${idx}`}>{option}</label>
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-gray-500 italic">No options available</p>
//                         )}
//                     </div>
//                 ))
//             ) : (
//                 <p className="text-gray-600">No questions available for this case.</p>
//             )}
//             <div className="mt-4">
//                 <button
//                     onClick={handleSubmit}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     Submit Answers
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Questions;
import React, { useState } from "react";

const Questions = ({ caseId, questions = [], title }) => {
    const [answers, setAnswers] = useState({}); // Store answers dynamically

    // Handle checkbox selection for options
    const handleOptionChange = (questionId, option) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: prevAnswers[questionId]?.includes(option)
                ? prevAnswers[questionId].filter((opt) => opt !== option) // Remove option
                : [...(prevAnswers[questionId] || []), option], // Add option
        }));
    };

    // Handle input changes for text fields
    const handleInputChange = (questionId, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value, // Save the input value
        }));
    };

    // Submit answers
    const handleSubmit = () => {
        console.log("Submitted Answers:", answers);
        alert("Answers submitted! Check the console for details.");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-700">
                    {title || `Questions for Case ID: ${caseId}`}
                </h2>
                {questions.length > 0 ? (
                    questions.map((question, index) => {
                        const hasValidOptions =
                            Array.isArray(question.options) &&
                            question.options.some((option) => option.trim() !== ""); // Check for valid options

                        return (
                            <div key={question.id || index} className="mb-6">
                                <p className="text-lg font-medium mb-2 text-gray-800">
                                    Q{index + 1}: {question.text || "No question text available"}
                                </p>
                                {hasValidOptions ? (
                                    // Render checkboxes for available options
                                    <ul className="space-y-2">
                                        {question.options.map((option, idx) => (
                                            <li key={idx} className="flex items-center space-x-3">
                                                <input
                                                    type="checkbox"
                                                    id={`${question.id}_${idx}`}
                                                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
                                                    onChange={() =>
                                                        handleOptionChange(question.id, option)
                                                    }
                                                    checked={
                                                        answers[question.id]?.includes(option) ||
                                                        false
                                                    }
                                                />
                                                <label
                                                    htmlFor={`${question.id}_${idx}`}
                                                    className="text-gray-700"
                                                >
                                                    {option}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    // Render input field for questions without valid options
                                    <div className="flex flex-col space-y-2">
                                        <p className="text-gray-500 italic">
                                            No options available. Please provide your answer:
                                        </p>
                                        <input
                                            type="text"
                                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your answer"
                                            value={answers[question.id] || ""}
                                            onChange={(e) =>
                                                handleInputChange(question.id, e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-gray-600">No questions available for this case.</p>
                )}
                <div className="mt-6">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Submit Answers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;


