import api from "./api";

/* ✅ GET ALL MEETINGS */
export const fetchMeetings = async () => {
  const res = await api.get("/api/interviews");
  return res.data;
};

/* ✅ CREATE / SCHEDULE MEETING */
export const createMeeting = async (meeting) => {
  const payload = {
    candidateName: meeting.candidateName,
    position: meeting.position,
    email: meeting.email,
    interviewType: meeting.interviewType,
    interviewDate: meeting.date,
    interviewTime: meeting.time,
    durationMinutes: meeting.duration,
    location: meeting.location,
    interviewer: meeting.interviewer,
  };

  await api.post("/api/interviews", payload);
};

/* ✅ CANCEL MEETING */
export const cancelMeeting = async (id) => {
  await api.patch(`/api/interviews/${id}/cancel`);
};



// ✅ DELETE meeting (HARD DELETE)
export const deleteMeeting = async (id) => {
  await api.delete(`/api/interviews/${id}`);
};


export const updateMeeting = async (id, meeting) => {
  const payload = {
    candidateName: meeting.candidateName,
    position: meeting.position,
    email: meeting.email,
    interviewType: meeting.interviewType,
    interviewDate: meeting.date,
    interviewTime: meeting.time,
    durationMinutes: meeting.duration,
    location: meeting.location,
    interviewer: meeting.interviewer,
  };

  await api.put(`/api/interviews/${id}`, payload);
};