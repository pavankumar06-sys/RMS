// import { useState, useEffect } from "react";

// export default function AddCandidate({ onClose, onAdd, initialData }) {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     position: "",
//     source: "GTD",
//     practice: "Practice 1",
//     type: "Bench",
//     stage: "Level 1",
//     status: "Pending",
//     applied: "",
//   });

//   // ✅ Load data for EDIT (3 dots)
//   useEffect(() => {
//     if (initialData) {
//       setForm(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onAdd({
//       ...form,
//       // ✅ keep selected date OR fallback to today
//       applied:
//         form.applied ||
//         new Date().toLocaleDateString("en-GB"), // dd/mm/yyyy
//     });
//     onClose();
//   };

//   return (
//     <div className="space-y-5">
//       <h2 className="text-xl font-semibold">
//         {initialData ? "Edit Candidate" : "Add New Candidate"}
//       </h2>

//       <input
//         name="name"
//         value={form.name}
//         placeholder="Candidate Name"
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       />

//       <input
//         name="email"
//         value={form.email}
//         placeholder="Email"
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       />

//       <input
//         name="position"
//         value={form.position}
//         placeholder="Position"
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       />

//       {/* Source */}
//       <select
//         name="source"
//         value={form.source}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       >
//         <option>GTD</option>
//         <option>Talentio</option>
//         <option>Referral</option>
//       </select>

//       {/* Practice */}
//       <select
//         name="practice"
//         value={form.practice}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       >
//         <option>Practice 1</option>
//         <option>Practice 2</option>
//         <option>Practice 3</option>
//       </select>

//       {/* Type */}
//       <select
//         name="type"
//         value={form.type}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       >
//         <option>Bench</option>
//         <option>Rotation</option>
//       </select>

//       {/* ✅ Applied Date */}
//       <input
//         type="date"
//         name="applied"
//         value={form.applied || ""}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       />

//       {/* Stage */}
//       <select
//         name="stage"
//         value={form.stage}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       >
//         <option>Level 1</option>
//         <option>Level 2</option>
//         <option>Level 3</option>
//         <option>Grooming</option>
//       </select>

//       {/* Status */}
//       <select
//         name="status"
//         value={form.status}
//         onChange={handleChange}
//         className="w-full p-3 border rounded"
//       >
//         <option>Pending</option>
//         <option>Pass</option>
//         <option>Fail</option>
//       </select>

//       <div className="flex justify-end gap-4 pt-4">
//         <button onClick={onClose} className="border px-4 py-2 rounded">
//           Cancel
//         </button>

//         <button
//           onClick={handleSubmit}
//           className="bg-black text-white px-4 py-2 rounded"
//         >
//           {initialData ? "Update Candidate" : "Add Candidate"}
//         </button>
//       </div>
//     </div>
//   );
// }