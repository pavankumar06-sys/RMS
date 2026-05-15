import { useState } from "react";

export default function Assessments() {
  const [activeTab, setActiveTab] = useState("All Results");
  const [showModal, setShowModal] = useState(false);

  const cards = [
    { title: "Level 1 Assessment", total: 85, pass: 62, fail: 18, pending: 5, rate: 73 },
    { title: "Level 2 Assessment", total: 62, pass: 45, fail: 12, pending: 5, rate: 73 },
    { title: "Level 3 Assessment", total: 38, pass: 26, fail: 8, pending: 4, rate: 68 },
  ];

  const data = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      position: "Software Engineer",
      level: "Level 3",
      score: "85/100",
      result: "Pass",
      remarks: "Excellent technical skills",
      date: "5/3/2026",
    },
    {
      name: "Michael Chen",
      email: "m.chen@email.com",
      position: "Data Analyst",
      level: "Level 2",
      score: "78/100",
      result: "Pass",
      remarks: "Good analytical skills",
      date: "5/2/2026",
    },
    {
      name: "Emma Williams",
      email: "emma.w@email.com",
      position: "UX Designer",
      level: "Level 2",
      score: "72/100",
      result: "Pass",
      remarks: "Strong portfolio",
      date: "5/1/2026",
    },
    {
      name: "James Brown",
      email: "j.brown@email.com",
      position: "DevOps Engineer",
      level: "Level 1",
      score: "45/100",
      result: "Fail",
      remarks: "Needs more experience",
      date: "4/30/2026",
    },
    {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      position: "Product Manager",
      level: "Level 3",
      score: "92/100",
      result: "Pass",
      remarks: "Outstanding performance",
      date: "4/29/2026",
    },
  ];

  return (
    <div className="p-6 bg-slate-50 space-y-6 font-['Segoe_UI']">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Assessment Results</h2>
          <p className="text-sm text-gray-500">
            Track and manage candidate assessment performance
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border px-4 py-2 rounded-lg">
            Export Results
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() => setShowModal(true)}
          >
            Upload Results
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-5 flex flex-col"
          >
            <h3 className="font-semibold mb-4">{c.title}</h3>

            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Total Assessed</span>
              <span className="text-2xl font-medium">{c.total}</span>
            </div>

            <div className="flex justify-between text-sm mb-3">
              <span className="text-green-600">Pass: {c.pass}</span>
              <span className="text-red-600">Fail: {c.fail}</span>
              <span className="text-orange-500">Pending: {c.pending}</span>
            </div>

            <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-black"
                style={{ width: `${c.rate}%` }}
              />
            </div>

            <p className="text-center text-xs text-gray-500 mt-2">
              {c.rate}% Pass Rate
            </p>
          </div>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="bg-white border rounded-2xl p-5">

        {/* TABS */}
        <div className="inline-flex bg-gray-200 rounded-full p-1 gap-1 mb-4">
          {["All Results", "Level 1", "Level 2", "Level 3"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1 rounded-full text-sm ${
                activeTab === t ? "bg-white font-medium" : ""
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab !== "All Results" && (
          <p className="text-sm text-center text-gray-500 mb-4">
            Filter results for {activeTab} assessments
          </p>
        )}

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_2fr_1fr] text-sm font-medium border-b pb-2">
          <span>Candidate</span>
          <span>Position</span>
          <span>Level</span>
          <span>Score</span>
          <span>Result</span>
          <span>Remarks</span>
          <span>Date</span>
        </div>

        {/* TABLE ROWS */}
        {data
          .filter((d) =>
            activeTab === "All Results" ? true : d.level === activeTab
          )
          .map((d, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_2fr_1fr] py-3 border-b text-sm items-center"
            >
              <div>
                <b>{d.name}</b>
                <p className="text-xs text-gray-500">{d.email}</p>
              </div>

              <span>{d.position}</span>

              <span className="border px-2 py-0.5 rounded text-xs w-fit">
                {d.level}
              </span>

              <span>{d.score}</span>

              <span
                className={`px-3 py-1 rounded text-xs w-fit ${
                  d.result === "Pass"
                    ? "bg-black text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {d.result}
              </span>

              <span>{d.remarks}</span>
              <span>{d.date}</span>
            </div>
          ))}
      </div>

      {/* UPLOAD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[500px] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                Bulk Upload Assessment Results
              </h3>
              <button onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
              <b>File Format Requirements:</b>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>CSV: Email, Score, Result, Remarks</li>
                <li>Email must match records</li>
                <li>Score 0–100</li>
                <li>Result: Pass / Fail / Pending</li>
              </ul>
            </div>

            <div className="border-dashed border-2 rounded-xl p-6 text-center">
              <p>Upload CSV file</p>
              <small className="text-gray-500">Max size: 5MB</small>
              <div>
                <button className="border px-4 py-2 rounded-lg mt-2">
                  Choose File
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="w-1/2 bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button className="w-1/2 bg-black text-white px-4 py-2 rounded-lg">
                Process Results
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}