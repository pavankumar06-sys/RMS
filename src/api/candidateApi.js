const BASE_URL = "http://localhost:8080/api/candidates";

// 🔹 GET all candidates
export const fetchCandidates = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch candidates");
  return res.json();
};

// 🔹 ADD candidate
export const addCandidateApi = async (candidate) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  if (!res.ok) throw new Error("Failed to add candidate");
  return res.json();
};

// 🔹 UPDATE candidate
export const updateCandidateApi = async (id, candidate) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(candidate),
  });
  if (!res.ok) throw new Error("Failed to update candidate");
  return res.json();
};

// 🔹 DELETE candidate
export const deleteCandidateApi = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete candidate");
};

// ✅ Upload Excel file to backend
export const uploadCandidatesExcel = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:8080/api/candidates/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload Excel");
  }

  return res.json(); // returns saved candidates
};