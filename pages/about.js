import React from "react";
import {
  Container,
  Text,
  Grid,
  Card,
  Spacer,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import { FaInstagram } from "react-icons/fa";

const AboutPage = () => {
  return (
    <Container
      css={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px" }}
    >
      <Text h2 css={{ textAlign: "center", marginBottom: "20px" }}>
        About The Nigerian Prince Podcast
      </Text>
      <Text
        css={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        Welcome to The Nigerian Prince Podcast, your go-to source for engaging
        conversations, insightful interviews, and thought-provoking content.
        Join us as we explore a wide range of topics, from culture and lifestyle
        to technology and business.
      </Text>
      <Spacer y={2} />


    
     
    {/* Host Section */}
<Grid.Container gap={2} justify="center">
  <Grid xs={12} sm={8}>
    <Card css={{
      padding: '20px',
      textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      background: '#000000',
      borderRadius: '10px',
      color: '#00c853'
    }}>
      <Card.Body>
        <Image
          src="/guestImages/Ayo_Oji.png"
          objectFit="cover"
          width="100%"
          height={300}
          alt="Host Image"
          css={{ borderRadius: '10px', marginBottom: '20px', border: '5px solid #00c853' }}
        />
        <Text h3 css={{ marginTop: '10px', color: '#00c853' }}>Ayo Oji</Text>
        <Text css={{ color: '#b2ff59' }}>Host & Founder</Text>
        <Text css={{ marginTop: '10px', fontSize: '16px', lineHeight: '1.6', color: '#b2ff59' }}>
          Ayo Oji is the visionary host and founder of The Nigerian Prince Podcast. With a robust background in computer programming and web development, Ayo single-handedly built the podcast's engaging website. His passion for storytelling shines through in every episode as he navigates through diverse topics that resonate deeply with his audience. Ayo's unique approach blends technical expertise with a genuine curiosity about the world, creating a platform where insightful discussions and inspiring stories come to life. Through his podcast, Ayo aims to bridge cultures, inform, and entertain, making a lasting impact on his listeners.
        </Text>
      </Card.Body>
    </Card>
  </Grid>
</Grid.Container>

 


      <Spacer y={2} />

      {/* Mission Section */}
      <Text h3 css={{ textAlign: "center", marginBottom: "20px" }}>
        Our Mission
      </Text>
      <Text
        css={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        At The Nigerian Prince Podcast, our mission is to inspire, educate, and
        entertain our audience through diverse and compelling content. We aim to
        create a platform where voices from all walks of life can be heard, and
        where meaningful conversations can take place.
      </Text>

      {/* Vision Section */}
      <Text h3 css={{ textAlign: "center", marginBottom: "20px" }}>
        Our Vision
      </Text>
      <Text
        css={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        Our vision is to be a leading podcast that bridges cultures and brings
        people together through the power of storytelling. We strive to be a
        trusted source of information and inspiration for our listeners.
      </Text>

      <Spacer y={2} />

      {/* Values Section */}
      <Text h3 css={{ textAlign: "center", marginBottom: "20px" }}>
        Our Values
      </Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={4}>
          <Card
            css={{
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body>
              <Text h4>Integrity</Text>
              <Text css={{ fontSize: "16px", lineHeight: "1.6" }}>
                We are committed to honesty and transparency in everything we
                do.
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card
            css={{
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body>
              <Text h4>Diversity</Text>
              <Text css={{ fontSize: "16px", lineHeight: "1.6" }}>
                We celebrate and respect the diverse backgrounds and
                perspectives of our guests and listeners.
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={4}>
          <Card
            css={{
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Card.Body>
              <Text h4>Excellence</Text>
              <Text css={{ fontSize: "16px", lineHeight: "1.6" }}>
                We strive for excellence in the quality of our content and the
                experience we provide to our listeners.
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      {/* Footer Section */}
      <footer
        className="footer"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <Text>
          &copy; {new Date().getFullYear()} The Nigerian Prince Podcast
        </Text>
        <Text>Built by Ayo Oji</Text>
        <Grid.Container gap={2} justify="center" css={{ marginTop: "20px" }}>
          <Grid>
            <Link href="https://www.instagram.com/ayo_oji" target="_blank">
              <Button
                auto
                color="gradient"
                css={{ display: "flex", alignItems: "center" }}
              >
                <FaInstagram style={{ marginRight: "10px" }} />
                @ayo_oji
              </Button>
            </Link>
          </Grid>
          <Grid>
            <Link
              href="https://www.instagram.com/thenigerianprincepodcast"
              target="_blank"
            >
              <Button
                auto
                color="gradient"
                css={{ display: "flex", alignItems: "center" }}
              >
                <FaInstagram style={{ marginRight: "10px" }} />
                @thenigerianprincepodcast
              </Button>
            </Link>
          </Grid>
        </Grid.Container>
      </footer>
    </Container>
  );
};

export default AboutPage;
