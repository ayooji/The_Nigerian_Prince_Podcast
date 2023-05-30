import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import the styles
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const BlogPost = ({ post, currentUser }) => {
  const [comments, setComments] = useState([]);
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
        .from("profiles").select("user_id, name")
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

  console.log('Rendering BlogPost component');
  
  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <ReactQuill value={post.content} readOnly={true} theme="snow" />
      <hr />
      <CommentList comments={comments} />
      {currentUser && <CommentForm post={post} currentUser={currentUser} />}
    </div>
  );
};

export default BlogPost;
