export default function MessageModal({
  open,
  type = "success", // success | error
  title,
  message,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2
          className={`text-lg font-semibold ${
            type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {title}
        </h2>

        <p className="mt-2 text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}