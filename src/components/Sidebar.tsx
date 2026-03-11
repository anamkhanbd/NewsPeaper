import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Grid } from "lucide-react";
import { newsService } from "../services/supabaseService";
import NewsCard from "./NewsCard";

export default function Sidebar() {
  const [trending, setTrending] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    newsService.getTrending().then(setTrending).catch(console.error);
    newsService.getCategories().then(setCategories).catch(console.error);
  }, []);

  return (
    <aside className="space-y-10">
      {/* Trending Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-black tracking-tight uppercase">Trending</h2>
        </div>
        <div className="space-y-2">
          {trending.map((post) => (
            <NewsCard key={post.id} post={post} variant="compact" />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-2 mb-6">
          <Grid className="h-5 w-5 text-emerald-600" />
          <h2 className="text-lg font-black tracking-tight uppercase">Categories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-emerald-600 hover:text-white rounded-lg transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Placeholder */}
      <section className="bg-emerald-600 p-8 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-2">Subscribe to NewsPeaper</h3>
        <p className="text-emerald-100 text-sm mb-6">Get the latest news delivered directly to your inbox.</p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-emerald-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="w-full py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors">
            Subscribe Now
          </button>
        </form>
      </section>
    </aside>
  );
}
