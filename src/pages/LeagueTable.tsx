import React from "react";
import { motion } from "motion/react";
import { 
  Trophy, 
  ArrowUp, 
  ArrowDown, 
  ChevronRight,
  Info,
  Star
} from "lucide-react";

const mockTeams = [
  { rank: 1, name: "Team A", points: 32, played: 18, wins: 14, losses: 4, gf: 1850, ga: 1600, gd: 250, reputation: 55 },
  { rank: 2, name: "City Hawks", points: 30, played: 18, wins: 12, losses: 6, gf: 1780, ga: 1620, gd: 160, reputation: 48 },
  { rank: 3, name: "Rivals FC", points: 28, played: 18, wins: 10, losses: 8, gf: 1720, ga: 1680, gd: 40, reputation: 42 },
  { rank: 4, name: "Beach Ballers", points: 26, played: 18, wins: 9, losses: 9, gf: 1650, ga: 1640, gd: 10, reputation: 38 },
  { rank: 5, name: "Mountain Kings", points: 24, played: 18, wins: 8, losses: 10, gf: 1600, ga: 1620, gd: -20, reputation: 35 },
  { rank: 6, name: "Desert Suns", points: 22, played: 18, wins: 7, losses: 11, gf: 1580, ga: 1650, gd: -70, reputation: 30 },
  { rank: 7, name: "Forest Bears", points: 20, played: 18, wins: 6, losses: 12, gf: 1520, ga: 1680, gd: -160, reputation: 25 },
  { rank: 8, name: "Ocean Waves", points: 18, played: 18, wins: 5, losses: 13, gf: 1480, ga: 1720, gd: -240, reputation: 20 },
  { rank: 9, name: "Sky Flyers", points: 16, played: 18, wins: 4, losses: 14, gf: 1450, ga: 1750, gd: -300, reputation: 15 },
  { rank: 10, name: "Ground Hogs", points: 14, played: 18, wins: 3, losses: 15, gf: 1400, ga: 1800, gd: -400, reputation: 10 },
];

export default function LeagueTable() {
  const [league, setLeague] = React.useState("Liga C");

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">League Standings</h1>
          <p className="text-zinc-500">Season 2026 · 18 Matches Total</p>
        </div>
        <div className="flex bg-white border border-orange-100 rounded-xl p-1 shadow-sm">
          {["Liga A", "Liga B", "Liga C"].map((l) => (
            <button 
              key={l}
              onClick={() => setLeague(l)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${league === l ? 'bg-basketball-orange text-white shadow-md' : 'text-zinc-500 hover:text-basketball-orange'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Table Content */}
        <div className="lg:col-span-3 space-y-6">
          <section className="card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-orange-50 bg-orange-50/30">
                    <th className="px-6 py-4 w-16">Rank</th>
                    <th className="px-6 py-4">Team</th>
                    <th className="px-6 py-4 text-center">P</th>
                    <th className="px-6 py-4 text-center">W</th>
                    <th className="px-6 py-4 text-center">L</th>
                    <th className="px-6 py-4 text-center">GF</th>
                    <th className="px-6 py-4 text-center">GA</th>
                    <th className="px-6 py-4 text-center">GD</th>
                    <th className="px-6 py-4 text-center">Pts</th>
                    <th className="px-6 py-4 text-right">Rep</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                  {mockTeams.map((team) => (
                    <tr 
                      key={team.name} 
                      className={`group hover:bg-orange-50/50 transition-all cursor-pointer ${team.name === 'Team A' ? 'bg-orange-50/30' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-lg ${team.rank <= 2 ? 'text-emerald-600' : team.rank >= 9 ? 'text-red-600' : 'text-zinc-400'}`}>
                            {team.rank}
                          </span>
                          {team.rank <= 2 && <ArrowUp className="w-3 h-3 text-emerald-500" />}
                          {team.rank >= 9 && <ArrowDown className="w-3 h-3 text-red-500" />}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${team.name === 'Team A' ? 'bg-basketball-orange text-white' : 'bg-zinc-100 text-zinc-500'}`}>
                            {team.name[0]}
                          </div>
                          <span className={`font-bold ${team.name === 'Team A' ? 'text-basketball-orange' : 'text-zinc-700'}`}>
                            {team.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-zinc-500">{team.played}</td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-zinc-700">{team.wins}</td>
                      <td className="px-6 py-4 text-center text-sm font-bold text-zinc-700">{team.losses}</td>
                      <td className="px-6 py-4 text-center text-sm text-zinc-500">{team.gf}</td>
                      <td className="px-6 py-4 text-center text-sm text-zinc-500">{team.ga}</td>
                      <td className={`px-6 py-4 text-center text-sm font-bold ${team.gd > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {team.gd > 0 ? `+${team.gd}` : team.gd}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-zinc-900 text-white rounded-lg font-bold text-sm">
                          {team.points}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 text-xs font-bold text-purple-600">
                          <Star className="w-3 h-3 fill-purple-600" />
                          {team.reputation}/100
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Sidebar: League Info */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-basketball-orange" />
              Promotion & Relegation
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                  <ArrowUp className="w-4 h-4" />
                  Promotion Zone
                </div>
                <p className="text-xs text-emerald-600">Top 2 teams are promoted to Liga B at the end of the season.</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
                  <ArrowDown className="w-4 h-4" />
                  Relegation Zone
                </div>
                <p className="text-xs text-red-600">Bottom 2 teams are replaced by new BOT teams for the next season.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Scoring System
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl">
                <span className="text-sm font-bold text-zinc-600">Win</span>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-lg font-bold text-xs">2 Points</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-50 rounded-xl">
                <span className="text-sm font-bold text-zinc-600">Loss</span>
                <span className="px-3 py-1 bg-zinc-400 text-white rounded-lg font-bold text-xs">1 Point</span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-relaxed">
                Tie-breakers are determined by Goal Differential (GD), then total Points Scored (GF).
              </p>
            </div>
          </section>

          <section className="card bg-purple-900 text-white">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Reputation Impact
            </h2>
            <p className="text-xs text-purple-200 leading-relaxed">
              Defeating high-reputation teams grants significant bonuses to Motivation and a temporary boost to your team's Reputation score.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
