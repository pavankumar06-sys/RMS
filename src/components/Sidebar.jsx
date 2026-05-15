// import {
//   Users,
//   Home,
//   Briefcase,
//   User,
//   Calendar,
//   UserCheck,
//   ClipboardCheck ,
//   LogOut,
// } from "lucide-react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { BarChart3 } from "lucide-react";


// export default function Sidebar() {
//   const navigate = useNavigate();

//   const userEmail = localStorage.getItem("userEmail");
//   const userName = localStorage.getItem("userName");

//     const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userEmail");
//     window.location.href = "/login"; // redirect after logout
//   };

//   return (
//     <aside className="w-64 bg-white border-r flex flex-col h-screen">
//       {/* Logo */}
//       <div className="flex items-center gap-3 px-6 py-4 border-b">
//         <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white">
//           <Users size={20} />
//         </div>
//         <span className="text-lg font-semibold">RecruiFlow</span>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 px-4 py-4 space-y-2">
//         <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
//         <SidebarItem to="/jobs" icon={Briefcase} label="Jobs" />
//         <SidebarItem to="/candidates" icon={User} label="Candidates" />
//         <SidebarItem to="/meetings" icon={Calendar} label="Meetings" />
// {/* <SidebarItem to="/onboarding" icon={UserCheck} label="Onboarding" /> */}
//         <SidebarItem to="/assessments" icon={ClipboardCheck } label="Assessments" />
//         <SidebarItem to="/reports" icon={BarChart3} label="Reports" />






//       </nav>

//       {/* User Info */}
//       <div className="p-4 border-t">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//             {userName ? userName.charAt(0).toUpperCase() : "U"}
//           </div>
//           <div>
//             <p className="text-sm font-medium">{userName || "User"}</p>
//             <p className="text-xs text-gray-500">
//               {userEmail || "user@email.com"}
//             </p>
//           </div>
//         </div>

       
//           <button
//           type="button"
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }

// /* ✅ Active-aware Sidebar Item */
// function SidebarItem({ to, icon: Icon, label }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-2 rounded-lg transition
//          ${
//            isActive
//              ? "bg-blue-50 text-blue-600"
//              : "text-gray-600 hover:bg-gray-100"
//          }`
//       }
//     >
//       <Icon size={18} />
//       {label}
//     </NavLink>
//   );
// }

import {
  Users,
  Home,
  Briefcase,
  User,
  Calendar,
  ClipboardCheck,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { BarChart3 } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r flex flex-col h-screen">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white">
          <Users size={20} />
        </div>
        <span className="text-lg font-semibold">RecruiFlow</span>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <SidebarItem to="/dashboard" icon={Home} label="Dashboard" />
        <SidebarItem to="/jobs" icon={Briefcase} label="Jobs" />
        <SidebarItem to="/candidates" icon={User} label="Candidates" />
        <SidebarItem to="/meetings" icon={Calendar} label="Meetings" />
        <SidebarItem
          to="/assessments"
          icon={ClipboardCheck}
          label="Assessments"
        />
        <SidebarItem to="/reports" icon={BarChart3} label="Reports" />
      </nav>

      {/* USER INFO (CLICKABLE → ADMIN INFO PAGE) */}
      <div className="p-4 border-t">
        <div
          onClick={() => navigate("/admin-info")}
          className="flex items-center gap-3 mb-4 cursor-pointer rounded-lg p-2 hover:bg-gray-100 transition"
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p className="text-sm font-medium">
              {userName || "User"}
            </p>
            <p className="text-xs text-gray-500">
              {userEmail || "user@email.com"}
            </p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm rounded-lg border hover:bg-gray-100"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}

/* ✅ ACTIVE-AWARE SIDEBAR ITEM */
function SidebarItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}
