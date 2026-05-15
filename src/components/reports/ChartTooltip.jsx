export function ChartTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-md px-3 py-2 shadow text-sm">
        <strong>{payload[0].name}</strong>: {payload[0].value}
      </div>
    );
  }
  return null;
}
