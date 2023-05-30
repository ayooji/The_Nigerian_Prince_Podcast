const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.content}</p>
          <h5>{comment.name}</h5>

          <span>{new Date(comment.created_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
