import React from "react";
import { Card, Text, Image, Grid } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FaInstagram, FaPodcast } from "react-icons/fa";

const GuestCard = ({ guest }) => {
  const cardStyle = {
    borderRadius: "15px",
    overflow: "hidden",
    background: "linear-gradient(145deg, #006400, #000000)", // Deep Green to Black gradient
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const headerStyle = {
    color: "#ffffff", // White text color for header
    fontFamily: "'Roboto', sans-serif",
    fontWeight: "bold",
  };

  const textStyle = {
    color: "#ffffff", // White text color for bio
    fontFamily: "'Roboto', sans-serif",
    maxHeight: "80px", // Limit the height
    overflowY: "auto", // Add vertical scroll
  };

  const buttonStyle = {
    backgroundColor: "#ffd700",
    color: "#000",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    padding: "5px 10px", // Smaller padding
    fontSize: "14px", // Smaller font size
    marginRight: "5px",
    display: "flex",
    alignItems: "center",
  };

  const iconStyle = {
    marginRight: "5px",
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 1,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.25)",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.95 }}
      style={cardStyle}
    >
      <Card css={{ height: "100%", display: "flex", flexDirection: "column", background: "inherit" }}>
        <Card.Body css={{ p: 0, flex: "0 1 auto" }}>
          <Image
            src={guest.image}
            objectFit="cover"
            width="100%"
            height={250}
            alt={guest.name}
          />
        </Card.Body>
        <Card.Header css={{ flex: "0 1 auto" }}>
          <Text b size={18} css={headerStyle}>
            {guest.name}
          </Text>
        </Card.Header>
        <Card.Body css={{ flex: "1 1 auto" }}>
          <Text size={14} css={textStyle}>
            {guest.bio}
          </Text>
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start", flex: "0 1 auto" }}>
          <Grid.Container justify="space-between" alignItems="center">
            <Grid>
              {guest.instagram && (
                <button
                  style={buttonStyle}
                  onClick={() => window.open(guest.instagram, "_blank")}
                >
                  <FaInstagram style={iconStyle} />
                  Instagram
                </button>
              )}
            </Grid>
            <Grid>
              <button
                style={buttonStyle}
                onClick={() => window.open(`/episodes/${guest.episodeId}`, "_blank")}
              >
                <FaPodcast style={iconStyle} />
                Listen
              </button>
            </Grid>
          </Grid.Container>
        </Card.Footer>
      </Card>
    </motion.div>
  );
};

export default GuestCard;
