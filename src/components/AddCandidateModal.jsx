

import { useState, useEffect } from "react";

export default function AddCandidateModal({
  onClose,
  onAdd,
  initialData,
}) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    id: null,
    groupId: "",
    firstName: "",
    lastName: "",
    position: "",
    grade: "A4",
    type: "Bench",
    email: "",
    phone: "",          // ✅ ADD
    skills: "",
  });

  const [errors, setErrors] = useState({});

  /* ✅ PREFILL DATA WHEN EDITING */
  useEffect(() => {
    if (isEdit) {
      setForm({
        id: initialData.id,
        groupId: initialData.groupId || "",
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        position: initialData.position || "",
        grade: initialData.grade || "A4",
        type: initialData.type || "Bench",
        email: initialData.email || "",
        phone: initialData.phone || "",     // ✅ FIX
        skills: initialData.skills
          ? initialData.skills.join(", ")
          : "",
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ✅ VALIDATION (phone is OPTIONAL) */
  const validate = () => {
    const err = {};

    Object.keys(form).forEach((key) => {
      if (
        key !== "id" &&
        key !== "phone" &&        // ✅ EXCLUDE PHONE
        key !== "groupId" &&
        !form[key]
      ) {
        err[key] = "Required";
      }
    });

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = "Invalid email";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onAdd({
      ...form,
      skills: form.skills
        ? form.skills.split(",").map((s) => s.trim())
        : [],
    });
  };

  const inputClass = (name) =>
    `w-full mt-1 p-3 bg-gray-100 rounded-lg
     outline-none focus:ring-0
     border ${errors[name] ? "border-red-500" : "border-transparent"}`;

  return (
    <div className="flex flex-col max-h-[90vh]">

      {/* HEADER */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Update Candidate" : "Add New Candidate"}
        </h2>
        <button onClick={onClose} className="text-xl">×</button>
      </div>

      {/* BODY */}
      <div className="px-6 py-4 space-y-5 overflow-y-auto">

        {[
          { label: "Group ID", name: "groupId" },
          { label: "First Name", name: "firstName" },
          { label: "Last Name", name: "lastName" },
          { label: "Position", name: "position" },
        ].map((f) => (
          <div key={f.name}>
            <label className="font-medium text-sm">
              {f.label} <span className="text-red-500">*</span>
            </label>
            <input
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              className={inputClass(f.name)}
            />
            {errors[f.name] && (
              <p className="text-red-500 text-xs mt-1">Required</p>
            )}
          </div>
        ))}

        {/* ✅ PHONE (OPTIONAL) */}
        <div>
          <label className="font-medium text-sm">
            Phone Number <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className={inputClass("phone")}
          />
        </div>

        {/* GRADE */}
        <div>
          <label className="font-medium text-sm">
            LOCAL_GRADE <span className="text-red-500">*</span>
          </label>
          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            className={inputClass("grade")}
          >
            <option>A4</option>
            <option>A5</option>
          </select>
        </div>

        {/* TYPE */}
        <div>
          <label className="font-medium text-sm">
            Practice / Type / NGT <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className={inputClass("type")}
          >
            <option>Bench</option>
            <option>Rotation</option>
            <option>NGT</option>
          </select>
        </div>

        {/* EMAIL */}
        <div>
          <label className="font-medium text-sm">
            Associate Email ID <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* SKILLS */}
        <div>
          <label className="font-medium text-sm">
            Skills (comma separated) <span className="text-red-500">*</span>
          </label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Java, Spring Boot"
            className={inputClass("skills")}
          />
          {errors.skills && (
            <p className="text-red-500 text-xs mt-1">Required</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 border-t flex gap-4">
        <button
          onClick={onClose}
          className="w-1/2 border py-2 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-1/2 bg-black text-white py-2 rounded-lg"
        >
          {isEdit ? "Update Candidate" : "Add Candidate"}
        </button>
      </div>
    </div>
  );
}