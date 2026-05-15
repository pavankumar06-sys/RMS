import React from "react";
import "../Assessments.css";
import Papa from "papaparse";
// import * as XLSX from "xlsx";

import { useNavigate } from "react-router-dom";
 
function Assessments() {
  const [activeTab, setActiveTab] = React.useState("All Results");
  const [showModal, setShowModal] = React.useState(false); // ✅ ADDED
  const [fileData, setFileData] = React.useState(null);
  const [selectedCandidate, setSelectedCandidate] = React.useState(null);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
 const [finalRemarks, setFinalRemarks] = React.useState("");
  const [finalComments, setFinalComments] = React.useState("");
  const MAX_COMMENT_LENGTH = 200;
const navigate = useNavigate();
 
  const cards = [
    { title: "Level 1 Assessment", total: 85, pass: 62, fail: 18, pending: 5, rate: 73 },
    { title: "Level 2 Assessment", total: 62, pass: 45, fail: 12, pending: 5, rate: 73 },
    { title: "Level 3 Assessment", total: 38, pass: 26, fail: 8, pending: 4, rate: 68 }
  ];

  

 
  const [data, setData] = React.useState([
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "Software Engineer",
      level: "Level 3",
      score: "85/100",
      percent: "85%",
      result: "Pass",
      remarks: "Excellent technical skills",
      date: "5/3/2026",
      
 levels: {
    level1: "Pass",
    level2: "Pass",
    level3: "Pending"
  }

    },
    {
      name: "Michael Chen",
      email: "m.chen@email.com",
      position: "Data Analyst",
      level: "Level 2",
      score: "78/100",
      percent: "78%",
      result: "Pass",
      remarks: "Good analytical skills",
      date: "5/2/2026",
      
 levels: {
    level1: "Pass",
    level2: "Pass",
    level3: "Pending"
  }

    },
    {
      name: "Emma Williams",
      email: "emma.w@email.com",
      position: "UX Designer",
      level: "Level 2",
      score: "72/100",
      percent: "72%",
      result: "Pass",
      remarks: "Strong portfolio",
      date: "5/1/2026",
      
 levels: {
    level1: "Pass",
    level2: "Pass",
    level3: "Pending"
  }

    },
    {
      name: "James Brown",
      email: "j.brown@email.com",
      position: "DevOps Engineer",
      level: "Level 1",
      score: "45/100",
      percent: "45%",
      result: "Fail",
      remarks: "Needs more experience",
      date: "4/30/2026",
      
 levels: {
    level1: "Pass",
    level2: "Pass",
    level3: "Pending"
  }

    },
    {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      position: "Product Manager",
      level: "Level 3",
      score: "92/100",
      percent: "92%",
      result: "Pass",
      remarks: "Outstanding performance",
      date: "4/29/2026",
      
 levels: {
    level1: "Pass",
    level2: "Pass",
    level3: "Pending"
  }

    }
  ]);

  const getActiveLevelKey = () => {
  if (selectedCandidate.level === "Level 1") return "level1";
  if (selectedCandidate.level === "Level 2") return "level2";
  return "level3";
};
   const handleFileUpload = (e) => {
    const file = e.target.files[0];
 
    if (!file) return;
 
    console.log("Selected file:", file.name);
 
    Papa.parse(file, {
      header: true,   // ✅ important
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV:", result.data);
 
        setFileData(result.data);  // ✅ store structured data
      },
      error: (err) => {
        console.error("Error parsing file:", err);
      }
    });
 
  };
 
 
 
const handleProcessResults = () => {
    if (!fileData) {
      alert("Upload file first");
      return;
    }
 
    const newRows = fileData.map((row) => ({
  name: row.Name || "N/A",
  email: row.Email || "",
  position: row.Position || "N/A",
  level: row.Level || "Level 1",   // ✅ set default level
  score: row.Score || "0/100",
  result: row.Result || "Fail",
  remarks: row.Remarks || "No remarks",
  date: row.Date || new Date().toLocaleDateString()
}));
 
    setData(prev => [...prev, ...newRows]);
    setShowModal(false);
  };
 
  // ✅ EXPORT
  const handleExport = () => {
    const headers = ["Name", "Email", "Position", "Level", "Score", "Result", "Remarks", "Date"];
 
    const rows = data.map(row => [
      row.name,
      row.email,
      row.position,
      row.level,
      row.score,
      row.result,
      row.remarks,
      row.date
    ]);
 
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");
 
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "assessment_results.csv";
    link.click();
  };

  const calculateFinalResult = (levels) => {
  if (Object.values(levels).includes("Fail")) return "Fail";
  if (Object.values(levels).includes("Pending")) return "Pending";
  return "Pass";
};

// const handleSchedule = (row) => {
//   navigate("/meetings", {
//     state: {
//       source: "assessment",
//       candidate: {
//         name: row.name,
//         email: row.email,
//         position: row.position,
//         level: row.level,
//         score: row.score,
//         result: row.result,
//         remarks: row.remarks,
//       }
//     }
//   });
// };


const handleSchedule = (row) => {
  const [firstName, ...rest] = row.name.split(" ");
  const lastName = rest.join(" ");

  navigate("/meetings", {
    state: {
      source: "assessment",
      candidate: {
        firstName,            // ✅ FIX
        lastName,             // ✅ FIX
        email: row.email,
        position: row.position,
        level: row.level,
        score: row.score,
        result: row.result,
        remarks: row.remarks,
      }
    }
  });
};
const calculateFinalResultByLevel = (levels, currentLevel) => {
  let relevantLevels = [];

  if (currentLevel === "Level 1") {
    relevantLevels = [levels.level1];
  } else if (currentLevel === "Level 2") {
    relevantLevels = [levels.level1, levels.level2];
  } else if (currentLevel === "Level 3") {
    relevantLevels = [levels.level1, levels.level2, levels.level3];
  }

  if (relevantLevels.includes("Fail")) return "Fail";
  if (relevantLevels.includes("Pending")) return "Pending";
  return "Pass";
};

 
  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };
 
 const updateCandidateResult = (newResult) => {
  setData(prev =>
    prev.map(item =>
      item.email === selectedCandidate.email
        ? { ...item, result: newResult, remarks: finalRemarks }
        : item
    )
  );

  setSelectedCandidate(prev => ({
    ...prev,
    result: newResult,
    remarks: finalRemarks
  }));
};


const handleDecision = (decision) => {
  const activeLevelKey =
    selectedCandidate.level === "Level 1"
      ? "level1"
      : selectedCandidate.level === "Level 2"
      ? "level2"
      : "level3";

  setData(prev =>
    prev.map(item => {
      if (item.email !== selectedCandidate.email) return item;

      const updatedLevels = {
        ...item.levels,
        [activeLevelKey]: decision   // ✅ FIX IS HERE
      };

      return {
        ...item,
        levels: updatedLevels,
        result: calculateFinalResult(updatedLevels),
        remarks: finalRemarks || item.remarks
      };
    })
  );

  setSelectedCandidate(prev => {
    const updatedLevels = {
      ...prev.levels,
      [activeLevelKey]: decision     // ✅ FIX IS HERE
    };

    return {
      ...prev,
      levels: updatedLevels,
      result: calculateFinalResult(updatedLevels),
      remarks: finalRemarks || prev.remarks
    };
  });
};


 
  return (
    <div className="assessment">
 
      {/* HEADER */}
      <div className="header">
        <div>
          <h2>Assessment Results</h2>
          <p>Track and manage candidate assessment performance</p>
        </div>
 
        <div className="btns">
          <button className="light" onClick={handleExport}>
            Export Results
          </button>
 
 
          <button className="dark" onClick={() => setShowModal(true)}>
            Upload Results
          </button>
        </div>
      </div>
      {/* ✅ ✅ UPLOAD MODAL */}
      {showModal && (
        <div className="modal-overlay">
 
          <div className="modal">
 
            <div className="modal-header">
              <h3>Bulk Upload Assessment Results</h3>
              <span onClick={() => setShowModal(false)}>✕</span>
            </div>
 
            <div className="info-box">
              <p>Upload CSV file with Email, Score, Result, Remarks</p>
            </div>
 
            <div className="upload-box">
 
              <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />
 
 
            </div>
 
            <div className="modal-actions">
 
              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
 
              <button onClick={handleProcessResults}>
                Process Results
              </button>
 
            </div>
 
          </div>
 
        </div>
      )}
 
      {/* CARDS */}
      <div className="cards">
        {cards.map((c, i) => (
          <div
            className={`card ${activeTab === c.title.replace(" Assessment", "")
              ? "highlight-card"
              : ""
              }`}
            key={i}
          >
 
            <h3 className="title">{c.title}</h3>
 
            <div className="row">
              <span className="label">Total Assessed</span>
              <span className="count">{c.total}</span>
            </div>
 
            <div className="stats">
              <span className="green">Pass: {c.pass}</span>
              <span className="red">Fail: {c.fail}</span>
              <span className="orange">Pending: {c.pending}</span>
            </div>
 
            <div className="progress">
              <div
                className="progress-fill"
                style={{ width: `${c.rate}%` }}
              ></div>
            </div>
 
            <div className="rate">{c.rate}% Pass Rate</div>
          </div>
        ))}
      </div>
 
      {/* TABLE */}
      <div className="candidate-card">
 
        {/* TABS */}
        <div className="tabs">
          {/* {["All Results", "Level 1", "Level 2", "Level 3"].map((tab) => ( */}
          {["Level 1", "Level 2", "Level 3", "All Results"].map((tab) => (

            <span
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>
 
        {/* FILTER TEXT */}
        {activeTab !== "All Results" && (
          <p className="filter-text">
            Filter results for {activeTab} assessments
          </p>
        )}
 
        {/* TABLE HEADER */}
    {/* <div className="table-header">
      <span>Candidate</span>
      <span>Position</span>
      <span>Level</span>
      <span>Score</span>
      <span>Result</span>
      <span>Remarks</span>
      <span>Date</span>

      {activeTab !== "All Results" && <span>Action</span>}
    </div> */}

    <div className="table-header">
  <span>Candidate</span>
  <span>Position</span>
  <span>Level</span>
  <span>Score</span>
  <span>Result</span>
  <span>Remarks</span>
  <span>Date</span>
  <span>Action</span>


  {/* {activeTab !== "All Results" && <span>Action</span>} */}
</div>
 
        {/* DATA */}
        {data
          .filter((row) => {
            if (activeTab === "All Results") return true;
            return row.level === activeTab;
          })
          .map((row, i) => (
            <div className="table-row" key={i}>
              <div>
                <b
                  style={{ cursor: "pointer", color: "#020617" }}
                 onClick={() => {
                  setSelectedCandidate(row);
                  setFinalRemarks(row.remarks);
                  setFinalComments("");
                  setShowDetailModal(true);
                  document.body.classList.add("modal-open");

                }}
                >
                  {row.name}
                </b>
 
                <p className="email">{row.email}</p>
              </div>
 
              <span>{row.position}</span>
              <span className="level">{row.level}</span>
              <span>{row.score}</span>
 
              {/* <button className={`status ${row.result.toLowerCase()}`} disabled>
            {row.result}
          </button> */}
         {(() => {
  const finalResult = calculateFinalResultByLevel(row.levels, row.level);



  
  return (
    <button
      className={`status ${finalResult.toLowerCase()}`}
      disabled
    >
      {finalResult}
    </button>
  );
})()}


 
              <span>{row.remarks}</span>
              <span>{row.date}</span>
              {/* {activeTab !== "All Results" && (
              <button
                className="schedule-row-btn"
                disabled={row.result !== "Pass"}
              >
                Schedule
              </button>
            )} */}

              {/* <button
                className="schedule-row-btn"
                disabled={row.result !== "Pass"}
              >
                Schedule
              </button> */}

            {/* <button
  className="schedule-row-btn"
  disabled={row.result !== "Pass"}
  onClick={() => handleSchedule(row)}
>
  Schedule
</button> */}

{(() => {
  const finalResult = calculateFinalResultByLevel(row.levels, row.level);

  return (
    <button
      className="schedule-row-btn"
      disabled={finalResult !== "Pass"}   // ✅ FIX HERE
      onClick={() => handleSchedule(row)}
    >
      Schedule
    </button>
  );
})()}




 
 
 
            </div>
          ))}
      </div>
 
 
 
 
 
      {showDetailModal && selectedCandidate && (
        <div className="modal-overlay">
 
          <div className="modal colorful-modal wide-modal">

  {/* HEADER */}


  <div className="modal-header">
   <h3 className="timeline-title">Candidate Assessment Details</h3>
    <span onClick={() => setShowDetailModal(false)}>✕</span>
  </div>

 

  {/* BASIC DETAILS */}
  <div className="details-block">
    <p><b>Full Name :</b> {selectedCandidate.name}</p>
    <p><b>Email :</b> {selectedCandidate.email}</p>
    <p><b>Position :</b> {selectedCandidate.position}</p>
  </div>

  <h4 className="timeline-title">Assessment Journey Timeline</h4>

  <div className="assessment-grid">

   {/* LEVEL 1 */}
<div
  className={`assessment-card ${
    selectedCandidate.levels.level1 === "Pass"
      ? "pass-border"
      : "fail-border"
  }`}
>
  <h4>Level 1</h4>
  <p>
    Status:
    <button
      className={`status-btn ${selectedCandidate.levels.level1.toLowerCase()}`}
      disabled
    >
      {selectedCandidate.levels.level1}
    </button>
  </p>
  <p>Score: {selectedCandidate.score}</p>
  <p>Date: {addDays(selectedCandidate.date, 1)}</p>
</div>

{/* LEVEL 2 */}
{(selectedCandidate.level === "Level 2" ||
  selectedCandidate.level === "Level 3") && (
  <div
    className={`assessment-card ${
      selectedCandidate.levels.level2 === "Pass"
        ? "pass-border"
        : "fail-border"
    }`}
  >
    <h4>Level 2</h4>
    <p>
      Status:
      <button
        className={`status-btn ${selectedCandidate.levels.level2.toLowerCase()}`}
        disabled
      >
        {selectedCandidate.levels.level2}
      </button>
    </p>
    <p>Score: {selectedCandidate.score}</p>
    <p>Date: {addDays(selectedCandidate.date, 2)}</p>
  </div>
)}

{/* LEVEL 3 */}
{selectedCandidate.level === "Level 3" && (
  <div
    className={`assessment-card ${
      selectedCandidate.levels.level3 === "Pass"
        ? "pass-border"
        : "fail-border"
    }`}
  >
    <h4>Level 3</h4>
    <p>
      Status:
      <button
        className={`status-btn ${selectedCandidate.levels.level3.toLowerCase()}`}
        disabled
      >
        {selectedCandidate.levels.level3}
      </button>
    </p>
    <p>Score: {selectedCandidate.score}</p>
    <p>Date: {addDays(selectedCandidate.date, 4)}</p>
  </div>
)}
  </div>

  <div className="final-section">

    <label>Final Remarks</label>
    <input
      type="text"
      value={finalRemarks}
      onChange={(e) => setFinalRemarks(e.target.value)}
      placeholder="One line remark"
    />

    <label>Final Comments</label>
    <textarea
      value={finalComments}
      maxLength={MAX_COMMENT_LENGTH}
      onChange={(e) => setFinalComments(e.target.value)}
      placeholder="Max 200 characters"
    />

    <div className="decision-btns unified-actions">

      <button
        className={`decision-btn approve ${selectedCandidate.result === "Pass" ? "active" : ""}`}
        onClick={() => handleDecision("Pass")}
      >
        ✅ Approve
      </button>

      <button
        className={`decision-btn reject ${selectedCandidate.result === "Fail" ? "active" : ""}`}
        onClick={() => handleDecision("Fail")}
      >
        ❌ Reject
      </button>

      {/* <button
        className="decision-btn save"
        onClick={() => setShowDetailModal(false)}
      >
        💾 Save
      </button> */}

      <button
  className="decision-btn save"
  onClick={() => {
    setData(prev =>
      prev.map(item =>
        item.email === selectedCandidate.email
          ? { ...item, remarks: finalRemarks }
          : item
      )
    );

    setSelectedCandidate(prev => ({
      ...prev,
      remarks: finalRemarks
    }));

    setShowDetailModal(false);
  }}
>
  💾 Save
</button>

    </div>

  </div>

</div>
        </div>
      )}
 
 
    </div>
 
  );
}
 
export default Assessments;
 
