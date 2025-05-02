// import React, { useRef, useEffect, useState } from 'react';
// import oneLearningLogo from '../Assest/oneLearningLogo.png';
// import centurionLogo from '../Assest/CUTMLogo.png';
// import oneSimulationLogo from '../Assest/oneSimulationLogo.jpg';
// import signature from '../Assest/khushbooSignature.png';
// import startupIndia from '../Assest/startupIndia.png';
// import azadiLogo from '../Assest/azadikamahotsavLogo.webp';
// import ctScan from '../Assest/logo193.png';
// import { FaDownload } from 'react-icons/fa';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import { useLocation } from 'react-router-dom';

// const Certificate = ({ certificateData: propData }) => {
//   const location = useLocation();
//   const [certificateData, setCertificateData] = useState(propData || {});

//   useEffect(() => {
//     // Parse URL parameters if no props are passed
//     if (!propData || Object.keys(propData).length === 0) {
//       const queryParams = new URLSearchParams(location.search);
//       const paramsData = {};
//       console.log('paramsData:', paramsData);
      
//       // Extract all parameters
//       for (const [key, value] of queryParams.entries()) {
//         // For date parameters, ensure time part is removed
//         if (key === 'date' || key === 'issueDate') {
//           // Try to extract just the date part using regex
//           const dateMatch = value.match(/([A-Za-z]+ \d+, \d+)/);
//           paramsData[key] = dateMatch && dateMatch[1] ? dateMatch[1] : value;
//         } else {
//           paramsData[key] = value;
//         }
//       }
      
//       console.log("Extracted certificate data from URL:", paramsData);
      
//       if (Object.keys(paramsData).length > 0) {
//         setCertificateData(paramsData);
//       }
//     }
//   }, [location.search, propData]);

//   // Default values if no data is provided
//   const {
//     username = "[Student Name]",
//     workshopTitle = "Role of the Radiographer in Emergency Neuro imaging",
//     location: workshopLocation = "Bhubaneswar",
//     date = "16th July, 2023",
//     certificateNo = certificateData.id || "",
//     issueDate = "",
//   } = certificateData || {};

//   // Process the date to remove time part if it exists
//   const processedIssueDate = (() => {
//     if (certificateData && certificateData.date && typeof certificateData.date === 'string') {
//       // Use regex to match only the date part: Month Day, Year
//       const dateMatch = certificateData.date.match(/([A-Za-z]+ \d+, \d+)/);
//       if (dateMatch && dateMatch[1]) {
//         return dateMatch[1];
//       }
//     }
//     return issueDate;
//   })();

//   const certificateRef = useRef(null);

//   const downloadCertificate = async () => {
//     if (!certificateRef.current) return;
    
//     try {
//       // Show loading or some indication
//       const downloadBtn = document.getElementById('download-certificate-btn');
//       if (downloadBtn) {
//         downloadBtn.innerText = 'Preparing...';
//         downloadBtn.disabled = true;
//       }
      
//       // Create canvas from the certificate
//       const certificateElement = certificateRef.current;
//       const canvas = await html2canvas(certificateElement, {
//         scale: 3, // Higher scale for better quality
//         useCORS: true,
//         allowTaint: true,
//         backgroundColor: '#ffffff',
//         logging: false,
//         letterRendering: true,
//         imageTimeout: 0,
//       });
      
//       // Convert to PDF
//       const imgData = canvas.toDataURL('image/png', 1.0);
//       const pdf = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a4',
//         compress: true
//       });
      
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      

//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
//       const scaledWidth = imgWidth * ratio;
//       const scaledHeight = imgHeight * ratio;
      
      
//       const offsetX = (pdfWidth - scaledWidth) / 2;
//       const offsetY = (pdfHeight - scaledHeight) / 2;
      
//       pdf.addImage(imgData, 'PNG', offsetX, offsetY, scaledWidth, scaledHeight);
//       pdf.save(`Certificate-${certificateNo || 'download'}.pdf`);
      
      
//       if (downloadBtn) {
//         downloadBtn.innerText = 'Download Certificate';
//         downloadBtn.disabled = false;
//       }
//     } catch (err) {
//       console.error('Error downloading certificate:', err);
//       alert('Failed to download certificate. Please try again.');
      
      
//       const downloadBtn = document.getElementById('download-certificate-btn');
//       if (downloadBtn) {
//         downloadBtn.innerText = 'Download Certificate';
//         downloadBtn.disabled = false;
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-4">
//       <div 
//         ref={certificateRef}
//         className="relative w-full max-w-5xl aspect-[4/3] bg-white shadow-xl" 
//         style={{
//           background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))',
//           borderWidth: '20px',
//           borderStyle: 'solid',
//           borderImage: 'linear-gradient(to bottom right, #00BCD4, #9C27B0) 1'
//         }}
//       >
        
//         <div 
//           className="absolute inset-0 opacity-5 pointer-events-none"
//           style={{
//             backgroundImage: `url(${ctScan})`, 
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             zIndex: 0
//           }}
//         ></div>

        
//         <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
//           {/* Header with logos */}
//           <div className="w-full flex justify-between items-center mb-8">
            
//             <div className="h-20">
//               <img 
//                 src={oneLearningLogo} 
//                 alt="Onelearning Logo" 
//                 className="h-full" 
//               />
//             </div>
            
            
//             <div className="h-20 w-16 mr-16 flex items-center justify-center">
//               <img 
//                 src={centurionLogo} 
//                 alt="Centurion University Logo" 
//                 className="h-full" 
//               />
//             </div>
            
            
//             <div className="h-20">
//               <img 
//                 src={oneSimulationLogo} 
//                 alt="ONE Simulation Logo" 
//                 className="h-full" 
//               />
//             </div>
//           </div>
          
          
//           <div className="text-center mb-4">
//             <h1 className="text-3xl font-bold text-navy-900">Certificate Of Participation</h1>
//             <h2 className="text-7xl font-bold text-purple-600 mt-2">CONGRATULATIONS</h2>
//           </div>

          
//           <div className="text-center mb-2">
//             <h3 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 inline-block">
//               {username}
//             </h3>
//           </div>
          
          
//           <div className="text-center mb-8 max-w-4xl">
//             <p className="text-xl">
//               on successfully completing the designated Workshop on
//             </p>
//             <p className="text-2xl font-bold my-2">
//               "{workshopTitle}"
//             </p>
//             <p className="text-xl">
//               in "{workshopLocation}" on "{date}"
//             </p>
//           </div>
          
          
//           <div className="self-start mb-[-10px]">
//             <p className="text-sm">Certificate No : {certificateNo}</p>
//             <p className="text-sm">Date of Issue : {processedIssueDate}</p>
//           </div>
          
          
//           <div className="w-full flex justify-between items-end mt-auto">
//             <div className="text-center w-56">
//               <div className="border-t border-gray-800 mb-1"></div>
//               <p className="font-semibold">MARUF</p>
//               <p className="text-xs">CENTURION UNIVERSITY</p>
//             </div>
            
//             <div className="text-center w-56">
//               <div className="border-t border-gray-800 mb-1"></div>
//               <p className="font-semibold">JABA CHAKRABORTY</p>
//               <p className="text-xs">CENTURION UNIVERSITY</p>
//             </div>
            
//             <div className="text-center w-56">
//               <img src={signature} alt="Signature" className="h-30 w-30 mx-auto mb-[-25px]" />
//               <div className="border-t border-gray-800 mb-1"></div>
//               <p className="font-semibold">FOUNDER & CMD</p>
//               <p className="text-xs">ONE|LEARNING</p>
//             </div>
//           </div>
          
          
//           <div className="w-full flex justify-center items-center mt-4">
//             <img src={startupIndia} alt="Startup India" className="h-6 mx-2" />
//             <img src={azadiLogo} alt="Azadi Ka Amrit Mahotsav" className="h-6 mx-2" />
//           </div>
//         </div>
//       </div>
      
      
//       <button
//         id="download-certificate-btn"
//         onClick={downloadCertificate}
//         className="mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
//       >
//         <FaDownload className="text-xl" /> Download Certificate
//       </button>
//     </div>
//   );
// };

// export default Certificate;


import React, { useRef, useEffect, useState } from 'react';
import oneLearningLogo from '../Assest/oneLearningLogo.png';
import centurionLogo from '../Assest/CUTMLogo.png';
import oneSimulationLogo from '../Assest/oneSimulationLogo.jpg';
import signature from '../Assest/khushbooSignature.png';
import startupIndia from '../Assest/startupIndia.png';
import azadiLogo from '../Assest/azadikamahotsavLogo.webp';
import ctScan from '../Assest/logo193.png';
import { FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';

const Certificate = ({ certificateData: propData }) => {
  const location = useLocation();
  const [certificateData, setCertificateData] = useState(propData || {});

  useEffect(() => {
    // Parse URL parameters if no props are passed
    if (!propData || Object.keys(propData).length === 0) {
      const queryParams = new URLSearchParams(location.search);
      const paramsData = {};
      
      // Extract all parameters
      for (const [key, value] of queryParams.entries()) {
        // For date parameters, ensure time part is removed
        if (key === 'date' || key === 'issueDate') {
          // Try to extract just the date part using regex
          const dateMatch = value.match(/([A-Za-z]+ \d+, \d+)/);
          paramsData[key] = dateMatch && dateMatch[1] ? dateMatch[1] : value;
        } else {
          paramsData[key] = value;
        }
      }
      
      
      if (Object.keys(paramsData).length > 0) {
        setCertificateData(paramsData);
      }
    }
  }, [location.search, propData]);

  

  // Default values if no data is provided
  const {
    username = "[Student Name]",
    location: workshopLocation = "Bhubaneswar",
    date = "16th July, 2023",
    certificateNo = certificateData.id || "",
    issueDate = "",
  } = certificateData || {};

  // Process the date to remove time part if it exists
  const processedIssueDate = (() => {
    if (certificateData && certificateData.date && typeof certificateData.date === 'string') {
      // Use regex to match only the date part: Month Day, Year
      const dateMatch = certificateData.date.match(/([A-Za-z]+ \d+, \d+)/);
      if (dateMatch && dateMatch[1]) {
        return dateMatch[1];
      }
    }
    return issueDate;
  })();

  const certificateRef = useRef(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    
    try {
      // Show loading or some indication
      const downloadBtn = document.getElementById('download-certificate-btn');
      if (downloadBtn) {
        downloadBtn.innerText = 'Preparing...';
        downloadBtn.disabled = true;
      }
      
      // Create canvas from the certificate
      const certificateElement = certificateRef.current;
      const canvas = await html2canvas(certificateElement, {
        scale: 3, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        letterRendering: true,
        imageTimeout: 0,
      });
      
      // Convert to PDF
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      
      const offsetX = (pdfWidth - scaledWidth) / 2;
      const offsetY = (pdfHeight - scaledHeight) / 2;
      
      pdf.addImage(imgData, 'PNG', offsetX, offsetY, scaledWidth, scaledHeight);
      pdf.save(`Certificate-${certificateNo || 'download'}.pdf`);
      
      
      if (downloadBtn) {
        downloadBtn.innerText = 'Download Certificate';
        downloadBtn.disabled = false;
      }
    } catch (err) {
      
      alert('Failed to download certificate. Please try again.');
      
      
      const downloadBtn = document.getElementById('download-certificate-btn');
      if (downloadBtn) {
        downloadBtn.innerText = 'Download Certificate';
        downloadBtn.disabled = false;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div 
        ref={certificateRef}
        className="relative w-full max-w-5xl aspect-[4/3] bg-white shadow-xl" 
        style={{
          background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95))',
          borderWidth: '20px',
          borderStyle: 'solid',
          borderImage: 'linear-gradient(to bottom right, #00BCD4, #9C27B0) 1'
        }}
      >
        
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url(${ctScan})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        ></div>

        
        <div className="relative z-10 flex flex-col items-center justify-between h-full p-8">
          {/* Header with logos */}
          <div className="w-full flex justify-between items-center mb-8">
            
            <div className="h-20">
              <img 
                src={oneLearningLogo} 
                alt="Onelearning Logo" 
                className="h-full" 
              />
            </div>
            
            
            <div className="h-20 w-16 mr-16 flex items-center justify-center">
              <img 
                src={centurionLogo} 
                alt="Centurion University Logo" 
                className="h-full" 
              />
            </div>
            
            
            <div className="h-20">
              <img 
                src={oneSimulationLogo} 
                alt="ONE Simulation Logo" 
                className="h-full" 
              />
            </div>
          </div>
          
          
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold text-navy-900">Certificate Of Participation</h1>
            <h2 className="text-7xl font-bold text-purple-600 mt-2">CONGRATULATIONS</h2>
          </div>

          
          <div className="text-center mb-2">
            <h3 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-300 pb-1 inline-block">
              {username}
            </h3>
          </div>
          
          
          <div className="text-center mb-8 max-w-4xl">
            <p className="text-xl">
              on successfully completing the designated Workshop on
            </p>
            <p className="text-2xl font-bold my-2">
              {certificateData.courseName}
            </p>
            <p className="text-xl">
              in "{workshopLocation}" on "{date}"
            </p>
          </div>
          
          
          <div className="self-start mb-[-10px]">
            <p className="text-sm">Certificate No : {certificateNo}</p>
            <p className="text-sm">Date of Issue : {processedIssueDate}</p>
          </div>
          
          
          <div className="w-full flex justify-between items-end mt-auto">
            <div className="text-center w-56">
              <div className="border-t border-gray-800 mb-1"></div>
              <p className="font-semibold">MARUF</p>
              <p className="text-xs">CENTURION UNIVERSITY</p>
            </div>
            
            <div className="text-center w-56">
              <div className="border-t border-gray-800 mb-1"></div>
              <p className="font-semibold">JABA CHAKRABORTY</p>
              <p className="text-xs">CENTURION UNIVERSITY</p>
            </div>
            
            <div className="text-center w-56">
              <img src={signature} alt="Signature" className="h-30 w-30 mx-auto mb-[-25px]" />
              <div className="border-t border-gray-800 mb-1"></div>
              <p className="font-semibold">FOUNDER & CMD</p>
              <p className="text-xs">ONE|LEARNING</p>
            </div>
          </div>
          
          
          <div className="w-full flex justify-center items-center mt-4">
            <img src={startupIndia} alt="Startup India" className="h-6 mx-2" />
            <img src={azadiLogo} alt="Azadi Ka Amrit Mahotsav" className="h-6 mx-2" />
          </div>
        </div>
      </div>
      
      
      <button
        id="download-certificate-btn"
        onClick={downloadCertificate}
        className="mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
      >
        <FaDownload className="text-xl" /> Download Certificate
      </button>
    </div>
  );
};

export default Certificate;