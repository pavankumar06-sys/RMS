
import { Search, Send, X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  onboardingSummaryMock,
  onboardingCandidatesMock,
} from "../data/onboardingMock";

export default function Onboarding() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Onboarding</h1>
        <p className="text-gray-500">
          Manage offers and onboarding process
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={18} />
        <input
          placeholder="Search candidates..."
          className="w-full pl-11 py-3 bg-gray-100 rounded-xl outline-none"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard title="Total Onboarding" value={onboardingSummaryMock.totalOnboarding} />
        <SummaryCard title="Offers Accepted" value={onboardingSummaryMock.offersAccepted} />
        <SummaryCard title="Pending Offers" value={onboardingSummaryMock.pendingOffers} />
        <SummaryCard title="Joining This Month" value={onboardingSummaryMock.joiningThisMonth} />
      </div>

      {/* Candidate Cards */}
      <div className="space-y-6">
        {onboardingCandidatesMock.map((c) => (
          <OnboardingCard key={c.id} data={c} />
        ))}
      </div>
    </div>
  );
}

/* ---------- SUMMARY CARD ---------- */
function SummaryCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-semibold mt-2">{value}</h2>
    </div>
  );
}

/* ---------- ONBOARDING CARD ---------- */
function OnboardingCard({ data }) {
  const [steps, setSteps] = useState({
    offerSent: false,
    offerAccepted: false,
    backgroundCheck: false,
    documentsCollected: false,
    systemAccess: false,
    workspaceSetup: false,
    ...data.steps,
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setSteps({
      offerSent: false,
      offerAccepted: false,
      backgroundCheck: false,
      documentsCollected: false,
      systemAccess: false,
      workspaceSetup: false,
      ...data.steps,
    });
  }, [data.id]);

  const isOfferSent = steps.offerSent;

  /* ✅ Progress logic */
  const progressWeights = {
    offerSent: 15,
    offerAccepted: 20,
    backgroundCheck: 20,
    documentsCollected: 20,
    systemAccess: 15,
    workspaceSetup: 10,
  };

  const progress = Object.keys(progressWeights).reduce(
    (sum, key) => (steps[key] ? sum + progressWeights[key] : sum),
    0
  );

  /* ✅ Confirm Send Offer */
  const confirmSendOffer = () => {
    setSteps((prev) => ({ ...prev, offerSent: true }));
    setShowModal(false);
  };

  const toggleStep = (key) => {
    if (key === "offerSent") return; // 🔒 locked forever
    setSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const StepItem = ({ label, stepKey, locked }) => (
    <label className={`flex items-center gap-3 ${locked ? "opacity-70" : ""}`}>
      <input
        type="checkbox"
        checked={steps[stepKey]}
        disabled={locked}
        onChange={() => toggleStep(stepKey)}
        className="hidden"
      />
      <div className={`w-6 h-6 rounded-md flex items-center justify-center
        ${steps[stepKey] ? "bg-black text-white" : "border bg-gray-300"}`}>
        {steps[stepKey] && "✓"}
      </div>
      <span className={!steps[stepKey] ? "text-gray-500" : ""}>{label}</span>
    </label>
  );

  return (
    <div className="bg-white border rounded-xl p-6 space-y-5 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <span className="px-3 py-1 text-xs rounded-full bg-gray-100">
            {isOfferSent ? "Offer Sent" : "Pending"}
          </span>
        </div>

        {!isOfferSent && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Send size={16} /> Send Offer
          </button>
        )}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>Onboarding Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 bg-black" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <StepItem label="Offer Sent" stepKey="offerSent" locked />
        <StepItem label="Offer Accepted" stepKey="offerAccepted" />
        <StepItem label="Background Check" stepKey="backgroundCheck" />
        <StepItem label="Documents Collected" stepKey="documentsCollected" />
        <StepItem label="System Access" stepKey="systemAccess" />
        <StepItem label="Workspace Setup" stepKey="workspaceSetup" />
      </div>

      {/* ✅ SEND OFFER MODAL */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-xl p-6 relative space-y-4">
            <button
              className="absolute right-4 top-4"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold">Send Offer Letter</h3>

            <div className="bg-gray-100 rounded-lg p-4 text-sm space-y-1">
              <p><b>Candidate:</b> {data.name}</p>
              <p><b>Position:</b> {data.position}</p>
              <p><b>Email:</b> {data.email}</p>
            </div>

            <input
              disabled
              value="Standard Offer Letter - Tech Position"
              className="w-full px-4 py-2 bg-gray-100 rounded-lg"
            />

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmSendOffer}
                className="px-6 py-2 bg-black text-white rounded-lg"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )} */}
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-[520px] rounded-2xl px-8 py-6 relative">

      {/* Close Icon */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6">
        Send Offer Letter
      </h2>

      {/* Candidate Info Card */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4 mb-8">
        <p className="text-[15px]">
          <span className="text-gray-600">Candidate:</span>{" "}
          <span className="font-semibold text-gray-900">
            {data.name}
          </span>
        </p>
        <p className="text-[15px]">
          <span className="text-gray-600">Position:</span>{" "}
          <span className="font-semibold text-gray-900">
            {data.position}
          </span>
        </p>
        <p className="text-[15px]">
          <span className="text-gray-600">Email:</span>{" "}
          <span className="font-semibold text-gray-900">
            {data.email}
          </span>
        </p>
      </div>

      {/* Offer Template */}
      <div className="mb-10">
        <label className="block text-sm font-medium mb-3">
          Offer Template
        </label>

        <input
          disabled
          value="Standard Offer Letter - Tech Position"
          className="
            w-full
            px-4
            py-3
            rounded-xl
            bg-gray-100
            text-gray-500
            cursor-not-allowed
          "
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowModal(false)}
          className="
            px-8
            py-3
            rounded-xl
            border
            text-sm
            font-medium
            hover:bg-gray-50
          "
        >
          Cancel
        </button>

        <button
          onClick={confirmSendOffer}
          className="
            px-10
            py-3
            rounded-xl
            text-sm
            font-medium
            text-white
            bg-black
          "
        >
          Send Offer
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
