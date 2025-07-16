export default function PostCard({ name, message, timestamp }) {
  return (
    <div className="bg-white border border-emerald-100 p-4 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <p className="text-emerald-800 font-semibold">{name}</p>
        <p className="text-xs text-gray-400">{timestamp?.toDate().toLocaleString()}</p>
      </div>
      <p className="text-gray-700">{message}</p>
    </div>
  );
}
