// import StatsCards from "../components/StatsCards";
// import RecruitmentPipeline from "../components/RecruitmentPipeline";
// import RecentCandidates from "../components/RecentCandidates";

// export default function Dashboard() {
//   return (
//     <main className="flex-1 overflow-y-auto p-6 space-y-6">
//       <StatsCards />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <RecruitmentPipeline />
//         <RecentCandidates />
//       </div>
//     </main>
//   );
// }
import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import RecruitmentPipeline from "../components/RecruitmentPipeline";
import RecentCandidates from "../components/RecentCandidates";

export default function Dashboard({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false); // ✅ now defined
    navigate("/login");
    console.log(handleLogout);
    
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar /> */}

      <main className="flex-1 overflow-y-auto">
        {/* Pass logout to Header if needed */}
        {/* <Header onLogout={handleLogout} /> */}

        <div className="p-6 space-y-6">
          <StatsCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecruitmentPipeline />
            <RecentCandidates />
          </div>
        </div>
      </main>
    </div>
  );
}