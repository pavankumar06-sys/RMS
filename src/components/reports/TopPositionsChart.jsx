import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

/* ✅ Custom tooltip */
function TopPositionsTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium text-gray-900 mb-2">
          {label}
        </p>
        <p className="text-blue-600">
          count : {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
}

export default function TopPositionsChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Top Positions</h3>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          layout="vertical"
          data={data}
          barCategoryGap={18}
          barSize={26}
          margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis
            type="number"
            domain={[0, "dataMax + 5"]}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="role"
            width={150}
            tick={{ fill: "#6b7280", fontSize: 13 }}
          />

          <Tooltip
            cursor={{ fill: "rgba(59,130,246,0.08)" }}
            content={<TopPositionsTooltip />}
          />

          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={0}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
