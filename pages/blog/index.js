import { getAllBlogPosts } from "../../lib/supabaseClient";
import BlogList from "@/components/blog/BlogList";
import { NextSeo } from "next-seo";
import CategoryTabs from "@/components/blog/CategoryTabs";
import SearchBar from "@/components/blog/SearchBar";
import { useState } from "react";
import {
  Card,
  Text,
  Image,
  Grid,
  Spacer,
  Loading,
  Row,
  Button ,
} from "@nextui-org/react";

export const getStaticProps = async () => {
  
  const posts = await getAllBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};

const BlogIndex = ({ posts }) => {
  const [filteredPosts, setFilteredPosts] = useState(() => posts);

  const handleSearch = (term) => {
    if (term === "") {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const normalizedTerm = term.toLowerCase();
      const normalizedTitle = post.title.toLowerCase();
      return normalizedTitle.includes(normalizedTerm);
    });

    setFilteredPosts(filtered);
  };

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
      <div className="container mx-auto px-4">
      <Spacer />
      <Grid.Container gap={2} justify="center">
        <Text b >
          <h1>Blog</h1>
        </Text>
        </Grid.Container>
        <CategoryTabs/>
        <SearchBar onSearch={handleSearch} />
        <Spacer y={0.5} />
      <BlogList posts={filteredPosts} />
      
      </div>
    </>
  );
};

export default BlogIndex;
