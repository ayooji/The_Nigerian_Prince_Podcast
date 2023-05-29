import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const getAllBlogPosts = async () => {
    const { data, error } = await supabase.from("blog_posts").select("*");
  
    if (error) {
      throw new Error("Error fetching blog posts: " + error.message);
    }
  
    return data;
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