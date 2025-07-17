import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaLeaf, FaUserCircle, FaCrown } from "react-icons/fa";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

// 🧠 Eco Tips + Leaderboard Data
const ECO_TIPS = [
  "Carry a reusable water bottle 💧",
  "Say no to plastic cutlery 🍴",
  "Use cloth bags for groceries 🛍️",
  "Unplug chargers when not in use 🔌",
  "Buy in bulk to reduce packaging 📦",
  "Compost your food waste ♻️",
  "Take shorter showers 🚿",
  "Air dry your clothes ☀️",
];
const todayTip = ECO_TIPS[new Date().getDate() % ECO_TIPS.length];

const leaderboard = [
  { name: "Aarav", score: 72.5 },
  { name: "Meera", score: 65.2 },
  { name: "Rishi", score: 61.9 },
  { name: "Tanya", score: 58.3 },
  { name: "Kabir", score: 54.1 },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-50 pb-20">
      {/* 🔝 Header */}
      <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">ECOVIVE</h1>
          <p className="text-xs opacity-90">Mumbai, India</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-right">
            <p className="text-xs opacity-80">Green Warrior</p>
            <p className="font-bold">2,450 pts</p>
          </div>
          <Link to="/profile">
            <FaUserCircle
              size={28}
              className="text-emerald-800 hover:text-emerald-500 transition-colors duration-200 cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* 🔍 Search */}
      <div className="p-4">
        <div className="relative" onClick={() => navigate("/search")}>
          <Search className="absolute left-3 top-3 text-emerald-500" />
          <Input
            placeholder="Search eco-friendly products..."
            className="pl-10 bg-emerald-100 border border-emerald-300 placeholder-emerald-700 text-emerald-900 cursor-pointer"
            readOnly
          />
        </div>
      </div>

      {/* 🌿 Eco Tip */}
      <div className="px-4 mt-2">
        <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-xl shadow text-emerald-900">
          <h3 className="font-semibold text-sm mb-1">🌱 Eco Tip of the Day</h3>
          <p className="text-sm opacity-90">{todayTip}</p>
        </div>
      </div>

      {/* 🌎 Eco Impact */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-r from-emerald-100 to-green-50 p-5 rounded-2xl shadow-lg border border-emerald-200">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-emerald-700 w-5 h-5" />
              <p className="font-semibold text-emerald-900 text-base">
                Your Weekly Eco Impact
              </p>
            </div>
            <span className="text-xs bg-white text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-300 shadow-sm">
              🚀 Keep Going!
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow border border-emerald-100">
              <p className="text-2xl font-bold text-emerald-900">47.2</p>
              <p className="text-xs text-emerald-600">kg CO₂ saved</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-emerald-100">
              <p className="text-2xl font-bold text-emerald-900">23</p>
              <p className="text-xs text-emerald-600">Green purchases</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow border border-emerald-100">
              <p className="text-xl font-bold text-yellow-600">₹340</p>
              <p className="text-xs text-yellow-700">Rewards earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📈 Weekly Stats Button */}
      <div className="px-4 mt-6">
        <Link to="weekly-stats">
          <button className="w-full bg-emerald-600 text-white font-semibold text-lg px-4 py-4 rounded-xl shadow-md hover:bg-emerald-700 transition">
            📈 View Weekly Stats
          </button>
        </Link>
      </div>

      {/* 🏆 Enhanced Leaderboard */}
      <div className="px-4 mt-6">
        <div className="bg-white border border-emerald-200 p-5 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
            🏆 Top Eco Warriors
          </h3>

          <ul className="space-y-3">
            {leaderboard.map((user, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center font-bold text-emerald-900 text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-sm font-medium text-emerald-900">
                    {user.name}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  {idx === 0 && <FaCrown className="text-yellow-400" />}
                  {idx === 1 && <FaCrown className="text-gray-400" />}
                  {idx === 2 && <FaCrown className="text-orange-500" />}
                  <span>{user.score} kg CO₂</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}