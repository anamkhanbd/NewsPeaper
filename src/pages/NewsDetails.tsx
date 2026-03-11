import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { newsService } from "../services/supabaseService";
import { formatDate } from "../lib/utils";
import Sidebar from "../components/Sidebar";
import { Calendar, Eye, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";
import { motion } from "motion/react";

export default function NewsDetails() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      newsService.getPostBySlug(slug)
        .then(setPost)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="py-20 text-center">Loading article...</div>;
  if (!post) return <div className="py-20 text-center">Article not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8">
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-6">
              <Link
                to={`/category/${post.category_slug}`}
                className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest rounded-full"
              >
                {post.category_name}
              </Link>
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tighter">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium border-y border-gray-100 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-emerald-600" />
                  <span>{post.views} views</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Share:</span>
                  <button className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"><Facebook className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"><Twitter className="h-4 w-4" /></button>
                  <button className="p-2 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"><LinkIcon className="h-4 w-4" /></button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[21/9] overflow-hidden rounded-3xl shadow-lg">
              <img
                src={post.featured_image || `https://picsum.photos/seed/${post.id}/1200/600`}
                alt={post.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg max-w-none prose-emerald prose-headings:font-black prose-headings:tracking-tighter prose-p:leading-relaxed prose-p:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags Placeholder */}
            <div className="pt-12 border-t border-gray-100">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tags:</span>
                {["News", "Update", post.category_name].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-emerald-600 hover:text-white cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        </main>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
