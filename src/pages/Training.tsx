import React from "react";
import { motion } from "motion/react";
import { 
  Dumbbell, 
  Target, 
  Shield, 
  Zap, 
  Users, 
  Plus, 
  Minus, 
  AlertCircle,
  TrendingUp,
  Heart
} from "lucide-react";

const mockPlayers = [
  { id: "1", name: "Mike Smith", pos: "SG", ability: "3-Point Shooting", fatigue: 12 },
  { id: "2", name: "John Doe", pos: "C", ability: "Rebounding", fatigue: 45 },
  { id: "3", name: "Alex Johnson", pos: "PG", ability: "Passing Accuracy", fatigue: 25 },
];

export default function Training() {
  const [points, setPoints] = React.useState<Record<string, number>>({
    offensive: 20,
    defensive: 20,
    skill: 20,
    conditioning: 20,
    teamBuilding: 20,
  });

  const totalPoints = 100;
  const usedPoints = Object.values(points).reduce((a: number, b: number) => a + b, 0);

  const updatePoints = (key: string, delta: number) => {
    const currentVal = (points[key] as number) || 0;
    if (usedPoints + delta <= totalPoints && currentVal + delta >= 0) {
      setPoints({ ...points, [key]: currentVal + delta });
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training & Chemistry</h1>
          <p className="text-zinc-500">Allocate your weekly training focus and manage player fatigue.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-6 py-2 rounded-xl font-bold text-sm ${usedPoints === totalPoints ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}`}>
            Points: {usedPoints} / {totalPoints}
          </div>
          <button className="btn-primary">Apply Schedule</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Training Allocation */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-basketball-orange" />
              Weekly Focus Allocation
            </h2>
            <div className="space-y-6">
              {[
                { key: "offensive", label: "Offensive Schemes", icon: Target, color: "text-orange-500", desc: "Court Vision, Passing, IQ" },
                { key: "defensive", label: "Defensive Drills", icon: Shield, color: "text-blue-500", desc: "Perimeter, Interior, Help Defense" },
                { key: "skill", label: "Skill Work (Shooting)", icon: Zap, color: "text-yellow-500", desc: "3PT, Mid-Range, Free Throws" },
                { key: "conditioning", label: "Conditioning", icon: Heart, color: "text-red-500", desc: "Stamina, Fitness, Agility" },
                { key: "teamBuilding", label: "Team Building", icon: Users, color: "text-purple-500", desc: "Leadership, Chemistry, Patience" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-6 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className={`p-3 rounded-xl bg-white shadow-sm ${item.color}`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{item.label}</h3>
                    <p className="text-xs text-zinc-500">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => updatePoints(item.key as any, -5)}
                      className="p-2 hover:bg-white rounded-lg transition-all text-zinc-400 hover:text-red-500"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{points[item.key as keyof typeof points]}</span>
                    <button 
                      onClick={() => updatePoints(item.key as any, 5)}
                      className="p-2 hover:bg-white rounded-lg transition-all text-zinc-400 hover:text-emerald-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Intensive Individual Training */}
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Intensive Individual Training
            </h2>
            <p className="text-sm text-zinc-500 mb-6">Select up to 3 players to double their skill improvement rate. Note: Increases fatigue and injury risk.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {mockPlayers.map((player) => (
                <div key={player.id} className="p-4 bg-orange-50/50 border border-orange-100 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-basketball-orange mx-auto flex items-center justify-center text-white font-bold">
                    {player.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{player.name}</p>
                    <p className="text-xs text-zinc-500">{player.ability}</p>
                  </div>
                  <button className="w-full py-2 bg-white border border-orange-100 rounded-xl text-xs font-bold text-basketball-orange hover:bg-basketball-orange hover:text-white transition-all">
                    Select
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Chemistry & Fatigue */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              Chemistry Gauge
            </h2>
            <div className="text-center p-8 bg-purple-50 rounded-3xl border border-purple-100">
              <div className="text-5xl font-bold text-purple-600 mb-4">78%</div>
              <div className="w-full h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: "78%" }} />
              </div>
              <p className="text-xs text-purple-500 mt-4 font-medium">Higher chemistry improves tactical success probability.</p>
            </div>
          </section>

          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Fatigue Management
            </h2>
            <div className="space-y-4">
              {mockPlayers.map((player) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-bold">
                      {player.name[0]}
                    </div>
                    <span className="text-sm font-bold">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${player.fatigue > 40 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {player.fatigue}%
                    </span>
                    <button className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] font-bold uppercase hover:bg-orange-50 hover:text-basketball-orange transition-all">
                      Rest
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-400 mt-4 leading-relaxed">
              Resting provides a +20 reduction in Fatigue but temporarily reduces the Momentum bar.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
