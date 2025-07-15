import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaLeaf, FaUserCircle } from "react-icons/fa";
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
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("http://127.0.0.1:5000/api/products").then((res) => res.json()),
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-green-50 pb-20">
      {/* 🔝 Header */}
      <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold">ECOCART</h1>
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

      {/* 🏆 Leaderboard */}
      <div className="px-4 mt-6">
        <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-xl shadow">
          <h3 className="text-emerald-900 font-semibold text-sm mb-2">
            🏆 Top Eco Warriors
          </h3>
          <ul className="space-y-1 text-sm text-emerald-800">
            {leaderboard.map((user, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{idx + 1}. {user.name}</span>
                <span className="font-semibold">{user.score} kg CO₂</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🛍️ Featured Products */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-emerald-900">
            Featured Products
          </h2>
          <Link to="/search">
            <button className="bg-emerald-600 text-white text-sm px-3 py-1 rounded-lg shadow hover:bg-emerald-700 transition">
              View All
            </button>
          </Link>
        </div>

        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow space-y-2"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-emerald-900 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-xs text-emerald-600">{product.brand}</p>
                </div>
                <div className="bg-emerald-200 text-xs font-semibold px-2 py-0.5 rounded-full text-emerald-900">
                  EcoScore {product.ecoScore ?? 92}
                </div>
              </div>

              <div className="text-sm font-bold text-emerald-900">
                ₹{product.price ?? 899.0}{" "}
                <span className="line-through text-xs text-emerald-500">
                  ₹{product.originalPrice ?? 1299.0}
                </span>
              </div>

              <div className="bg-emerald-100 px-3 py-2 rounded flex justify-between text-sm items-center">
                <div className="flex gap-2 items-center text-emerald-800">
                  <FaLeaf className="text-green-600" />
                  <span>Low Carbon Choice</span>
                </div>
                <span className="font-medium text-emerald-900">
                  -2.10 kg CO₂
                </span>
              </div>

              <div className="flex justify-between items-center mt-1">
                <p className="text-yellow-600 font-medium text-sm">
                  Earn +85 pts
                </p>
                <button className="bg-emerald-600 text-white text-sm px-4 py-1 rounded-lg">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="text-center text-emerald-700 py-6">
              No products found matching "{searchQuery}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
