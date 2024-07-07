import { getAllBlogPosts } from "../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { NextSeo } from "next-seo";
import CategoryTabs from "@/components/blog/CategoryTabs";
import Footer from "@/components/Footer"; 
import { useState, useEffect } from "react";
import {
  Grid,
  Spacer,
  Text,
  Input,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { Pagination } from "react-bootstrap";

export const getStaticProps = async () => {
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

const BlogIndex = ({ posts, user }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content_json &&
          typeof post.content_json.body === "string" &&
          post.content_json.body.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  const handleSearch = (term) => {
    if (term === "" && selectedCategory === "") {
      setFilteredPosts(posts);
      return;
    }
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.category.toLowerCase().includes(term.toLowerCase()) ||
        (post.content_json &&
          typeof post.content_json.body === "string" &&
          post.content_json.body.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredPosts(filtered);
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
        twitter={{
          handle: "@nigerianprincepodcast",
          site: "@nigerianprincepodcast",
          cardType: "summary_large_image",
        }}
      />
      <motion.div
        style={{ display: "block", width: "100%" }}
        initial="initial"
        animate="animate"
      >
        <Grid.Container className="container mx-auto px-4">
          <Spacer />
          <Grid.Container gap={2} justify="center">
            <Text b>
              <h1>{selectedCategory === "" ? "Blog" : selectedCategory}</h1>
            </Text>
          </Grid.Container>

          <CategoryTabs
            onCategoryChange={(category) => setSelectedCategory(category)}
          />

          <Spacer y={0.5} />
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Input
                size="lg"
                color="success"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={handleChange}
                bordered
              />
            </Grid>
          </Grid.Container>

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
      <Footer />
    </>
  );
};

export default BlogIndex;
