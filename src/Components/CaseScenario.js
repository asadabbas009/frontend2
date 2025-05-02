import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaBook, FaPaperPlane } from "react-icons/fa";
import StudentSelection from "./StudentSelection";

const CaseScenario = () => {
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState("");
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      criteria: "",
    },
  });

  // Fetch modules
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/topics`
        );
        console.log("Modules fetched:", response.data);
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
        setError("Failed to load modules");
      }
    };
    fetchModules();
  }, []);

  // Fetch courses when module is selected
  useEffect(() => {
    const fetchCourses = async () => {
      if (!selectedModule) {
        setCourses([]);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/courses/${selectedModule}`
        );
        console.log("Courses data:", response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [selectedModule]);

  const handleModuleChange = (e) => {
    const moduleId = e.target.value;
    setSelectedModule(moduleId);
    setSelectedCourse("");
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedImage(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const removeImage = () => {
  //   setSelectedImage(null);
  //   setImagePreview(null);
  // };

  const onSubmit = async (data) => {
    try {
      if (!selectedModule || !selectedCourse) {
        return alert("Please select both module and course");
      }
      
      const payload = {
        moduleId: selectedModule,
        courseIds: [selectedCourse],
        studentIds: selectedStudents,
        title: data.title,
        description: data.description,
        criteria: data.criteria,
      };

      console.log("Complete assignment data:", payload);

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assignments/case`,
        payload
      );
      
      alert("Assignment published successfully!");
      
      // Reset all form fields and state
      reset();
      setSelectedModule("");
      setSelectedCourse("");
      setCourses([]);
      setSelectedStudents([]);
      // setSelectedImage(null);
      // setImagePreview(null);
      setError("");
      
      navigate("/teacher-dashboard/home", { state: { moduleData: payload } });
    } catch (error) {
      console.error("Error publishing assignment:", error);
      alert("Failed to publish assignment. Please try again.");
    }
  };

  const handleStudentSelect = (studentId) => {
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {error && (
         <div className="p-4 bg-red-100 border border-red-300 text-red-700">
           {error}
         </div>
       )}
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
            <FaBook className="mr-3" />
            Case Scenarios
          </h2>
        </div>

        {/* Module and Course Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Module
              </label>
              <select
                value={selectedModule}
                onChange={handleModuleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a module</option>
                {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={handleCourseChange}
                disabled={!selectedModule}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter assignment title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Enter assignment description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evaluation Criteria
              </label>
              <textarea
                {...register("criteria", { required: "Evaluation criteria is required" })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows="4"
                placeholder="Enter evaluation criteria"
              />
              {errors.criteria && (
                <p className="text-red-500 text-sm mt-1">{errors.criteria.message}</p>
              )}
            </div>

            {/* Student Selection Component */}
            <StudentSelection 
              selectedStudents={selectedStudents}
              onStudentSelect={handleStudentSelect}
            />

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || selectedStudents.length === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting || selectedStudents.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <FaPaperPlane className="mr-2" />
                Create Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CaseScenario;