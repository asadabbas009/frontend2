// import React, { useState } from "react";

// function ImageComparison() {
//     const [result, setResult] = useState(null);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData();
//         formData.append("file", event.target.file.files[0]);

//         try {
//             const response = await fetch("http://localhost:5000/process", {
//                 method: "POST",
//                 body: formData,
//             });

//             const data = await response.json();
//             setResult(data);
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">Image Comparison</h1>
//             <form
//                 onSubmit={handleSubmit}
//                 className="bg-white p-6 shadow-md rounded-lg w-full max-w-md"
//             >
//                 <div className="mb-4">
//                     <label className="block text-gray-700 font-semibold mb-2">
//                         Upload Image:
//                     </label>
//                     <input
//                         type="file"
//                         name="file"
//                         required
//                         className="block w-full border border-gray-300 rounded-lg p-2"
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
//                 >
//                     Submit
//                 </button>
//             </form>

//             {result && (
//                 <div className="mt-8 bg-white p-6 shadow-md rounded-lg w-full max-w-md">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-4">Result</h2>
//                     <p className="text-gray-700 mb-2">
//                         <strong>Matched Filename:</strong> {result.matched_filename}
//                     </p>
//                     <p className="text-gray-700 mb-4">
//                         <strong>Similarity Score:</strong> {result.similarity_score}
//                     </p>
//                     <img
//                         src={`http://localhost:8000${result.report_url}`}
//                         alt="Report"
//                         className="border border-gray-300 rounded-lg max-w-full"
//                     />
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ImageComparison;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ImageComparison() {
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", event.target.file.files[0]);

        try {
            const response = await fetch("http://localhost:5000/process", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Image Comparison</h1>
            
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 shadow-md rounded-lg w-full max-w-md"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">
                        Upload Image:
                    </label>
                    <input
                        type="file"
                        name="file"
                        required
                        className="block w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
            </form>

            {result && (
                <div className="mt-8 bg-white p-6 shadow-md rounded-lg w-full max-w-md">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Result</h2>
                    <p className="text-gray-700 mb-2">
                        <strong>Matched Filename:</strong> {result.matched_filename}
                    </p>
                    <p className="text-gray-700 mb-4">
                        <strong>Similarity Score:</strong> {result.similarity_score}
                    </p>
                    <img
                        src={`http://localhost:8000${result.report_url}`}
                        alt="Report"
                        className="border border-gray-300 rounded-lg max-w-full"
                    />
                </div>
            )}

            {/* Next Button */}
            <button
                onClick={() => navigate("/student-dashboard/protocols/image-reporting")}
                className="mt-6 px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"
            >
                Next ➡️
            </button>
        </div>
    );
}

export default ImageComparison;
