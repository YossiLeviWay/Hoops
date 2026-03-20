import React from "react";
import { motion } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Trophy, 
  AlertCircle,
  PlayCircle,
  FileText
} from "lucide-react";

export default function Calendar() {
  const [view, setView] = React.useState<"list" | "grid">("list");

  const fixtures = [
    { id: "1", date: "Mar 17, 2026", time: "18:00", opponent: "Rivals FC", location: "Home", status: "Past", result: "W", score: "102 - 94" },
    { id: "2", date: "Mar 20, 2026", time: "20:00", opponent: "City Hawks", location: "Away", status: "Live", result: null, score: "45 - 42" },
    { id: "3", date: "Mar 23, 2026", time: "19:00", opponent: "Beach Ballers", location: "Home", status: "Future", result: null, score: null },
    { id: "4", date: "Mar 26, 2026", time: "18:30", opponent: "Mountain Kings", location: "Away", status: "Future", result: null, score: null },
  ];

  const deadlines = [
    { name: "Training Reset", date: "Every Monday", icon: Clock, color: "text-blue-500" },
    { name: "Draft Window", date: "Apr 1 - Apr 30", icon: Trophy, color: "text-purple-500" },
    { name: "Transfer Window", date: "Closes in 5 days", icon: AlertCircle, color: "text-red-500" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fixtures & Events</h1>
          <p className="text-zinc-500">Track your season progress and manage team events.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-orange-100 rounded-xl p-1">
            <button 
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'list' ? 'bg-basketball-orange text-white' : 'text-zinc-500'}`}
            >
              List
            </button>
            <button 
              onClick={() => setView("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'grid' ? 'bg-basketball-orange text-white' : 'text-zinc-500'}`}
            >
              Grid
            </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Calendar View */}
        <div className="lg:col-span-2 space-y-6">
          <section className="card p-0 overflow-hidden">
            <div className="p-6 border-b border-orange-50 bg-orange-50/30 flex items-center justify-between">
              <h2 className="text-xl font-bold">Season Schedule</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white rounded-lg transition-all"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-bold">March 2026</span>
                <button className="p-2 hover:bg-white rounded-lg transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="divide-y divide-orange-50">
              {fixtures.map((fixture) => (
                <div key={fixture.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-orange-50/30 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="text-center min-w-[80px]">
                      <p className="text-xs font-bold text-zinc-400 uppercase">{fixture.date.split(',')[0]}</p>
                      <p className="text-lg font-bold">{fixture.time}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-basketball-orange">
                        {fixture.opponent[0]}
                      </div>
                      <div>
                        <p className="font-bold">{fixture.opponent}</p>
                        <p className="text-xs text-zinc-500">{fixture.location} Match</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {fixture.status === 'Past' && (
                      <>
                        <div className={`px-3 py-1 rounded-lg font-bold text-sm ${fixture.result === 'W' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {fixture.result} {fixture.score}
                        </div>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-orange-100 transition-all text-zinc-400 hover:text-basketball-orange">
                          <FileText className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    {fixture.status === 'Live' && (
                      <>
                        <div className="px-3 py-1 bg-red-500 text-white rounded-lg font-bold text-sm animate-pulse">
                          LIVE {fixture.score}
                        </div>
                        <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                          <PlayCircle className="w-4 h-4" />
                          Watch Live
                        </button>
                      </>
                    )}
                    {fixture.status === 'Future' && (
                      <button className="px-4 py-2 bg-zinc-100 text-zinc-600 rounded-lg font-bold text-sm hover:bg-zinc-200 transition-all">
                        Match Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar: Deadlines & Events */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-basketball-orange" />
              System Deadlines
            </h2>
            <div className="space-y-4">
              {deadlines.map((deadline) => (
                <div key={deadline.name} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-4">
                  <div className={`p-2 rounded-xl bg-white shadow-sm ${deadline.color}`}>
                    <deadline.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{deadline.name}</p>
                    <p className="text-xs text-zinc-500">{deadline.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card bg-basketball-orange text-white">
            <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Mar 22</p>
                <p className="font-medium mt-1">Team Meeting: Tactics Review</p>
                <p className="text-xs mt-2 opacity-80">Location: Video Room</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-xs font-bold uppercase opacity-60">Mar 25</p>
                <p className="font-medium mt-1">Youth Academy Tryouts</p>
                <p className="text-xs mt-2 opacity-80">Location: Training Court</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
