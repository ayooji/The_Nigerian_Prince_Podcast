import { Button, Input, Grid, Text, Textarea, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuthButtons from "../AuthButtons";
import { useRouter } from "next/router";

const CommentForm = ({ post, currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const addNewComment = async () => {
    try {
      setLoading(true);
      const result = await supabase
        .from("blog_comments")
        .insert([
          { post_id: post.id, content: newComment, user_id: currentUser.id },
        ]);

      if (result.error) throw result.error;

      // After submitting the form, replace the current page in history to trigger a re-render
      router.replace(router.asPath);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // If currentUser is null, it means the user is not logged in.
  if (!currentUser)
    return (
      <div>
        <p>Please log in to leave comments.</p>
        <AuthButtons />
      </div>
    );

  return (
    <div>
     
      <Spacer y={0.5} />
      <Grid.Container gap={2} justify="center">
      <Textarea
        type="text"
        size="xl"
        placeholder="Leave Your Comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        bordered
        color="success"
        minRows={1}
        maxRows={10}
        
      />
       </Grid.Container>
      <Spacer y={0.5} />
      <Grid.Container gap={2} justify="center">
      <Button
        loading={loading.toString()}
        onClick={addNewComment}
        disabled={newComment.trim() === ""}
        color="gradient"
        size="md"
        shadow
        auto
        bordered
        ghost
        
      >
        Submit
      </Button>
      </Grid.Container>
    </div>
  );
};

export default CommentForm;
