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
  

  return (
    <motion.div style={{ display: "block", width: "100%" }} initial="initial">
      <Grid.Container gap={2} justify="center" className="blog-list">
        {posts.map((post) => (
          <Grid xs={24} md={4} key={post.id} post={post}>
            <BlogListItem key={post.id} post={post} user={post.user} >
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
