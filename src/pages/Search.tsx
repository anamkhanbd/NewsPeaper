import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { newsService } from "../services/supabaseService";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "motion/react";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      newsService.getPosts({ search: query })
        .then(setPosts)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <SearchIcon className="h-8 w-8 text-emerald-600" />
              <h1 className="text-4xl font-black tracking-tighter uppercase text-gray-900">
                Search Results
              </h1>
            </div>
            <p className="text-gray-500 font-medium">
              Showing results for: <span className="text-emerald-600 font-bold">"{query}"</span>
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center">Searching...</div>
          ) : posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard post={post} variant="horizontal" />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No results found for "{query}". Try different keywords.</p>
            </div>
          )}
        </main>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
