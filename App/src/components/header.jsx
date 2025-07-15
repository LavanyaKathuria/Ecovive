// components/header.jsx
export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b shadow-sm bg-white sticky top-0 z-10">
      <h1 className="text-xl font-bold text-eco-green">EcoCart</h1>

      {/* Menu icon */}
      <button className="p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}
