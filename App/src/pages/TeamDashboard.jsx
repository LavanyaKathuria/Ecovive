import { useEffect, useState } from "react";
import { getAllTeams, createTeam, joinTeam } from "../utilis/firestoreTeams";
import { auth } from "../utilis/firebase";
import { PlusCircle } from "lucide-react";
import TeamCard from "../components/TeamCard";

export default function TeamDashboard() {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [goalKgCO2, setGoalKgCO2] = useState("");
  const user = auth.currentUser;

  const fetchTeams = async () => {
    const data = await getAllTeams();
    setTeams(data);
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName || !goalKgCO2) return;

    await createTeam({
      teamName,
      description,
      goalKgCO2: parseInt(goalKgCO2),
      createdBy: user.uid,
    });

    setShowForm(false);
    setTeamName("");
    setDescription("");
    setGoalKgCO2("");
    fetchTeams();
  };

  const handleJoin = async (teamId) => {
    try {
      await joinTeam(teamId, user.uid);
      alert("🎉 You've joined the team!");
      fetchTeams();
    } catch (error) {
      console.error("Failed to join team:", error);
      alert("❌ Failed to join. Please try again.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto space-y-6 bg-green-50 min-h-screen">
      <h2 className="text-2xl font-bold text-emerald-800 text-center">🌱 Team Dashboard</h2>

      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
        >
          <PlusCircle size={20} />
          Create Team
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateTeam} className="bg-white shadow-md p-4 rounded-xl space-y-3 border border-emerald-200">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded text-sm"
            rows="2"
          />
          <input
            type="number"
            placeholder="Goal in kg CO₂"
            value={goalKgCO2}
            onChange={(e) => setGoalKgCO2(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition w-full"
          >
            Create
          </button>
        </form>
      )}

      <div className="space-y-4">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            userId={user.uid}
            onJoin={handleJoin}
            onRefresh={fetchTeams}
          />
        ))}
      </div>
    </div>
  );
}
