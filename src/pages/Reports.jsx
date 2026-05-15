// import { useState, useEffect } from "react";
// import * as XLSX from "xlsx";

// import SummaryCards from "../components/reports/SummaryCards";
// import FunnelChart from "../components/reports/FunnelChart";
// import MonthlyTrendsChart from "../components/reports/MonthlyTrendsChart";
// import SourcePieChart from "../components/reports/SourcePieChart";
// import PracticePieChart from "../components/reports/PracticePieChart";
// import TopPositionsChart from "../components/reports/TopPositionsChart";

// import { reportsMock } from "../api/reportsMock";
// import { fetchCandidates } from "../api/candidateApi";
// import { FiDownload, FiChevronDown } from "react-icons/fi";

// export default function Reports() {
//   const data = reportsMock;

//   const [period, setPeriod] = useState("Last 6 Months");
//   const [open, setOpen] = useState(false);

//   // ✅ REAL TOTAL CANDIDATES FROM DB
//   const [totalCandidates, setTotalCandidates] = useState(0);

//   useEffect(() => {
//     fetchCandidates()
//       .then((res) => setTotalCandidates(res.length))
//       .catch(console.error);
//   }, []);

//   // ✅ SUMMARY DATA (ONLY WHAT WE KNOW FROM DB FOR NOW)
//   const summary = {
//     totalCandidates,
//     successRate: "--",
//     avgTimeToHire: "--",
//     dropOffRate: "--",
//   };

//   const periods = [
//     "Last 7 Days",
//     "Last 30 Days",
//     "Last 3 Months",
//     "Last 6 Months",
//     "Last 12 Months",
//   ];

//   /* ✅ EXCEL EXPORT */
//   const handleExportExcel = () => {
//     const workbook = XLSX.utils.book_new();

//     const summarySheet = XLSX.utils.json_to_sheet([
//       { Metric: "Total Candidates", Value: summary.totalCandidates },
//       { Metric: "Success Rate", Value: summary.successRate },
//       { Metric: "Avg. Time to Hire", Value: summary.avgTimeToHire },
//       { Metric: "Drop-off Rate", Value: summary.dropOffRate },
//     ]);

//     XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
//     XLSX.writeFile(workbook, `Reports_${period.replaceAll(" ", "_")}.xlsx`);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
//           <p className="text-gray-500">
//             Comprehensive recruitment insights and metrics
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="flex items-center gap-3">
//           <div className="relative">
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center justify-between gap-2 px-4 py-2 min-w-[170px] border rounded-lg bg-white"
//             >
//               {period}
//               <FiChevronDown />
//             </button>

//             {open && (
//               <div className="absolute right-0 mt-2 w-full bg-white border rounded-lg shadow z-20">
//                 {periods.map((p) => (
//                   <button
//                     key={p}
//                     onClick={() => {
//                       setPeriod(p);
//                       setOpen(false);
//                     }}
//                     className="block w-full px-4 py-2 text-left hover:bg-gray-100"
//                   >
//                     {p}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button
//             onClick={handleExportExcel}
//             className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
//           >
//             <FiDownload />
//             Export Report
//           </button>
//         </div>
//       </div>

//       {/* ✅ SUMMARY WITH REAL TOTAL CANDIDATES */}
//       <SummaryCards summary={summary} />

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <FunnelChart data={data.funnel} />
//         <MonthlyTrendsChart data={data.monthlyTrends} />
//         <SourcePieChart data={data.sourceDistribution} />
//         <PracticePieChart data={data.practiceDistribution} />
//       </div>

//       <TopPositionsChart data={data.topPositions} />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import SummaryCards from "../components/reports/SummaryCards";
import FunnelChart from "../components/reports/FunnelChart";
import MonthlyTrendsChart from "../components/reports/MonthlyTrendsChart";
import SourcePieChart from "../components/reports/SourcePieChart";
import PracticePieChart from "../components/reports/PracticePieChart";
import TopPositionsChart from "../components/reports/TopPositionsChart";

import { reportsMock } from "../api/reportsMock";
import { fetchCandidates } from "../api/candidateApi";
import { FiDownload, FiChevronDown } from "react-icons/fi";

export default function Reports() {
  const data = reportsMock;

  /* ===============================
     UI STATES
  ================================ */
  const [period, setPeriod] = useState("Last 6 Months");
  const [open, setOpen] = useState(false);

  const [fromDate, setFromDate] = useState("");

  /* ===============================
     DATA STATES
  ================================ */
  const [totalCandidates, setTotalCandidates] = useState(0);

  useEffect(() => {
    fetchCandidates()
      .then((res) => setTotalCandidates(res.length))
      .catch(console.error);
  }, []);

  /* ===============================
     SUMMARY (UNCHANGED)
  ================================ */
  const summary = {
    totalCandidates,
    successRate: "--",
    avgTimeToHire: "--",
    dropOffRate: "--",
  };

  const periods = [
    "Last 7 Days",
    "Last 30 Days",
    "Last 3 Months",
    "Last 6 Months",
    "Last 12 Months",
  ];

  /* ===============================
     HANDLERS
  ================================ */
  const handlePeriodSelect = (p) => {
    setPeriod(p);
    setFromDate(""); // ✅ clear date when period selected
    setOpen(false);
  };

  const handleFromDateChange = (value) => {
    setFromDate(value);
    setPeriod(""); // ✅ clear period when date selected
  };

  const getDateRangeFromPeriod = (period) => {
    const today = new Date();
    const from = new Date();

    switch (period) {
      case "Last 7 Days":
        from.setDate(today.getDate() - 7);
        break;
      case "Last 30 Days":
        from.setDate(today.getDate() - 30);
        break;
      case "Last 3 Months":
        from.setMonth(today.getMonth() - 3);
        break;
      case "Last 6 Months":
        from.setMonth(today.getMonth() - 6);
        break;
      case "Last 12 Months":
        from.setFullYear(today.getFullYear() - 1);
        break;
      default:
        return null;
    }

    return { from, to: today };
  };

  /* ===============================
     EXCEL EXPORT
  ================================ */
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    let dateRange = null;

    if (period) {
      dateRange = getDateRangeFromPeriod(period);
    } else if (fromDate) {
      dateRange = {
        from: new Date(fromDate),
        to: new Date(), // ✅ today automatically
      };
    }

    const hasData = totalCandidates > 0;

    const sheetData = hasData
      ? [
          { Metric: "Total Candidates", Value: summary.totalCandidates },
          { Metric: "Success Rate", Value: summary.successRate },
          { Metric: "Avg. Time to Hire", Value: summary.avgTimeToHire },
          { Metric: "Drop-off Rate", Value: summary.dropOffRate },
          {
            Metric: "From Date",
            Value: dateRange
              ? dateRange.from.toLocaleDateString()
              : "N/A",
          },
          {
            Metric: "To Date",
            Value: dateRange
              ? dateRange.to.toLocaleDateString()
              : "N/A",
          },
        ]
      : [{ Message: "No Data Available for Selected Period" }];

    const sheet = XLSX.utils.json_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, sheet, "Summary");

    XLSX.writeFile(
      workbook,
      `Reports_${
        period
          ? period.replaceAll(" ", "_")
          : `From_${fromDate}`
      }.xlsx`
    );
  };

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Reports & Analytics</h1>
          <p className="text-gray-500">
            Comprehensive recruitment insights and metrics
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          {/* PERIOD DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between gap-2 px-4 py-2 min-w-[170px] border rounded-lg bg-white"
            >
              {period || "Select Period"}
              <FiChevronDown />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-full bg-white border rounded-lg shadow z-20">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePeriodSelect(p)}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FROM DATE ONLY */}
          <input
            type="date"
            value={fromDate}
            onChange={(e) => handleFromDateChange(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          {/* EXPORT */}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <FiDownload />
            Export Report
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <SummaryCards summary={summary} />

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FunnelChart data={data.funnel} />
        <MonthlyTrendsChart data={data.monthlyTrends} />
        <SourcePieChart data={data.sourceDistribution} />
        <PracticePieChart data={data.practiceDistribution} />
      </div>

      <TopPositionsChart data={data.topPositions} />
    </div>
  );
}