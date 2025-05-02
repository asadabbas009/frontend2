
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import onesimlogo from "../Assest/logo192.jpg";
import PatientRegistrationSearch from "./PatientRegistrationDropdown"; // Adjust the import path as needed

const GenerateReport = () => {
  const { topicId, courseId } = useParams();
  const navigate = useNavigate();

  // registrationId selected via the search component
  const [registrationId, setRegistrationId] = useState("");

  // States for patient data and analysis inputs
  const [registrationData, setRegistrationData] = useState(null);
  const [finding, setFinding] = useState("");
  const [impression, setImpression] = useState("");
  // selectedImages holds an array of image data URIs fetched from the backend.
  const [selectedImages, setSelectedImages] = useState([]);
  // Step state to toggle between: "select" -> "analysis" -> "preview"
  const [step, setStep] = useState("select");

  const reportRef = useRef();
  const buttonRef = useRef();

  // Fetch patient registration details when registrationId changes.
  useEffect(() => {
    if (registrationId) {
      fetch(`${process.env.REACT_APP_API_URL}/api/patient-registration/${registrationId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch registration data");
          return res.json();
        })
        .then((data) => setRegistrationData(data))
        .catch((error) => console.error("Error fetching registration data:", error));
    }
  }, [registrationId]);

  // In the analysis step, fetch all scan images for the registration.
  useEffect(() => {
    if (registrationId && step === "analysis") {
      fetch(`${process.env.REACT_APP_API_URL}/api/patient-scan-images/${registrationId}`)
        .then((res) => {
          if (!res.ok) throw new Error("No patient scan images found");
          return res.json();
        })
        .then((data) => {
          console.log("Fetched images data:", data);
          let imagesArray = [];
          // If the response is an array, use it directly.
          if (Array.isArray(data) && data.length > 0) {
            imagesArray = data;
          }
          // If the response is an object with an "image" property, wrap it in an array.
          else if (data && typeof data === "object" && data.image) {
            imagesArray = [data];
          }
          // Log the normalized array to verify its structure.
          console.log("Normalized images array:", imagesArray);
          // Extract only the image property from each object.
          setSelectedImages(imagesArray.map((item) => item.image));
        })
        .catch((error) => {
          console.error("Error fetching patient scan images:", error);
          setSelectedImages([]);
        });
    }
  }, [registrationId, step]);

  // When a registration is selected via search, move to the analysis step.
  const handleRegistrationSelect = (selectedId) => {
    setRegistrationId(selectedId);
    if (selectedId) setStep("analysis");
  };

  // Submit analysis data then switch to the preview step.
  const handleGenerateReport = async () => {
    const payload = {
      registration_id: registrationId,
      finding,
      impression,
      selected_images: selectedImages, // send all images
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/image-analysis`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Failed to submit image analysis");
      const result = await response.json();
      console.log("Image analysis saved:", result);
    } catch (error) {
      console.error("Error submitting analysis:", error);
    }
    setStep("preview");
  };

  // Download the report as a PDF.
  const handleDownloadPDF = () => {
    if (buttonRef.current) buttonRef.current.style.display = "none";

    html2canvas(reportRef.current, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Report.pdf");

      if (buttonRef.current) buttonRef.current.style.display = "block";
    });
  };

  // Navigate to the next page.
  const handleNext = () => {
    navigate(
      `/student-dashboard/courses/ongoing/${topicId}/protocols/post-counselling/${courseId}`,
      { state: { registration_id: registrationId } }
    );
  };

  const registeredOnDynamic = registrationData?.created_at
    ? new Date(registrationData.created_at).toLocaleString()
    : "Time";
  const patientName = registrationData?.name || "Patient Name";
  const patientAge = registrationData?.age || "Age";
  const patientSex = registrationData?.gender || "Gender";

  // Step "select": Search for and select a registration.
  if (step === "select") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Search for Your Patient Registration
          </h1>
          <PatientRegistrationSearch onSelect={handleRegistrationSelect} />
        </div>
      </div>
    );
  }
  // Step "analysis": Display all scan images fetched from the database along with analysis fields.
  else if (step === "analysis") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Analysis</h1>
        {selectedImages.length > 0 ? (
          <div className="mb-6 grid grid-cols-2 gap-4">
            {selectedImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Patient Scan ${index + 1}`}
                className="w-auto max-w-xs rounded-lg shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="mb-6 text-gray-500">
            No scan images available for this registration.
          </p>
        )}
        <div className="w-full max-w-4xl px-4 mb-4">
          <textarea
            value={finding}
            onChange={(e) => setFinding(e.target.value)}
            placeholder="Enter your finding here"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            style={{ height: "150px" }}
          />
        </div>
        <div className="w-full max-w-4xl px-4 mb-4">
          <textarea
            value={impression}
            onChange={(e) => setImpression(e.target.value)}
            placeholder="Enter your impression here"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            style={{ height: "150px" }}
          />
        </div>
        <button
          onClick={handleGenerateReport}
          className="w-40 py-3 rounded-lg text-base font-medium shadow-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Generate Report
        </button>
      </div>
    );
  }
  // Step "preview": Show the report preview with all images and an option to download as PDF.
  else if (step === "preview") {
    return (
      <div className="flex justify-center bg-gray-200 p-4 min-h-screen">
        <div ref={reportRef} className="w-[210mm] bg-white shadow-lg p-8 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <img src={onesimlogo} className="w-32 rounded-sm object-fill h-20" alt="Logo" />
            <div className="text-center">
              <h1 className="text-3xl font-bold">
                ONESIM <span className="text-blue-700">CLINIC</span>
              </h1>
              <h3 className="text-lg font-semibold">X-Ray | CT - Scan | MRI | USG</h3>
              <h6 className="text-sm">
                ONE SIMULATION PVT LTD. UNIT NO T4 B 611 NX ONE, HEALTHCARE COMPLEX, NOIDA - 201306
              </h6>
            </div>
            <div className="text-right text-sm">
              <h3>0123456789 | 0912345678</h3>
              <h3>onesimulation@gmail.com</h3>
            </div>
          </div>
          <div className="w-full h-6 relative bg-blue-700 text-white flex justify-end">
            <div className="mr-2">www.onesimulation.co.in</div>
          </div>

          <div className="mt-6 grid grid-cols-3 text-sm gap-4">
            <div>
              <h2 className="font-bold text-lg">{patientName}</h2>
              <h3>Age: {patientAge}</h3>
              <h3>Sex: {patientSex}</h3>
            </div>
            <div>
              <h3 className="font-bold">PID: {registrationId}</h3>
              <h3>
                Ref. by: <span className="font-bold">Dr. Ankur Srivastava</span>
              </h3>
            </div>
            <div>
              <h3>
                <span className="font-bold">Registered on:</span> {registeredOnDynamic}
              </h3>
            </div>
          </div>

          <div className="w-full h-px bg-black my-6"></div>
          <h1 className="text-center text-2xl font-bold">CT SCAN REPORT</h1>

          <div className="mt-6 space-y-4 text-sm">
            <div>
              <h1 className="font-bold">Finding</h1>
              <p>{finding}</p>
            </div>
            <div>
              <h1 className="font-bold">Impression</h1>
              <p>{impression}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {selectedImages.length > 0 &&
              selectedImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Patient Scan ${index + 1}`}
                  className="w-60 rounded-md shadow-md max-h-[250px] object-fill"
                />
              ))}
          </div>

          <div className="w-full h-[3px] bg-gray-600 my-8"></div>
          <div className="flex justify-between text-center mb-10">
            {["Dr. Ankur Srivastava", "Dr. Khushboo Srivastava", "Dr. Asad Abbas"].map(
              (name, index) => (
                <div key={index}>
                  <h1 className="font-bold text-lg">{name}</h1>
                  <h3 className="text-sm">MBBS, MD (Radiology)</h3>
                  <h3 className="text-sm">Consultant Radiologist</h3>
                </div>
              )
            )}
          </div>

          <div className="w-full h-10 relative bg-blue-700 items-center text-white text-right pr-2 flex">
            <div className="flex absolute right-0 mr-2">www.onesimulation.co.in</div>
          </div>

          <div className="flex justify-center mt-10 mb-6 space-x-4" ref={buttonRef}>
            <button
              onClick={handleDownloadPDF}
              className="w-40 py-3 rounded-lg text-base font-medium shadow-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Download PDF
            </button>
            <button
              onClick={handleNext}
              className="w-40 py-3 rounded-lg text-base font-medium shadow-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default GenerateReport;
