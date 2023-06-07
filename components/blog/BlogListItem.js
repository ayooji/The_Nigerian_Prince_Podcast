import React from "react";
import { Card, Col, Image, Spacer, Tag, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";

const BlogListItem = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
  };

  return (
   
        <Card
          isHoverable
          onClick={handleClick}
          isPressable
          variant="bordered"
          css={{ w: "100%", h: "400px" }}
        >
          {/* Featured Image */}
          {post.featured_image && (
            <Card.Image
              src={post.featured_image}
              alt={post.title}
              width={340}
              height={200}
              layout="responsive"
              objectFit="cover"
            />
          )}

          {/* Title, date, and category */}
          <Card.Body>
            <Text b h4>
              {post.title}
            </Text>
            <Text size="sm" color="success">
              {new Date(post.created_at).toLocaleDateString()}
            </Text>
            <Spacer y={0.5} />
            {post.category && (
              <Tag size="sm" color="primary">
                {post.category}
              </Tag>
            )}
          </Card.Body>

          {/* Excerpt */}
          {post.excerpt && (
            <Card.Footer>
              <Text size="xs">{post.excerpt}</Text>
            </Card.Footer>
          )}
        </Card>
   
  );
};

export default BlogListItem;