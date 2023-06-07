import Link from "next/link";
import React from "react";
import {
  Button,
  Input,
  Grid,
  Text,
  Spacer,
  Textarea,
  Card,
} from "@nextui-org/react";

import BlogListItem from "./BlogListItem";
import { motion } from "framer-motion";

const BlogList = ({ posts }) => {
  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#6EFFA2", // Replace with desired shining green color
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const fadeInUpVariants = (delay) => ({
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99], delay: delay },
    },
  });
  

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={{ ...fadeInUpVariants( 0.5), }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Grid.Container gap={2} justify="center" className="blog-list">
        {posts.map((post) => (
          <Grid xs={24} md={4} key={post.id} post={post}>
            <BlogListItem key={post.id} post={post}>
              <Link href={`/blog/page/${post.id}`}>
                <h2 style={{ cursor: "pointer" }}>{post.title}</h2>
              </Link>
              <p>
                {post.content
                  ? post.content.slice(0, 100) + "..."
                  : "No content available"}
              </p>
            </BlogListItem>
          </Grid>
        ))}
      </Grid.Container>
    </motion.div>
  );
};

export default BlogList;
