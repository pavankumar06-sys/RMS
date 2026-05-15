

import React, { useEffect, useState } from "react";
import JobDetailsModal from "../components/JobDetailsModal";
import { fetchCandidates } from "../api/candidateApi";
import { fetchJobs, createJob, updateJob, deleteJobApi } from "../api/jobApi";

export default function Jobs() {
  const [jobs, setJobs] = useState([]); // ✅ API data
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");

  const userName = localStorage.getItem("userName") || "User";

  // ✅ Extract total positions from "0/10 filled"
const getTotalPositions = (positionsStr) => {
  if (!positionsStr) return 0;
  return Number(positionsStr.split("/")[1]?.split(" ")[0]) || 0;
};

// // ✅ Count filled positions from candidates
// const getFilledPositions = (jobId, candidates) => {
//   return candidates.filter((c) => c.jobId === jobId).length;
// };

// useEffect(() => {
//   fetchCandidates()
//     .then((data) => setCandidates(Array.isArray(data) ? data : []))
//     .catch(() => setCandidates([]));
// }, []);

// useEffect(() => {
//   fetchJobs()
//     .then((data) => {
//       // ✅ Ensure jobs is ALWAYS an array
//       if (Array.isArray(data)) {
//         setJobs(data);
//       } else if (Array.isArray(data?.content)) {
//         setJobs(data.content);   // ✅ Spring pageable response
//       } else {
//         setJobs([]);             // ✅ fallback safety
//       }
//     })
//     .catch(() => setJobs([]));
// }, []);

useEffect(() => {
  fetchJobs()
    .then((data) => {
      if (Array.isArray(data)) {
        setJobs(data);
      } else if (Array.isArray(data?.content)) {
        setJobs(data.content); // Spring Pageable
      } else {
        setJobs([]);
      }
    })
    .catch(() => setJobs([]));
}, []);



  const [form, setForm] = useState({
    title: "",
    account: "",
    team: "",
    positions: 1,
    skills: "",
  });

  /* ✅ LOAD JOBS FROM BACKEND */
  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch(console.error);
  }, []);



// const saveJob = async () => {
//   if (!form.title || !form.account || !form.team) return;

//   const payload = {
//     title: form.title,
//     account: form.account,
//     team: form.team,
//     positions: Number(form.positions),
//     skills: form.skills
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean),
//       owner: userName,
//   };

//   try {
//     // ✅ EDIT MODE → UPDATE
//     if (editIndex !== null) {
//       const jobId = jobs[editIndex].id;

//       const updatedJob = await updateJob(jobId, payload);

//       setJobs((prev) =>
//         prev.map((j, i) => (i === editIndex ? updatedJob : j))
//       );
//     }
//     // ✅ CREATE MODE → CREATE
//     else {
//       const savedJob = await createJob(payload);

//       setJobs((prev) => [
//         savedJob,
//         ...(Array.isArray(prev) ? prev : []),
//       ]);
//     }

//     resetForm();
//   } catch (err) {
//     // ✅ DUPLICATE POPUP
//     setPopupMessage(
//   err.response?.data?.message || "Duplicate job already exists"
// );
//   }
// };


const saveJob = async () => {
  if (!form.title || !form.account || !form.team) return;

  const payload = {
    title: form.title,
    account: form.account,
    team: form.team,
    positions: Number(form.positions),
    skills: form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    owner: userName,
  };

  try {
    if (editIndex !== null) {
      // ✅ UPDATE
      const jobId = jobs[editIndex].id;
      const updatedJob = await updateJob(jobId, payload);

      setJobs((prev) =>
        prev.map((j, i) => (i === editIndex ? updatedJob : j))
      );

      setPopupMessage("Job updated successfully ✅");   // ✅ ADD THIS
    } else {
      // ✅ CREATE
      const savedJob = await createJob(payload);

      setJobs((prev) => [
        savedJob,
        ...(Array.isArray(prev) ? prev : []),
      ]);

      setPopupMessage("Job created successfully ✅");   // ✅ ADD THIS
    }

    resetForm();
  } catch (err) {
    setPopupMessage(
      err.response?.data?.message || "Duplicate job already exists"
    );
  }
};

  const resetForm = () => {
    setShowModal(false);
    setEditIndex(null);
    setSelectedJob(null);
    setForm({
      title: "",
      account: "",
      team: "",
      positions: 1,
      skills: "",
    });
  };

  /* ================= EDIT ================= */
  // const editJob = (job, index) => {
  //   setSelectedJob(null);
  //   setForm({
  //     title: job.title,
  //     account: job.account,
  //     team: job.team,
  //     // positions: job.positions.split("/")[1].split(" ")[0],
  //     positions: getTotalPositions(job.positions),
  //     // skills: job.skills.join(", "),
  //     skills: job.skills?.join(", ") || "",
  //   });
  //   setEditIndex(index);
  //   setShowModal(true);
  //   setOpenMenu(null);
  // };


  const editJob = (job, index) => {
  setSelectedJob(null);
  setForm({
    title: job.title,
    account: job.account,
    team: job.team,
    positions: getTotalPositions(job.positions),
    skills: job.skills?.join(", ") || "",
  });
  setEditIndex(index);
  setShowModal(true);
  setOpenMenu(null);
};
  /* ================= DELETE ================= */
  const deleteJob = async (jobId) => {
    await deleteJobApi(jobId);
    setJobs(jobs.filter((j) => j.id !== jobId));
    setOpenMenu(null);
  };

  // const filteredJobs = jobs.filter((job) =>
  //   `${job.title} ${job.account} ${job.team}`
  //     .toLowerCase()
  //     .includes(search.toLowerCase())
  // );

  const filteredJobs = (Array.isArray(jobs) ? jobs : []).filter((job) =>
  `${job.title} ${job.account} ${job.team}`
    .toLowerCase()
    .includes(search.toLowerCase())
);


  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Job Openings</h1>
          <p className="text-slate-500 mt-1">
            Manage recruitment requirements and positions
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedJob(null);
            setShowModal(true);
          }}
          className="bg-slate-950 text-white px-5 py-3 rounded-xl"
        >
          + Add New Job
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="w-full mt-6 bg-slate-100 px-4 py-3 rounded-xl"
        placeholder="Search jobs by title, account, or team..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* JOB CARDS */}
      <div className="mt-6 space-y-5">
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className="bg-white border rounded-2xl px-8 py-6 flex justify-between"
          >
            <div className="w-full">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-semibold">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => setSelectedJob(job)}
                  >
                    {job.title}
                  </span>
                </h2>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    job.status === "active"
                      ? "bg-slate-950 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-12 mt-5 text-slate-700">
                <div>
                  <p className="text-sm text-slate-400">Account</p>
                  <p>{job.account}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Team</p>
                  <p>{job.team}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Positions</p>
                 
<p>{job.positions}</p>



                </div>
                <div>
  <p className="text-sm text-slate-400">Owner</p>
  <p>{job.owner}</p>
</div>

                <div>
                  <p className="text-sm text-slate-400">Created</p>
                  <p>{job.createdDate}</p>
                </div>
              </div>

              {job.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 px-3 py-1 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 3 DOT MENU (UNCHANGED) */}
            <div className="relative">
              <button
                className="text-2xl"
                onClick={() =>
                  setOpenMenu(openMenu === index ? null : index)
                }
              >
                ⋮
              </button>

              {openMenu === index && (
                <div className="absolute right-0 top-8 bg-white border rounded-lg w-28 shadow">
                  <button
                    className="block w-full px-4 py-2 text-left hover:bg-slate-100"
                    onClick={() => editJob(job, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-left text-red-500 hover:bg-slate-100"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT JOB MODAL – UNCHANGED */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-2xl px-6 pt-5 pb-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {editIndex !== null ? "Edit Job" : "Create New Job Opening"}
              </h2>
              <span className="text-xl cursor-pointer" onClick={resetForm}>
                ×
              </span>
            </div>

            <div className="space-y-3">
              <input
                className="w-full h-11 px-4 bg-slate-100 rounded-xl"
                placeholder="Job Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              <input
                className="w-full h-11 px-4 bg-slate-100 rounded-xl"
                placeholder="Account"
                value={form.account}
                onChange={(e) =>
                  setForm({ ...form, account: e.target.value })
                }
              />
              <input
                className="w-full h-11 px-4 bg-slate-100 rounded-xl"
                placeholder="Team"
                value={form.team}
                onChange={(e) =>
                  setForm({ ...form, team: e.target.value })
                }
              />
              <input
                type="number"
                className="w-full h-11 px-4 bg-slate-100 rounded-xl"
                placeholder="Positions"
                value={form.positions}
                onChange={(e) =>
                  setForm({ ...form, positions: e.target.value })
                }
              />
              <input
                className="w-full h-11 px-4 bg-slate-100 rounded-xl"
                placeholder="Skills (comma separated)"
                value={form.skills}
                onChange={(e) =>
                  setForm({ ...form, skills: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={resetForm}
                className="flex-1 h-11 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={saveJob}
                className="flex-1 h-11 bg-slate-950 text-white rounded-xl"
              >
                {editIndex !== null ? "Update Job" : "Create Job"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JOB DETAILS */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* ✅ ERROR POPUP MODAL */}
{popupMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-blue-600 mb-3">
        Message
      </h3>

      <p className="text-slate-700 mb-6">
        {popupMessage}
      </p>

      <div className="flex justify-end">
        <button
          onClick={() => setPopupMessage("")}
          className="px-5 py-2 bg-slate-950 text-white rounded-xl"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
