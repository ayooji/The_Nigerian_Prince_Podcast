import { getAllBlogPosts } from "../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { NextSeo } from "next-seo";
import CategoryTabs from "@/components/blog/CategoryTabs";
import { useState, useEffect } from "react";
import {
  Card,
  Text,
  Image,
  Grid,
  Spacer,
  Loading,
  Row,
  Button,
  Input,
} from "@nextui-org/react";
import { motion, useMotionValue } from "framer-motion";
import { Pagination } from "react-bootstrap";

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

const BlogIndex = ({ posts, user }) => {
  const [filteredPosts, setFilteredPosts] = useState(() => posts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    setFilteredPosts(
      posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.content_json &&
            post.content_json.body
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, posts]);

  const handleSearch = (term) => {
    if (term === "" && selectedCategory === "") {
      setFilteredPosts(posts);
      return;
    }
    setFilteredPosts(filtered);
  };

  const fadeInUpVariants = (delay) => ({
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: delay,
      },
    },
  });

  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#6EFFA2", // Replace with desired shining green color
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    getAllBlogPosts(page)
      .then((fetchedPosts) => {
        setFilteredPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
      });
  }, [page]);

  return (
    <>
      <NextSeo
        title="Blog - The Nigerian Prince Podcast"
        description="A collection of blog posts on various topics."
        openGraph={{
          title: "Blog - The Nigerian Prince Podcast",
          description: "A collection of blog posts on various topics.",
        }}
      />
      <motion.div
        style={{ display: "block", width: "100%" }}
        initial="initial"
        animate="animate"
      >
        <Grid.Container className="container mx-auto px-4">
          <Spacer />
          {/* Update this part */}
          <Grid.Container gap={2} justify="center">
            <Text b>
              <h1>{selectedCategory === "" ? "Blog" : selectedCategory}</h1>
            </Text>
          </Grid.Container>
          {/* End of updated part */}

          <CategoryTabs
            onCategoryChange={(category) => setSelectedCategory(category)}
          />

          <Spacer y={0.5} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleChange}
          />

          <BlogList posts={filteredPosts} currentUser={user} />
          <Spacer x={0.5} />
          <Grid.Container gap={2} justify="center">
            <Pagination>
              <Pagination.First onClick={() => setPage(1)} />
              <Pagination.Prev onClick={() => setPage(page - 1)} />
              {[...Array(10).keys()].map((num) => (
                <Pagination.Item
                  key={num}
                  active={num + 1 === page}
                  onClick={() => setPage(num + 1)}
                >
                  {num + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setPage(page + 1)} />
              <Pagination.Last onClick={() => setPage(10)} />
            </Pagination>
          </Grid.Container>
        </Grid.Container>
      </motion.div>
    </>
  );
};

export default BlogIndex;
