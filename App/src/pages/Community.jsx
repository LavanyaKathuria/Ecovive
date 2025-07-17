import { useEffect, useState } from "react";
import { auth } from "../utilis/firebase";
import { useNavigate } from "react-router-dom";
import { createPost, getAllPosts } from "../utilis/firestorePosts";
import PostCard from "../components/PostCard";

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    await createPost({
      uid: user.uid,
      name: user.displayName || "Anonymous",
      message,
    });

    setMessage("");
    fetchPosts(); // Refresh posts
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-emerald-50 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-emerald-900 text-center">
          🌿 Community Board
        </h1>

        <div className="flex justify-end">
          <button
            onClick={() => navigate("/team")}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-400 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-200"
          >
            <span className="text-xl">🌱</span>
            <span>Team Goals</span>
          </button>
        </div>

        {/* Post form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-4 space-y-4 border border-emerald-200"
        >
          <textarea
            rows="3"
            placeholder="Share your sustainable tip or achievement..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition"
          >
            Post
          </button>
        </form>

        {/* Posts list */}
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
