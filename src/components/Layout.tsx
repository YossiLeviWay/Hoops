import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../hooks/useUser";
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  UserCircle,
  ShoppingCart,
  Briefcase,
  Building2,
  Dumbbell,
  Heart,
  ListOrdered
} from "lucide-react";

const BasketballIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M4.9 19.1C4.9 19.1 8 15 12 15s7.1 4.1 7.1 4.1" />
    <path d="M4.9 4.9C4.9 4.9 8 9 12 9s7.1-4.1 7.1-4.1" />
    <path d="M12 2v20" />
  </svg>
);
import { motion, AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { userData, loading } = useUser();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Squad", path: "/squad", icon: Users },
    { name: "Tactics", path: "/tactics", icon: Trophy },
    { name: "Market", path: "/market", icon: ShoppingCart },
    { name: "Staff", path: "/staff", icon: Briefcase },
    { name: "Facilities", path: "/facilities", icon: Building2 },
    { name: "Training", path: "/training", icon: Dumbbell },
    { name: "Fans", path: "/fans", icon: Heart },
    { name: "League", path: "/league", icon: ListOrdered },
    { name: "Calendar", path: "/calendar", icon: Calendar },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-pastel-orange flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-orange-100 h-screen sticky top-0">
        <div className="p-8 flex items-center gap-3">
          <div className="p-2 bg-basketball-orange rounded-xl">
            <BasketballIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Hoops Manager</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-basketball-orange text-white shadow-md shadow-orange-200" 
                    : "text-zinc-500 hover:bg-orange-50 hover:text-basketball-orange"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-orange-50">
          <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-2xl mb-4">
            {userData?.avatar ? (
              <img src={userData.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-basketball-orange flex items-center justify-center text-white font-bold">
                {userData?.teamName?.charAt(0) || "GM"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{userData?.teamName || "Manager"}</p>
              <p className="text-xs text-zinc-500 truncate">Reputation: {userData?.reputation || 0}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-orange-100 p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <BasketballIcon className="w-6 h-6 text-basketball-orange" />
          <span className="font-bold">Hoops Manager</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
          >
            <nav className="space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 p-4 rounded-2xl ${
                      isActive ? "bg-basketball-orange text-white" : "text-zinc-500"
                    }`
                  }
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-bold">{item.name}</span>
                </NavLink>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-4 text-zinc-500"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-bold">Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-0 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
