import React from "react";
import { motion } from "motion/react";
import { 
  UserCheck, 
  Stethoscope, 
  Dumbbell, 
  Search, 
  Video, 
  Users, 
  Briefcase,
  Star,
  Info
} from "lucide-react";

const mockStaff = [
  { id: "1", name: "Coach K", role: "Head Coach", ability: 92, character: "Inspirational", specialty: "Offensive Scheme Mastery" },
  { id: "2", name: "Dr. Brown", role: "Team Doctor", ability: 85, character: "Meticulous", specialty: "Injury Diagnosis" },
  { id: "3", name: "Sarah Miller", role: "Athletic Trainer", ability: 88, character: "Player's Coach", specialty: "Injury Recovery" },
  { id: "4", name: "Tom Wilson", role: "Scout", ability: 80, character: "Data-Driven", specialty: "Opponent Weakness ID" },
  { id: "5", name: "Mike Ross", role: "Assistant Coach", ability: 84, character: "Conservative", specialty: "Player Development" },
];

export default function Staff() {
  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Roster</h1>
          <p className="text-zinc-500">Manage your coaching and medical team to optimize performance.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Hire New Staff
        </button>
      </header>

      {/* Staff Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStaff.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card group hover:border-basketball-orange transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-basketball-orange font-bold text-xl">
                  {member.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-zinc-500 font-medium">{member.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Ability</p>
                <p className="text-2xl font-bold text-basketball-orange">{member.ability}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Characterization
                </p>
                <p className="font-bold text-zinc-700">{member.character}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {member.character === 'Inspirational' && "Significantly boosts team motivation during critical moments."}
                  {member.character === 'Meticulous' && "Highly precise with injury recovery, minimizing re-injury risk."}
                  {member.character === 'Data-Driven' && "Bases all decisions on advanced metrics and analytics."}
                  {member.character === 'Conservative' && "Prefers low-risk strategies; cautious with player minutes."}
                  {member.character === "Player's Coach" && "Forms strong personal bonds, leading to high loyalty."}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500 font-medium">Specialty</span>
                <span className="font-bold text-zinc-700">{member.specialty}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-3 text-sm font-bold text-zinc-500 hover:text-basketball-orange transition-all border-t border-orange-50 flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              View Full Profile
            </button>
          </motion.div>
        ))}
      </div>

      {/* Staff Impact Info */}
      <section className="card bg-blue-50 border-blue-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-2xl text-white">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-900">Staff Influence</h2>
            <p className="text-blue-700 mt-1 max-w-3xl">
              Each staff member's characterization directly impacts your team's motivation, momentum, and tactical success. 
              A balanced staff roster is key to long-term success. Avoid hiring too many members with the same characterization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
