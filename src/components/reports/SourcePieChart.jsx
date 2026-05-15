import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ChartTooltip } from "./ChartTooltip";

const COLORS = ["#3b82f6", "#8b5cf6"];

export default function SourcePieChart({ data }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <h3 className="font-semibold mb-4">
        Candidate Source Distribution
      </h3>

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