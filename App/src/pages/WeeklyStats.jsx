import React, { useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";

const WeeklyStats = () => {
  const reportRef = useRef();

  const weeklyData = [
    { day: "Mon", footprint: 5.2 },
    { day: "Tue", footprint: 4.8 },
    { day: "Wed", footprint: 3.6 },
    { day: "Thu", footprint: 3.9 },
    { day: "Fri", footprint: 2.7 },
    { day: "Sat", footprint: 2.1 },
    { day: "Sun", footprint: 1.9 },
  ];

  const totalFootprint = weeklyData
    .reduce((acc, d) => acc + d.footprint, 0)
    .toFixed(1);
  const lastWeekFootprint = 31.8;
  const nonEcoPurchases = 5;
  const improvement = (
    ((lastWeekFootprint - totalFootprint) / lastWeekFootprint) *
    100
  ).toFixed(1);

  const handleShare = async () => {
    const canvas = await html2canvas(reportRef.current);
    const dataUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "eco_weekly_report.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-2xl font-bold text-center text-emerald-800 mb-6">
        ♻️ Weekly Carbon Report
      </h1>

      <div ref={reportRef} className="grid gap-4">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">
            🌍 Carbon Footprint
          </h2>
          <p className="text-4xl font-bold text-emerald-900">
            {totalFootprint} kg CO₂
          </p>
          <p className="text-sm text-green-600 mt-1">
            Down {improvement}% from last week
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-2">
            ⚠️ Non-Eco Purchases
          </h2>
          <p className="text-3xl font-bold text-yellow-600">
            {nonEcoPurchases}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Try to reduce items with high emissions
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-emerald-700 mb-3 text-center">
            📊 Weekly Footprint Trend
          </h2>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart
              data={weeklyData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis unit=" kg" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="footprint"
                stroke="#059669"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📤 Share Button */}
      <button
        onClick={handleShare}
        className="mt-6 w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-emerald-700 transition"
      >
        📤 Share Weekly Report
      </button>
    </div>
  );
};

export default WeeklyStats;
