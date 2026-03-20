import React from "react";
import { motion } from "motion/react";
import { 
  User, 
  Shield, 
  Bell, 
  HelpCircle, 
  Save, 
  AlertCircle,
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";

export default function Settings() {
  const [changesToday, setChangesToday] = React.useState(0);
  const maxChanges = 2;

  const avatars = [
    { id: "lion", name: "Lion", url: "https://picsum.photos/seed/lion-avatar/200" },
    { id: "owl", name: "Owl", url: "https://picsum.photos/seed/owl-avatar/200" },
    { id: "monument", name: "Statue", url: "https://picsum.photos/seed/statue-avatar/200" },
    { id: "robot", name: "Robot", url: "https://picsum.photos/seed/robot-avatar/200" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-zinc-500">Manage your profile, team information, and account security.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {[
            { name: "Profile & Team", icon: User, active: true },
            { name: "Security", icon: Shield, active: false },
            { name: "Notifications", icon: Bell, active: false },
            { name: "Help & Support", icon: HelpCircle, active: false },
          ].map((item) => (
            <button 
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                item.active ? "bg-basketball-orange text-white shadow-md shadow-orange-200" : "text-zinc-500 hover:bg-orange-50 hover:text-basketball-orange"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
              {item.active && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="card space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Profile & Team Information</h2>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${changesToday >= maxChanges ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                Changes Today: {changesToday} / {maxChanges}
              </div>
            </div>

            {changesToday >= maxChanges && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <p>You have reached the maximum number of changes allowed today. You can edit your information again tomorrow.</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500">Team Name</label>
                <input 
                  type="text" 
                  defaultValue="Liga C - Team A"
                  disabled={changesToday >= maxChanges}
                  className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500">Stadium Name</label>
                <input 
                  type="text" 
                  defaultValue="The Arena"
                  disabled={changesToday >= maxChanges}
                  className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange disabled:opacity-50"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-zinc-500">Bio</label>
                <textarea 
                  rows={3}
                  defaultValue="Leading my team to the top tier. Basketball is life."
                  disabled={changesToday >= maxChanges}
                  className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500">Gender</label>
                <select 
                  disabled={changesToday >= maxChanges}
                  className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange disabled:opacity-50"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500">Email</label>
                <input 
                  type="email" 
                  defaultValue="gm@example.com"
                  disabled={changesToday >= maxChanges}
                  className="w-full px-4 py-3 rounded-xl border border-orange-100 focus:outline-none focus:ring-2 focus:ring-basketball-orange disabled:opacity-50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-500 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Choose Avatar
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {avatars.map((avatar) => (
                  <button 
                    key={avatar.id}
                    disabled={changesToday >= maxChanges}
                    className="group relative rounded-2xl overflow-hidden border-2 border-transparent hover:border-basketball-orange transition-all disabled:opacity-50"
                  >
                    <img src={avatar.url} alt={avatar.name} className="w-full aspect-square object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                      <span className="text-white text-[10px] font-bold uppercase">{avatar.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-orange-50">
              <button 
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
                disabled={changesToday >= maxChanges}
                onClick={() => setChangesToday(prev => prev + 1)}
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </section>

          <section className="card bg-zinc-900 text-white">
            <h2 className="text-xl font-bold mb-4">Account Security</h2>
            <p className="text-zinc-400 text-sm mb-6">Update your password and manage account access.</p>
            <button className="px-6 py-2 bg-zinc-800 rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all">
              Change Password
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
