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
    <div className="blog-list">
       <motion.div layout>
      {posts.map((post) => (
         <BlogListItem key={post.id} post={post} >
          <Link href={`/blog/page/${post.id}`}>
            <h2 style={{ cursor: "pointer" }}>{post.title}</h2>
          </Link>
          <p>{post.content ? post.content.slice(0, 100) + '...' : 'No content available'}</p>
          </BlogListItem >
      ))}
      </motion.div>
    </div>
  );
};

export default BlogList;