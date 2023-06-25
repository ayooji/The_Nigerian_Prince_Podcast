import React, { useState, useEffect, useMemo } from "react";
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
  Award,
} from "react-feather";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Popup from "reactjs-popup";
import AuthButtons from "../AuthButtons";

const BlogListItem = ({ post, currentUser }) => {
  const authorName = post.profiles?.name || "Unknown Author"; // Get author's name from fetched data
  const router = useRouter();
  const shareUrl = `https://nigerianprincepodcast.com/blog/page/${post.id}`;
  const [isSaved, setIsSaved] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);
  const channel = supabase.channel("db-blog_comments");
  const [commentCount, setCommentCount] = useState(0);

  console.log("User:", currentUser);
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

  useEffect(() => {
    const checkSavedStatus = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from("profiles")
          .select("saved_blog_posts")
          .eq("user_id", currentUser.id)
          .limit(1);

        if (error) {
          console.error("Error fetching saved posts:", error.message);
        } else if (
          data &&
          data.length > 0 &&
          data[0].saved_blog_posts &&
          data[0].saved_blog_posts.includes(post.id)
        ) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
    };

    checkSavedStatus();
  }, [currentUser, post.id]);

  const handleSavePost = async (e) => {
    e.stopPropagation();

    if (!currentUser) {
      console.log("Please log in to save posts");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("saved_blog_posts")
        .eq("id", currentUser.id)
        .limit(1);

      if (error) {
        console.error("Error fetching saved posts:", error.message);
      } else if (!data || data.length === 0) {
        console.error("User's profile not found in the 'profiles' table.");
      } else {
        const savedBlogPosts = data[0].saved_blog_posts || [];
        const isCurrentlySaved = savedBlogPosts.includes(post.id);

        const updated_saved_blog_posts = isCurrentlySaved
          ? savedBlogPosts.filter((postId) => postId !== post.id)
          : [...savedBlogPosts, post.id];

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ saved_blog_posts: updated_saved_blog_posts })
          .eq("id", currentUser.id);

        if (updateError) {
          console.error("Error updating saved posts:", updateError.message);
        } else {
          setIsSaved(!isCurrentlySaved);

          // Show the popup message
          // Handling popup
          setShowSavePopup(true);
          setTimeout(() => {
            setShowSavePopup(false);
          }, 3000); // Close the popup after 3 seconds
        }
      }
    } catch (error) {
      console.error("Error updating saved posts:", error.message);
    }
  };

  channel.on(
    "postgres_changes",
    {
      event: "INSERT",
      schema: "public",
      table: "blog_comments",
    },
    (payload) => {
      const newComment = payload.new;
      console.log("New comment added:", newComment);
      // Check if the comment is for the current blog post
      if (newComment.post_id === post.id) {
        // Increment the comment count and update the UI
        setCommentCount((prevCount) => prevCount + 1);
      }
    }
  );

  channel.subscribe((status) => {
    if (status === "SUBSCRIBED") {
      console.log("Subscribed to blog comments");
    }
  });

  useEffect(() => {
    // Fetch the initial comment count for the current blog post
    const fetchCommentCount = async () => {
      const { data, error } = await supabase
        .from('blog_comments')
        .select('id')
        .eq('post_id', post.id);
    
      if (error) {
        console.error("Error fetching comment count:", error.message);
      } else {
        setCommentCount(data.length);
      }
    };

    fetchCommentCount();
  }, [post.id]);

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
          <div
            className="card-icons"
            style={{
              position: "relative",
              zIndex: "2",
            }}
          >
            <Popup
              on="hover"
              position="top center"
              arrow={false}
              contentStyle={{
                background: "black",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              trigger={
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                >
                  <span>
                    <MessageCircle
                      size={18}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span>({commentCount})</span>
                  </span>
                </motion.div>
              }
            >
              <Grid.Container gap={2} justify="center">
                <Text h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                  View or Add Comments
                </Text>
              </Grid.Container>
            </Popup>

            <Popup
              on="hover"
              position="top center"
              arrow={false}
              contentStyle={{
                background: "black",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              trigger={
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                >
                 
                    <BookOpen size={18} />
                 
                </motion.div>
              }
            >
              <Grid.Container gap={2} justify="center">
                <Text h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                  Read Full Article
                </Text>
              </Grid.Container>
            </Popup>
            <Popup
              on="hover"
              position="top center"
              arrow={false}
              contentStyle={{
                background: "black",
                padding: "5px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
              trigger={
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.1 }}
                  style={{ display: "inline-flex", verticalAlign: "middle" }}
                >
                  <Share2 size={18} />
                </motion.div>
              }
            >
              <Grid.Container gap={2} justify="center">
                <Text h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                  Share Post
                </Text>
              </Grid.Container>

              <Grid.Container gap={2} justify="center">
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={18} round />
                </FacebookShareButton>
                <Spacer x={2} />
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={18} round />
                </TwitterShareButton>
                <Spacer x={2} />
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon size={18} round />
                </WhatsappShareButton>
              </Grid.Container>
            </Popup>
            {currentUser ? (
              <Popup
                on="click"
                position="top center"
                open={showSavePopup}
                onOpen={() => setShowSavePopup(true)}
                onClose={() => setShowSavePopup(false)}
                arrow={false}
                contentStyle={{
                  background: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                trigger={
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.1 }}
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  >
                    {isSaved ? (
                      <span onClick={(e) => e.stopPropagation()}>
                        <Award onClick={handleSavePost} size={18} />
                      </span>
                    ) : (
                      <span onClick={(e) => e.stopPropagation()}>
                        <Star onClick={handleSavePost} size={18} />
                      </span>
                    )}
                  </motion.div>
                }
              >
                <Grid.Container gap={2} justify="center">
                  <Text h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                    {isSaved ? "Post saved." : "Post unsaved."}
                  </Text>
                </Grid.Container>
              </Popup>
            ) : (
              <Popup
                on="hover"
                position="top center"
                arrow={false}
                contentStyle={{
                  background: "black",
                  padding: "5px",
                  borderRadius: "5px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                }}
                trigger={
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.1 }}
                    style={{ display: "inline-flex", verticalAlign: "middle" }}
                  >
                    {isSaved ? (
                      <span onClick={(e) => e.stopPropagation()}>
                        <Award onClick={handleSavePost} size={18} />
                      </span>
                    ) : (
                      <span onClick={(e) => e.stopPropagation()}>
                        <Star onClick={handleSavePost} size={18} />
                      </span>
                    )}
                  </motion.div>
                }
              >
                <Grid.Container gap={2} justify="center">
                  <Text b h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                    {isSaved ? "Unsave Post" : "Save Post"}
                  </Text>
                </Grid.Container>

                <Grid.Container gap={2} justify="center">
                  <Text h6 size={15} color="white" css={{ m: 2, p: 2 }}>
                    Please{" "}
                    <span onClick={() => setShowAuthModal(true)}>
                      <AuthButtons />
                    </span>{" "}
                    to save posts.
                  </Text>
                </Grid.Container>
              </Popup>
            )}
          </div>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default BlogListItem;
