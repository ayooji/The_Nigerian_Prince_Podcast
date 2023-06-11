import React from "react";
import { Card, Col, Image, Spacer, Tag, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { motion, useMotionValue } from "framer-motion";
import {
  MessageCircle,
  Clock,
  BookOpen,
  Share2,
  Star,
  User,
} from "react-feather";

const BlogListItem = ({ post, user }) => {
  const authorName = post.profiles?.name || "Unknown Author"; // Get author's name from fetched data
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
      variants={{ ...fadeInUpVariants(0.5), ...hoverVariants }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        isHoverable
        onClick={handleClick}
        isPressable
        variant="bordered"
        css={{ w: "100%", h: "450px", bg: "$black", w: "100%" }}
      >
          {/* Featured Image */}
          {post.image_url && (
            <Card.Image
              src={post.image_url}
              alt={post.title}
              width="100%"
              height="100%"
              objectFit="cover"
              
            />
          )}
        {/* Title, date, and category */}
       
        <Card.Body css={{ p: 0 }}>
       
          {/* Excerpt */}
          <Col>
            <Text b weight="bold" h4 color="black">
              {post.title}
            </Text>
            <Text size="$md" >
              <User size={14} />

              <span style={{ marginLeft: 4 }}>- {authorName}</span>

              <span style={{ marginLeft: 4 }}>
                - {new Date(post.created_at).toLocaleDateString()}
              </span>
            </Text>
            {post.excerpt && (
            <Card.Body>
              <Text size="xs">{post.excerpt.slice(0, 100) + "..."}</Text>
            </Card.Body>
          )}
          </Col>
          
          <Spacer y={0.5} />
          {post.category && (
            <Tag size="sm" color="primary">
              {post.category}
            </Tag>
          )}
        </Card.Body>
        

        <Card.Footer>
          <div className="card-icons">
            <MessageCircle size={18} />
            <Clock size={18} />
            <BookOpen size={18} />
            <Share2 size={18} />
            <Star size={18} />
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default BlogListItem;
