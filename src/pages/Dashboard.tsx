import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useTeam } from "../hooks/useTeam";
import { useUser } from "../hooks/useUser";
import { useState, useEffect } from "react";
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  onSnapshot
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  AlertCircle, 
  Trophy, 
  ChevronRight,
  Activity,
  Heart,
  Zap,
  Coins
} from "lucide-react";

export default function Dashboard() {
  const { teamData, loading: teamLoading } = useTeam();
  const { userData, loading: userLoading } = useUser();
  const [nextMatch, setNextMatch] = useState<any>(null);
  const [recentMatches, setRecentMatches] = useState<any[]>([]);
  const [topPlayers, setTopPlayers] = useState<any[]>([]);

  useEffect(() => {
    if (!userData) return;

    // Fetch Next Match
    const nextMatchQuery = query(
      collection(db, 'matches'),
      where('status', '==', 'scheduled'),
      orderBy('date', 'asc'),
      limit(1)
    );

    const unsubscribeNext = onSnapshot(nextMatchQuery, (snap) => {
      if (!snap.empty) {
        setNextMatch(snap.docs[0].data());
      }
    });

    // Fetch Recent Matches
    const recentMatchesQuery = query(
      collection(db, 'matches'),
      where('status', '==', 'finished'),
      orderBy('date', 'desc'),
      limit(3)
    );

    const unsubscribeRecent = onSnapshot(recentMatchesQuery, (snap) => {
      setRecentMatches(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    // Fetch Top Players
    const topPlayersQuery = query(
      collection(db, 'players'),
      where('teamId', '==', auth.currentUser?.uid),
      orderBy('overall', 'desc'),
      limit(3)
    );

    const unsubscribePlayers = onSnapshot(topPlayersQuery, (snap) => {
      setTopPlayers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeNext();
      unsubscribeRecent();
      unsubscribePlayers();
    };
  }, [userData]);

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
            <span className="text-sm font-bold text-basketball-orange">
              {nextMatch ? `Next Match: ${new Date(nextMatch.date).toLocaleDateString()}` : "No matches scheduled"}
            </span>
          </div>
          <Link to="/tactics" className="btn-primary py-2 px-4 text-sm">View Tactics</Link>
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
              <Link to="/league" className="text-basketball-orange font-bold text-sm flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-4">
              {recentMatches.length > 0 ? recentMatches.map((m) => (
                <div key={m.id} className="card flex items-center justify-between hover:border-basketball-orange transition-all cursor-pointer">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-xs text-zinc-400 font-bold uppercase">{new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="text-lg font-bold">{m.score.home > m.score.away ? 'W' : 'L'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold truncate max-w-[100px]">{m.homeTeamId === auth.currentUser?.uid ? teamData?.name : "Opponent"}</p>
                        <p className="text-xs text-zinc-500">Home</p>
                      </div>
                      <div className="px-3 py-1 bg-zinc-100 rounded-lg font-bold text-lg">
                        {m.score.home} - {m.score.away}
                      </div>
                      <div>
                        <p className="font-bold truncate max-w-[100px]">{m.awayTeamId === auth.currentUser?.uid ? teamData?.name : "Opponent"}</p>
                        <p className="text-xs text-zinc-500">Away</p>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-orange-50 rounded-xl transition-all">
                    <Activity className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              )) : (
                <div className="card text-center py-10 text-zinc-500">
                  No recent matches. Season starts soon!
                </div>
              )}
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
                    <h3 className="font-bold">Season Start</h3>
                    <p className="text-sm text-zinc-500 mt-1">The new season kicks off on March 21st. Make sure your squad is ready!</p>
                  </div>
                </div>
              </div>
              <div className="card border-l-4 border-l-emerald-500">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Training Focus</h3>
                    <p className="text-sm text-zinc-500 mt-1">Intensive individual training is now available in the Training menu.</p>
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
              {topPlayers.length > 0 ? topPlayers.map((player, i) => (
                <Link to={`/squad`} key={player.id} className="flex items-center gap-3 hover:bg-orange-50 p-2 rounded-xl transition-all">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-basketball-orange">
                    {player.name[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{player.name}</p>
                    <p className="text-xs text-zinc-500">{player.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-basketball-orange">{player.overall} OVR</p>
                  </div>
                </Link>
              )) : (
                <p className="text-sm text-zinc-500">No players found.</p>
              )}
            </div>
            <Link to="/squad" className="block w-full mt-6 py-3 text-sm font-bold text-center text-zinc-500 hover:text-basketball-orange transition-all border-t border-orange-50">
              View Full Squad
            </Link>
          </section>

          {/* Community News */}
          <section className="card bg-basketball-orange text-white">
            <h2 className="text-xl font-bold mb-4">League News</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Season 2026</p>
                <p className="font-medium mt-1">Transfer window is open! Bot teams are actively listing players.</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Economy</p>
                <p className="font-medium mt-1">Ticket prices now affect fan attendance and revenue. Check your Fans menu.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
