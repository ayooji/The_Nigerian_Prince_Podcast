

const CommentList = ({ comments }) => {
    return (
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
          <h4>{comment.user.name}</h4>
          <p>{comment.content}</p>
          <span>{new Date(comment.created_at).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;