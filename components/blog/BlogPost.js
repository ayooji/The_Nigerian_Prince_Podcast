import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import the styles
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";
import { Card, Col, Image, Spacer, Tag, Text, Grid } from "@nextui-org/react";
const BlogPost = ({ post, currentUser }) => {
  const [comments, setComments] = useState(null);

  const fetchComments = async (postId) => {
    try {
      const { data: comments, error: commentsError } = await supabase
        .from("blog_comments")
        .select("id, post_id, content, created_at, user_id")
        .eq("post_id", postId);

      if (commentsError) {
        console.error("Error fetching comments:", commentsError.message);
        throw commentsError;
      }

      const user_ids = comments.map((comment) => comment.user_id);

      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("user_id, name")
        .in("user_id", user_ids);

      if (usersError) {
        console.error("Error fetching user names:", usersError.message);
        throw usersError;
      }

      let commentsWithUserNames = comments.map((comment) => {
        return {
          ...comment,
          name: users.find((user) => user.user_id === comment.user_id)?.name,
        };
      });

      return commentsWithUserNames;
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      return [];
    }
  };

  useEffect(() => {
    fetchComments(post.id)
      .then((fetchedComments) => {
        console.log("Fetched comments:", fetchedComments);
        setComments(fetchedComments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error.message);
      });
  }, [post.id]);

  console.log("Rendering BlogPost component");

  const modules = {
    toolbar: false, // Disables toolbar, as this is a read-only instance.
    clipboard: {
      // Overrides default pasting behavior.
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "table",
  ];

  return (
    <Grid.Container gap={2} justify="center">
      <div className="post-header">
        <Grid md={4} xs={24} justify="center">
          <Card variant="bordered" isHoverable>
            <Image
              src={post.image_url}
              alt={post.title}
              className="post-image"
              objectFit="cover"
            />
          </Card>
        </Grid>

        <Grid justify="center">
          <div>
            <Text
              size={25}
              h1
              css={{
                textGradient: "45deg, $white -5%, $green600 90%",
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "horizontal",
              }}
            >
              {post.title}
            </Text>

            <div className="post-info">
              <span className="post-author">
                By {post.profiles?.name || "Unknown Author"}
              </span>
              <span className="post-date">
                Published on {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Grid>

        <Grid.Container justify="center">
          <Grid.Container justify="center">
            <ReactQuill
              value={post.content_json.body}
              readOnly={true}
              theme="snow"
              modules={modules}
              formats={formats}
              className="quill-container"
            
              style={{
               
                boxShadow: "0 0 10px rgba(0, 128, 0, 0.5)",
                border: "2.5px solid rgba(0, 128, 0, 0.5)",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: '$black',
                maxWidth: '90%', height: 'auto',

              }}
            />
          </Grid.Container>
        </Grid.Container>
        <hr />
        {comments === null ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments available.</p>
        ) : (
          <CommentList comments={comments} />
        )}
        {currentUser && <CommentForm post={post} currentUser={currentUser} />}
      </div>
    </Grid.Container>
  );
};

export default BlogPost;
