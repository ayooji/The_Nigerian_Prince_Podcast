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
import Link from "next/link";

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
        css={{
          w: "100%",
          h: "450px",
          background: "linear-gradient(145deg, #192a56, #273c75)",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
          transform: "perspective(1000px) rotateX(2deg)",
          transition: "transform 0.5s",
          "&:hover": {
            transform: "perspective(1000px) rotateX(5deg) rotateY(3deg)",
            boxShadow: "0 0 50px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {/* Featured Image */}
        {post.image_url && (
          <Card.Image
            src={post.image_url}
            alt={post.title}
            width="100%"
            height="100%"
            objectFit="cover"
            borderRadius="15px 15px 0 0"
            boxShadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
          />
        )}
        {/* Title, date, and category */}

        <Card.Body css={{ p: 0, background: "rgba(255, 255, 255, 0.8)" }}>
          {/* Excerpt */}
          <Col>
            <Text
              size="$md"
              h5
              css={{
                textGradient: "to bottom, $green600, $black",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                textShadow: "1px 1px 2px rgba(0,0,0,0.25)",
                padding: "1em",
                borderRadius: "0.5em",
                boxshadow: "2px 2px 6px rgba(0,0,0,0.1)",
                backgroundColor: "$black",
                color: "$black",
                maxWidth: "400px",
                margin: "0 auto",
              }}
              weight="bold"
            >
              {post.title}
            </Text>
            <Text size="$md" color="black">
              <User size={14} />

              <span style={{ marginLeft: 4 }}>- {authorName}</span>

              <span style={{ marginLeft: 4 }}>
                - {new Date(post.created_at).toLocaleDateString()}
              </span>
            </Text>
            {post.excerpt && (
              <Card.Body>
                <Text size="xs" color="black">
                  {post.excerpt.slice(0, 100) + "..."}
                </Text>
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
