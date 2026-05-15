import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCandidates, updateCandidateApi } from "../api/candidateApi";

const JobDetailsModal = ({ job, onClose }) => {
  const [search, setSearch] = useState("");
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  const assignCandidateToJob = async (candidate) => {
  await updateCandidateApi({
    ...candidate,
    jobId: job.id, // ✅ MAIN FIX
  });
};


  // ✅ Load candidates from backend
  useEffect(() => {
    fetchCandidates().then(setCandidates);
  }, []);

  // ✅ Job skills lowercase
  // const jobSkills = job.skills.map((s) => s.toLowerCase());
  const jobSkills = job.skills?.map((s) => s.toLowerCase()) || [];


  // ✅ Skill match + search
  const filteredCandidates = candidates
    .filter((c) =>
      c.skills?.some((skill) =>
        jobSkills.includes(skill.toLowerCase())
      )
    )
    .filter((c) =>
      `${c.groupId} ${c.firstName} ${c.lastName} ${c.grade}
       ${c.type} ${c.email} ${c.skills?.join(" ")}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const goToMeetingsPage = (candidate) => {
    onClose();
    navigate("/meetings", { state: { job, candidate } });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-40 flex justify-end">
      <div className="bg-white w-[calc(100vw-320px)] max-w-5xl max-h-[85vh] my-auto mr-8 rounded-2xl p-6 shadow-xl flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">{job.title} – Job Details</h2>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        {/* SUMMARY */}
        <div className="grid grid-cols-4 gap-6 text-sm mb-5">
          <div><b>Account:</b> {job.account}</div>
          <div><b>Team:</b> {job.team}</div>
          <div><b>Status:</b> {job.status}</div>
          <div><b>Skills:</b> {job.skills.join(", ")}</div>
          <div><b>Owner:</b> {job.owner}</div>
        </div>

        <input
          className="mb-4 p-3 bg-slate-100 rounded-xl"
          placeholder="Search by name, skill, grade, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        {/* <div className="flex-1 overflow-auto"> */}
        <div className="flex-1 overflow-x-auto overflow-y-auto">

          {/* <table className="w-full border"> */}
          <table className="min-w-max w-full border whitespace-nowrap">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="p-2 border">Group ID</th>
                <th className="p-2 border whitespace-nowrap">First Name</th>
                <th className="p-2 border whitespace-nowrap">Last Name</th>
                <th className="p-2 border whitespace-nowrap">Position</th>
                <th className="p-2 border">Grade</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Skills</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c) => (
                <tr key={c.id}>
                  <td className="p-2 border">{c.groupId}</td>
                  <td className="p-2 border">{c.firstName}</td>
                  <td className="p-2 border">{c.lastName}</td>
                  <td className="p-2 border">{c.position}</td>
                  <td className="p-2 border">{c.grade}</td>
                  <td className="p-2 border">{c.type}</td>
                  <td className="p-2 border">
                    {c.skills.map((s, i) => (
                      <span key={i} className="mr-1 bg-slate-100 px-2 rounded text-xs">{s}</span>
                    ))}
                  </td>
                  <td className="p-2 border text-blue-600">{c.email}</td>
                  {/* <td className="p-2 border">
                    <button
                      onClick={() => goToMeetingsPage(c)}
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      Schedule
                    </button>
                  </td> */}
                  <td className="p-2 border space-y-1">
              {/* ✅ Multi Job Flag */}
              {c.jobId && (
                <div
                  title="Candidate is active in other job interviews"
                  className="inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded"
                >
                  ⚠ Multi‑Job
                </div>
              )}

      {/* ✅ Schedule Button */}
            <button
              onClick={() => goToMeetingsPage(c)}
              className="bg-black text-white px-3 py-1 rounded"
            >
              Schedule
            </button>
          </td>

                </tr>
              ))}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-slate-500">
                    No candidates match this job’s skills
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;