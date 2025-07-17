import { useState } from "react";
import { updateReactions } from "../utilis/firestorePosts";

export default function PostCard({ post }) {
  const { name, message, timestamp, id, reactions = { like: 0, love: 0, fire: 0 } } = post;
  const [localReactions, setLocalReactions] = useState(reactions);

  const handleReact = async (type) => {
    const updated = { ...localReactions, [type]: localReactions[type] + 1 };
    setLocalReactions(updated);
    await updateReactions(id, updated);
  };

  return (
    <div className="bg-white border border-emerald-200 rounded-xl shadow hover:shadow-md transition p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-lg">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-emerald-800">{name}</p>
          <p className="text-xs text-gray-400">{timestamp?.toDate().toLocaleString()}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">{message}</p>

      <div className="flex gap-4 text-sm pt-2 border-t border-emerald-100 mt-2">
        <button onClick={() => handleReact("like")} className="hover:scale-105 transition">
          👍 {localReactions.like}
        </button>
        <button onClick={() => handleReact("love")} className="hover:scale-105 transition">
          💚 {localReactions.love}
        </button>
        <button onClick={() => handleReact("fire")} className="hover:scale-105 transition">
          🔥 {localReactions.fire}
        </button>
      </div>
    </div>
  );
}
