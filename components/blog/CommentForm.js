import { Button, Input, Grid, Text, Textarea, Spacer } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import AuthButtons from "../AuthButtons";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

const CommentForm = ({ post, currentUser, fetchComments, setComments }) => {
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
    setNewComment(""); // Clear the input
    const fetchedComments = await fetchComments(post.id) // Fetch comments again
    console.log("Fetched comments:", fetchedComments);
    const commentsWithUserNames = fetchedComments.map((comment) => {
      return {
        ...comment,
        name: comment.user_id === currentUser.id ? currentUser.profiles?.name : comment.name
      };
    });
    setComments(commentsWithUserNames); // Update comments state
  } catch (error) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

  // If currentUser is null, it means the user is not logged in.
  if (!currentUser)
    return (
      <Grid.Container justify="center">
        <div>
          <Text>Please log in to leave comments.</Text>
          <Grid.Container justify="center">
            <AuthButtons />
          </Grid.Container>
        </div>
      </Grid.Container>
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
          minRows={3}
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
