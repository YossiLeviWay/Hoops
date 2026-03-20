import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogIn, Trophy, AlertCircle, UserPlus, Mail, Lock, User, ChevronDown, CheckCircle2, UserCircle } from "lucide-react";
import { 
  signInWithPopup, 
  signInAnonymously, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendEmailVerification,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { ensureUserProfile } from "../services/firestoreService";

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

type AuthMode = "login" | "signup" | "verify-email";

export default function Login() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.emailVerified && user.providerData.some(p => p.providerId === 'password')) {
        setMode("verify-email");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await ensureUserProfile(result.user.uid, result.user.email);
    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInAnonymously(auth);
      await ensureUserProfile(result.user.uid, null);
    } catch (err: any) {
      console.error("Guest Login Error:", err);
      setError("Guest access is currently disabled. Please use Google Sign-In.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        if (!username) throw new Error("Username is required");
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(result.user);
        await ensureUserProfile(result.user.uid, email, username, gender);
        setMode("verify-email");
        setVerificationSent(true);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        if (!result.user.emailVerified) {
          setMode("verify-email");
        } else {
          await ensureUserProfile(result.user.uid, email);
        }
      }
    } catch (err: any) {
      console.error("Email Auth Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setVerificationSent(true);
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Hero Section */}
      <div className="hidden lg:flex bg-basketball-orange items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <img 
            src="https://picsum.photos/seed/basketball-cartoon/800/600" 
            alt="Minimalist Basketball Scene" 
            className="rounded-3xl shadow-2xl mb-8 border-4 border-white/20"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
            Hoops Manager Pro
          </h1>
          <p className="text-orange-100 text-xl max-w-md mx-auto">
            Build your legacy. Lead your team from the bottom to basketball immortality.
          </p>
        </motion.div>
      </div>

      {/* Right: Auth Form */}
      <div className="flex items-center justify-center p-8 bg-pastel-orange overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center lg:hidden">
            <div className="inline-flex p-3 bg-basketball-orange rounded-2xl mb-4">
              <BasketballIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-zinc-900">Hoops Manager Pro</h2>
          </div>

          <div className="card">
            <AnimatePresence mode="wait">
              {mode === "verify-email" ? (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center space-y-6"
                >
                  <div className="inline-flex p-4 bg-orange-100 rounded-full text-basketball-orange">
                    <Mail className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold">Verify Your Email</h2>
                  <p className="text-zinc-500">
                    We've sent a verification link to <strong>{auth.currentUser?.email}</strong>. 
                    Please check your inbox and click the link to continue.
                  </p>
                  
                  {verificationSent && (
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl text-sm flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Verification email resent!
                    </div>
                  )}

                  <div className="space-y-3 pt-4">
                    <button 
                      onClick={() => window.location.reload()}
                      className="btn-primary w-full"
                    >
                      I've Verified My Email
                    </button>
                    <button 
                      onClick={handleResendVerification}
                      className="w-full text-sm text-zinc-500 hover:text-basketball-orange font-medium"
                    >
                      Resend verification email
                    </button>
                    <button 
                      onClick={() => auth.signOut().then(() => setMode("login"))}
                      className="w-full text-sm text-zinc-400 hover:text-zinc-600"
                    >
                      Back to Login
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h2 className="text-2xl font-bold mb-2">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-zinc-500 mb-8">
                    {mode === "login" 
                      ? "Sign in to manage your squad and prepare for the next match."
                      : "Join the league and start your journey to the top."}
                  </p>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    {mode === "signup" && (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Username</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input 
                              type="text"
                              required
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              placeholder="johndoe"
                              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-basketball-orange/20 focus:border-basketball-orange outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Gender</label>
                          <div className="relative">
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                            <select 
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-basketball-orange/20 focus:border-basketball-orange outline-none transition-all appearance-none"
                            >
                              <option>Male</option>
                              <option>Female</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input 
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="manager@example.com"
                          className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-basketball-orange/20 focus:border-basketball-orange outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input 
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-basketball-orange/20 focus:border-basketball-orange outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {mode === "login" ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                      {loading ? "Processing..." : (mode === "login" ? "Sign In" : "Create Account")}
                    </button>
                  </form>

                  <div className="relative py-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-zinc-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      className="flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-700 px-4 py-3 rounded-xl font-medium hover:bg-zinc-50 transition-all shadow-sm disabled:opacity-50 text-sm"
                      onClick={handleGoogleLogin}
                      disabled={loading}
                    >
                      <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                      Google
                    </button>
                    <button 
                      className="flex items-center justify-center gap-3 bg-white border border-zinc-200 text-zinc-700 px-4 py-3 rounded-xl font-medium hover:bg-zinc-50 transition-all shadow-sm disabled:opacity-50 text-sm"
                      onClick={handleGuestLogin}
                      disabled={loading}
                    >
                      <UserCircle className="w-4 h-4" />
                      Guest
                    </button>
                  </div>

                  <div className="mt-8 text-center">
                    <button 
                      onClick={() => setMode(mode === "login" ? "signup" : "login")}
                      className="text-sm font-bold text-basketball-orange hover:underline"
                    >
                      {mode === "login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-zinc-500 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
