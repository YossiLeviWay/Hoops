import React from "react";
import { motion } from "motion/react";
import { 
  Trophy, 
  Users, 
  Target, 
  Shield, 
  Zap, 
  Clock, 
  ChevronRight,
  Info,
  CheckCircle2
} from "lucide-react";

const mockPlayers = [
  { id: "1", name: "Mike Smith", pos: "SG", rating: 88, fatigue: 12 },
  { id: "2", name: "John Doe", pos: "C", rating: 84, fatigue: 45 },
  { id: "3", name: "Alex Johnson", pos: "PG", rating: 90, fatigue: 25 },
  { id: "4", name: "Kevin Durant", pos: "SF", rating: 92, fatigue: 30 },
  { id: "5", name: "Nikola Jokic", pos: "C", rating: 96, fatigue: 15 },
  { id: "6", name: "Stephen Curry", pos: "PG", rating: 94, fatigue: 20 },
  { id: "7", name: "Giannis Antetokounmpo", pos: "PF", rating: 95, fatigue: 35 },
  { id: "8", name: "Joel Embiid", pos: "C", rating: 93, fatigue: 40 },
  { id: "9", name: "Luka Doncic", pos: "PG", rating: 91, fatigue: 28 },
  { id: "10", name: "Jayson Tatum", pos: "SF", rating: 89, fatigue: 22 },
  { id: "11", name: "Devin Booker", pos: "SG", rating: 87, fatigue: 18 },
  { id: "12", name: "Jimmy Butler", pos: "SF", rating: 86, fatigue: 32 },
];

export default function Tactics() {
  const [selectedPlayers, setSelectedPlayers] = React.useState<string[]>(mockPlayers.map(p => p.id));
  const [startingFive, setStartingFive] = React.useState<string[]>(mockPlayers.slice(0, 5).map(p => p.id));
  const [playingStyle, setPlayingStyle] = React.useState("Pace & Space");
  const [defensiveStyle, setDefensiveStyle] = React.useState("Man-to-Man");

  const styles = [
    { name: "Pace & Space", desc: "Maximizes possessions, prioritizes 3-pointers and fast-break opportunities.", impact: "Aggressive / Visionary" },
    { name: "Half-Court Sets", desc: "Focuses on methodical, structured plays, minimizing turnovers.", impact: "Detail-Oriented / Conservative" },
    { name: "Pick-and-Roll Focus", desc: "Heavy reliance on two-man action to create scoring opportunities.", impact: "Basketball IQ / Data-Driven" },
    { name: "Post-Up Oriented", desc: "Funnels offense through big men in the low post.", impact: "Stoic / Resourceful" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tactics Center</h1>
          <p className="text-zinc-500">Define your strategy and manage your match roster.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Strategy Validated
          </div>
          <button className="btn-primary">Save Tactics</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Match Roster & Starting 5 */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-basketball-orange" />
                Match Roster (12 Players)
              </h2>
              <span className="text-sm font-bold text-zinc-400">{selectedPlayers.length} / 12 Selected</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3">
              {mockPlayers.map((player) => (
                <div 
                  key={player.id}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    startingFive.includes(player.id) 
                      ? "border-basketball-orange bg-orange-50" 
                      : "border-orange-100 hover:border-orange-200 bg-white"
                  }`}
                  onClick={() => {
                    if (startingFive.includes(player.id)) {
                      setStartingFive(startingFive.filter(id => id !== player.id));
                    } else if (startingFive.length < 5) {
                      setStartingFive([...startingFive, player.id]);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      startingFive.includes(player.id) ? "bg-basketball-orange text-white" : "bg-orange-100 text-basketball-orange"
                    }`}>
                      {player.pos}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{player.name}</p>
                      <p className="text-xs text-zinc-500">Rating: {player.rating}</p>
                    </div>
                  </div>
                  {startingFive.includes(player.id) && (
                    <span className="text-[10px] font-bold uppercase bg-basketball-orange text-white px-2 py-0.5 rounded-full">
                      Starter
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Playing Styles */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Core Playing Style</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {styles.map((style) => (
                <div 
                  key={style.name}
                  className={`card cursor-pointer transition-all ${
                    playingStyle === style.name ? "border-basketball-orange ring-1 ring-basketball-orange" : "hover:border-orange-200"
                  }`}
                  onClick={() => setPlayingStyle(style.name)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold">{style.name}</h3>
                    {playingStyle === style.name && <CheckCircle2 className="w-5 h-5 text-basketball-orange" />}
                  </div>
                  <p className="text-sm text-zinc-500 mb-4">{style.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    <Info className="w-3 h-3" />
                    Impacted by: {style.impact}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Tactical Overview */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Tactical Effectiveness
            </h2>
            
            <div className="space-y-6">
              <div className="text-center p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-sm text-zinc-500 font-medium">Predicted Compatibility</p>
                <p className="text-2xl font-bold text-basketball-orange mt-1">High Compatibility</p>
                <p className="text-xs text-zinc-400 mt-2">Your Head Coach excels in {playingStyle} schemes.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase text-zinc-400 tracking-widest">Defensive Strategy</h3>
                <div className="grid grid-cols-1 gap-2">
                  {["Man-to-Man", "Zone (2-3)", "Full-Court Press"].map((def) => (
                    <button 
                      key={def}
                      onClick={() => setDefensiveStyle(def)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                        defensiveStyle === def ? "bg-basketball-orange text-white" : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
                      }`}
                    >
                      {def}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-2">
                  <Shield className="w-4 h-4" />
                  Defensive Focus
                </div>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Current Man-to-Man setup will prioritize perimeter coverage. Good against high-shooting teams.
                </p>
              </div>
            </div>
          </section>

          <section className="card bg-zinc-900 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              Rotation Logic
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Fatigue Threshold</span>
                <span className="font-bold">60%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400" style={{ width: "60%" }} />
              </div>
              <p className="text-xs text-zinc-500">Players will be subbed out automatically when fatigue exceeds this limit.</p>
              
              <div className="pt-4 border-t border-zinc-800">
                <p className="text-sm font-bold mb-2">Substitution Strategy</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-orange-400 text-zinc-900 rounded-lg text-xs font-bold">Flow Rotation</button>
                  <button className="flex-1 py-2 bg-zinc-800 text-zinc-400 rounded-lg text-xs font-bold">Fixed Rotation</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
