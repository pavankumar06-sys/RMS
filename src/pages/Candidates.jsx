
import { useState, useEffect } from "react";
import { Plus, Upload, Search, MoreVertical } from "lucide-react";

import AddCandidateModal from "../components/AddCandidateModal";
import UploadResultModal from "../components/UploadResultModal";

import {
  fetchCandidates,
  addCandidateApi,
  updateCandidateApi,
  deleteCandidateApi,
} from "../api/candidateApi";

export default function Candidates() {
  const [modal, setModal] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
const [popupMessage, setPopupMessage] = useState("");


  // const [showSuccess, setShowSuccess] = useState(false);
  // ✅ LOAD CANDIDATES
  useEffect(() => {
    fetchCandidates().then(setCandidates).catch(console.error);
  }, []);


const filteredCandidates = candidates.filter((c) => {
  const term = searchTerm.toLowerCase();

  return (
    c.groupId?.toLowerCase().includes(term) ||
    c.firstName?.toLowerCase().includes(term) ||
    c.lastName?.toLowerCase().includes(term) ||
    c.position?.toLowerCase().includes(term) ||
    c.grade?.toLowerCase().includes(term) ||
    c.type?.toLowerCase().includes(term) || // Practice / NGT
    c.email?.toLowerCase().includes(term) || 
    c.phone?.toLowerCase().includes(term)
  );
});


  // ✅ ADD / EDIT
  // const handleSaveCandidate = async (candidate) => {
  //   try {
  //     if (modal === "edit") {
  //       const saved = await updateCandidateApi(candidate.id, candidate);
  //       setCandidates((prev) =>
  //         prev.map((c) => (c.id === saved.id ? saved : c))
  //       );
  //     } else {
  //       const saved = await addCandidateApi(candidate);
  //       setCandidates((prev) => [...prev, saved]);
  //     }
  //     setModal(null);
  //     setSelectedIndex(null);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  const handleSaveCandidate = async (candidate) => {
  try {
    if (modal === "edit") {
      const saved = await updateCandidateApi(candidate.id, candidate);

      setCandidates((prev) =>
        prev.map((c) => (c.id === saved.id ? saved : c))
      );

      setPopupMessage("Candidate updated successfully ✅");   // ✅ ADD
    } else {
      const saved = await addCandidateApi(candidate);

      setCandidates((prev) => [...prev, saved]);

      setPopupMessage("Candidate created successfully ✅");   // ✅ ADD
    }

    setModal(null);
    setSelectedIndex(null);

  } catch (err) {
    console.error(err);

    setPopupMessage(
      err.response?.data?.message || "Something went wrong"
    );
  }
};
  // ✅ AFTER UPLOAD
  const handleUploadSuccess = async () => {
    const data = await fetchCandidates();
    setCandidates(data);
  };

  // ✅ CONFIRMED DELETE
  const confirmDelete = async () => {
    try {
      await deleteCandidateApi(deleteId);
      setCandidates((prev) => prev.filter((c) => c.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // <div className="p-6 space-y-6">
    <div className="p-6 flex flex-col h-full pr-10">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Candidates</h1>
          <p className="text-sm text-gray-500">
            Manage candidate pipeline and progression
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setModal("upload")}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
          >
            <Upload size={16} />
            Bulk Upload
          </button>

          <button
            onClick={() => setModal("add")}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
          >
            <Plus size={16} />
            Add Candidate
          </button>
        </div>
      </div>

      {/* SEARCH */}
<div className="relative">
  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
  <input
    placeholder="Search by Group ID, Name, Position, Grade, Practice, Email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-10 p-3 bg-gray-100 rounded-lg"
  />
</div>


      {/* TABLE */}
     {/* <div className="bg-white border rounded-xl overflow-visible"> */}
     <div className="flex-1 bg-white border rounded-xl overflow-y-auto pr-10">
  <table className="w-full text-sm">
    <thead className="bg-gray-50 border-b">
      <tr className="uppercase text-xs text-gray-600">
        <th className="px-4 py-3 text-left">Group ID</th>
        <th className="px-4 py-3 text-left">First Name</th>
        <th className="px-4 py-3 text-left">Last Name</th>
        <th className="px-4 py-3 text-left">Position</th>
        <th className="px-4 py-3 text-left">Grade</th>
        <th className="px-4 py-3 text-left whitespace-nowrap">
          Practice / NGT
        </th>

        <th className="px-4 py-3 text-left">Email</th>
        <th className="px-4 py-3 text-left">Phone</th>
        <th className="px-4 py-3"></th>
      </tr>
    </thead>

    <tbody>
  {filteredCandidates.length === 0 ? (
    <tr>
      <td
        colSpan={8}
        className="text-center py-6 text-gray-400 text-sm"
      >
        Candidate details not found
      </td>
    </tr>
  ) : (
    filteredCandidates.map((c, i) => (
      <tr key={c.id} className="border-b hover:bg-gray-50 transition">

        {/* ✅ GROUP ID (Highlighted) */}
        <td className="px-4 py-4">
          <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
            {c.groupId}
          </span>
        </td>

        {/* ✅ FIRST NAME */}
        <td className="px-4 py-4 font-semibold text-gray-900">
          {c.firstName}
        </td>

        {/* ✅ LAST NAME */}
        <td className="px-4 py-4 font-semibold text-gray-900">
          {c.lastName}
        </td>

        {/* ✅ POSITION */}
        <td
          className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]"
          title={c.position}
        >
          {c.position}
        </td>

        {/* ✅ GRADE */}
        <td className="px-4 py-4">
          <span className="px-2 py-1 text-xs rounded bg-gray-100 font-medium">
            {c.grade}
          </span>
        </td>

        {/* ✅ TYPE */}
        <td className="px-4 py-4 font-medium">
          {c.type}
        </td>

        {/* ✅ EMAIL */}
        <td
          className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis"
          title={c.email}
        >
          {c.email}
        </td>
        <td
        className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap"
      >
        {c.phone || "—"}   {/* ✅ Optional field */}
      </td>

        {/* ACTION MENU */}
        <td className="px-4 py-4 relative">
          <button
            onClick={() =>
              setMenuIndex(menuIndex === i ? null : i)
            }
            className="p-1 rounded hover:bg-gray-200"
          >
            <MoreVertical size={16} />
          </button>

          {menuIndex === i && (
            <div className="absolute right-0 mt-2 w-28 bg-white border rounded-lg shadow-md z-50">
              <button
                onClick={() => {
                  setSelectedIndex(i);
                  setModal("edit");
                  setMenuIndex(null);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setDeleteId(c.id);
                  setMenuIndex(null);
                }}
                className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
  </table>
</div>

      {/* ADD / EDIT / UPLOAD MODALS */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl rounded-2xl p-6">
            {(modal === "add" || modal === "edit") && (
              <AddCandidateModal
                initialData={modal === "edit" ? candidates[selectedIndex] : null}
                onAdd={handleSaveCandidate}
                onClose={() => setModal(null)}
              />
            )}

         {modal === "upload" && (
          <UploadResultModal
            onClose={() => setModal(null)}
            onUploadSuccess={() => {
              handleUploadSuccess();   // reload candidates
              setModal(null);          // close modal
              setShowSuccess(true);    // ✅ SHOW POPUP
            }}
          />
        )}
          </div>
         
        </div>
        
      )}

      {popupMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    
    <div className="bg-white w-[400px] rounded-2xl p-6 shadow-xl">

      <h3 className={`text-lg font-semibold mb-3 ${
        popupMessage.includes("successfully")
          ? "text-green-600"
          : "text-red-600"
      }`}>
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
      

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-sm">
            <div className="p-5 border-b">
              <h2 className="text-lg font-semibold">Delete Candidate</h2>
            </div>

            <div className="p-5 text-sm text-gray-600">
              Are you sure you want to delete this candidate?
            </div>

            <div className="p-5 border-t flex justify-end gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
  <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
    ✅ File uploaded successfully
    <button
      className="ml-4 font-bold"
      onClick={() => setShowSuccess(false)}
    >
      ×
    </button>
  </div>
)}

    </div>
  );
}
