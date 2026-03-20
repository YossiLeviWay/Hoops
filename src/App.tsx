import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Squad from "./pages/Squad";
import Tactics from "./pages/Tactics";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import TransferMarket from "./pages/TransferMarket";
import Staff from "./pages/Staff";
import Facilities from "./pages/Facilities";
import Training from "./pages/Training";
import Fans from "./pages/Fans";
import LeagueTable from "./pages/LeagueTable";
import Layout from "./components/Layout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If logged in via email/password, check if verified
        const isEmailAuth = user.providerData.some(p => p.providerId === 'password');
        if (isEmailAuth && !user.emailVerified) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <Router basename={import.meta.env.DEV ? '/' : '/Hoops'}>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        <Route path="/squad" element={isAuthenticated ? <Layout><Squad /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/tactics" element={isAuthenticated ? <Layout><Tactics /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/calendar" element={isAuthenticated ? <Layout><Calendar /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/market" element={isAuthenticated ? <Layout><TransferMarket /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/staff" element={isAuthenticated ? <Layout><Staff /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/facilities" element={isAuthenticated ? <Layout><Facilities /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/training" element={isAuthenticated ? <Layout><Training /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/fans" element={isAuthenticated ? <Layout><Fans /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/league" element={isAuthenticated ? <Layout><LeagueTable /></Layout> : <Navigate to="/login" replace />} />
        <Route path="/settings" element={isAuthenticated ? <Layout><Settings /></Layout> : <Navigate to="/login" replace />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
