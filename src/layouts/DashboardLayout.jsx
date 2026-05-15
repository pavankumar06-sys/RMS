// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// export default function DashboardLayout() {
//   return (
//     // <div className="flex h-screen">
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar – ALWAYS visible */}
//       <Sidebar />

//       {/* Right side */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header – ALWAYS visible */}
//         <Header />

//         {/* Page content changes here */}
//         <main className="flex-1 overflow-y-auto bg-gray-50">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import NatashaBot from "../components/NatashaBot"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <Header />
        

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />

        </main>

      </div>

      
      {/* ✅ Bottom-right AI Bot */}
      <NatashaBot />


      

    </div>
  );
}
