import { getAllBlogPosts } from "../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { NextSeo } from "next-seo";
import CategoryTabs from "@/components/blog/CategoryTabs";
import SearchBar from "@/components/blog/SearchBar";
import { useState } from "react";
import {
  Card,
  Text,
  Image,
  Grid,
  Spacer,
  Loading,
  Row,
  Button,
} from "@nextui-org/react";
import { motion, useMotionValue } from "framer-motion";

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

const BlogIndex = ({ posts, index }) => {
  const [filteredPosts, setFilteredPosts] = useState(() => posts);

  const handleSearch = (term) => {
    if (term === "") {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const normalizedTerm = term.toLowerCase();
      const normalizedTitle = post.title.toLowerCase();
      const normalizedCategory = post.category.toLowerCase();
      return (
        normalizedTitle.includes(normalizedTerm) ||
        normalizedCategory.includes(normalizedTerm)
      );
    });

    setFilteredPosts(filtered);
  };

  const fadeInUpVariants = (delay) => ({
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: delay,
      },
    },
  });

  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#6EFFA2", // Replace with desired shining green color
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

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
      <motion.div
        style={{ display: "block", width: "100%" }}
        initial="initial"
        animate="animate"
      >
        <Grid.Container className="container mx-auto px-4">
          <Spacer />
          <Grid.Container gap={2} justify="center">
            <Text b>
              <h1>Blog</h1>
            </Text>
          </Grid.Container>

          <CategoryTabs />
          <SearchBar onSearch={handleSearch} />

          <Spacer y={0.5} />

          <BlogList posts={filteredPosts} />
        </Grid.Container>
      </motion.div>
    </>
  );
};

export default BlogIndex;
