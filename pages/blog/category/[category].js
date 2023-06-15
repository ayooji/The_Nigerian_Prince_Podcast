import { getBlogPostsByCategory } from "../../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { categories } from "@/components/blog/CategoryTabs";
import { useRouter } from "next/router";


export const getStaticProps = async (ctx) => {
  const posts = await getBlogPostsByCategory(ctx.params.category);
  return {
    props: { posts },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
    const paths = categories.map((category) => ({
      params: { category },
    }));
  
    return { paths, fallback: false };
  };
  
  const CategoryBlogPosts = ({ posts }) => {
    const router = useRouter();
    const { category } = router.query;
  
    return <BlogList posts={posts} headerText={category} />;
  };
  
  export default CategoryBlogPosts;