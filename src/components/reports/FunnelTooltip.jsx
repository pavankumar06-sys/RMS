export default function FunnelTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const total = payload.find(p => p.dataKey === "total")?.value;
    const converted = payload.find(p => p.dataKey === "converted")?.value;

    return (
      <div className="bg-white border rounded-md shadow p-4">
        <p className="font-medium text-gray-900 mb-2">
          {label}
        </p>
        <p className="text-gray-500">
          <span className="font-medium">Total</span> : {total}
        </p>
        <p className="text-blue-600 mt-1">
          <span className="font-medium">Converted</span> : {converted}
        </p>
      </div>
    );
  }
  return null;
}