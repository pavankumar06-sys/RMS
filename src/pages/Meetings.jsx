
import { useState, useEffect } from "react";
import { Clock, Video, MoreVertical, Send, X } from "lucide-react";
import ScheduleMeeting from "./ScheduleMeeting";
import { useLocation } from "react-router-dom";

import {
  fetchMeetings,
  createMeeting,
  cancelMeeting,
  deleteMeeting,
  updateMeeting,
  
} from "../api/meetingApi";

export default function Meetings() {
  const [open, setOpen] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const [sentStatus, setSentStatus] = useState({});
  const [confirmIndex, setConfirmIndex] = useState(null);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [cancelMessage, setCancelMessage] = useState(false);

  const location = useLocation();
  const navCandidate = location.state?.candidate;
  const { candidate, source } = location.state || {};

  const [prefillCandidate, setPrefillCandidate] = useState(null);

  const [popupMessage, setPopupMessage] = useState("");
  // ✅ LOAD FROM BACKEND
  useEffect(() => {
    fetchMeetings().then(setMeetings).catch(console.error);
  }, []);

  useEffect(() => {
  if (navCandidate) {
    setOpen(true);              // ✅ open Schedule modal
    setEditingIndex(null);      // ✅ new meeting
    window.history.replaceState({}, document.title);
  }
}, [navCandidate]);

useEffect(() => {
  if (popupMessage) {
    const timer = setTimeout(() => {
      setPopupMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [popupMessage]);


useEffect(() => {
  if (navCandidate) {
    setPrefillCandidate(navCandidate);   // ✅ store once
    setOpen(true);
    setEditingIndex(null);

    // ✅ Clear navigation state immediately
    window.history.replaceState({}, document.title);
  }
}, [navCandidate]);


const handleAddOrUpdate = async (meeting) => {
  try {
    if (editingIndex !== null) {
      // ✅ UPDATE CASE
      const id = meetings[editingIndex].id;

      await updateMeeting(id, meeting);   // ✅ you MISSED THIS API

      setPopupMessage("Meeting updated successfully ✅");
    } else {
      // ✅ CREATE CASE
      await createMeeting(meeting);

      
      setTimeout(() => {
        setPopupMessage("Meeting scheduled successfully ✅");
      }, 200)

    }

    const data = await fetchMeetings();
    setMeetings(data);

    setEditingIndex(null);
    setOpen(false);

  } catch (err) {
    console.error(err);
    setPopupMessage("Failed to save meeting");
  }
};


  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
    setMenuIndex(null);
  };

// const handleDelete = async (index) => {
//   if (!window.confirm("Are you sure you want to delete this meeting?")) return;

//   try {
//     const id = meetings[index].id;   // ✅ backend ID
//     await deleteMeeting(id);         // ✅ DELETE API
//     const data = await fetchMeetings();
//     setMeetings(data);               // ✅ refresh UI
//     setMenuIndex(null);
//   } catch (err) {
//     console.error("Failed to delete meeting", err);
//   }
// };


const handleDelete = (index) => {
  setMenuIndex(null);     // close menu
  setDeleteIndex(index); // ✅ open confirmation modal
};

useEffect(() => {  if (cancelMessage) {
    const t = setTimeout(() => setCancelMessage(false), 3000);
    return () => clearTimeout(t);
  }
}, [cancelMessage]);



// const confirmDeleteMeeting = async () => {
//   try {
//     const id = meetings[deleteIndex]?.id;
//     if (!id) return;

//     await deleteMeeting(id);          // DELETE API
//     const data = await fetchMeetings();
//     setMeetings(data);

//     setCancelMessage(true);           // ✅ SHOW RED MESSAGE
//   } catch (err) {
//     console.error("Failed to cancel meeting", err);
//   } finally {
//     setDeleteIndex(null);             // close modal
//   }
// };


const confirmDeleteMeeting = async () => {
  try {
    const id = meetings[deleteIndex]?.id;
    if (!id) return;

    await deleteMeeting(id);

    const data = await fetchMeetings();
    setMeetings(data);

    setPopupMessage("Meeting cancelled successfully ✅");   // ✅ CHANGE

  } catch (err) {
    console.error("Failed to cancel meeting", err);
    setPopupMessage("Failed to cancel meeting");
  } finally {
    setDeleteIndex(null);
  }
};

//   const confirmSendMeeting = () => {
//   setSentStatus((prev) => ({
//     ...prev,
//     [confirmIndex]: true, // ✅ correct key-value
//   }));
//   setConfirmIndex(null);
// };


const confirmSendMeeting = () => {
  setSentStatus((prev) => ({
    ...prev,
    [confirmIndex]: true,
  }));

  setPopupMessage("Meeting email sent successfully ✅");   // ✅ ADD
  setConfirmIndex(null);
};




  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Meeting Schedule</h1>
          <p className="text-sm text-gray-500">
            Manage interviews and assessments
          </p>
        </div>

        <button
          onClick={() => {
            setEditingIndex(null);
            setPrefillCandidate(null);
            setOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          + Schedule Meeting
        </button>
      </div>

      {/* Meetings List */}
      <div className="bg-white border rounded-xl p-5 space-y-4">
        <h2 className="text-lg font-semibold">Upcoming Meetings</h2>

        {meetings.length === 0 ? (
          <p className="text-gray-400">No meetings scheduled yet.</p>
        ) : (
          meetings.map((m, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 flex justify-between relative"
            >
              {/* LEFT CONTENT */}
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-base">
                    {m.candidateName}
                  </h3>
                  <p className="text-sm text-gray-600">{m.position}</p>
                  <p className="text-xs text-gray-400">{m.email}</p>
                </div>

                <div className="flex gap-2 items-center pt-2">
                  <h4 className="font-medium">{m.interviewType}</h4>
                  <span className="text-xs px-2 py-1 border rounded-full">
                    {m.durationMinutes} min
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  {m.interviewDate} at {m.interviewTime}
                </p>

                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Video size={14} /> {m.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {m.interviewer}
                  </span>
                </div>
              </div>

              <div className="absolute right-12 top-4">
                {!sentStatus[index] ? (
                  <button
                    onClick={() => setConfirmIndex(index)}
                    className="bg-black text-white px-3 py-1.5 rounded-lg text-sm flex gap-2"
                  >
                    <Send size={14} />
                    Send Meeting
                  </button>
                ) : (
                  <span className="text-green-600 font-medium text-sm">
                    ✅ Meeting Schedule Sent
                  </span>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() =>
                    setMenuIndex(menuIndex === index ? null : index)
                  }
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <MoreVertical size={18} />
                </button>

                {menuIndex === index && (
                  <div className="absolute right-0 mt-2 bg-white border rounded shadow w-32 z-20">
                    <button
                      onClick={() => handleEdit(index)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {Object.values(sentStatus).includes(true) && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            Meeting schedule email sent successfully.
          </div>
        )}
      </div>

      {/* CONFIRM SEND MODAL */}
      {confirmIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[520px] rounded-2xl p-6 relative">
            <button
              onClick={() => setConfirmIndex(null)}
              className="absolute right-4 top-4 text-gray-400"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-semibold mb-6">
              Send Meeting Schedule
            </h2>

            <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6 text-sm">
              <p><b>Candidate:</b> {meetings[confirmIndex]?.candidateName}</p>
              <p><b>Position:</b> {meetings[confirmIndex]?.position}</p>
              <p><b>Email:</b> {meetings[confirmIndex]?.email}</p>
              <hr />
              <p><b>Interview:</b> {meetings[confirmIndex]?.interviewType}</p>
              <p><b>Date & Time:</b> {meetings[confirmIndex]?.interviewDate} at {meetings[confirmIndex]?.interviewTime}</p>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmIndex(null)}
                className="px-6 py-3 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendMeeting}
                className="px-8 py-3 bg-black text-white rounded-xl"
              >
                Send Meeting
              </button>
            </div>
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
          className="px-5 py-2 bg-black text-white rounded-xl"
        >
          OK
        </button>
      </div>

    </div>
  </div>
)}


      {/* Schedule Meeting Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden">
            <div className="overflow-y-auto max-h-[90vh] p-6">
           
          
         {/* <ScheduleMeeting
  initialData={
    editingIndex !== null ? meetings[editingIndex] : null
  }
  navCandidate={navCandidate}   // ✅ pass separately
  onSchedule={handleAddOrUpdate}
  onClose={() => {
    setOpen(false);
    setEditingIndex(null);
  }}
/> */}

      <ScheduleMeeting
        key={editingIndex !== null ? editingIndex : "new"}  // ✅ FORCE RESET
        initialData={
          editingIndex !== null ? meetings[editingIndex] : null
        }
        prefillCandidate={prefillCandidate}
        onSchedule={handleAddOrUpdate}
        onClose={() => {
          setOpen(false);
          setEditingIndex(null);
          setPrefillCandidate(null);
        }}
      />


            </div>
          </div>
        </div>
      )}

      {/* ✅ DELETE CONFIRMATION MODAL */}
{deleteIndex !== null && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[480px] rounded-2xl p-6 relative">

      <button
        onClick={() => setDeleteIndex(null)}
        className="absolute right-4 top-4 text-gray-400"
      >
        <X size={18} />
      </button>

      <h2 className="text-xl font-semibold mb-4">
        Confirm Cancel Meeting
      </h2>

      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to cancel this meeting?
        This action cannot be undone.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 text-sm mb-6">
        <p><b>Candidate:</b> {meetings[deleteIndex]?.candidateName}</p>
        <p><b>Position:</b> {meetings[deleteIndex]?.position}</p>
        <p><b>Date:</b> {meetings[deleteIndex]?.interviewDate}</p>
        <p><b>Time:</b> {meetings[deleteIndex]?.interviewTime}</p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => setDeleteIndex(null)}
          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={confirmDeleteMeeting}
          className="px-6 py-2 bg-red-600 text-white rounded-lg"
        >
          Yes, Cancel Meeting
        </button>
      </div>

    </div>
  </div>
)}

{cancelMessage && (
  <div className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center">
    ❌ Meeting Cancelled
    <button
      onClick={() => setCancelMessage(false)}
      className="ml-4 font-bold"
    >
      ×
    </button>
  </div>
)}

    </div>
  );
}