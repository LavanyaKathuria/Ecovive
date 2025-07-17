import { useState } from "react";
import { updateTeamProgress } from "../utilis/firestoreTeams";

export default function TeamCard({ team, userId, onJoin }) {
  const isMember = team.members.includes(userId);
  const [joining, setJoining] = useState(false);
  const [contribution, setContribution] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleJoin = async () => {
    setJoining(true);
    await onJoin(team.id);
    setJoining(false);
  };

  const handleContribute = async () => {
    const amount = parseInt(contribution);
    if (!amount || amount <= 0) return;

    setSubmitting(true);
    await updateTeamProgress(team.id, amount);
    setContribution("");
    setSubmitting(false);

    if (onRefresh) {
        onRefresh();
    }
  };

  const progress = Math.min(
    (team.currentProgress / team.goalKgCO2) * 100,
    100
  ).toFixed(1);

  return (
    <div
      className={`p-4 rounded-xl border shadow-md transition space-y-3 ${
        isMember
          ? "bg-emerald-100 border-emerald-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-emerald-800">{team.teamName}</h3>
        {isMember && (
          <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
            Your Team
          </span>
        )}
      </div>

      {team.description && (
        <p className="text-sm text-gray-500">{team.description}</p>
      )}

      <p className="text-lg font-bold text-emerald-900">
        🎯 Goal: {team.goalKgCO2} kg CO₂
      </p>
      <p className="text-sm text-gray-600">
        ✅ Progress: {team.currentProgress || 0} kg
      </p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-emerald-500 h-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 text-right">{progress}%</p>

      {/* Contribution Field */}
      {isMember && (
        <div className="mt-2 space-y-2">
          <input
            type="number"
            placeholder="Add kg CO₂"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            className="w-full p-2 text-sm border rounded"
          />
          <button
            onClick={handleContribute}
            disabled={submitting}
            className="w-full px-4 py-2 text-sm bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Contribute CO₂"}
          </button>
        </div>
      )}

      {!isMember && (
        <button
          onClick={handleJoin}
          disabled={joining}
          className="mt-2 w-full px-4 py-2 text-sm bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition disabled:opacity-50"
        >
          {joining ? "Joining..." : "Join Team"}
        </button>
      )}
    </div>
  );
}
