import { CheckCircle, Clock, XCircle } from "lucide-react";

const candidates = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    stage: "Level 3",
    status: "success",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    stage: "Grooming",
    status: "in-progress",
    initials: "MC",
  },
  {
    name: "Emma Williams",
    role: "UX Designer",
    stage: "Level 2",
    status: "success",
    initials: "EW",
  },
  {
    name: "James Brown",
    role: "DevOps Engineer",
    stage: "Level 1",
    status: "failed",
    initials: "JB",
  },
  {
    name: "Lisa Anderson",
    role: "Product Manager",
    stage: "Level 3",
    status: "success",
    initials: "LA",
  },
];

export default function RecentCandidates() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-semibold mb-6">Recent Candidates</h3>

      <div className="space-y-6">
        {candidates.map((c) => (
          <div
            key={c.name}
            className="flex justify-between items-center pb-6 border-b last:border-b-0"
          >
            {/* Left section */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold">
                {c.initials}
              </div>
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.role}</p>
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{c.stage}</span>
              {c.status === "success" && (
                <CheckCircle className="text-green-500" size={20} />
              )}
              {c.status === "in-progress" && (
                <Clock className="text-orange-500" size={20} />
              )}
              {c.status === "failed" && (
                <XCircle className="text-red-500" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}