import { useState, useEffect } from "react";
import { newsService } from "../services/supabaseService";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { motion } from "motion/react";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsService.getPosts({ limit: 10 })
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featuredPost = posts[0];
  const latestPosts = posts.slice(1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading latest news...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <main className="lg:col-span-8 space-y-12">
          {/* Featured News */}
          {featuredPost && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative group overflow-hidden rounded-3xl shadow-xl bg-gray-900 aspect-[16/9] sm:aspect-[21/9]"
            >
              <img
                src={featuredPost.featured_image || `https://picsum.photos/seed/${featuredPost.id}/1200/600`}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 sm:p-12 space-y-4 max-w-3xl">
                <span className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-full">
                  Featured News
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tighter">
                  <a href={`/news/${featuredPost.slug}`} className="hover:text-emerald-400 transition-colors">
                    {featuredPost.title}
                  </a>
                </h1>
                <p className="text-gray-300 text-sm sm:text-base line-clamp-2 leading-relaxed">
                  {featuredPost.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
                </p>
              </div>
            </motion.section>
          )}

          {/* Latest News Grid */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase">Latest Stories</h2>
              <a href="#" className="text-sm font-bold text-emerald-600 hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NewsCard post={post} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* More News Section */}
          <section className="bg-gray-50 p-8 rounded-3xl">
            <h2 className="text-xl font-black tracking-tighter uppercase mb-8">Recommended for you</h2>
            <div className="space-y-6">
              {posts.slice(0, 3).map((post) => (
                <NewsCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
