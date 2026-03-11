import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";

interface NewsCardProps {
  post: {
    id: number;
    title: string;
    slug: string;
    content: string;
    featured_image: string;
    category_name: string;
    category_slug: string;
    created_at: string;
    views: number;
  };
  variant?: "horizontal" | "vertical" | "compact";
  key?: any;
}

export default function NewsCard({ post, variant = "vertical" }: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <Link
        to={`/news/${post.slug}`}
        className="group flex flex-col sm:flex-row gap-6 p-4 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-100"
      >
        <div className="w-full sm:w-1/3 aspect-[16/10] overflow-hidden rounded-xl">
          <img
            src={post.featured_image || `https://picsum.photos/seed/${post.id}/800/500`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1 space-y-3">
          <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wider">
            {post.category_name}
          </span>
          <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {post.content.replace(/<[^>]*>/g, "").substring(0, 150)}...
          </p>
          <div className="flex items-center text-xs text-gray-400 font-medium pt-2">
            <span>{formatDate(post.created_at)}</span>
            <span className="mx-2">•</span>
            <span>{post.views} views</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        to={`/news/${post.slug}`}
        className="group flex gap-4 items-start py-3 border-b border-gray-100 last:border-0"
      >
        <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg">
          <img
            src={post.featured_image || `https://picsum.photos/seed/${post.id}/200/200`}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
            {post.title}
          </h4>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            {post.category_name}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/news/${post.slug}`}
      className="group block space-y-4 p-4 bg-white hover:bg-gray-50 rounded-2xl transition-all duration-300 border border-transparent hover:border-gray-100"
    >
      <div className="aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={post.featured_image || `https://picsum.photos/seed/${post.id}/800/450`}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wider">
          {post.category_name}
        </span>
        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
          {post.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
        </p>
        <div className="flex items-center text-xs text-gray-400 font-medium pt-2">
          <span>{formatDate(post.created_at)}</span>
          <span className="mx-2">•</span>
          <span>{post.views} views</span>
        </div>
      </div>
    </Link>
  );
}
