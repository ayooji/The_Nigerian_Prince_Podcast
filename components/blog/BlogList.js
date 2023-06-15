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

const BlogList = ({ posts, headerText }) => {
  return (
    <motion.div style={{ display: "block", width: "100%" }} initial="initial">
      <Spacer />
      <Grid.Container gap={2} justify="center" className="blog-list">
        {headerText && (
          <Grid.Container gap={2} justify="center">
            <Text
              b
              size="$xl"
              css={{
                textGradient: "45deg, $white -100%, $green800 100%",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontWeight: "bold",
                letterspacing: "1.1em",
                padding: "1em",
                borderradius: "0.5em",
                boxshadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",

                color: "$white",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <h4>{headerText.toUpperCase()}</h4>
            </Text>
          </Grid.Container>
        )}
        <Grid.Container gap={2} justify="center" className="blog-list">
          {posts.map((post) => (
            <Grid xs={24} md={4} key={post.id} post={post}>
              <BlogListItem key={post.id} post={post} user={post.user}>
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
      </Grid.Container>
    </motion.div>
  );
};

export default BlogList;
