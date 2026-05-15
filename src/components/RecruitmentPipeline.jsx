const pipelineData = [
  { label: "Level 1", completed: 62, total: 85 },
  { label: "Level 2", completed: 45, total: 62 },
  { label: "Grooming", completed: 38, total: 45 },
  { label: "Level 3", completed: 26, total: 38 },
  { label: "Onboarding", completed: 22, total: 26 },
];

export default function RecruitmentPipeline() {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="text-lg font-semibold mb-6">
        Recruitment Pipeline
      </h3>

      <div className="space-y-6">
        {pipelineData.map(({ label, completed, total }) => {
          const percentage = Math.round((completed / total) * 100);

          return (
            <div key={label}>
              {/* Top row: label + numbers */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {label}
                </span>
                <span className="text-sm text-gray-500">
                  {completed}/{total} ({percentage}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
