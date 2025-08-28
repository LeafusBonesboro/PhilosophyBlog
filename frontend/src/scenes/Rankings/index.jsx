import React, { useState, useEffect } from "react";

export default function RankingsScene() {
  const [players, setPlayers] = useState([]);
  const [position, setPosition] = useState("Overall");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://ffopt-render.onrender.com/teams/rankings")

      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const filteredPlayers = players.filter(
    (p) =>
      (position === "Overall" || p.position === position) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // --- position → color mapping ---
  const positionColors = {
    WR: "bg-pink-600",
    RB: "bg-blue-600",
    QB: "bg-green-600",
    TE: "bg-purple-600",
  };

  return (
    <div className="p-6 font-poppins text-text-default bg-background min-h-screen">
      {/* Header */}
<div className="flex flex-wrap gap-4 md:gap-6 mb-6 w-full">
  {/* Format */}
  <div className="flex flex-col w-1/2 sm:w-auto">
    <label className="text-sm mb-1">Format:</label>
    <select className="px-3 py-2 rounded bg-[#1c1c1c] text-white border border-[#3a2e2e]">
      <option>2025</option>
      <option>2024</option>
    </select>
  </div>

  {/* Positions */}
  <div className="flex flex-col w-full sm:w-auto">
    <label className="text-sm mb-1">Positions:</label>
    <div className="flex flex-wrap gap-2">
      {["Overall", "QB", "RB", "WR", "TE"].map((pos) => (
        <button
          key={pos}
          onClick={() => setPosition(pos)}
          className={`px-4 py-1 rounded-lg font-medium border border-[#3a2e2e]
            ${
              position === pos
                ? "bg-flockOrange text-white"
                : "bg-[#1c1c1c] text-gray-300 hover:bg-[#292929]"
            }`}
        >
          {pos}
        </button>
      ))}
    </div>
  </div>

  {/* Sort By */}
  <div className="flex flex-col w-1/2 sm:w-auto">
    <label className="text-sm mb-1">Sort by:</label>
    <select className="px-3 py-2 rounded bg-[#1c1c1c] text-white border border-[#3a2e2e]">
      <option>Expert</option>
      <option>ADP</option>
    </select>
  </div>

  {/* Filters */}
  <div className="flex flex-col w-1/2 sm:w-auto">
    <label className="text-sm mb-1">Filters:</label>
    <select className="px-3 py-2 rounded bg-[#1c1c1c] text-white border border-[#3a2e2e]">
      <option>0 active</option>
    </select>
  </div>

  {/* Search Bar */}
  <div className="flex flex-col w-full sm:flex-1">
    <label className="text-sm mb-1 invisible">Search</label>
    <input
      type="text"
      placeholder="Search for a player..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 rounded bg-[#1c1c1c] text-white border border-[#3a2e2e] 
                 placeholder-gray-400 focus:ring-2 focus:ring-flockOrange w-full"
    />
  </div>
</div>



      {/* Player List */}
      <div className="space-y-3">
        {filteredPlayers.map((p, i) => (
          <div
            key={i}
            className="relative bg-box rounded-[20px] border border-border-secondary-dark flex items-center p-3 hover:bg-[#1f1f1f] transition"
          >
            {/* Avatar */}
            <div className="w-[60px] h-[60px] bg-background overflow-hidden flex items-center justify-center relative rounded-[15px] mr-4 border border-border-secondary-light">
              <img
                src={
                  p.imageUrl ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${p.name}`
                }
                alt={p.name}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[1.2] w-auto h-auto max-w-[120%] max-h-[120%]"
              />
            </div>

            {/* Name + Bubbles */}
            <div className="flex-1">
              <p className="font-semibold text-white text-[15px] truncate">
                {i + 1}. {p.name}
              </p>

              <div className="flex gap-2 mt-1 flex-wrap">
                {/* Position bubble */}
                <span
                  className={`px-[6px] py-[2px] text-[12px] rounded bg-opacity-90 text-white border border-border-secondary-light ${
                    positionColors[p.position] || "bg-gray-600"
                  }`}
                >
                  {p.position} {p.rankPos || ""}
                </span>

                {/* Expert bubble */}
                <span className="px-[6px] py-[2px] text-[12px] rounded bg-accent text-white border border-border-secondary-light">
                  Expert: {p.expertRank || i + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
