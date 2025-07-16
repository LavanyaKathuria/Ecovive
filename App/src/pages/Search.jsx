import { useState } from "react";
import { useQuery, useQueries } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";


// Categories to show on homepage
const HOMEPAGE_CATEGORIES = [
  "bag",
  "toothbrush",
  "bottle",
  "container",
  "plate",
  "garbage bag",
  "notebook",
  "pen",
  "grocery",
  "straw",
  "tshirt",
  "pants",
  "cutlery"
];

function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md space-y-2 border border-emerald-100">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold text-emerald-900">
          {product.title}
        </h3>
        <span className="bg-emerald-200 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded-full">
          {product.score}
        </span>
      </div>
      <div className="bg-emerald-50 text-sm p-2 rounded-lg flex justify-between items-center text-emerald-800">
        <div className="flex items-center gap-1">
          <FaLeaf className="text-green-600" />
          <span>Low Carbon Choice</span>
        </div>
        <span className="font-medium">~2.1 kg CO₂ saved</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-yellow-600 font-medium">Earn +85 pts</p>
        <button
          className="bg-emerald-600 text-white text-sm px-4 py-1 rounded-xl hover:bg-emerald-700 transition"
          onClick={() => window.open(product.url, "_blank")}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const searchEnabled = searchQuery.trim().length > 0;

  const { data: searchResults = [], isLoading: isSearchLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () =>
      fetch(
        `http://127.0.0.1:5050/api/recommendations?category=${encodeURIComponent(
          searchQuery
        )}`
      ).then((res) => res.json()),
    enabled: searchEnabled,
  });

  // Fetch each homepage category separately
  const homepageRecommendations = useQueries({
    queries: HOMEPAGE_CATEGORIES.map((category) => ({
      queryKey: ["recommendation", category],
      queryFn: () =>
        fetch(
          `http://127.0.0.1:5050/api/recommendations?category=${category}`
        ).then((res) => res.json()),
    })),
  });

  const navigate = useNavigate();


  return (

    <div className="p-4 space-y-4 pb-20">
      {/* 🔍 Search bar + Back icon */}
      <div className="sticky top-0 bg-white z-10 pb-4">
        <div className="flex items-center gap-2">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="bg-emerald-100 border border-emerald-300 text-emerald-700 p-2 rounded-lg hover:bg-emerald-200 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 text-emerald-500" />
            <Input
              placeholder="Search eco-friendly products..."
              className="pl-10 bg-emerald-100 border border-emerald-300 text-emerald-900 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>



      {/* Search Results */}
      {searchEnabled ? (
        <div className="space-y-4">
          <h2 className="text-base font-semibold text-emerald-900">
            Search Results
          </h2>

          {isSearchLoading ? (
            <p className="text-emerald-600">Loading...</p>
          ) : searchResults.length === 0 ? (
            <p className="text-red-600">No results found.</p>
          ) : (
            searchResults.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))
          )}
        </div>
      ) : (
        // Homepage Recommendations
        <div className="space-y-8">
          {homepageRecommendations.map((query, index) => (
            <div key={HOMEPAGE_CATEGORIES[index]}>
              <h3 className="text-lg font-semibold mb-2 text-emerald-800">
                Recommended for {HOMEPAGE_CATEGORIES[index]}
              </h3>
              {query.isLoading ? (
                <p className="text-emerald-600">Loading...</p>
              ) : (
                query.data.map((product, i) => (
                  <ProductCard key={i} product={product} />
                ))
              )}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
