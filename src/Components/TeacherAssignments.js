import React from 'react';
import { useForm } from 'react-hook-form';


const TeacherAssignments = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      deadline: "",
      criteria: ""
    }
  });
  
  const onSubmit = (data) => {
    console.log("Assignment published:", data);
    alert("Assignment published successfully!");
    reset();
    
    
    // return fetch('https://your-api-url.com/api/assignments', {

    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)

    // })

    // .then(response => {
    //   if (!response.ok) throw new Error('Network response was not ok');
    //   return response.json();

    // })

    // .then(data => {
    //   console.log("Success:", data);
    //   alert("Assignment published successfully!");
    //   reset();

    // })

    // .catch(error => {
    //   console.error("Error:", error);
    //   alert("Failed to publish assignment.");

    // });

    
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Create New Assignment
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title:</label>
              <input 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                placeholder="Enter assignment title" 
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description:</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[100px]" 
                placeholder="Enter assignment description" 
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Deadline:</label>
              <input 
                type="date" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                {...register("deadline", { required: "Deadline is required" })}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Criteria:</label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-md" 
                placeholder="Enter evaluation criteria" 
                {...register("criteria", {required: "Criteria is required"})}
              />
              {errors.criteria && (
                <p className="text-red-500 text-sm mt-1">{errors.criteria.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Publishing..." : "Publish"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;