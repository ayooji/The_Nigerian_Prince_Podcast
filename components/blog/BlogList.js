import Link from "next/link";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-post-preview">
          <Link href={`/blog/page/${post.id}`}>
            <h2 style={{ cursor: "pointer" }}>{post.title}</h2>
          </Link>
          <p>{post.content ? post.content.slice(0, 100) + '...' : 'No content available'}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;