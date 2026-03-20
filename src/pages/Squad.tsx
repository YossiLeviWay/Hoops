import { motion } from "motion/react";
import { 
  Users, 
  Heart, 
  Zap, 
  Activity, 
  ChevronRight,
  Shield,
  Target,
  Eye,
  Info
} from "lucide-react";

const mockPlayers = [
  { id: "1", name: "Mike Smith", pos: "SG", fatigue: 12, form: 85, minutes: 450, rating: 88, status: "Active", height: "198cm", nationality: "USA" },
  { id: "2", name: "John Doe", pos: "C", fatigue: 45, form: 72, minutes: 380, rating: 84, status: "Injured", height: "211cm", nationality: "Canada" },
  { id: "3", name: "Alex Johnson", pos: "PG", fatigue: 25, form: 91, minutes: 420, rating: 90, status: "Active", height: "188cm", nationality: "UK" },
  { id: "4", name: "Kevin Durant", pos: "SF", fatigue: 30, form: 88, minutes: 400, rating: 92, status: "Active", height: "208cm", nationality: "USA" },
  { id: "5", name: "Nikola Jokic", pos: "C", fatigue: 15, form: 95, minutes: 460, rating: 96, status: "Active", height: "211cm", nationality: "Serbia" },
];

export default function Squad() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Squad Management</h1>
          <p className="text-zinc-500">Manage your 12-man roster and monitor player fitness.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-primary">Set Captain</button>
          <button className="px-6 py-2 bg-white border border-orange-100 rounded-xl font-semibold shadow-sm hover:bg-orange-50 transition-all">
            Intensive Training
          </button>
        </div>
      </header>

      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-basketball-orange text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Team Chemistry</h3>
            <Users className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-4xl font-bold mb-4">78%</div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: "78%" }} />
          </div>
          <p className="text-xs mt-4 opacity-80">Higher chemistry improves tactical execution.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Motivation</h3>
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-4xl font-bold mb-4">85%</div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: "85%" }} />
          </div>
          <p className="text-xs mt-4 text-zinc-500">Influenced by wins and staff character.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Momentum</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-4xl font-bold mb-4">62%</div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: "62%" }} />
          </div>
          <p className="text-xs mt-4 text-zinc-500">Based on current form and fitness.</p>
        </div>
      </div>

      {/* Player List */}
      <section className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-orange-50 flex items-center justify-between bg-orange-50/30">
          <h2 className="text-xl font-bold">Active Roster</h2>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Healthy</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500" /> Injured</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-orange-50">
                <th className="px-6 py-4">Player</th>
                <th className="px-6 py-4">Pos</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Fatigue</th>
                <th className="px-6 py-4">Form</th>
                <th className="px-6 py-4">Season Mins</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {mockPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-orange-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-basketball-orange">
                        {player.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{player.name}</p>
                        <p className="text-xs text-zinc-500">{player.nationality} · {player.height}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-100 rounded-md text-xs font-bold text-zinc-600">
                      {player.pos}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg">{player.rating}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${player.fatigue > 40 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${player.fatigue}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{player.fatigue}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      {player.form}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-zinc-600">
                    {player.minutes}m
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      player.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {player.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-white rounded-xl shadow-sm border border-transparent hover:border-orange-100 transition-all opacity-0 group-hover:opacity-100">
                      <Eye className="w-4 h-4 text-zinc-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Team Abilities Summary */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-basketball-orange" />
            Offensive Profile
          </h2>
          <div className="space-y-4">
            {[
              { label: "Shooting", value: 82 },
              { label: "Passing", value: 75 },
              { label: "Inside Scoring", value: 88 },
              { label: "Ball Handling", value: 70 },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-sm font-bold">
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-basketball-orange" style={{ width: `${stat.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Defensive Profile
          </h2>
          <div className="space-y-4">
            {[
              { label: "Perimeter Defense", value: 78 },
              { label: "Interior Defense", value: 85 },
              { label: "Rebounding", value: 92 },
              { label: "Steals/Blocks", value: 65 },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="flex justify-between text-sm font-bold">
                  <span>{stat.label}</span>
                  <span>{stat.value}</span>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${stat.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TrendingUp(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}
