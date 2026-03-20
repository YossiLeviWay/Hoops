import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { usePlayers, Player } from "../hooks/usePlayers";
import { useTeam } from "../hooks/useTeam";
import { doc, updateDoc, writeBatch, collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { 
  Users, 
  Heart, 
  Zap, 
  Activity, 
  ChevronRight,
  Shield,
  Target,
  Eye,
  Info,
  TrendingUp,
  Star,
  UserCheck
} from "lucide-react";

export default function Squad() {
  const { players, loading: playersLoading } = usePlayers();
  const { teamData, loading: teamLoading } = useTeam();

  const handleSetCaptain = async (playerId: string) => {
    try {
      const batch = writeBatch(db);
      // Unset current captain
      players.forEach(p => {
        if (p.isCaptain) {
          batch.update(doc(db, 'players', p.id), { isCaptain: false });
        }
      });
      // Set new captain
      batch.update(doc(db, 'players', playerId), { isCaptain: true });
      await batch.commit();
    } catch (error) {
      console.error("Error setting captain:", error);
    }
  };

  const handleToggleStarter = async (player: Player) => {
    try {
      const startersCount = players.filter(p => p.isStarter).length;
      if (!player.isStarter && startersCount >= 5) {
        alert("You can only have 5 starters.");
        return;
      }
      await updateDoc(doc(db, 'players', player.id), {
        isStarter: !player.isStarter
      });
    } catch (error) {
      console.error("Error toggling starter:", error);
    }
  };

  const calculateTeamStat = (stat: keyof Player['attributes']) => {
    if (players.length === 0) return 0;
    const starters = players.filter(p => p.isStarter);
    const targetPlayers = starters.length > 0 ? starters : players;
    const sum = targetPlayers.reduce((acc, p) => acc + p.attributes[stat], 0);
    return Math.round(sum / targetPlayers.length);
  };

  if (playersLoading || teamLoading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Squad Management</h1>
          <p className="text-zinc-500">Manage your 12-man roster and monitor player fitness.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/training" className="px-6 py-2 bg-white border border-orange-100 rounded-xl font-semibold shadow-sm hover:bg-orange-50 transition-all">
            Intensive Training
          </Link>
        </div>
      </header>

      {/* Team Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-basketball-orange text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Team Chemistry</h3>
            <Users className="w-5 h-5 opacity-60" />
          </div>
          <div className="text-4xl font-bold mb-4">{teamData?.chemistry || 0}%</div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${teamData?.chemistry || 0}%` }} />
          </div>
          <p className="text-xs mt-4 opacity-80">Higher chemistry improves tactical execution.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Motivation</h3>
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-4xl font-bold mb-4">{teamData?.motivation || 0}%</div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: `${teamData?.motivation || 0}%` }} />
          </div>
          <p className="text-xs mt-4 text-zinc-500">Influenced by wins and staff character.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Momentum</h3>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-4xl font-bold mb-4">{teamData?.momentum || 0}%</div>
          <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500" style={{ width: `${teamData?.momentum || 0}%` }} />
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
                <th className="px-6 py-4">Energy</th>
                <th className="px-6 py-4">Form</th>
                <th className="px-6 py-4">Starter</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-50">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-orange-50/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-basketball-orange">
                          {player.name[0]}
                        </div>
                        {player.isCaptain && (
                          <div className="absolute -top-1 -right-1 bg-yellow-400 text-white rounded-full p-0.5">
                            <Star className="w-3 h-3 fill-current" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{player.name}</p>
                        <p className="text-xs text-zinc-500">{player.nationality} · {player.height}cm</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-100 rounded-md text-xs font-bold text-zinc-600">
                      {player.position}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-lg">{player.overall}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${player.energy < 40 ? 'bg-red-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${player.energy}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold">{player.energy}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                      <TrendingUp className="w-4 h-4" />
                      {player.form}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleStarter(player)}
                      className={`p-2 rounded-xl transition-all ${player.isStarter ? 'bg-basketball-orange text-white' : 'bg-zinc-100 text-zinc-400 hover:bg-orange-100'}`}
                    >
                      <UserCheck className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleSetCaptain(player.id)}
                        className={`p-2 rounded-xl border ${player.isCaptain ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-white border-orange-100 text-zinc-400 hover:text-yellow-600'}`}
                        title="Set as Captain"
                      >
                        <Star className={`w-4 h-4 ${player.isCaptain ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 bg-white border border-orange-100 rounded-xl text-zinc-400 hover:text-basketball-orange hover:border-basketball-orange transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
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
              { label: "Shooting", value: calculateTeamStat('shooting') },
              { label: "Passing", value: calculateTeamStat('passing') },
              { label: "Athleticism", value: calculateTeamStat('athleticism') },
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
              { label: "Defense", value: calculateTeamStat('defense') },
              { label: "Rebounding", value: calculateTeamStat('rebounding') },
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
