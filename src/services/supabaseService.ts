import { supabase } from "../lib/supabase";

export const newsService = {
  async getPosts(options: { category?: string; search?: string; limit?: number; offset?: number } = {}) {
    let query = supabase
      .from("posts")
      .select(`
        *,
        categories (name, slug)
      `)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (options.category) {
      query = query.eq("categories.slug", options.category);
    }
    if (options.search) {
      query = query.ilike("title", `%${options.search}%`);
    }
    if (options.limit) {
      query = query.range(options.offset || 0, (options.offset || 0) + options.limit - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    // Flatten the categories object for compatibility with existing components
    return data.map(post => ({
      ...post,
      category_name: post.categories?.name,
      category_slug: post.categories?.slug
    }));
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        categories (name, slug)
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;

    // Increment views (Supabase RPC or simple update)
    await supabase
      .from("posts")
      .update({ views: (data.views || 0) + 1 })
      .eq("id", data.id);

    return {
      ...data,
      category_name: data.categories?.name,
      category_slug: data.categories?.slug
    };
  },

  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw error;
    return data;
  },

  async getTrending() {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        *,
        categories (name, slug)
      `)
      .eq("status", "published")
      .order("views", { ascending: false })
      .limit(5);

    if (error) throw error;
    return data.map(post => ({
      ...post,
      category_name: post.categories?.name,
      category_slug: post.categories?.slug
    }));
  }
};

export const adminService = {
  async login(email: string, pass: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async createPost(postData: any, imageFile?: File) {
    let featured_image = null;

    if (imageFile) {
      try {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          throw new Error(`Image upload failed: ${uploadError.message}. Make sure the 'news-images' bucket exists and is public.`);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('news-images')
          .getPublicUrl(filePath);
        
        featured_image = publicUrl;
      } catch (storageErr: any) {
        throw storageErr;
      }
    }

    const slug = postData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();

    // Ensure category_id is a number or null
    const category_id = postData.category_id ? parseInt(postData.category_id) : null;

    const { data, error } = await supabase
      .from("posts")
      .insert([{
        title: postData.title,
        content: postData.content,
        author_id: postData.author_id,
        category_id,
        slug,
        featured_image,
        status: "published"
      }])
      .select()
      .single();

    if (error) {
      console.error("Database insert error:", error);
      throw error;
    }
    return data;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
};
