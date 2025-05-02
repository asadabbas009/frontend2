import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import confetti from 'canvas-confetti';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { score, courseTitle, registration_id, topicId } = location.state || {};



  // Trigger confetti effect on component mount
  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const getScoreColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleReturnToDashboard = () => {
    navigate('/student-dashboard/home');
  };

  const handleReturnToCourse = () => {
    if (topicId) {
      navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/course-overview/${courseId}`, {
        state: { registration_id }
      });
    } else {
      // Fallback to dashboard if topicId is missing
      handleReturnToDashboard();
    }
  };

//   
// this is for error handling if no result found return to dashboard page
  if (!score || !topicId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {!score ? "No results available" : "Missing topic information"}
          </h1>
          <p className="text-gray-600 mb-6">
            {!score 
              ? "We couldn't find your quiz results." 
              : "Some required information is missing. Please try taking the quiz again."}
          </p>  
          <button
            onClick={handleReturnToDashboard}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-600">
            You've completed the quiz for {courseTitle}
          </p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Your Score</h2>
            <div className={`text-5xl font-bold mt-4 ${getScoreColor(score.percentage)}`}>
              {score.percentage}%
            </div>
            <p className="text-gray-600 mt-2">
              {score.correct} correct out of {score.total} questions
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Detailed Results</h3>
          <div className="space-y-6">
            {score.details.map((result, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${
                  result.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <p className="font-medium text-gray-800 mb-2">{result.question}</p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-600 mr-2">Your Answer:</span>
                    <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                      {result.userAnswer || 'No answer provided'}
                    </span>
                  </div>
                  {!result.isCorrect && (
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-2">Correct Answer:</span>
                      <span className="text-green-600">{result.correctAnswer}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={handleReturnToCourse}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>Return to Course</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;