import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUser } from "../../UserContext"; // adjust the path if needed

function PatientRegistration() {
  const navigate = useNavigate();
  const { topicId, courseId } = useParams();
  const { user } = useUser(); // Get the logged-in user from context
  const location = useLocation();
  const reportId = location.state?.reportId;
  const assignmentId = location.state?.assignmentId;

  console.log(user);
  // For unique patient id generation.
  // In a production app consider generating this on the server side to avoid collisions.
  let patientCounter = 1;
  const generateUniqueId = () => {
    const numberPart = (Date.now() % 90000) + 10000;
    const formattedCounter = patientCounter.toString().padStart(3, "0");
    const id = `OS-${formattedCounter}-${numberPart}`;
    patientCounter++;
    return id;
  };

  // Initialize the form data; user_id will be updated from context.
  const [formData, setFormData] = useState({
    registration_id: generateUniqueId(),
    courseId: courseId,
    user_id: "", // will be updated below
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    emergencyContact: "",
    kinName: "",
    kinRelation: "",
    kinPhone: "",
    agreement: false,
  });
  console.log(formData);
  // Once the user from context is available, update formData
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        user_id: user.id,
      }));
    }
  }, [user]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreement) {
      setError("❌ Please agree to the terms and conditions.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to register patient");

      const result = await response.json();
      console.log("✅ Patient Registration Data:", result);
      alert("✅ Registration successful!");
      setError("");

      // Navigate to the next page after registration.
      navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/consent/${courseId}`, {
        state: { registration_id: formData.registration_id , reportId: reportId , assignmentId: assignmentId },
      });
    } catch (error) {
      console.error("Error registering patient:", error);
      setError("Failed to register patient. Please try again later.");
    }
  };
          useEffect(() => {
                    console.log('🚀 Passed reportId:', reportId);
                }, [reportId]);


                console.log('Asssignment ID:', assignmentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h2 className="text-3xl font-bold text-white text-center">Patient Registration</h2>
          <p className="text-blue-100 text-center mt-2">Please fill out all required fields</p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {error && <p className="text-red-500 text-center mb-6">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Course Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800">Course Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Course ID:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="courseId"
                  value={courseId}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Patient ID:</label>
                <input
                  type="text"
                  name="registration_id"
                  value={formData.registration_id}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Hidden User ID (populated from context) */}
            <input type="hidden" name="user_id" value={formData.user_id} />

            {/* Patient Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800">Patient Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Full Name:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="name"
                  placeholder="Enter your full name as per ID proof"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Age:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="age"
                  placeholder="Enter your age in years"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Gender:</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="gender"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email Address:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="email"
                  placeholder="Enter your email address (e.g., example@email.com)"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Emergency Contact:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="emergencyContact"
                  placeholder="Enter emergency contact number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Address:</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="address"
                  placeholder="Enter your complete address with PIN code"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Next of Kin */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800">Next of Kin/Contact Person</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Kin Name:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="kinName"
                  placeholder="Enter full name of next of kin"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Relationship:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="kinRelation"
                  placeholder="Enter relationship (e.g., Spouse, Parent, Sibling)"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Kin Phone Number:</label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="kinPhone"
                  placeholder="Enter 10-digit phone number of next of kin"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Agreement */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800">Agreement</h3>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-gray-700">I agree to the terms and conditions.</span>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-10 mb-6">
              <button
                type="submit"
                className="w-40 py-3 rounded-lg text-base font-medium transition duration-200 shadow-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientRegistration;