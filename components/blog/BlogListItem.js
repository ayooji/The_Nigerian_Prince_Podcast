import React from "react";
import { Card, Col, Image, Spacer, Tag, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { motion, useMotionValue } from "framer-motion";

const BlogListItem = ({ post, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
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
    <motion.div
      style={{ display: "block", width: "100%" }}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={{ ...fadeInUpVariants(index * 0.5), ...hoverVariants }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        isHoverable
        onClick={handleClick}
        isPressable
        variant="bordered"
        css={{ w: "100%", h: "400px" }}
      >
        {/* Featured Image */}
        {post.featured_image && (
          <Card.Image
            src={post.featured_image}
            alt={post.title}
            width={340}
            height={200}
            layout="responsive"
            objectFit="cover"
          />
        )}

        {/* Title, date, and category */}
        <Card.Body>
          <Text b h4>
            {post.title}
          </Text>
          <Text size="sm" color="success">
            {new Date(post.created_at).toLocaleDateString()}
          </Text>
          <Spacer y={0.5} />
          {post.category && (
            <Tag size="sm" color="primary">
              {post.category}
            </Tag>
          )}
        </Card.Body>

        {/* Excerpt */}
        {post.excerpt && (
          <Card.Footer>
            <Text size="xs">{post.excerpt}</Text>
          </Card.Footer>
        )}
      </Card>
    </motion.div>
  );
};

export default BlogListItem;
