
import { useState } from "react";
import { Upload } from "lucide-react";
import { uploadCandidatesExcel } from "../api/candidateApi";

export default function UploadResultModal({ onClose, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");          // ✅ NEW
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setInfo("");
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Please select an Excel file");
      return;
    }

    try {
      setLoading(true);

      const result = await uploadCandidatesExcel(file);

      if (result.length > 0) {
        // ✅ Some candidates inserted
        setInfo(
          `${result.length} candidate(s) added successfully. 
           Duplicate emails were automatically skipped.`
        );

        onUploadSuccess();   // refresh table
        setTimeout(onClose, 1200);

      } else {
        // ✅ All rows skipped (duplicate emails)
        setError(
          "No new candidates added. All records already exist (duplicate emails)."
        );
      }

    } catch (err) {
      console.error(err);
      setError(
        "Upload failed. Please check the Excel format and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Upload Candidate Excel
        </h2>
        <button onClick={onClose} className="text-xl">×</button>
      </div>

      {/* ✅ INFO MESSAGE */}
      {info && (
        <div className="bg-green-50 text-green-700 p-3 rounded text-sm">
          {info}
        </div>
      )}

      {/* ✅ ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
          {error}
        </div>
      )}

      {/* ✅ GUIDELINES */}
      <div className="text-sm text-gray-600 text-center">
        {/* <p className="mb-1">
          • Duplicate emails are skipped automatically
        </p>
        <p className="mb-1">
          • Group ID is auto‑generated if missing (0000XXXX)
        </p>
        <p className="mb-2">
          • Phone number is optional
        </p> */}
         <p className="mb-2">
          Download sample Excel template before uploading.
        </p>

        <a
          href="/template/candidate_upload_template.xlsx"
          download
          className="text-blue-600 underline"
        >
          Download Sample Excel Template
        </a>
      </div>

      {/* FILE DROP */}
      <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center text-center text-gray-500">
        <Upload size={32} />
        <p className="mt-3">Upload Excel file (.xls / .xlsx)</p>

        <label className="mt-4 bg-white border px-4 py-2 rounded cursor-pointer">
          Choose File
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <p className="mt-2 text-sm text-black">
            Selected: {file.name}
          </p>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="w-1/2 border py-2 rounded-lg"
          disabled={loading}
        >
          Cancel
        </button>

        <button
          onClick={handleProcess}
          className="w-1/2 bg-black text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Uploading…" : "Process Results"}
        </button>
      </div>
    </div>
  );
}