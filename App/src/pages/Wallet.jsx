import { useQuery } from "@tanstack/react-query";
import { FaGift, FaTruck, FaLeaf, FaCoins } from "react-icons/fa";
import { PiShoppingBagFill } from "react-icons/pi";

export default function Wallet() {
  const { data: wallet, isLoading: isWalletLoading } = useQuery({
    queryKey: ["wallet"],
    queryFn: () =>
      fetch("http://127.0.0.1:5050/api/wallet").then((res) => res.json()),
  });

  const { data: purchased, isLoading: isPurchasesLoading } = useQuery({
    queryKey: ["purchased"],
    queryFn: () =>
      fetch("http://127.0.0.1:5050/api/purchased").then((res) => res.json()),
  });

  const rewardItems = [
    {
      id: 1,
      title: "₹50 Cashback",
      desc: "Instant cashback to wallet",
      cost: 500,
      icon: <FaCoins className="text-yellow-500" />,
    },
    {
      id: 2,
      title: "Free Shipping",
      desc: "On your next 3 orders",
      cost: 300,
      icon: <FaTruck className="text-blue-500" />,
    },
    {
      id: 3,
      title: "Mystery Reward",
      desc: "Surprise eco gift",
      cost: 800,
      icon: <FaGift className="text-purple-500" />,
    },
    {
      id: 4,
      title: "₹100 Discount Coupon",
      desc: "Valid on next purchase",
      cost: 1000,
      icon: <PiShoppingBagFill className="text-emerald-500" />,
    },
  ];

  return (
    <div className="p-4 pb-20 space-y-6 w-full">
      <h1 className="text-xl font-bold text-emerald-900 mb-2">Wallet</h1>

      <div className="bg-emerald-100 p-4 rounded-xl shadow flex justify-between items-center">
        {isWalletLoading || !wallet ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Total Eco Points</p>
              <p className="text-2xl font-bold text-emerald-900">{wallet.points}</p>
              <div className="flex text-sm text-emerald-800 space-x-4 mt-1">
                <div className="flex items-center gap-1">
                  <FaLeaf className="text-green-600" /> {wallet.co2Saved} kg
                </div>
                <div className="flex items-center gap-1">
                  <PiShoppingBagFill className="text-emerald-700" /> {wallet.purchases}
                </div>
              </div>
            </div>
            <FaCoins size={36} className="text-yellow-500" />
          </>
        )}
      </div>

      {/* Purchase History */}
      <div className="pt-2">
        <h2 className="text-base font-semibold text-emerald-900 mb-2">Purchase History</h2>
        <div className="space-y-2">
          {isPurchasesLoading || !purchased ? (
            <p>Loading purchases...</p>
          ) : purchased.length === 0 ? (
            <p className="text-sm text-gray-600">No purchases marked yet.</p>
          ) : (
            purchased.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg shadow flex justify-between items-center"
              >
                <div className="text-sm">
                  <p className="font-medium text-emerald-800">{product.title}</p>
                  <p className="text-gray-500 text-xs">EcoScore: {product.score}</p>
                </div>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 text-xs underline"
                >
                  View
                </a>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Rewards */}
      <h2 className="text-base font-semibold text-emerald-900 mt-4">Redeem Rewards</h2>
      <div className="space-y-3">
        {rewardItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-start"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-emerald-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-yellow-600">{item.cost} pts</p>
              <button className="mt-1 bg-emerald-600 text-white px-3 py-1 rounded-lg text-sm">
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
