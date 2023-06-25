import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const CommentForm = ({ post, currentUser }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!content.trim()) {
      setError("Please enter a comment");
      return;
    }

    const fetchCommentCount = async (postId) => {
      try {
        const { data: comments, error } = await supabase
          .from("blog_comments")
          .select("id")
          .eq("post_id", postId);

        if (error) {
          console.error("Error fetching comment count:", error.message);
          throw error;
        }

        return comments.length;
      } catch (error) {
        console.error("Error fetching comment count:", error.message);
        return 0;
      }
    };
  };

  return (
    <div>
      <h3>Leave a comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </div>
  );
};

export default CommentForm;
