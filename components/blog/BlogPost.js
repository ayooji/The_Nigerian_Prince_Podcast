import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

const BlogPost = ({ post, currentUser }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*, user:name")
        .eq("post_id", post.id);

      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setComments(data);
      }
    };

    fetchComments();
  }, [post.id]);

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <ReactQuill
        value={post.content}
        readOnly={true}
        theme="snow"
      />
      <hr />
      <CommentList comments={comments} />
      {currentUser && <CommentForm post={post} currentUser={currentUser} />}
    </div>
  );
};

export default BlogPost;