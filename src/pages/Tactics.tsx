import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePlayers, Player } from "../hooks/usePlayers";
import { useTeam } from "../hooks/useTeam";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { 
  Shield, 
  Target, 
  Zap, 
  Activity, 
  Settings, 
  ChevronRight,
  Info,
  Save,
  UserCheck,
  RefreshCw,
  Clock,
  CheckCircle2
} from "lucide-react";

export default function Tactics() {
  const { players, loading: playersLoading } = usePlayers();
  const { teamData, loading: teamLoading } = useTeam();
  const [saving, setSaving] = useState(false);

  // Local state for tactics
  const [tactics, setTactics] = useState({
    offensiveStyle: "Balanced",
    defensiveStyle: "Man-to-Man",
    tempo: "Normal",
    focus: "Mixed",
    intensity: "Normal"
  });

  // Local state for rotation logic
  const [rotation, setRotation] = useState({
    subFrequency: "Normal",
    energyThreshold: 60,
    benchUsage: "Balanced"
  });

  useEffect(() => {
    if (teamData?.tactics) {
      setTactics(prev => ({ ...prev, ...teamData.tactics }));
    }
    if (teamData?.rotationLogic) {
      setRotation(prev => ({ ...prev, ...teamData.rotationLogic }));
    }
  }, [teamData]);

  const handleSave = async () => {
    if (!teamData?.id) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'teams', teamData.id), {
        tactics,
        rotationLogic: rotation
      });
      alert("Tactics and Rotation Logic saved successfully!");
    } catch (error) {
      console.error("Error saving tactics:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleRoster = async (player: Player) => {
    try {
      const rosterCount = players.filter(p => p.isRoster).length;
      if (!player.isRoster && rosterCount >= 12) {
        alert("You can only have 12 players in the active roster.");
        return;
      }
      await updateDoc(doc(db, 'players', player.id), {
        isRoster: !player.isRoster
      });
    } catch (error) {
      console.error("Error toggling roster:", error);
    }
  };

  if (playersLoading || teamLoading) {
    return (
      <div className="p-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const rosterPlayers = players.filter(p => p.isRoster);

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tactics Center</h1>
          <p className="text-zinc-500">Define your team's identity and game-day rotation.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="btn-primary flex items-center gap-2"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Tactics
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Roster Selection */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-basketball-orange" />
                Match Roster (12 Players)
              </h2>
              <span className="text-sm font-bold px-3 py-1 bg-orange-100 text-basketball-orange rounded-full">
                {rosterPlayers.length} / 12 Selected
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {players.map((player) => (
                <div 
                  key={player.id}
                  onClick={() => handleToggleRoster(player)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    player.isRoster 
                      ? 'border-basketball-orange bg-orange-50' 
                      : 'border-zinc-100 hover:border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      player.isRoster ? 'bg-basketball-orange text-white' : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {player.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{player.name}</p>
                      <p className="text-xs text-zinc-500">{player.position} · Rating: {player.overall}</p>
                    </div>
                  </div>
                  {player.isStarter && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
                      Starter
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Rotation Logic */}
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              Rotation Logic
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Sub Frequency</label>
                <select 
                  value={rotation.subFrequency}
                  onChange={(e) => setRotation({...rotation, subFrequency: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Energy Threshold</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="30" 
                    max="90" 
                    value={rotation.energyThreshold}
                    onChange={(e) => setRotation({...rotation, energyThreshold: parseInt(e.target.value)})}
                    className="flex-1 accent-basketball-orange" 
                  />
                  <span className="font-bold w-12 text-center">{rotation.energyThreshold}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Bench Usage</label>
                <select 
                  value={rotation.benchUsage}
                  onChange={(e) => setRotation({...rotation, benchUsage: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Starters Only</option>
                  <option>Balanced</option>
                  <option>Deep Rotation</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Tactical Settings */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-basketball-orange" />
              Offensive Tactics
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Style</label>
                <select 
                  value={tactics.offensiveStyle}
                  onChange={(e) => setTactics({...tactics, offensiveStyle: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Balanced</option>
                  <option>Fast Break</option>
                  <option>Half-Court Set</option>
                  <option>Pick & Roll Heavy</option>
                  <option>Iso-Ball</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Tempo</label>
                <select 
                  value={tactics.tempo}
                  onChange={(e) => setTactics({...tactics, tempo: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Slow</option>
                  <option>Normal</option>
                  <option>Fast</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              Defensive Tactics
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Style</label>
                <select 
                  value={tactics.defensiveStyle}
                  onChange={(e) => setTactics({...tactics, defensiveStyle: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Man-to-Man</option>
                  <option>2-3 Zone</option>
                  <option>3-2 Zone</option>
                  <option>Full Court Press</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Intensity</label>
                <select 
                  value={tactics.intensity}
                  onChange={(e) => setTactics({...tactics, intensity: e.target.value})}
                  className="w-full p-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                >
                  <option>Conservative</option>
                  <option>Normal</option>
                  <option>Aggressive</option>
                </select>
              </div>
            </div>
          </section>

          <div className="card bg-orange-50 border-orange-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-basketball-orange mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-basketball-orange mb-1">Tactical Effectiveness</p>
                <p className="text-zinc-600 leading-relaxed">
                  Your team's chemistry ({(teamData?.chemistry || 0)}%) and momentum ({(teamData?.momentum || 0)}%) determine how well these tactics are executed on the court.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
