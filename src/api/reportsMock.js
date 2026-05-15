export const reportsMock = {
  summary: {
    totalCandidates: 248,
    successRate: 27.4,
    avgTimeToHire: 24,
    dropOffRate: 72.6
  },

  funnel: [
  { stage: "Intake", total: 260, converted: 220 },
  { stage: "Level 1", total: 210, converted: 160 },
  { stage: "Screening", total: 150, converted: 130 },
  { stage: "Grooming", total: 130, converted: 110 },
  { stage: "Onboarding", total: 70, converted: 60 }
],

monthlyTrends: [
  { month: "Nov", candidates: 45, hired: 12 },
  { month: "Dec", candidates: 52, hired: 15 },
  { month: "Jan", candidates: 48, hired: 13 },
  { month: "Feb", candidates: 58, hired: 18 },
  { month: "Mar", candidates: 62, hired: 20 },
  { month: "Apr", candidates: 69, hired: 22 },
],


  sourceDistribution: [
    { name: "GTD", value: 58 },
    { name: "Talentio", value: 42 }
  ],

  practiceDistribution: [
    { name: "Practice 1", value: 40 },
    { name: "Practice 2", value: 33 },
    { name: "Practice 3", value: 27 }
  ],

  topPositions: [
  { role: "Software Engineer", count: 45 },
  { role: "Data Analyst", count: 32 },
  { role: "DevOps Engineer", count: 28 },
  { role: "UX Designer", count: 23 },
  { role: "Product Manager", count: 18 },
]
};