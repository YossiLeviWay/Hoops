import React from "react";
import { motion } from "motion/react";
import { 
  Users, 
  Heart, 
  TrendingUp, 
  DollarSign, 
  Newspaper, 
  ChevronRight,
  Smile,
  Frown,
  Meh,
  Info
} from "lucide-react";

export default function Fans() {
  const [ticketPrice, setTicketPrice] = React.useState(25);
  const [merchPrice, setMerchPrice] = React.useState(45);

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fans Dashboard</h1>
          <p className="text-zinc-500">Monitor fan engagement and manage commercial pricing.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-6 py-2 bg-orange-50 text-orange-700 rounded-xl font-bold text-sm">
            Total Fans: 1,240
          </div>
          <button className="btn-primary">Update Prices</button>
        </div>
      </header>

      {/* Fan Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-basketball-orange text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Fan Enthusiasm</h3>
            <Heart className="w-5 h-5 opacity-60" />
          </div>
          <div className="flex items-end gap-3 mb-4">
            <div className="text-4xl font-bold">68%</div>
            <Smile className="w-8 h-8 mb-1" />
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white" style={{ width: "68%" }} />
          </div>
          <p className="text-xs mt-4 opacity-80">Boosted by recent wins and fair pricing.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Weekly Growth</h3>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-4xl font-bold text-zinc-900">+142</div>
          <p className="text-xs mt-4 text-zinc-500">New fans added this week.</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-zinc-500">Avg. Attendance</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-4xl font-bold text-zinc-900">84%</div>
          <p className="text-xs mt-4 text-zinc-500">Stadium capacity utilization.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Financial Controls */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-basketball-orange" />
              Financial Control
            </h2>
            
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Ticket Price</h3>
                    <p className="text-xs text-zinc-500">Impacts gate revenue and attendance.</p>
                  </div>
                  <span className="text-2xl font-bold text-basketball-orange">${ticketPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-basketball-orange"
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Budget ($10)</span>
                  <span>Premium ($100)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Merchandise Price</h3>
                    <p className="text-xs text-zinc-500">Impacts store revenue and fan enthusiasm.</p>
                  </div>
                  <span className="text-2xl font-bold text-basketball-orange">${merchPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="150" 
                  step="5"
                  value={merchPrice}
                  onChange={(e) => setMerchPrice(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-basketball-orange"
                />
                <div className="flex justify-between text-[10px] font-bold text-zinc-400 uppercase">
                  <span>Standard ($20)</span>
                  <span>Luxury ($150)</span>
                </div>
              </div>
            </div>

            <div className="mt-12 p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                Higher prices increase revenue per fan but may reduce total attendance and enthusiasm. Find the sweet spot to maximize long-term growth.
              </p>
            </div>
          </section>
        </div>

        {/* Fan Insights */}
        <div className="space-y-8">
          <section className="card">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-basketball-orange" />
              Fan Insights
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase">
                  <Smile className="w-3 h-3" />
                  Positive Sentiment
                </div>
                <p className="text-sm font-medium text-zinc-700 leading-relaxed">
                  "The 'Blue Crew' absolutely adores Mike Smith—his Work Ethic is inspiring the community."
                </p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Effect: Boosts Team-First Attitude</p>
              </div>

              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase">
                  <Frown className="w-3 h-3" />
                  Negative Sentiment
                </div>
                <p className="text-sm font-medium text-zinc-700 leading-relaxed">
                  "Local talk show calls for the benching of John Doe—fans cite a lack of Aggressiveness."
                </p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Effect: Drain on Enthusiasm Gauge</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 text-sm font-bold text-zinc-500 hover:text-basketball-orange transition-all border-t border-orange-50 flex items-center justify-center gap-2">
              View All News <ChevronRight className="w-4 h-4" />
            </button>
          </section>

          <section className="card bg-zinc-900 text-white">
            <h2 className="text-xl font-bold mb-4">Fan Demographics</h2>
            <div className="space-y-4">
              {[
                { label: "Local Residents", value: 65 },
                { label: "Casual Viewers", value: 25 },
                { label: "Die-hard Fans", value: 10 },
              ].map((group) => (
                <div key={group.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-400">{group.label}</span>
                    <span>{group.value}%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400" style={{ width: `${group.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
