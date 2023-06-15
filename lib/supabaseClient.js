import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export const getAllBlogPosts = async () => {
  
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select(`
      id,
      user_id,
      title,
      image_url,
      slug,
      created_at,
      updated_at,
      category, 
      excerpt,
      content_json,
      profiles:user_id (user_id, name)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error.message);
    return [];
  }
  return posts;
};

  export const getBlogPostById = async (id) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
  
    if (error) {
      throw new Error("Error fetching blog post: " + error.message);
    }
  
    return data;
  }

  export const getBlogPostsByCategory = async (category) => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        id,
        user_id,
        title,
        image_url,
        slug,
        created_at,
        updated_at,
        category,
        excerpt,
        content_json,
        profiles:user_id (user_id, name)  
      `)
      .eq("category", category)
      .order("created_at", { ascending: false });
  
    if (error) throw error;
    return data;
  };