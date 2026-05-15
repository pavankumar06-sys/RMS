import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

import FunnelTooltip from "./FunnelTooltip";

export default function FunnelChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Recruitment Funnel</h3>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          barGap={10}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="stage" />
          <YAxis />

          <Tooltip content={<FunnelTooltip />} />

          <Legend
            verticalAlign="bottom"
            iconType="square"
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
          />

          {/* TOTAL – GRAY */}
          <Bar
            dataKey="total"
            name="Total"
            fill="#94a3b8"
            radius={0}   /* ✅ RECTANGLE */
          />

          {/* CONVERTED – BLUE */}
          <Bar
            dataKey="converted"
            name="Converted"
            fill="#3b82f6"
            radius={0}   /* ✅ RECTANGLE */
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
