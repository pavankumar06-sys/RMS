const BASE_URL = "http://localhost:8080/api/jobs";

/* ✅ GET ALL JOBS */
export const fetchJobs = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }
  return res.json();
};

/* ✅ CREATE JOB (POST) */
export const createJob = async (job) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error; // ✅ allow FE to show duplicate popup
  }

  return res.json();
};

/* ✅ UPDATE JOB (PUT)  ← THIS IS VERY IMPORTANT */
export const updateJob = async (id, job) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(job),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};

/* ✅ DELETE JOB */
export const deleteJobApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete job");
  }
};