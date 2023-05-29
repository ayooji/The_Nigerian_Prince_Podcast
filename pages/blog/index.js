import { getAllBlogPosts } from "../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { NextSeo } from "next-seo";

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
  };
};

const BlogIndex = ({ posts }) => {
  return (
    <>
      <NextSeo
        title="Blog - The Nigerian Prince Podcast"
        description="A collection of blog posts on various topics."
        openGraph={{
          title: "Blog - The Nigerian Prince Podcast",
          description: "A collection of blog posts on various topics.",
        }}
      />
      <div>
        <h1>Blog</h1>
        <BlogList posts={posts} />
      </div>
    </>
  );
};

export default BlogIndex;
