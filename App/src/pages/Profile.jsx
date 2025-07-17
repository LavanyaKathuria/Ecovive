import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utilis/firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { FaUserCircle, FaLeaf, FaSignOutAlt, FaEdit, FaQuestionCircle } from "react-icons/fa";
import { FaCoins } from "react-icons/fa6";
import { PiShoppingBagFill } from "react-icons/pi";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData({
            name: "Eco Shopper",
            email: user.email,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData({
          name: "Eco Shopper",
          email: auth.currentUser?.email || "unknown",
        });
      }
    };

    fetchUser();
  }, []);

  if (!userData) return <div className="p-4">Loading profile...</div>;

  // Static eco impact values (for now)
  const impact = {
    points: 2450,
    co2Saved: 47.2,
    purchases: 23,
  };

  return (
    <div className="p-4 pb-20 space-y-4 w-full">
      <h1 className="text-xl font-bold text-emerald-900 mb-2">Profile</h1>

      <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4">
        <FaUserCircle size={48} className="text-emerald-700" />
        <div>
          <p className="font-bold text-emerald-900">{userData.name}</p>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-semibold text-emerald-900">Your Eco Impact</h2>
        <div className="bg-emerald-100 p-4 rounded-xl shadow-sm grid grid-cols-3 text-center gap-2 text-emerald-800">
          <div>
            <FaCoins className="mx-auto text-yellow-500" />
            <p className="text-lg font-bold text-emerald-900">{impact.points}</p>
            <p className="text-xs">Eco Points</p>
          </div>
          <div>
            <FaLeaf className="mx-auto text-green-600" />
            <p className="text-lg font-bold text-emerald-900">{impact.co2Saved} kg</p>
            <p className="text-xs">CO₂ Saved</p>
          </div>
          <div>
            <PiShoppingBagFill className="mx-auto text-emerald-700" />
            <p className="text-lg font-bold text-emerald-900">{impact.purchases}</p>
            <p className="text-xs">Purchases</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SettingItem icon={<FaEdit />} label="Edit Profile" />
        <SettingItem icon={<FaQuestionCircle />} label="Help & Support" />
        <SettingItem icon={<FaSignOutAlt />} label="Logout" danger onClick={handleLogout} />
      </div>
    </div>
  );
}

function SettingItem({ icon, label, danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full p-3 rounded-xl shadow bg-white ${
        danger ? "text-red-500" : "text-emerald-900"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    </button>
  );
}
