import { motion } from "motion/react";
import { useTeam } from "../hooks/useTeam";
import { useUser } from "../hooks/useUser";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle, 
  Trophy, 
  ChevronRight,
  Activity,
  Heart,
  Zap
} from "lucide-react";

export default function Dashboard() {
  const { teamData, loading: teamLoading } = useTeam();
  const { userData, loading: userLoading } = useUser();

  const stats = [
    { name: "Motivation", value: teamData?.motivation || 0, icon: Heart, color: "text-red-500", bg: "bg-red-50" },
    { name: "Momentum", value: teamData?.momentum || 0, icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
    { name: "Chemistry", value: teamData?.chemistry || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { name: "Reputation", value: teamData?.reputation || 0, icon: Trophy, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  if (teamLoading || userLoading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500">Welcome back, {userData?.teamName || "Manager"}</p>
        </div>
        <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-orange-100 shadow-sm">
          <div className="px-4 py-2 bg-orange-50 rounded-xl">
            <span className="text-sm font-bold text-basketball-orange">Next Match: 2d 14h</span>
          </div>
          <button className="btn-primary py-2 px-4 text-sm">View Tactics</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4"
          >
            <div className={`p-3 rounded-2xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">{stat.name}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <div className="w-20 h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${stat.color.replace('text', 'bg')}`} 
                    style={{ width: `${stat.value}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Matches */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Matches</h2>
              <button className="text-basketball-orange font-bold text-sm flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid gap-4">
              {[1, 2].map((m) => (
                <div key={m} className="card flex items-center justify-between hover:border-basketball-orange transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-zinc-400 font-bold uppercase">Mar 17</p>
                      <p className="text-lg font-bold">W</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold">{teamData?.name || "Your Team"}</p>
                        <p className="text-xs text-zinc-500">Home</p>
                      </div>
                      <div className="px-3 py-1 bg-zinc-100 rounded-lg font-bold text-lg">
                        102 - 94
                      </div>
                      <div>
                        <p className="font-bold">Rivals FC</p>
                        <p className="text-xs text-zinc-500">Away</p>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-orange-50 rounded-xl transition-all">
                    <Activity className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Squad News */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Squad News</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card border-l-4 border-l-red-500">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Injury Alert</h3>
                    <p className="text-sm text-zinc-500 mt-1">John Doe (SF) suffered a minor ankle sprain. Expected out: 3 days.</p>
                  </div>
                </div>
              </div>
              <div className="card border-l-4 border-l-emerald-500">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Form Peak</h3>
                    <p className="text-sm text-zinc-500 mt-1">Mike Smith is showing exceptional form in training. Motivation +5.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Top Players */}
          <section className="card">
            <h2 className="text-xl font-bold mb-6">Top Players</h2>
            <div className="space-y-6">
              {[
                { name: "Mike Smith", stat: "24.5 PPG", pos: "SG" },
                { name: "John Doe", stat: "12.2 RPG", pos: "C" },
                { name: "Alex Johnson", stat: "8.4 APG", pos: "PG" },
              ].map((player, i) => (
                <div key={player.name} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-basketball-orange">
                    {player.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{player.name}</p>
                    <p className="text-xs text-zinc-500">{player.pos}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-basketball-orange">{player.stat}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-zinc-500 hover:text-basketball-orange transition-all border-t border-orange-50">
              View Full Squad
            </button>
          </section>

          {/* Community News */}
          <section className="card bg-basketball-orange text-white">
            <h2 className="text-xl font-bold mb-4">League News</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Liga C</p>
                <p className="font-medium mt-1">Transfer window opens in 5 days. Prepare your bids!</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Global</p>
                <p className="font-medium mt-1">New season rewards announced. Top 3 teams get stadium upgrades.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
