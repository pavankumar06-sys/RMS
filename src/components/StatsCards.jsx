import { Users, Briefcase, UserCheck, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Candidates",
    value: "248",
    change: "+12% this month",
    icon: Users,
    bg: "bg-blue-500",
  },
  {
    title: "Active Jobs",
    value: "18",
    change: "+3 this month",
    icon: Briefcase,
    bg: "bg-green-500",
  },
  {
    title: "Onboarding",
    value: "12",
    change: "+5 this month",
    icon: UserCheck,
    bg: "bg-purple-500",
  },
  {
    title: "Success Rate",
    value: "68%",
    change: "+2.5% this month",
    icon: TrendingUp,
    bg: "bg-orange-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ title, value, change, icon: Icon, bg }) => (
        <div
          key={title}
          className="bg-white rounded-2xl border p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-3xl font-semibold mt-1">{value}</h2>
            <p className="text-green-500 text-sm mt-2">{change}</p>
          </div>

          <div
            className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center text-white`}
          >
            <Icon size={22} />
          </div>
        </div>
      ))}
    </div>
  );
}
