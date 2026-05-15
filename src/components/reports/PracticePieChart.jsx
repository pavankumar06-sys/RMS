import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

export default function PracticePieChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">Practice Distribution</h3>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Tooltip content={<ChartTooltip />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
