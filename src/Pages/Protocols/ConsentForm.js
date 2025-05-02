import React, { useState,useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ConsentForm = () => {
  const navigate = useNavigate();
  const { topicId, courseId } = useParams();
  const location = useLocation();
  const registrationId = location.state?.registration_id;
  const reportId = location.state?.reportId; // Optional report ID
  const assignmentId = location.state?.assignmentId;


  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    hospitalID: "",
    ctNumber: "",
    opdIPD: "",
    bedNumber: "",
    refPhysician: "",
    date: "",
    pregnancy: "",
    dateOfLMP: "",
    clinicalHistory: "",
    previousScans: "",
    areaOfInterest: "",
    medicalHistory: "",
    chemoRadioTherapy: "",
    serumCreatinine: "",
    creatinineTestDate: "",
    patientSignature: "",
    techSignature: "",
    radiologistSignature: "",
    patientDate: "",
    techDate: "",
    radiologistDate: "",
    registration_id: registrationId || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

          useEffect(() => {
                    console.log('🚀 Passed reportId:', reportId);
                }, [reportId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consent-form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit consent form');
      const result = await response.json();
      console.log("✅ Consent Form Data:", result);
      alert("✅ Consent form submitted successfully!");

      setFormData({
        patientName: "",
        age: "",
        gender: "",
        hospitalID: "",
        ctNumber: "",
        opdIPD: "",
        bedNumber: "",
        refPhysician: "",
        date: "",
        pregnancy: "",
        dateOfLMP: "",
        clinicalHistory: "",
        previousScans: "",
        areaOfInterest: "",
        medicalHistory: "",
        chemoRadioTherapy: "",
        serumCreatinine: "",
        creatinineTestDate: "",
        patientSignature: "",
        techSignature: "",
        radiologistSignature: "",
        patientDate: "",
        techDate: "",
        radiologistDate: "",
        registration_id: registrationId || ""
      });

    } catch (error) {
      console.error('Error submitting consent form:', error);
      alert('Failed to submit consent form. Please try again later.');
    }
  };

  console.log('Assignment ID:', assignmentId); 

  const handleNext = () => {
    if (!topicId || !courseId) {
      console.error("Missing topicId or courseId");
      return;
    }
    navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/patient-preparation/${courseId}`, {
      state: { registration_id: formData.registration_id , reportId: reportId, assignmentId: assignmentId }
    });
  };
  
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Informed Consent for CT Scan
          </h1>
          <p className="text-blue-100 text-center mt-2">
            Please fill out all required fields
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {/* Registration ID */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Registration ID:
            </label>
            <input
              type="text"
              name="registration_id"
              value={formData.registration_id}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Patient Information Section */}
          <div className="mb-8">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Patient Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: "patientName", label: "Patient Name", placeholder: "Enter patient's full name as per ID proof" },
                { name: "age", label: "Age", placeholder: "Enter age in years" },
                { name: "gender", label: "Gender", type: "select" },
                { name: "hospitalID", label: "Hospital ID", placeholder: "Enter hospital registration ID" },
                { name: "ctNumber", label: "CT No", placeholder: "Enter CT scan number" },
                { name: "opdIPD", label: "OPD/IPD", placeholder: "Enter OPD or IPD number" },
                { name: "bedNumber", label: "Bed No", placeholder: "Enter ward and bed number" },
                { name: "refPhysician", label: "Ref. Physician", placeholder: "Enter referring physician's name" },
                { name: "date", label: "Date", type: "date" },
                { name: "pregnancy", label: "Pregnancy (Yes/No)", placeholder: "Enter Yes or No" },
                { name: "dateOfLMP", label: "Date of LMP", type: "date" },
                { name: "previousScans", label: "Previous Scans (USG/CT/MRI) (Yes/No)", placeholder: "Enter Yes or No" },
                { name: "areaOfInterest", label: "Area of Interest (Specify Non-contrast/Contrast)", placeholder: "Enter area to be scanned and type" },
                { name: "medicalHistory", label: "Medical History (Allergy, DM, HTN, etc.)", placeholder: "Enter relevant medical conditions" },
                { name: "chemoRadioTherapy", label: "Any Chemotherapy/Radiotherapy (Yes/No)", placeholder: "Enter Yes or No" },
                { name: "serumCreatinine", label: "Serum Creatinine", placeholder: "Enter serum creatinine value" },
                { name: "creatinineTestDate", label: "Date of Serum Creatinine Test", type: "date" },
              ].map((input, index) => (
                <div key={index}>
                  <label className="block text-gray-700 font-bold mb-2">{input.label}:</label>
                  {input.type === "select" ? (
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name={input.name}
                      value={formData[input.name]}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  ) : (
                    <input
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name={input.name}
                      type={input.type || "text"}
                      placeholder={input.placeholder}
                      value={formData[input.name]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Clinical History and Provisional Diagnosis:</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name="clinicalHistory"
                  placeholder="Enter detailed clinical history and provisional diagnosis"
                  value={formData.clinicalHistory}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="mb-8">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Signatures</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Patient", name: "patientSignature", dateName: "patientDate" },
                { label: "Technician", name: "techSignature", dateName: "techDate" },
                { label: "Radiologist", name: "radiologistSignature", dateName: "radiologistDate" },
              ].map((sig, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-gray-700 font-bold mb-2">{sig.label} Signature:</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name={sig.name}
                    placeholder={`Enter ${sig.label.toLowerCase()}'s signature`}
                    onChange={handleChange}
                  />
                  <label className="block text-gray-700 font-bold mt-4 mb-2">Date:</label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name={sig.dateName}
                    type="date"
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit & Next Buttons */}
          <div className="flex justify-center gap-4 mt-10 mb-6">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-40 py-3 rounded-lg text-base font-medium transition duration-200 shadow-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-40 py-3 rounded-lg text-base font-medium transition duration-200 shadow-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;