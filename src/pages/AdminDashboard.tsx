import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { newsService, adminService } from "../services/supabaseService";
import { supabase } from "../lib/supabase";
import { Plus, Edit2, Trash2, LayoutDashboard, FileText, Grid, LogOut, CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "categories" | "create">("posts");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      fetchData();
    };
    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        newsService.getPosts({ limit: 100 }),
        newsService.getCategories(),
      ]);
      setPosts(postsRes);
      setCategories(catsRes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminService.logout();
    navigate("/");
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      await adminService.createPost({
        title,
        content,
        category_id: categoryId,
        author_id: session?.user?.id
      }, image || undefined);
      
      setTitle("");
      setContent("");
      setCategoryId("");
      setImage(null);
      setActiveTab("posts");
      fetchData();
    } catch (err: any) {
      console.error("Create post error:", err);
      alert(`Failed to create post: ${err.message || "Unknown error"}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await adminService.deletePost(id);
        fetchData();
      } catch (err) {
        alert("Failed to delete post");
      }
    }
  };

  if (loading) return <div className="p-20 text-center">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Nav */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-8 border-b border-gray-100">
          <span className="text-xl font-black tracking-tighter uppercase">
            Admin<span className="text-emerald-600">Panel</span>
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab("posts")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "posts" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <FileText className="h-5 w-5" />
            <span>All Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "create" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Plus className="h-5 w-5" />
            <span>Create News</span>
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === "categories" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            <Grid className="h-5 w-5" />
            <span>Categories</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-gray-900">
              {activeTab === "posts" && "News Management"}
              {activeTab === "create" && "Create New Article"}
              {activeTab === "categories" && "Category Manager"}
            </h1>
            <p className="text-gray-500 text-sm font-medium">Welcome back, Admin</p>
          </div>
          {activeTab !== "create" && (
            <button
              onClick={() => setActiveTab("create")}
              className="px-6 py-3 bg-emerald-600 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Post</span>
            </button>
          )}
        </header>

        {/* Posts Table */}
        {activeTab === "posts" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Article</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Category</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Views</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={post.featured_image || `https://picsum.photos/seed/${post.id}/100/100`}
                          className="w-12 h-12 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-bold text-gray-900 line-clamp-1">{post.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                        {post.category_name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-500">{post.views}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Published
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Create Post Form */}
        {activeTab === "create" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <form onSubmit={handleCreatePost} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all"
                    placeholder="Enter news headline..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Category</label>
                  <select
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Featured Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all"
                  >
                    {image ? (
                      <div className="text-center">
                        <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                        <span className="text-sm font-bold text-emerald-600">{image.name}</span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Plus className="h-8 w-8 text-gray-300 mx-auto mb-2 group-hover:text-emerald-600" />
                        <span className="text-sm font-bold text-gray-400 group-hover:text-emerald-600">Upload Featured Image</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Article Content (HTML supported)</label>
                <textarea
                  required
                  rows={12}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all resize-none"
                  placeholder="Write your news article here..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("posts")}
                  className="px-8 py-4 bg-gray-100 text-gray-500 text-sm font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-4 bg-emerald-600 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50"
                >
                  {submitting ? "Publishing..." : "Publish Article"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Categories Manager */}
        {activeTab === "categories" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="space-y-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="New category name..."
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-xl text-sm outline-none transition-all"
                />
                <button className="px-6 py-3 bg-emerald-600 text-white text-sm font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all">
                  Add
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-900">{cat.name}</span>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"><Edit2 className="h-4 w-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
