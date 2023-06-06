import React from "react";
import { Card, Col, Image, Spacer, Tag, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

const BlogListItem = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
  };

  return (
    <Card hoverable onClick={handleClick} isPressable>
      {/* Featured Image */}
      {post.featured_image && (
        <Image
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
        <Text h4>{post.title}</Text>
        <Text size="small" type="secondary">
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
        <Spacer y={0.5} />
        {post.category && (
          <Tag size="small" color="primary">
            {post.category}
          </Tag>
        )}
      </Card.Body>

      {/* Excerpt */}
      {post.excerpt && (
        <Card.Footer>
          <Text size="small">{post.excerpt}</Text>
        </Card.Footer>
      )}
    </Card>
  );
};

export default BlogListItem;