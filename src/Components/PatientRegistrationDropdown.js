// // import React, { useState, useEffect } from "react";
// // import { useUser } from "../UserContext"; // Adjust the path as needed

// // const PatientRegistrationDropdown = ({ onSelect }) => {
// //   const { user } = useUser();
// //   const [registrations, setRegistrations] = useState([]);
// //   const [selectedRegistration, setSelectedRegistration] = useState("");

// //   useEffect(() => {
// //     if (user?.id) {
// //       // Hit your API endpoint to fetch patient registrations by user id
// //       fetch(`${process.env.REACT_APP_API_URL}/api/patient-registrations?userId=${user.id}`)
// //         .then((res) => {
// //           if (!res.ok) {
// //             throw new Error("Failed to fetch registrations");
// //           }
// //           return res.json();
// //         })
// //         .then((data) => setRegistrations(data))
// //         .catch((error) => console.error("Error fetching registrations:", error));
// //     }
// //   }, [user]);
// //   console.log("Fetched registrations:", registrations);

// //   const handleChange = (e) => {
// //     setSelectedRegistration(e.target.value);
// //     onSelect(e.target.value);
// //   };

// //   return (
// //     <select
// //       value={selectedRegistration}
// //       onChange={handleChange}
// //       className="border p-2 rounded-md"
// //     >
// //       <option value="">Select Patient Registration</option>
// //       {registrations.map((reg) => (
// //         <option key={reg.registration_id} value={reg.id}>
// //           {reg.id} - {reg.name || "Unnamed Patient"}
// //         </option>
// //       ))}
// //     </select>
// //   );
// // };

// // export default PatientRegistrationDropdown;
// import React, { useState, useEffect } from "react";
// import { useUser } from "../UserContext"; // Adjust the path as needed

// const PatientRegistrationDropdown = ({ onSelect }) => {
//   const { user } = useUser();
//   const [registrations, setRegistrations] = useState([]);
//   const [selectedRegistration, setSelectedRegistration] = useState("");

//   useEffect(() => {
//     if (user?.id) {
//       // Hit your API endpoint to fetch patient registrations by user id
//       fetch(`${process.env.REACT_APP_API_URL}/api/patient-registrations?userId=${user.id}`)
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error("Failed to fetch registrations");
//           }
//           return res.json();
//         })
//         .then((data) => setRegistrations(data))
//         .catch((error) => console.error("Error fetching registrations:", error));
//     }
//   }, [user]);

//   console.log("Fetched registrations:", registrations);

//   const handleChange = (e) => {
//     setSelectedRegistration(e.target.value);
//     onSelect(e.target.value);
//   };

//   return (
//     <select
//       value={selectedRegistration}
//       onChange={handleChange}
//       className="border p-2 rounded-md"
//     >
//       <option value="">Select Patient Registration</option>
//       {registrations.map((reg) => (
//         <option key={reg.registration_id} value={reg.registration_id}>
//           {reg.registration_id} - {reg.name || "Unnamed Patient"}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default PatientRegistrationDropdown;
import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext"; // Adjust the path as needed

const PatientRegistrationSearch = ({ onSelect }) => {
  const { user } = useUser();
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRegs, setFilteredRegs] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`${process.env.REACT_APP_API_URL}/api/patient-registrations?userId=${user.id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch registrations");
          return res.json();
        })
        .then((data) => {
          setRegistrations(data);
          setFilteredRegs(data);
        })
        .catch((error) => console.error("Error fetching registrations:", error));
    }
  }, [user]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = registrations.filter((reg) =>
      reg.registration_id.toLowerCase().includes(lowerTerm) ||
      (reg.name && reg.name.toLowerCase().includes(lowerTerm))
    );
    setFilteredRegs(filtered);
  }, [searchTerm, registrations]);

  return (
    <div className="w-full max-w-md">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search registrations..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
        {filteredRegs.map((reg) => (
          <li
            key={reg.registration_id}
            className="px-4 py-2 border-b border-gray-100 flex justify-between items-center"
          >
            <span>
              {reg.registration_id} - {reg.name || "Unnamed Patient"}
            </span>
            <button
              onClick={() => onSelect(reg.registration_id)}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
            >
              Select
            </button>
          </li>
        ))}
        {filteredRegs.length === 0 && (
          <li className="px-4 py-2 text-gray-500">No results found.</li>
        )}
      </ul>
    </div>
  );
};

export default PatientRegistrationSearch;
