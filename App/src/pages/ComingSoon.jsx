import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-emerald-100 to-white p-6 text-center">
      <h1 className="text-4xl font-bold text-emerald-800 mb-4">🌿 Coming Soon!</h1>
      <p className="text-lg text-emerald-700 max-w-xl mb-6">
        We are launching a new feature to buy <strong>second-hand and refurbished products</strong>!
        This will help reduce waste and carbon emissions, aligning with our mission of sustainable shopping.
      </p>
      <p className="text-md text-emerald-600">Stay tuned – your eco-friendly choices just got easier.</p>

      <Link to="/" className="mt-6 inline-block bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700 transition">
        Back to Home
      </Link>
    </div>
  );
}
