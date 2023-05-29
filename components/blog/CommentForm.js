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
    
    const { error } = await supabase
      .from("comments")
      .insert([{ post_id: post.id, user_id: currentUser.id, content }]);

    if(error) {
        setError("Error submitting comment: " + error.message);
      } else {
        setContent("");
        setSuccess("Comment submitted.");
      }
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