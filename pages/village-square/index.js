import React from "react";
import {
  Grid,
  Container,
  Text,
  Spacer,
  Image,
  Card,
  Button,
} from "@nextui-org/react";

const cardStyle = {
  padding: "20px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  },
};

const VillageSquare = () => {
  return (
    <div className="container mx-auto px-4">
      <Spacer />

      {/* Header and Welcome Section */}
      <Grid.Container gap={2} justify="center">
        <Text h1 css={{ textAlign: "center" }}>
          The Village Square
        </Text>
      </Grid.Container>

      {/* Introduction and How-to Section */}
      <Grid.Container justify="center">
        <Card
          css={{
            mw: "850px",
            background: "linear-gradient(135deg, #4CAF50 0%, #FFD700 100%)", // Green to Gold Gradient
            color: "#1a1a1a", // Dark text color for contrast
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            },
          }}
        >
          <Card.Body css={{ textAlign: "center", padding: "$20" }}>
            <Text
              size={18}
              css={{ lineHeight: "$md", marginBottom: "$10", color: "inherit" }}
            >
              Welcome to The Village Square, a place where voices are heard and
              stories are shared. Here, you can upload your experiences,
              insights, and observations about the world around you.
            </Text>
            <Text size={18} css={{ lineHeight: "$md", color: "inherit" }}>
              To participate, simply create an account, browse existing stories,
              or share your own. Join the conversation today and make your voice
              heard.
            </Text>
          </Card.Body>
        </Card>
        <Spacer />
      </Grid.Container>

      <Text css={{ textAlign: "center", marginTop: "$12" }}>
        A community-driven platform for sharing stories and experiences.
      </Text>
      <Spacer />

      <Spacer />

      {/* Upload Your Story Section */}
      <Grid.Container justify="center">
        <Grid md={8}>
          <Card css={cardStyle}>
            <Card.Header>
              <Text h3>Upload Media</Text>
            </Card.Header>
            <Card.Body>
              <Text>Share Audio or Video.</Text>
              <Button>Upload Media</Button>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card css={cardStyle}>
            <Card.Header>
              <Text h3>Upload Images</Text>
            </Card.Header>
            <Card.Body>
              <Text>Share Photos.</Text>
              <Button>Upload Images</Button>
            </Card.Body>
          </Card>
          <Spacer y={1} />
          <Card css={cardStyle}>
            <Card.Header>
              <Text h3>Upload Document/Text</Text>
            </Card.Header>
            <Card.Body>
              <Text>Share Document or Text.</Text>
              <Button>Upload Document/Text</Button>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer />

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Text>
            &copy; {new Date().getFullYear()} The Nigerian Prince Podcast
          </Text>
          {/* Add more footer content such as links or social media icons */}
        </Container>
      </footer>
    </div>
  );
};

export default VillageSquare;
