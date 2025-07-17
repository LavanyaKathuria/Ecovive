// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/pages/Home";
import Wallet from "@/pages/Wallet";
import SearchPage from "@/pages/Search";
import Profile from "@/pages/Profile";
import WeeklyStats from "@/pages/WeeklyStats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./utilis/RequireAuth";
import Community from "./pages/Community";
import TeamDashboard from "./pages/TeamDashboard";
import ComingSoon from "./pages/ComingSoon";
import "./App.css";

function App() {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-sm">
        <Router basename="/EcoCart">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route index element={<Home />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="profile" element={<Profile />} />
              <Route path="weekly-stats" element={<WeeklyStats />} />
              <Route path="/community" element={<Community />} />
              <Route path="/team" element={<TeamDashboard />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
