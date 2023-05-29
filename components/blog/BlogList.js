import Link from "next/link";

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div key={post.id} className="blog-post-preview">
          <Link href={`/blog/page/${post.id}`}>
            <a>
              <h2>{post.title}</h2>
            </a>
          </Link>
          <p>{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;