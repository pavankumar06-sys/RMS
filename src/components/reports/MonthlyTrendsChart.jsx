import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function MonthlyTrendsChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Monthly Trends</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="4 4" />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, 80]}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
            labelStyle={{ fontWeight: 500 }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm font-medium">{value}</span>
            )}
          />

          {/* Candidates Line */}
          <Line
            name="Candidates"
            type="monotone"
            dataKey="candidates"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{
              r: 5,
              stroke: "#8b5cf6",
              strokeWidth: 2,
              fill: "white",
            }}
            activeDot={{ r: 7 }}
          />

          {/* Hired Line */}
          <Line
            name="Hired"
            type="monotone"
            dataKey="hired"
            stroke="#10b981"
            strokeWidth={3}
            dot={{
              r: 5,
              stroke: "#10b981",
              strokeWidth: 2,
              fill: "white",
            }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}