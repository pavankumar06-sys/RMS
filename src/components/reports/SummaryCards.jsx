
import {
  FiUsers,
  FiTrendingUp,
  FiClock,
  FiXCircle,
} from "react-icons/fi";

const cards = [
  {
    label: "Total Candidates",
    key: "totalCandidates",
    icon: <FiUsers size={20} />,
    color: "bg-blue-500",
    mockValue: null, // ✅ REAL DB VALUE ONLY
    delta: null,
  },
  {
    label: "Success Rate",
    key: "successRate",
    suffix: "%",
    icon: <FiTrendingUp size={20} />,
    color: "bg-green-500",
    mockValue: 27,
    delta: "+3.2% vs last period",
  },
  {
    label: "Avg. Time to Hire",
    key: "avgTimeToHire",
    suffix: " days",
    icon: <FiClock size={20} />,
    color: "bg-purple-500",
    mockValue: 24,
    delta: "-2 days vs last period",
  },
  {
    label: "Drop-off Rate",
    key: "dropOffRate",
    suffix: "%",
    icon: <FiXCircle size={20} />,
    color: "bg-orange-500",
    mockValue: 72,
    delta: "-5% vs last period",
  },
];

export default function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const value =
          card.key === "totalCandidates"
            ? summary?.totalCandidates ?? "--"
            : card.mockValue;

        return (
          <div
            key={card.key}
            className="bg-white border rounded-xl p-6 flex justify-between items-start hover:shadow-lg transition-all"
          >
            {/* LEFT TEXT */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium">
                {card.label}
              </span>

              <span className="text-3xl font-semibold text-gray-900 mt-3">
                {value}
                {card.suffix || ""}
              </span>

              {card.delta && (
                <span className="text-sm text-green-600 font-medium mt-2 whitespace-nowrap">
                  {card.delta}
                </span>
              )}
            </div>

            {/* RIGHT ICON */}
            <div
              className={`${card.color} text-white p-3 rounded-lg flex items-center justify-center`}
            >
              {card.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
}
