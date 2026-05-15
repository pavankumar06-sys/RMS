
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


export default function ScheduleMeeting({
  onClose,
  onSchedule,
  prefillCandidate,
  initialData,
}) {
  
const EMPTY_FORM = {
  candidateName: "",
  position: "",
  email: "",
  interviewType: "Level 1 Assessment",
  date: "",
  endDate: "", 
  time: "",

  duration: 60,
  location: "",
  interviewer: "",
};

  const [form, setForm] = useState(EMPTY_FORM);

  // const [isEditMode, setIsEditMode] = useState(false);
 
  const [errors, setErrors] = useState({});



// useEffect(() => {
//   if (initialData) {
//     // ✅ EDIT MODE
//     setForm({
//       candidateName: initialData.candidateName || "",
//       position: initialData.position || "",
//       email: initialData.email || "",
//       interviewType: initialData.interviewType || "Level 1 Assessment",
//       date: initialData.interviewDate || "",
//       endDate: initialData.endDate || "",
//       time: initialData.interviewTime || "",
//       duration: initialData.durationMinutes || 60,
//       location: initialData.location || "",
//       interviewer: initialData.interviewer || "",
//     });

//   } else if (navCandidate) {
//     // ✅ FROM CANDIDATE PAGE
//     setForm({
//       ...EMPTY_FORM,
//       candidateName: `${navCandidate.firstName} ${navCandidate.lastName}`,
//       position: navCandidate.position || "",
//       email: navCandidate.email || "",
//     });

//   } else {
//     // ✅ CLEAN RESET (VERY IMPORTANT)
//     setForm(EMPTY_FORM);
//   }
// }, [initialData, navCandidate]);


useEffect(() => {
  if (initialData) {
    // ✅ EDIT MODE
    setForm({
      candidateName: initialData.candidateName || "",
      position: initialData.position || "",
      email: initialData.email || "",
      interviewType: initialData.interviewType || "Level 1 Assessment",
      date: initialData.interviewDate || "",
      endDate: initialData.endDate || "",
      time: initialData.interviewTime || "",
      duration: initialData.durationMinutes || 60,
      location: initialData.location || "",
      interviewer: initialData.interviewer || "",
    });

  } else if (prefillCandidate) {
    // ✅ FROM CANDIDATE PAGE
    setForm({
      ...EMPTY_FORM,
      candidateName: `${prefillCandidate.firstName} ${prefillCandidate.lastName}`,
      position: prefillCandidate.position || "",
      email: prefillCandidate.email || "",
    });

  } else {
    // ✅ CLEAN RESET
    setForm(EMPTY_FORM);
  }
}, [initialData, prefillCandidate]);


  const today = new Date().toISOString().split("T")[0];
const isEdit = Boolean(initialData);
  const generateTimes = () => {
    const times = [];
    for (let hour = 9; hour <= 20; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const h = String(hour).padStart(2, "0");
        const m = String(min).padStart(2, "0");
        times.push(`${h}:${m}`);
      }
    }
    return times;
  };

  const timeOptions = generateTimes();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  /* ✅ VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!form.candidateName.trim())
      newErrors.candidateName = "Candidate name is required";

    if (!form.position.trim())
      newErrors.position = "Position is required";

    if (!form.email.trim())
      newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.date)
      newErrors.date = "Date is required";
    else if (form.date < today)
      newErrors.date = "Past dates are not allowed";

    if (!form.time)
      newErrors.time = "Time is required";

    if (!form.location.trim())
      newErrors.location = "Location is required";

    if (!form.interviewer.trim())
      newErrors.interviewer = "Interviewer is required";

    if (form.interviewType === "Level 1 Hacker Rank") {
  if (!form.endDate)
    newErrors.endDate = "End date is required for Hacker Rank";
  else if (form.endDate < form.date)
    newErrors.endDate = "End date must be after start date";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = () => {
  //   if (!validateForm()) return;
  //   onSchedule(form);
  //   setForm(EMPTY_FORM);
    
  // };


  const handleSubmit = () => {
  if (!validateForm()) return;

  const payload = {
    ...form,
    interviewDate: form.date,
    interviewTime: form.time,
    durationMinutes: form.duration,
  };

  onSchedule(payload);
  setForm(EMPTY_FORM);
};


  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Meeting" : "Schedule New Meeting"}
      </h2>

      {/* Candidate Name */}
      <div>
        <label className="text-sm font-medium">Candidate Name</label>
        <input
          name="candidateName"
          value={form.candidateName}
          onChange={handleChange}
          placeholder="John Doe"
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.candidateName ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.candidateName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.candidateName}
          </p>
        )}
      </div>

      {/* Position */}
      <div>
        <label className="text-sm font-medium">Position</label>
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Software Engineer"
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.position ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.position && (
          <p className="text-red-500 text-xs mt-1">
            {errors.position}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">
            {errors.email}
          </p>
        )}
      </div>

      {/* Interview Type */}
      <div>
        <label className="text-sm font-medium">Interview Type</label>
        <select
          name="interviewType"
          value={form.interviewType}
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
        >
          <option>Select Interview Type</option>
          <option>Level 1 Hacker Rank</option>
          <option>Level 2 Technical Interview</option>
          <option>Level 3 Client Interview</option>
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="text-sm font-medium">Date</label>
        <input
          type="date"
          name="date"
          min={today}
          value={form.date}
          onChange={handleChange}
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.date ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">
            {errors.date}
          </p>
        )}
      </div>
      {/* ✅ End Date – Only for HackerRank */}
{form.interviewType === "Level 1 Hacker Rank" && (
  <div>
    <label className="text-sm font-medium">End Date</label>
    <input
      type="date"
      name="endDate"
      min={form.date}
      value={form.endDate}
      onChange={handleChange}
      className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
        ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
    />
    {errors.endDate && (
      <p className="text-red-500 text-xs mt-1">
        {errors.endDate}
      </p>
    )}
  </div>
)}

      {/* Time */}
      <div>
        <label className="text-sm font-medium">Time</label>
        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.time ? "border-red-500" : "border-gray-300"}`}
        >
          <option value="">Select time</option>
          {timeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.time && (
          <p className="text-red-500 text-xs mt-1">
            {errors.time}
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="text-sm font-medium">Duration (minutes)</label>
        <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
        >
          <option value={30}>30 minutes</option>
          <option value={45}>45 minutes</option>
          <option value={60}>60 minutes</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-medium">Location</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Video Call or Room Name"
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.location ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">
            {errors.location}
          </p>
        )}
      </div>

      {/* Interviewer */}
      <div>
        <label className="text-sm font-medium">Interviewer</label>
        <input
          name="interviewer"
          value={form.interviewer}
          onChange={handleChange}
          placeholder="Interviewer Name"
          className={`w-full mt-1 p-3 rounded-lg bg-gray-50 border
            ${errors.interviewer ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.interviewer && (
          <p className="text-red-500 text-xs mt-1">
            {errors.interviewer}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          // onClick={onClose}
          
          onClick={() => {
              setForm(EMPTY_FORM); // ✅ reset
              onClose();
          }}

          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-black text-white rounded-lg"
        >
          {isEdit ? "Update Meeting" : "Schedule Meeting"}
        </button>
      </div>
    </div>
  );
}


