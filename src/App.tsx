import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isSupabaseConfigured } from "./lib/supabase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NewsDetails from "./pages/NewsDetails";
import Category from "./pages/Category";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { AlertTriangle } from "lucide-react";

function ConfigWarning() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center space-y-6">
        <div className="p-4 bg-amber-50 text-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tighter uppercase text-gray-900">
            Configuration <span className="text-amber-600">Required</span>
          </h2>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">
            Your Supabase API keys are missing. Please configure them in the 
            <strong> AI Studio Settings (Secrets)</strong> to start using the app.
          </p>
        </div>
        <div className="space-y-4 text-left bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Required Variables:</p>
          <ul className="text-xs font-mono text-gray-600 space-y-1">
            <li>VITE_SUPABASE_URL</li>
            <li>VITE_SUPABASE_ANON_KEY</li>
          </ul>
        </div>
        <p className="text-xs text-gray-400 italic">
          After adding the secrets, the app will refresh automatically.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  if (!isSupabaseConfigured) {
    return <ConfigWarning />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news/:slug" element={<NewsDetails />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
