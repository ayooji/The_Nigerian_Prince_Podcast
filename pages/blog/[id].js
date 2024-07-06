import { useRouter } from "next/router";
import { getBlogPostById, getAllBlogPosts } from "../../lib/supabaseClient";
import BlogPost from "@/components/blog/BlogPost";
import { NextSeo } from "next-seo";
import React, { useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import Footer from "@/components/Footer"; // Ensure the correct import path

export const getStaticPaths = async () => {
  const posts = await getAllBlogPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const post = await getBlogPostById(params.id);
  return {
    props: { post },
  };
};

const BlogPostPage = ({ post }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={`${post.title} - The Nigerian Prince Podcast`}
        description={`Read the blog post "${post.title}" on our website.`}
        openGraph={{
          title: `${post.title} - The Nigerian Prince Podcast`,
          description: `Read the blog post "${post.title}" on our website.`,
        }}
        twitter={{
          handle: "@nigerianprincepodcast",
          site: "@nigerianprincepodcast",
          cardType: "summary_large_image",
        }}
      />
      <div>
        <BlogPost post={post} currentUser={user} />
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
