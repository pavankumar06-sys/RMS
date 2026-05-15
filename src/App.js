import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Meetings from "./pages/Meetings";
import DashboardLayout from "./layouts/DashboardLayout";
import Candidates from "./pages/Candidates";
import Reports from "./pages/Reports"
// import Onboarding from "./pages/Onboarding";
import Jobs from "./pages/Jobs";
// import Assessments from "./components/Assessments";
import Assessments from "./pages/Assessments";
import AdminInfo from "./pages/AdminInfo";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Pages */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* ✅ Main Layout */}
        <Route
          path="/"
          element={
            isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />
          }
        >
          {/* ✅ Landing Page */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* ✅ Meetings Page */}
          <Route path="meetings" element={<Meetings />} />
          
  {/* ✅ Candidates (THIS WAS MISSING) */}
      <Route path="candidates" element={<Candidates />} />

      <Route path="reports" element={<Reports />} />
      {/* <Route path="onboarding" element={<Onboarding />} /> */}
      <Route path="jobs" element={<Jobs />} />
      <Route path="assessments" element={<Assessments />} />
      <Route path="/admin-info" element={<AdminInfo />} />



        </Route>

        

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;