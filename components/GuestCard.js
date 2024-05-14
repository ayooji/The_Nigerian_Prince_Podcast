import React from "react";
import { Card, Text, Image } from "@nextui-org/react";

const GuestCard = ({ guest }) => {
  const cardStyle = {
    borderRadius: "15px",
    overflow: "hidden",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
  };

  return (
    <Card
      css={cardStyle}
      hoverable
      onHoverStart={(e) => (e.currentTarget.style = cardHoverStyle)}
      onHoverEnd={(e) => (e.currentTarget.style = cardStyle)}
    >
      <Card.Body css={{ p: 0 }}>
        <Image
          src={guest.image}
          objectFit="cover"
          width="100%"
          height={250}
          alt={guest.name}
        />
      </Card.Body>
      <Card.Header>
        <Text b size={18}>
          {guest.name}
        </Text>
      </Card.Header>
      <Card.Body>
        <Text size={14} css={{ color: "$accents7" }}>
          {guest.bio}
        </Text>
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}></Card.Footer>
    </Card>
  );
};

export default GuestCard;
