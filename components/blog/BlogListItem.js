import React, { useState, useEffect } from "react";
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

      boxShadow: "0px 8px 20px rgba(110, 255, 162, 0.6)",
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
          background: "linear-gradient(to bottom right, #6EFFA2, #1B1464)",
          borderradius: "15px",
          boxshadow: "0 0 20px rgba(0, 0, 0, 0.2)",
          transform: "perspective(1000px) rotateX(2deg)",
          transition: "transform 0.5s ease-in-out",
          "&:hover": {
            transform: "perspective(1000px) rotateX(10deg) rotateY(8deg) ",
            boxShadow: "0 0 50px rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <Card.Header
          css={{
            position: "absolute",
            zIndex: 1,
            top: 5,
            textGradient: "45deg, #00FFFF, #00FF7F, #00FFFF",
            textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          {post.category && (
            <Text color="white" size={12} transform="uppercase" weight="bold">
              {post.category}
            </Text>
          )}
        </Card.Header>
        {/* Featured Image */}
        {post.image_url && (
          <Card.Image
            src={post.image_url}
            alt={post.title}
            width="100%"
            height="100%"
            objectFit="cover"
            borderradius="15px 15px 0 0"
            boxshadow="0px 4px 20px rgba(0, 0, 0, 0.1)"
          />
        )}
        {/* Title, date, and category */}

        <Card.Body css={{ p: 0, background: "$black" }}>
          {/* Excerpt */}
          <Col>
            <Text
              size="$sm"
              h5
              css={{
                textGradient: "45deg, $white -100%, $green800 100%",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                padding: "1em",
                borderradius: "0.5em",
                boxshadow: "2px 2px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "$green600",
                color: "$white",
                maxWidth: "400px",
                margin: "0 auto",
              }}
              weight="bold"
            >
              {post.title.toUpperCase()}
              <span
                css={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: "-1",
                  background: "$green600",
                  opacity: "0.3",
                  borderradius: "0.5em",
                }}
              ></span>
            </Text>
            <Text
              size="$md"
              color="$green600"
              css={{ margin: "0 auto", padding: "0.5em" }}
            >
              <User size={14} />

              <span style={{ marginLeft: 4 }}>- {authorName}</span>

              <span style={{ marginLeft: 4 }}>
                - {new Date(post.created_at).toLocaleDateString()}
              </span>
            </Text>
            {post.excerpt && (
              <Card.Body>
                <Text size="xs" color="white">
                  {post.excerpt.slice(0, 100) + "..."}
                </Text>
              </Card.Body>
            )}
          </Col>
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
