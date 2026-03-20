import React from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  Dumbbell, 
  GraduationCap, 
  Tv, 
  Store, 
  Home, 
  ArrowUp,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";

const mockFacilities = [
  { id: "1", name: "Training Court", level: 2, icon: Building2, primary: "Player Skill Improvement", secondary: "Reduced Injury Risk", cost: 225, time: "11.5h" },
  { id: "2", name: "GYM", level: 3, icon: Dumbbell, primary: "Conditioning & Stamina", secondary: "Fatigue Mitigation", cost: 337, time: "13.2h" },
  { id: "3", name: "Youth Academy", level: 1, icon: GraduationCap, primary: "New Player Quality", secondary: "Team Motivation", cost: 150, time: "10h" },
  { id: "4", name: "Media Center", level: 0, icon: Tv, primary: "Motivation & Chemistry", secondary: "Team Reputation", cost: 100, time: "10h" },
  { id: "5", name: "Merchandise Store", level: 1, icon: Store, primary: "Daily Income", secondary: "Fan Engagement", cost: 150, time: "10h" },
  { id: "6", name: "Basketball Hall", level: 2, icon: Home, primary: "Supporter Capacity", secondary: "Momentum & Morale", cost: 225, time: "11.5h" },
];

export default function Facilities() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Facilities</h1>
          <p className="text-zinc-500">Upgrade your infrastructure to boost development and revenue.</p>
        </div>
        <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-orange-100 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-basketball-orange/10 rounded-xl text-basketball-orange font-bold">
            <DollarSign className="w-5 h-5" />
            Balance: $250,000
          </div>
        </div>
      </header>

      {/* Facilities Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFacilities.map((facility, i) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:border-basketball-orange transition-all flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${facility.level > 0 ? 'bg-orange-50 text-basketball-orange' : 'bg-zinc-100 text-zinc-400'}`}>
                <facility.icon className="w-8 h-8" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Level</p>
                <p className="text-3xl font-bold">{facility.level}</p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h3 className="font-bold text-xl">{facility.name}</h3>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-basketball-orange" />
                  <span className="text-zinc-500">Primary:</span>
                  <span className="font-bold text-zinc-700">{facility.primary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-zinc-500">Secondary:</span>
                  <span className="font-bold text-zinc-700">{facility.secondary}</span>
                </div>
              </div>

              <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50">
                <p className="text-xs font-bold text-basketball-orange uppercase mb-2">Next Level Benefit</p>
                <p className="text-sm font-medium text-zinc-600">
                  +10% increase in {facility.primary.toLowerCase()} efficiency.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-orange-50 flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-bold uppercase">
                  <DollarSign className="w-3 h-3" /> Cost
                </div>
                <p className="font-bold text-zinc-700">${facility.cost}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-bold uppercase">
                  <Clock className="w-3 h-3" /> Time
                </div>
                <p className="font-bold text-zinc-700">{facility.time}</p>
              </div>
              <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                <ArrowUp className="w-4 h-4" />
                Upgrade
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upgrade Rules Info */}
      <section className="card bg-zinc-900 text-white p-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Upgrade Mechanics</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Upgrades follow a consistent progression in terms of time and cost. Each level provides additive benefits to your club's operations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-orange-400 uppercase mb-1">Cost Rule</p>
                <p className="text-sm font-bold">150% increase per level</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-orange-400 uppercase mb-1">Time Rule</p>
                <p className="text-sm font-bold">15% increase per level</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-400/20 rounded-lg text-orange-400">
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-400">Higher level facilities unlock more advanced training options and higher revenue streams.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-orange-400/20 rounded-lg text-orange-400">
                <ChevronRight className="w-5 h-5" />
              </div>
              <p className="text-sm text-zinc-400">Upgrading the Basketball Hall increases home game attendance and gate revenue.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
