import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// Quiz data for different courses
const courseQuestions = {
  "101": {
    title: "CT Brain Plain Study Quiz",
    description: "Test your knowledge about CT brain plain study fundamentals",
    questions: [
      { 
        id: 1, 
        question: "Q1. What is the primary use of CT brain plain study?", 
        options: [
          "To detect intracranial haemorrhage and fractures",
          "To diagnose brain tumors",
          "To detect sinus infections",
          "To monitor migraine headaches"
        ],
        answer: "To detect intracranial haemorrhage and fractures"
        
      },
      { 
        id: 2, 
        question: "Q2. Which of the following conditions is best detected using a CT brain plain study? ", 
        options: [
          "Early ischemic stroke",
          "Acute haemorrhage",
          "Multiple sclerosis",
          "Small brain tumours"
          
        ],
        answer: "Acute haemorrhage"
      },
      { 
        id: 3, 
        question: "Q3. Why is contrast not used in a CT brain plain study for suspected stroke?", 
        options: [
          "Contrast enhances blood vessels, making fresh blood difficult to see",
          "Contrast is toxic to the brain tissue",
          "Non-contrast scans provide better soft tissue differentiation",
          "Contrast takes too long to administer"
        ],
        answer: "Contrast enhances blood vessels, making fresh blood difficult to see"
      },
      { 
        id: 4, 
        question: "Q4. Non-contrast scans provide better soft tissue differentiation", 
        options: [
          "Hypodense (dark)",
          "Isodense (same as brain tissue)",
          "Hyperdense (bright white)",
          "Mixed density with a calcified center"
        ],
        answer: "Hypodense (bright white)"
      },
      { 
        id: 5, 
        question: "Q5. What is a limitation of a CT brain plain study compared to MRI?", 
        options: [
          "It is more expensive",
          "It cannot detect skull fractures",
          "It exposes the patient to ionizing radiation",
          "It takes longer to perform"
        ],
        answer: "It exposes the patient to ionizing radiation"
      }
    ]
  },
  "102": {
    title: "Contrast-Enhanced CT Brain Quiz",
    description: "Evaluate your understanding of contrast-enhanced CT brain scans",
    questions: [
      { 
        id: 1, 
        question: "Q1. What is the primary indication for performing a contrast-enhanced CT brain scan?", 
        options: [
          "Headache without neurological deficits",
          "Acute ischemic stroke within 3 hours",
          "Evaluation of brain tumours and infections",
          "Routine migraine evaluation time"

        ],  
        answer: "Evaluation of brain tumours and infections"
      },
      { 
        id: 2, 
        question: "Q2. What is the most likely diagnosis for this CT brain finding?", 
        options: [
          "Glioblastoma Multiforme",
          "Tuberculoma",
          "Meningioma",
          "Brain Abscess"
        ],
        answer: "Brain Abscess" 
      },
      { 
        id: 3, 
        question: "Q3. Which condition is most commonly associated with this finding?", 
        options: [
          "Subarachnoid Haemorrhage",
          "Hypertensive Intracerebral Haemorrhage",
          "Cavernous Malformation",
          "Ischemic Stroke"
        ],
        answer: "Hypertensive Intracerebral Haemorrhage"
      },
      { 
        id: 4, 
        question: "Q4. Which of the following conditions typically shows enhancement on a contrast-enhanced CT brain scan?", 
        options: [
          "Meningitis",
          "Multiple Sclerosis",
          "Diffuse Axonal Injury",
          "Alzheimer's Disease"
        ]
      },
      { 
        id: 5, 
        question: "Q5. Which of the following is a contraindication for administering IV contrast in a CT brain scan?", 
        options: [
          "Suspected Brain Tumour",
          "History of Severe Contrast Allergy",
          "Evaluation of Brain Metastases",
          "Suspected Meningitis"
        ],
        answer: "History of Severe Contrast Allergy"
      }
    ]
  },
  "103": {
    title: "Clinical Case-Based CT Brain Quiz",
    description: "Test your diagnostic skills with real clinical scenarios",
    questions: [
      { 
        id: 1, 
        question: "Q1. A non-contrast CT brain scan shows a hypodense area in the left middle cerebral artery (MCA) territory with loss of gray-white matter differentiation. What is the most likely diagnosis?", 
        options: [
          "Ischemic Stroke",
          "Haemorrhagic Stroke",
          "Brain Tumor",
          "Normal Brain"
        ],
        answer: "Ischemic Stroke"
      },
      { 
        id: 2, 
        question: "Q2. A CT scan shows a hyperdense (bright) MCA sign on the right side without a clear infarct area yet. What does this indicate?", 
        options: [
          "MCA Thrombosis",
          "Normal Variation",
          "Subarachnoid Haemorrhage",
          "Meningioma"
        ],
        answer: "MCA Thrombosis"
      },
      { 
        id: 3, 
        question: "Q3. A 65-year-old hypertensive patient presents with sudden loss of consciousness. A CT scan shows a hyperdense area in the left basal ganglia with surrounding edema. What is the most likely diagnosis?", 
        options: [
          "Ischemic Stroke",
          "Haemorrhagic Stroke",
          "Epidural Hematoma",
          "Brain Abscess"
        ],
        answer: "Haemorrhagic Stroke"
      },
      { 
        id: 4, 
        question: "Q4. A 72-year-old male presents with sudden dizziness, vomiting, and difficulty walking. CT scan reveals a hypodense area in the cerebellum with brainstem compression. What is the next best step?", 
        options: [
          "Observe and repeat CT in 24 hours",
          "Perform an MRI",
          "Neurosurgical evaluation for decompression",
          "Start Aspirin and Clopidogrel"
        ],
        answer: "Neurosurgical evaluation for decompression"

      },
      { 
        id: 5, 
        question: "Q5. A 78-year-old patient with a history of falls presents with confusion. CT scan shows a crescent-shaped hypodensity along the left hemisphere. What is the most likely diagnosis?", 
        options: [
          "Epidural Hematoma",
          "Subdural Hematoma",
          "Ischemic Stroke",
          "Brain Abscess"
        ],
        answer: "Subdural Hematoma"
      }
    ]
  },
  "104": {
    title: "Clinical Case-Based CT Brain Quiz",
    description: "Test your diagnostic skills with real clinical scenarios",
    questions: [
      { 
        id: 1, 
        question: "Q1. What is the most important indication for an immediate CT scan in a head injury patient?", 
        options: [
          "Glasgow Coma Scale (GCS) ≤8",
          "Mild headache without loss of consciousness",
          "Isolated scalp hematoma",
          "Mechanism of injury alone without symptoms"
        ],
        answer: "Glasgow Coma Scale (GCS) ≤8"
      },
      { 
        id: 2, 
        question: "Q2. What is the typical CT finding in an epidural hematoma?", 
        options: [
          "Biconvex (lentiform) hyperdense collection",
          "Crescent-shaped collection",
          "Crosses suture lines",
          "Commonly due to venous bleeding"
        ],
        answer: "Biconvex (lentiform) hyperdense collection"
      },
      { 
        id: 3, 
        question: "Q3. What is the hallmark CT appearance of a subdural hematoma?", 
        options: [
          "Always hyperdense regardless of age",
          "Biconvex shape",
          "Commonly arterial in origin",
          "Crescent-shaped hyperdense collection"
        ],
        answer: "Biconvex shape"
      },
      { 
        id: 4, 
        question: "Q4. Which CT findings indicate diffuse axonal injury (DAI)?", 
        options: [
          "Multiple small haemorrhages at gray-white junction, corpus callosum, and brainstem",
          "Large single hematoma with midline shift",
          "Skull fracture with epidural hematoma",
          "Hydrocephalus"
        ],
        answer: "Multiple small haemorrhages at gray-white junction, corpus callosum, and brainstem"
      },
      { 
        id: 5, 
        question: "Q5. When should a repeat CT scan be performed in a head injury patient?", 
        options: [
          "Neurological deterioration (e.g., drop in GCS, worsening weakness)",
          "Mild headache that is improving",
          "Stable patient with an initial small hematoma and no worsening symptoms",
          "No history of trauma but patient feels dizzy"
        ],
        answer: "Neurological deterioration (e.g., drop in GCS, worsening weakness)"
      }
    ]
  },
  "108": {
    title: "Clinical Case-Based CT Brain Quiz",
    description: "Test your diagnostic skills with real clinical scenarios",
    questions: [
      { 
        id: 1, 
        question: "Q1. When is a contrast-enhanced CT (CECT) PNS required?",
        options: [
          "Suspected fungal sinusitis, tumors, or orbital complications",
          "Uncomplicated acute viral sinusitis",
          "Mild allergic rhinitis1",
          "Mechanism of injury alone without symptoms"
        ],
        answer: "Suspected fungal sinusitis, tumors, or orbital complications"
      },
      { 
        id: 2, 
        question: "Q2. What is the typical CT finding in an epidural hematoma?", 
        options: [
          "Biconvex (lentiform) hyperdense collection",
          "Crescent-shaped collection",
          "Crosses suture lines",
          "Commonly due to venous bleeding"
        ],
        answer: "Biconvex (lentiform) hyperdense collection"
      },
      { 
        id: 3, 
        question: "Q3. What is the hallmark CT appearance of a subdural hematoma?", 
        options: [
          "Always hyperdense regardless of age",
          "Biconvex shape",
          "Commonly arterial in origin",
          "Crescent-shaped hyperdense collection"
        ],
        answer: "Biconvex shape"
      },
      { 
        id: 4, 
        question: "Q4. Which CT findings indicate diffuse axonal injury (DAI)?", 
        options: [
          "Multiple small haemorrhages at gray-white junction, corpus callosum, and brainstem",
          "Large single hematoma with midline shift",
          "Skull fracture with epidural hematoma",
          "Hydrocephalus"
        ],
        answer: "Multiple small haemorrhages at gray-white junction, corpus callosum, and brainstem"
      },
      { 
        id: 5, 
        question: "Q5. When should a repeat CT scan be performed in a head injury patient?", 
        options: [
          "Neurological deterioration (e.g., drop in GCS, worsening weakness)",
          "Mild headache that is improving",
          "Stable patient with an initial small hematoma and no worsening symptoms",
          "No history of trauma but patient feels dizzy"
        ],
        answer: "Neurological deterioration (e.g., drop in GCS, worsening weakness)"
      }
    ]
  },
  "202": {
    title: "CT Thorax (Chest) Contrast Study",
    description: "Test your knowledge about contrast-enhanced CT of the chest.",
    questions: [
      {
        id: 1,
        question: "Q1. What are the main indications for a contrast-enhanced CT (CECT) Chest?",
        options: [
          " Pulmonary embolism (PE) evaluation",
          " Mediastinal lymphadenopathy assessment",
          " Lung mass or tumor characterization",
          " Routine screening for lung infections"
        ],
        answer: [" Pulmonary embolism (PE) evaluation", " Mediastinal lymphadenopathy assessment", " Lung mass or tumor characterization"]
      },
      {
        id: 2,
        question: "Q2. Which factors should be considered before administering IV contrast for a CT Chest?",
        options: [
          " Renal function (Serum creatinine & eGFR)",
          " History of contrast allergy",
          " Presence of metallic implants",
          " Patient's blood pressure"
        ],
        answer: [" Renal function (Serum creatinine & eGFR)", " History of contrast allergy", " Presence of metallic implants"]
      },
      {
        id: 3,
        question: "Q3. What is the preferred contrast phase for evaluating a pulmonary embolism (PE) in CT Chest?",
        options: [
          " Pulmonary arterial phase (timed for peak enhancement in pulmonary arteries)",
          " Delayed phase",
          " Non-contrast phase",
          " Venous phase"
        ],
        answer: " Pulmonary arterial phase (timed for peak enhancement in pulmonary arteries)"
      },
      {
        id: 4,
        question: "Q4. Which findings on a contrast-enhanced CT Chest suggest malignancy?",
        options: [
          "Irregular or spiculated lung nodule margins",
          "Enhancement of lung mass >15 HU after contrast injection",
          "Necrotic lymph nodes with rim enhancement",
          "Smooth, well-defined lung nodule with no enhancement"
        ],
        answer: ["Irregular or spiculated lung nodule margins", " Enhancement of lung mass >15 HU after contrast injection", " Necrotic lymph nodes with rim enhancement"]
      },
      {
        id: 5,
        question: "Q5. What are possible complications of IV contrast administration in CT Chest?",
        options: [
          "Contrast-induced nephropathy (CIN)",
          "Anaphylactic reaction ",
          "Extravasation at injection site",
          "Pulmonary hypertension"
        ],
        answer: [" Contrast-induced nephropathy (CIN)", " Anaphylactic reaction ", " Extravasation at injection site"]
      }
    ]
  },
  "301": {
    title: "CT Abdomen Plain Study",
    description: "Test your knowledge about CT abdomen and pelvis plain study.",
    questions: [
      {
        id: 1,
        question: "Q1. What is the primary purpose of a CT abdomen and pelvis plain study?",
        options: [
          "To evaluate liver function",
          "To visualize bone fractures",
          "To assess abdominal and pelvic organs for abnormalities",
          "To assess lung pathology"
        ],
        answer: "To assess abdominal and pelvic organs for abnormalities"
      },
      {
        id: 2,
        question: "Q2. Which of the following is NOT typically evaluated in a CT abdomen and pelvis plain study?",
        options: [
          "Liver",
          "Kidneys",
          "Bladder",
          "Dorsal Spine fractures"
        ],
        answer: "Dorsal Spine fractures"
      },
      {
        id: 3,
        question: "Q3. What is the primary imaging modality for detecting acute appendicitis?",
        options: [
          "Ultrasound",
          "MRI",
          "CT abdomen and pelvis plain study",
          "X-ray"
        ],
        answer: "CT abdomen and pelvis plain study"
      },
      {
        id: 4,
        question: "Q4. Which contrast is used in a CT abdomen and pelvis plain study?",
        options: [
          "Oral contrast only",
          "Intravenous (IV) contrast only",
          "Both oral and intravenous (IV) contrast",
          "No contrast"
        ],
        answer: "No contrast"
      },
      {
        id: 5,
        question: "Q5. Which of the following is a common indication for a CT abdomen and pelvis plain study?",
        options: [
          "Suspected bowel obstruction",
          "Evaluation of uterine fibroids",
          "To monitor chemotherapy response",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 6,
        question: "Q6. What is the typical patient preparation for a CT abdomen and pelvis plain study?",
        options: [
          "Fasting for at least 6 hours",
          "Taking a contrast agent orally",
          "Drinking a large amount of water",
          "No special preparation needed"
        ],
        answer: "Fasting for at least 6 hours"
      },
      {
        id: 7,
        question: "Q7. Which of the following structures can be visualized using a CT abdomen and pelvis plain study?",
        options: [
          "Liver",
          "Spleen",
          "Pancreas",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 8,
        question: "Q8. What is the common radiation dose for a CT abdomen and pelvis plain study?",
        options: [
          "1-2 mSv",
          "5-10 mSv",
          "10-20 mSv",
          "30-50 mSv"
        ],
        answer: "5-10 mSv"
      },
      {
        id: 9,
        question: "Q9. Which of the following is NOT a contraindication for a CT abdomen and pelvis plain study?",
        options: [
          "Pregnancy",
          "Severe obesity",
          "Active gastrointestinal bleeding",
          "Severe renal impairment"
        ],
        answer: "Pregnancy"
      },
      {
        id: 10,
        question: "Q10. What is a common finding on a CT abdomen and pelvis plain study in patients with diverticulitis?",
        options: [
          "Pericolonic fat stranding",
          "Bowel perforation",
          "Abscess formation",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 11,
        question: "Q11. Which organ is most commonly affected by cysts that may be visualized on a CT abdomen and pelvis plain study?",
        options: [
          "Spleen",
          "Kidneys",
          "Liver",
          "Pancreas"
        ],
        answer: "Kidneys"
      },
      {
        id: 12,
        question: "Q12. What is the main limitation of a CT abdomen and pelvis plain study?",
        options: [
          "It cannot visualize soft tissue structures well",
          "It provides less detailed images of bones compared to X-ray",
          "It cannot detect small bowel pathology effectively",
          "It involves high radiation exposure"
        ],
        answer: "It involves high radiation exposure"
      },
      {
        id: 13,
        question: "Q13. What can be used to evaluate for a suspected renal stone in a CT abdomen and pelvis plain study?",
        options: [
          "Intravenous pyelogram",
          "Plain CT without contrast",
          "Oral contrast administration",
          "MRI"
        ],
        answer: "Plain CT without contrast"
      },
      {
        id: 14,
        question: "Q14. Which of the following would likely NOT require a CT abdomen and pelvis plain study?",
        options: [
          "Abdominal trauma with suspected internal bleeding",
          "Unexplained abdominal pain with suspected malignancy",
          "Routine screening for colon cancer",
          "Suspected kidney stones"
        ],
        answer: "Routine screening for colon cancer"
      },
      {
        id: 15,
        question: "Q15. What is a typical feature of bowel obstruction on a CT abdomen and pelvis plain study?",
        options: [
          "Dilated loops of bowel",
          "Increased peristalsis",
          "Thickened bowel wall",
          "All of the above"
        ],
        answer: "Dilated loops of bowel"
      },
      {
        id: 16,
        question: "Q16. Which of the following conditions can be detected using a CT abdomen and pelvis plain study?",
        options: [
          "Acute pancreatitis",
          "Cholecystitis",
          "Abdominal aortic aneurysm",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 17,
        question: "Q17. What type of CT scan is typically performed for evaluating a suspected bowel perforation?",
        options: [
          "CT with oral contrast",
          "CT without contrast",
          "CT with intravenous contrast",
          "CT with both oral and intravenous contrast"
        ],
        answer: "CT with intravenous contrast"
      },
      {
        id: 18,
        question: "Q18. What type of image artifact can occur with a CT abdomen and pelvis plain study?",
        options: [
          "Motion artifact",
          "Metal artifact",
          "Partial volume artifact",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 19,
        question: "Q19. Which of the following abdominal pathologies is more likely to be missed on a plain CT abdomen and pelvis study?",
        options: [
          "Renal stones",
          "Pancreatic cancer",
          "Intestinal obstruction",
          "Cholelithiasis"
        ],
        answer: "Pancreatic cancer"
      },
      {
        id: 20,
        question: "Q20. What is the main role of CT abdomen and pelvis plain studies in trauma cases?",
        options: [
          "To detect bony fractures",
          "To assess the abdominal cavity for bleeding or organ injury",
          "To evaluate the pelvic organs",
          "To assess for soft tissue injuries"
        ],
        answer: "To assess the abdominal cavity for bleeding or organ injury"
      },
      {
        id: 21,
        question: "Q21. What is the ideal imaging technique for evaluating soft tissue structures like the liver or pancreas?",
        options: [
          "Plain X-ray",
          "Ultrasound",
          "CT with contrast",
          "MRI"
        ],
        answer: "CT with contrast"
      },
      {
        id: 22,
        question: "Q22. How does a CT abdomen and pelvis plain study help in the diagnosis of an abdominal aortic aneurysm?",
        options: [
          "It detects calcification in the aortic wall",
          "It visualizes the size and shape of the aneurysm",
          "It provides information on blood flow",
          "It identifies aortic dissection"
        ],
        answer: "It visualizes the size and shape of the aneurysm"
      },
      {
        id: 23,
        question: "Q23. In what scenario would a CT abdomen and pelvis plain study NOT be sufficient for diagnosis?",
        options: [
          "Suspected bowel perforation",
          "Renal stones",
          "Suspected mesenteric ischemia",
          "Severe trauma with internal bleeding"
        ],
        answer: "Suspected mesenteric ischemia"
      },
      {
        id: 24,
        question: "Q24. What is a typical finding on a CT abdomen and pelvis plain study for a patient with a history of chronic alcohol use?",
        options: [
          "Pancreatic calcifications",
          "Liver cirrhosis",
          "Splenomegaly",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 25,
        question: "Q25. What is the role of CT abdomen and pelvis plain study in the evaluation of bowel ischemia?",
        options: [
          "It helps visualize bowel wall thickening",
          "It provides an assessment of bowel motility",
          "It identifies areas of bowel infarction",
          "It assesses blood flow in mesenteric arteries"
        ],
        answer: "It helps visualize bowel wall thickening"
      },
      {
        id: 26,
        question: "Q26. Which of the following findings is suggestive of a liver mass on a CT abdomen and pelvis plain study?",
        options: [
          "Well-defined hypodense area in the liver",
          "Calcified lesion in the liver",
          "Enlarged gallbladder",
          "Thickened gastric wall"
        ],
        answer: "Well-defined hypodense area in the liver"
      },
      {
        id: 27,
        question: "Q27. Which of the following is NOT typically seen in a CT abdomen and pelvis plain study in patients with Crohn's disease?",
        options: [
          "Bowel wall thickening",
          "Mesenteric fat stranding",
          "Bowel perforation",
          "Hepatic steatosis"
        ],
        answer: "Hepatic steatosis"
      },
      {
        id: 28,
        question: "Q28. What can a CT abdomen and pelvis plain study reveal in a patient with suspected endometriosis?",
        options: [
          "Uterine fibroids",
          "Endometrial cysts",
          "Pelvic adhesions",
          "All of the above"
        ],
        answer: "Endometrial cysts"
      },
      {
        id: 29,
        question: "Q29. Which of the following conditions can be assessed using a CT abdomen and pelvis plain study in a patient with right lower quadrant pain?",
        options: [
          "Appendicitis",
          "Ovarian cyst rupture",
          "Ectopic pregnancy",
          "All of the above"
        ],
        answer: "All of the above"
      },
      {
        id: 30,
        question: "Q30. What can a CT abdomen and pelvis plain study help identify in a patient with suspected inflammatory bowel disease (IBD)?",
        options: [
          "Wall thickening of the small and large intestine",
          "Fistulas and abscesses",
          "Mesenteric lymphadenopathy",
          "All of the above"
        ],
        answer: "All of the above"
      }
    ]
  },
  "302": {
    title: "CT Abdomen Contrast Study",
    description: "Test your knowledge about contrast-enhanced CT of the abdomen.",
    questions: [
      {
        id: 1,
        question: "Q1. What is the primary purpose of a CT abdomen and pelvis contrast study?",
        options: [
          "To visualize bone fractures",
          "To assess soft tissue and vascular structures in the abdomen and pelvis",
          "To evaluate lung pathology",
          "To detect gastrointestinal motility disorders"
        ],
        answer: "To assess soft tissue and vascular structures in the abdomen and pelvis"
      },
      {
        id: 2,
        question: "Q2. Why is oral contrast sometimes used in a CT abdomen study?",
        options: [
          "To enhance visualization of blood vessels",
          "To improve differentiation of gastrointestinal structures",
          "To diagnose fractures",
          "To detect air embolism"
        ],
        answer: "To improve differentiation of gastrointestinal structures"
      },
      {
        id: 3,
        question: "Q3. Which condition requires IV contrast for optimal evaluation?",
        options: [
          "Kidney stones",
          "Liver metastases",
          "Pneumoperitoneum",
          "Free air under the diaphragm"
        ],
        answer: "Liver metastases"
      },
      {
        id: 4,
        question: "Q4. How long should a patient fast before a CT abdomen with contrast?",
        options: [
          "No fasting required",
          "1 hour",
          "4-6 hours",
          "24 hours"
        ],
        answer: "4-6 hours"
      },
      {
        id: 5,
        question: "Q5. Which patient should NOT receive IV contrast?",
        options: [
          "A patient with a history of mild iodine allergy",
          "A patient with GFR < 30 mL/min",
          "A patient with controlled diabetes",
          "A patient with suspected bowel obstruction"
        ],
        answer: "A patient with GFR < 30 mL/min"
      },
      {
        id: 6,
        question: "Q6. What is the primary risk of IV contrast administration?",
        options: [
          "Pulmonary embolism",
          "Hyperglycemia",
          "Nephrotoxicity",
          "Dehydration"
        ],
        answer: "Nephrotoxicity"
      },
      {
        id: 7,
        question: "Q7. What should be done before administering IV contrast in a patient with chronic kidney disease?",
        options: [
          "Check blood glucose levels",
          "Obtain a renal function test (creatinine, GFR)",
          "Give diuretics",
          "Perform an ECG"
        ],
        answer: "Obtain a renal function test (creatinine, GFR)"
      },
      {
        id: 8,
        question: "Q8. Which of the following is a contraindication to IV contrast?",
        options: [
          "Mild hypertension",
          "Severe contrast allergy",
          "History of gallstones",
          "Low potassium levels"
        ],
        answer: "Severe contrast allergy"
      },
      {
        id: 9,
        question: "Q9. Which medication may be given before a CT scan if a patient has a mild iodine contrast allergy?",
        options: [
          "Insulin",
          "Prednisolone or Methylprednisolone",
          "Metformin",
          "Epinephrine"
        ],
        answer: "Prednisolone or Methylprednisolone"
      },
      {
        id: 10,
        question: "Q10. What is the primary route of contrast excretion?",
        options: [
          "Liver",
          "Lungs",
          "Kidneys",
          "Small intestine"
        ],
        answer: "Kidneys"
      },
      {
        id: 11,
        question: "Q11. What is the typical IV contrast dose for an adult CT abdomen study?",
        options: [
          "10 mL",
          "50-150 mL",
          "300 mL",
          "500 mL"
        ],
        answer: "50-150 mL"
      },
      {
        id: 12,
        question: "Q12. What is the standard IV contrast flow rate?",
        options: [
          "0.5 mL/sec",
          "1.0 mL/sec",
          "3-5 mL/sec",
          "10 mL/sec"
        ],
        answer: "3-5 mL/sec"
      },
      {
        id: 13,
        question: "Q13. Which contrast phase is best for detecting liver lesions?",
        options: [
          "Non-contrast",
          "Arterial phase",
          "Portal venous phase",
          "Delayed phase"
        ],
        answer: "Portal venous phase"
      },
      {
        id: 14,
        question: "Q14. What is the primary advantage of using dual-phase contrast imaging?",
        options: [
          "Reduced radiation exposure",
          "Improved visualization of vascular and parenchymal structures",
          "Less contrast agent required",
          "Faster scan time"
        ],
        answer: "Improved visualization of vascular and parenchymal structures"
      },
      {
        id: 15,
        question: "Q15. If a patient cannot drink oral contrast, what alternative can be used?",
        options: [
          "Normal saline",
          "IV contrast only",
          "Rectal contrast",
          "No contrast at all"
        ],
        answer: "Rectal contrast"
      },
      {
        id: 16,
        question: "Q16. What finding on a CT abdomen with contrast is most suggestive of appendicitis?",
        options: [
          "Diffuse bowel thickening",
          "Non-enhancing renal cyst",
          "Dilated appendix with surrounding fat stranding",
          "Air-fluid levels in the stomach"
        ],
        answer: "Dilated appendix with surrounding fat stranding"
      },
      {
        id: 17,
        question: "Q17. A \"target sign\" in a contrast-enhanced CT of the abdomen is associated with:",
        options: [
          "Bowel ischemia",
          "Pancreatitis",
          "Gallstones",
          "Kidney cysts"
        ],
        answer: "Bowel ischemia"
      },
      {
        id: 18,
        question: "Q18. A hyperdense lesion in the portal venous phase suggests:",
        options: [
          "Hepatic hemangioma",
          "Simple liver cyst",
          "Liver metastasis",
          "Portal vein thrombosis"
        ],
        answer: "Liver metastasis"
      },
      {
        id: 19,
        question: "Q19. What is the most common finding in acute pancreatitis on contrast-enhanced CT?",
        options: [
          "Pancreatic calcifications",
          "Fatty infiltration",
          "Peripancreatic fluid collection",
          "Hepatomegaly"
        ],
        answer: "Peripancreatic fluid collection"
      },
      {
        id: 20,
        question: "Q20. A contrast-enhancing renal mass on a CT scan is concerning for:",
        options: [
          "Renal cell carcinoma",
          "Simple cyst",
          "Ureteral stone",
          "Pyelonephritis"
        ],
        answer: "Renal cell carcinoma"
      },
      {
        id: 21,
        question: "Q21. What is a potential complication of IV contrast extravasation?",
        options: [
          "Deep vein thrombosis",
          "Soft tissue necrosis",
          "Pneumothorax",
          "Hematuria"
        ],
        answer: "Soft tissue necrosis"
      },
      {
        id: 22,
        question: "Q22. How can motion artifacts be minimized during a CT abdomen scan?",
        options: [
          "Increasing the scan time",
          "Using a higher radiation dose",
          "Coaching the patient on breath-holding",
          "Performing the scan without contrast"
        ],
        answer: "Coaching the patient on breath-holding"
      },
      {
        id: 23,
        question: "Q23. Which artifact may occur due to high-density contrast pooling?",
        options: [
          "Beam-hardening artifact",
          "Ring artifact",
          "Motion artifact",
          "Partial volume artifact"
        ],
        answer: "Beam-hardening artifact"
      },
      {
        id: 24,
        question: "Q24. Which of the following can reduce contrast nephropathy risk?",
        options: [
          "Increasing contrast dose",
          "Hydration with IV fluids",
          "Using MRI instead of CT",
          "Administering epinephrine before contrast"
        ],
        answer: "Hydration with IV fluids"
      },
      {
        id: 25,
        question: "Q25. Why might a non-contrast phase be performed in addition to contrast-enhanced phases?",
        options: [
          "To reduce patient radiation exposure",
          "To evaluate for calcifications or kidney stones",
          "To save scan time",
          "To minimize contrast side effects"
        ],
        answer: "To evaluate for calcifications or kidney stones"
      },
      {
        id: 26,
        question: "Q26. What is the most common side effect of IV contrast administration?",
        options: [
          "Anaphylaxis",
          "Mild nausea or warmth sensation",
          "Seizures",
          "Severe hypotension"
        ],
        answer: "Mild nausea or warmth sensation"
      },
      {
        id: 27,
        question: "Q27. What should be done if a patient experiences mild hives after contrast administration?",
        options: [
          "Monitor and consider an antihistamine if symptoms worsen",
          "Immediately stop the scan and administer epinephrine",
          "Send the patient home without follow-up",
          "Avoid using contrast in future studies"
        ],
        answer: "Monitor and consider an antihistamine if symptoms worsen"
      },
      {
        id: 28,
        question: "Q28. In a pregnant patient, when is a CT abdomen with contrast recommended?",
        options: [
          "Always safe, no concerns",
          "Only if the benefits outweigh the risks",
          "Never",
          "Only in the third trimester"
        ],
        answer: "Only if the benefits outweigh the risks"
      },
      {
        id: 29,
        question: "Q29. Why should metformin be temporarily stopped after IV contrast administration?",
        options: [
          "It can cause lactic acidosis in patients with renal impairment",
          "It interacts with contrast and causes false imaging results",
          "It enhances the effect of IV contrast",
          "It causes acute pancreatitis"
        ],
        answer: "It can cause lactic acidosis in patients with renal impairment"
      },
      {
        id: 30,
        question: "Q30. What is the best imaging modality for evaluating suspected gallstones if ultrasound is inconclusive?",
        options: [
          "X-ray",
          "CT without contrast",
          "MRI/MRCP",
          "Fluoroscopy"
        ],
        answer: "MRI/MRCP"
      }
    ]
  },
};

const Quiz = () => {
  const { courseId, topicId } = useParams();  
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get registration_id from location state
  const registrationId = location.state?.registration_id || "";

  // Get current course data
  const currentCourse = courseQuestions[courseId] || {
    title: "Quiz Not Available",
    description: "No quiz available for this course.",
    questions: []
  };

  const handleAnswerChange = (questionId, selectedOption) => {
    setAnswers(prev => {
      // If the question has multiple answers (array), handle multiple selection
      const question = currentCourse.questions.find(q => q.id === questionId);
      if (Array.isArray(question.answer)) {
        const prevAnswers = prev[questionId] || [];
        if (prevAnswers.includes(selectedOption)) {
          return {
            ...prev,
            [questionId]: prevAnswers.filter(opt => opt !== selectedOption)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...prevAnswers, selectedOption]
          };
        }
      }
      // For single answer questions
      return {
        ...prev,
        [questionId]: selectedOption
      };
    });
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    const totalQuestions = currentCourse.questions.length;
    const answeredQuestions = Object.keys(answers).length;

    if (answeredQuestions < totalQuestions) {
      alert(`Please answer all questions before submitting. (${answeredQuestions}/${totalQuestions} answered)`);
      return;
    }

    setSubmitted(true);

    // Calculate results
    let correctAnswers = 0;
    const results = currentCourse.questions.map(question => {
      let isCorrect;
      if (Array.isArray(question.answer)) {
        // For multiple answer questions, check if arrays match exactly
        const userAnswerSet = new Set(answers[question.id] || []);
        const correctAnswerSet = new Set(question.answer);
        isCorrect = userAnswerSet.size === correctAnswerSet.size && 
          [...userAnswerSet].every(answer => correctAnswerSet.has(answer));
      } else {
        // For single answer questions
        isCorrect = answers[question.id] === question.answer;
      }
      if (isCorrect) correctAnswers++;
      return {
        question: question.question,
        userAnswer: answers[question.id],
        correctAnswer: question.answer,
        isCorrect
      };
    });

    const score = {
      total: totalQuestions,
      correct: correctAnswers,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
      details: results
    };

    // Navigate to results page with score data
    setTimeout(() => {
      navigate(`/student-dashboard/courses/ongoing/${topicId}/protocols/quiz-result/${courseId}`, {
        state: { 
          score,
          topicId,
          registration_id: registrationId,
          courseTitle: currentCourse.title
        }
      });
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl text-white">📝</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{currentCourse.title}</h1>
            <p className="text-gray-600 mt-1">{currentCourse.description}</p>
          </div>
        </div>

        {/* Quiz Content */}
        {currentCourse.questions.length > 0 ? (
          <div className="space-y-6">
            {currentCourse.questions.map((q) => (
              <div key={q.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">{q.question}</h2>
                  <div className="space-y-3">
                    {q.options.map((option, index) => {
                      const isMultipleAnswer = Array.isArray(q.answer);
                      const isSelected = isMultipleAnswer 
                        ? (answers[q.id] || []).includes(option)
                        : answers[q.id] === option;

                      return (
                        <label 
                          key={index}
                          className={`flex items-center p-3 rounded-lg border transition-all cursor-pointer
                            ${isSelected 
                              ? 'bg-blue-50 border-blue-500' 
                              : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <input
                            type={isMultipleAnswer ? "checkbox" : "radio"}
                            name={`question-${q.id}`}
                            value={option}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(q.id, option)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all
                  ${submitted 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'}`}
              >
                {submitted ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Complete The Course
                    <span className="text-xl">✓</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600 text-lg">No questions available for this course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;