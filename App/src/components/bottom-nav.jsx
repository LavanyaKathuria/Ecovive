import { NavLink } from "react-router-dom";
import { Home, Gift, User } from "lucide-react";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md p-2 flex justify-around z-20">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors ${
            isActive ? "text-emerald-600" : "text-gray-500"
          } hover:text-emerald-500`
        }
      >
        <Home className="w-5 h-5 mb-1" />
        Home
      </NavLink>

      <NavLink
        to="/rewards"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors ${
            isActive ? "text-emerald-600" : "text-gray-500"
          } hover:text-emerald-500`
        }
      >
        <Gift className="w-5 h-5 mb-1" />
        Rewards
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm font-medium transition-colors ${
            isActive ? "text-emerald-600" : "text-gray-500"
          } hover:text-emerald-500`
        }
      >
        <User className="w-5 h-5 mb-1" />
        Profile
      </NavLink>
    </nav>
  );
}
