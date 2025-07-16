import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utilis/firebase";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-200 via-white to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm backdrop-blur-xl bg-white/80 border border-emerald-300 rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-col items-center">
          <div className="bg-emerald-100 p-4 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 text-emerald-700" viewBox="0 0 16 16">
              <path d="M8 0C5 4 1 8 1 13a7 7 0 0 0 14 0C15 8 11 4 8 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-emerald-900 mt-3">Welcome to EcoVive</h1>
          <p className="text-sm text-emerald-700">Sustainable shopping made simple</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-emerald-300 placeholder-emerald-400 text-emerald-900 p-3 rounded-xl bg-white/70 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-emerald-300 placeholder-emerald-400 text-emerald-900 p-3 rounded-xl bg-white/70 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center text-emerald-800">
          Don't have an account?{" "}
          <Link to="/signup" className="text-emerald-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
