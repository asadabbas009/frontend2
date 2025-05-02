import React, { useState } from 'react';
import axios from 'axios';

const StudentPatientRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    address: '',
    medicalHistory: '',
    allergies: '',
    bloodGroup: '',
    emergencyContact: '',
    dateOfAdmission: '',
    height: '',
    weight: '',
    temperature: '',
    bloodPressure: '',
    pulseRate: '',
    respiratoryRate: '',
    spO2: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/patients', formData);
      setMessage('Patient registered successfully!');
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: '',
        email: '',
        address: '',
        medicalHistory: '',
        allergies: '',
        bloodGroup: '',
        emergencyContact: '',
        dateOfAdmission: '',
        height: '',
        weight: '',
        temperature: '',
        bloodPressure: '',
        pulseRate: '',
        respiratoryRate: '',
        spO2: '',
      });
    } catch (error) {
      setMessage('Error registering patient. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center pt-5 justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Patient Registration</h1>
        {message && <p className="text-center mb-4 text-green-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter age"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Gender:</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Date of Admission:</label>
                <input
                  type="date"
                  name="dateOfAdmission"
                  value={formData.dateOfAdmission}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Contact:</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Emergency Contact:</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Address:</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  required
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h2 className="text-xl font-bold text-blue-700 mb-4">Medical Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Blood Group:</label>
                <input
                  type="text"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  placeholder="Enter blood group"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Allergies:</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter allergies"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-bold mb-2">Medical History:</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  placeholder="Enter medical history"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Vital Information Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Vital Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Height (cm):</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Enter height"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Weight (kg):</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Enter weight"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Temperature (°C):</label>
                <input
                  type="number"
                  name="temperature"
                  value={formData.temperature}
                  onChange={handleChange}
                  placeholder="Enter temperature"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Blood Pressure (mmHg):</label>
                <input
                  type="text"
                  name="bloodPressure"
                  value={formData.bloodPressure}
                  onChange={handleChange}
                  placeholder="Enter BP (e.g., 120/80)"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Pulse Rate (bpm):</label>
                <input
                  type="number"
                  name="pulseRate"
                  value={formData.pulseRate}
                  onChange={handleChange}
                  placeholder="Enter pulse rate"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Respiratory Rate (breaths/min):</label>
                <input
                  type="number"
                  name="respiratoryRate"
                  value={formData.respiratoryRate}
                  onChange={handleChange}
                  placeholder="Enter respiratory rate"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">SpO2 (%):</label>
                <input
                  type="number"
                  name="spO2"
                  value={formData.spO2}
                  onChange={handleChange}
                  placeholder="Enter SpO2 level"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-lg mt-6 hover:bg-blue-600 transition"
          >
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentPatientRegistration;
