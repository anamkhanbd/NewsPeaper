import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { newsService } from "../services/supabaseService";
import NewsCard from "../components/NewsCard";
import Sidebar from "../components/Sidebar";
import { motion } from "motion/react";

export default function Category() {
  const { slug } = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      newsService.getPosts({ category: slug })
        .then(setPosts)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter uppercase text-gray-900 border-b-4 border-emerald-600 inline-block pb-2">
              {slug?.replace("-", " ")}
            </h1>
            <p className="mt-4 text-gray-500 font-medium">Discover the latest stories in {slug?.replace("-", " ")}.</p>
          </div>

          {loading ? (
            <div className="py-20 text-center">Loading news...</div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
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
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">No news found in this category.</p>
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
