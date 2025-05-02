import React, { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ctscan from "../../Assest/00000269.jpg";
import onesimlogo from "../../Assest/logo192.jpg";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUser } from "../../UserContext";

const Report = () => {
  const reportRef = useRef();
  const buttonRef = useRef();
  const { topicId, courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const registrationId = location.state?.registration_id || "";
  const previousReportId = location.state?.reportId;
  const assignmentId = location.state?.assignmentId;

  useEffect(() => {
    console.log('🚀 Passed previousReportId:', previousReportId);
  }, [previousReportId]);

  const { user } = useUser();

  const [analysisData, setAnalysisData] = useState(null);
  const [registrationData, setRegistrationData] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [loadingRegistration, setLoadingRegistration] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch analysis data
  useEffect(() => {
    if (!registrationId) return;
    fetch(`${process.env.REACT_APP_API_URL}/api/image-analysis/${registrationId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image analysis data");
        return res.json();
      })
      .then(setAnalysisData)
      .catch(console.error)
      .finally(() => setLoadingAnalysis(false));
  }, [registrationId]);

  // Fetch registration data
  useEffect(() => {
    if (!registrationId) return;
    fetch(`${process.env.REACT_APP_API_URL}/api/patient-registration/${registrationId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patient registration data");
        return res.json();
      })
      .then(setRegistrationData)
      .catch(console.error)
      .finally(() => setLoadingRegistration(false));
  }, [registrationId]);

  // Download PDF locally
  const handleDownloadPDF = () => {
    if (buttonRef.current) buttonRef.current.style.display = "none";
    html2canvas(reportRef.current, { scale: 2, useCORS: true, backgroundColor: "#fff" })
      .then((canvas) => {
        const img = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
        const filename = `CT_Scan_Report_${user?.username || "UnknownUser"}.pdf`;
        pdf.save(filename);
      })
      .catch(console.error)
      .finally(() => {
        if (buttonRef.current) buttonRef.current.style.display = "block";
      });
  };

  // Print
  const handlePrint = () => {
    const printHTML = reportRef.current.innerHTML;
    const original = document.body.innerHTML;
    document.body.innerHTML = printHTML;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  // Save & Next using JSON payload (includes topic_id & course_id)
  const handleNext = async () => {
    setIsSaving(true);
    try {
      // 1) Render at high resolution
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      });

      // 2) Create PDF and get a Data URI string
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = 210;
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, width, height);
      const dataUriString = pdf.output("datauristring"); // "data:application/pdf;base64,..."

      console.log('Assignment ID:', assignmentId);
      if (previousReportId) {
        const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/update-report-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            report_id: previousReportId,
            status: "deleted"
          })
        });
        
        if (!updateResponse.ok) {
          throw new Error("Failed to update old report status");
        }
      }

      // 4) Build JSON payload for new report
      const payload = {
        registration_id: registrationId,
        pdf_data: dataUriString,
        reported_at: new Date().toISOString(),
        username: user?.username || "UnknownUser",
        topic_id: topicId,
        course_id: courseId,
        assignment_id: assignmentId
      };

      // 5) POST as JSON to create new report
      const apiUrl = (process.env.REACT_APP_API_URL || "http://localhost:5000").trim();
      const res = await fetch(`${apiUrl}/api/save-report-pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      // 6) Navigate on success
      navigate(
        `/student-dashboard/courses/ongoing/${topicId}/protocols/post-counselling/${courseId}`,
        { state: { registration_id: registrationId } }
      );
    } catch (err) {
      console.error("Error saving PDF:", err);
      alert(`Failed to save report: ${err.message}`);
      setIsSaving(false);
    }
  };

  if (loadingAnalysis || loadingRegistration) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <p className="text-xl font-bold">Loading...</p>
      </div>
    );
  }

  // Fallbacks & data parsing
  const patientName = registrationData?.name || "Yashvi M Patel";
  const patientAge = registrationData?.age || "21";
  const patientSex = registrationData?.gender || "N/A";
  const registeredOn = registrationData?.created_at
    ? new Date(registrationData.created_at).toLocaleString()
    : "Time";
  const finding = analysisData?.finding || "Default Finding text.";
  const impression = analysisData?.impression || "Default Impression text.";

  let imagesToShow = [];
  if (analysisData?.selected_image) {
    try {
      const parsed =
        typeof analysisData.selected_image === "string"
          ? JSON.parse(analysisData.selected_image)
          : analysisData.selected_image;
      imagesToShow = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      imagesToShow = [analysisData.selected_image];
    }
  }
  if (!imagesToShow.length) imagesToShow = [ctscan];
  const reportedOn = new Date().toLocaleString();

  return (
    <div className="flex justify-center bg-gray-200 p-4 min-h-screen">
      <div ref={reportRef} className="w-[210mm] bg-white shadow-lg p-8 rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <img src={onesimlogo} alt="Logo" className="w-32 h-20 object-fill rounded-sm" />
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              ONESIM <span className="text-blue-700">CLINIC</span>
            </h1>
            <h3 className="text-lg font-semibold">X-Ray | CT - Scan | MRI | USG</h3>
            <h6 className="text-sm">
              ONE SIMULATION PVT LTD. UNIT NO T4 B 611 NX ONE, HEALTHCARE
              COMPLEX, NOIDA - 201306
            </h6>
          </div>
          <div className="text-right text-sm">
            <h3>0123456789 | 0912345678</h3>
            <h3>onesimulation@gmail.com</h3>
          </div>
        </div>
        <div className="w-full h-6 bg-blue-700 text-white flex justify-end">
          <div className="mr-2">www.onesimulation.co.in</div>
        </div>

        {/* Patient Info */}
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
              <span className="font-bold">Registered on:</span> {registeredOn}
            </h3>
            <h3>
              <span className="font-bold">Reported on:</span> {reportedOn}
            </h3>
          </div>
        </div>

        {/* Scan Details */}
        <div className="w-full h-px bg-black my-6" />
        <h1 className="text-center text-2xl font-bold">CT SCAN</h1>
        <div className="mt-6 space-y-4 text-sm">
          <div>
            <h1 className="font-bold">Part</h1>
            <p>Brain: Plain</p>
          </div>
          <div>
            <h1 className="font-bold">Technique</h1>
            <p>
              Plain CT scan was carried out on a multi-detector scanner. Axial
              sections from the base of the skull to the cranial vault were
              obtained and evaluated.
            </p>
          </div>
          <div>
            <h1 className="font-bold">Findings</h1>
            <p>{finding}</p>
          </div>
          <div>
            <h1 className="font-bold">Impression</h1>
            <p>{impression}</p>
          </div>
        </div>

        {/* Images */}
        <div className="mt-4 flex justify-center space-x-4">
          {imagesToShow.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`CT Scan ${idx + 1}`}
              className="w-60 max-h-[250px] object-fill rounded-md shadow-md"
            />
          ))}
        </div>

        {/* Signatures */}
        <div className="w-full h-[3px] bg-gray-600 my-8" />
        <div className="flex justify-between text-center mb-10">
          {["Dr. XYZ", "Dr. XYZ", "Dr. XYZ"].map((n, i) => (
            <div key={i}>
              <h1 className="font-bold text-lg">{n}</h1>
              <h3 className="text-sm">MBBS, MD (Radiology)</h3>
              <h3 className="text-sm">Consultant Radiologist</h3>
            </div>
          ))}
        </div>
        <div className="w-full h-10 bg-blue-700 text-white flex items-center justify-end pr-2">
          <div>www.onesimulation.co.in</div>
        </div>
      </div>

      {/* Actions */}
      <div className="absolute bottom-10 flex space-x-4">
        <button
          ref={buttonRef}
          onClick={handleDownloadPDF}
          className="w-40 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
        >
          Download
        </button>
        <button
          onClick={handlePrint}
          className="w-40 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
        >
          Print Report
        </button>
        <button
          onClick={handleNext}
          disabled={isSaving}
          className={`w-40 py-3 text-white rounded-lg shadow-md ${
            isSaving ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSaving ? "Saving..." : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default Report;