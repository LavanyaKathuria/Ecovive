
// src/Layout.jsx
import { Outlet, useLocation, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { PiHouseFill, PiWalletFill } from "react-icons/pi";
import { Search as SearchIcon } from "lucide-react";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-green-50 relative pb-16">
      {/* ✅ Common container for all pages */}
      <div className="max-w-md mx-auto w-full">
        <Outlet />
      </div>

      {/* 🚀 Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner z-10">
        <div className="max-w-md mx-auto flex justify-around p-2">
          <NavItem to="/" label="Home" icon={<PiHouseFill />} active={pathname === "/"} />
          <NavItem to="/search" label="Search" icon={<SearchIcon />} active={pathname === "/search"} />
          <NavItem to="/wallet" label="Wallet" icon={<PiWalletFill />} active={pathname === "/wallet"} />
          <NavItem to="/profile" label="Profile" icon={<FaUserCircle />} active={pathname === "/profile"} />
        </div>
      </div>
    </div>
  );
}


function NavItem({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-4 py-1 rounded-xl transition ${
        active
          ? "bg-emerald-100 text-emerald-600 font-semibold"
          : "text-gray-500 hover:text-emerald-500"
      }`}
    >
      <div className="text-lg">{icon}</div>
      <span className="text-xs">{label}</span>
    </Link>
  );
}

