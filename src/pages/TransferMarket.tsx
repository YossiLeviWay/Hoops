import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useUser } from "../hooks/useUser";
import { collection, query, where, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { 
  Search, 
  Filter, 
  DollarSign, 
  Clock, 
  ChevronRight,
  ArrowUpRight,
  History,
  Tag,
  RefreshCw
} from "lucide-react";
import { Player } from "../hooks/usePlayers";

export default function TransferMarket() {
  const { userData } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [marketPlayers, setMarketPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "players"),
      where("onTransferList", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const playersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Player[];
      setMarketPlayers(playersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBuyPlayer = async (player: Player) => {
    if (!userData || !userData.id) return;
    if (userData.balance < player.transferPrice) {
      alert("Insufficient funds!");
      return;
    }

    setBuying(player.id);
    try {
      // 1. Deduct balance from buyer
      await updateDoc(doc(db, "users", userData.id), {
        balance: increment(-player.transferPrice)
      });

      // 2. Add balance to seller (if not bot)
      if (player.teamId) {
        // In a real app, we'd find the user who owns this team
        // For now, let's assume we just update the player
      }

      // 3. Update player ownership and status
      await updateDoc(doc(db, "players", player.id), {
        teamId: userData.id, // Assuming teamId is the userId for simplicity in this version
        onTransferList: false,
        isStarter: false,
        isRoster: false,
        isCaptain: false
      });

      alert(`Successfully purchased ${player.name}!`);
    } catch (error) {
      console.error("Error buying player:", error);
      alert("Failed to purchase player.");
    } finally {
      setBuying(null);
    }
  };

  const filteredPlayers = marketPlayers.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
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
          <h1 className="text-3xl font-bold tracking-tight">Transfer Market</h1>
          <p className="text-zinc-500">Buy and sell players to strengthen your squad.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 bg-white border border-orange-100 rounded-xl font-semibold shadow-sm hover:bg-orange-50 transition-all flex items-center gap-2">
            <History className="w-5 h-5" />
            Transfer History
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Tag className="w-5 h-5" />
            List Player
          </button>
        </div>
      </header>

      {/* Market Filters */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search players by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange bg-white shadow-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-orange-100 rounded-2xl font-bold text-sm text-zinc-600 hover:bg-orange-50 transition-all">
          <Filter className="w-5 h-5" />
          More Filters
        </button>
        <div className="flex items-center justify-center gap-2 px-6 py-3 bg-basketball-orange/10 border border-basketball-orange/20 rounded-2xl font-bold text-sm text-basketball-orange">
          <DollarSign className="w-5 h-5" />
          Balance: ${userData?.balance?.toLocaleString() || 0}
        </div>
      </div>

      {/* Market Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <motion.div 
              key={player.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card group hover:border-basketball-orange transition-all cursor-pointer flex flex-col"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-2xl bg-orange-50 flex items-center justify-center text-4xl font-bold text-basketball-orange overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${player.name}/400`} 
                    alt={player.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {player.position}
                </div>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-basketball-orange text-white rounded-lg text-xs font-bold shadow-md">
                  Rating: {player.overall}
                </div>
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-lg truncate">{player.name}</h3>
                <p className="text-xs text-zinc-500 font-medium">{player.nationality}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-orange-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">Asking Price</p>
                  <p className="text-lg font-bold text-basketball-orange">${player.transferPrice?.toLocaleString() || 0}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    Expires
                  </p>
                  <p className="text-sm font-bold text-zinc-600">48h</p>
                </div>
              </div>

              <button 
                onClick={() => handleBuyPlayer(player)}
                disabled={buying === player.id || (userData && userData.balance < player.transferPrice)}
                className="w-full mt-4 py-3 bg-zinc-900 text-white rounded-xl font-bold text-sm hover:bg-basketball-orange transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {buying === player.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Buy Player"}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto">
              <Search className="w-10 h-10 text-orange-200" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">No players found</h3>
            <p className="text-zinc-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Transfer Rules Info */}
      <section className="p-8 bg-zinc-900 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-basketball-orange/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Market Regulations</h2>
            <ul className="space-y-4">
              {[
                "Listings are active for a hard deadline of 72 hours.",
                "Listed players are unavailable for match selection.",
                "Successful sales incur a 5% league processing fee.",
                "Expired listings return to your squad automatically."
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                  <div className="w-5 h-5 rounded-full bg-basketball-orange/20 flex items-center justify-center text-basketball-orange text-xs font-bold mt-0.5">
                    {i + 1}
                  </div>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="font-bold mb-4">Quick Tip</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              High-reputation players sell faster but demand higher wages. Monitor your balance carefully before making big moves.
            </p>
            <button className="mt-6 text-basketball-orange font-bold text-sm flex items-center gap-2 hover:underline">
              Read Transfer Guide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
