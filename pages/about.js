import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Link,
  Box,
} from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { white } from "tailwindcss/colors";

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" align="center" gutterBottom color={white}>
        About The Nigerian Prince Podcast
      </Typography>
      <Typography variant="body1" align="center" paragraph color={white}>
        Welcome to The Nigerian Prince Podcast, your go-to source for engaging
        conversations, insightful interviews, and thought-provoking content.
        Join us as we explore a wide range of topics, from culture and lifestyle
        to technology and business.
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
        {/* Host Section */}
        <Grid item xs={12} sm={8}>
          <Card
            sx={{
              textAlign: "center",
              boxShadow: 6,
              background: "linear-gradient(145deg, #006400, #000000)",
              borderRadius: 2,
              color: "white",
              position: "relative",
              overflow: "hidden",
              '&::before': {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "200%",
                height: "200%",
                background: "rgba(255, 255, 255, 0.1)",
                opacity: 0.3,
                transform: "rotate(45deg)",
                zIndex: 1,
              },
            }}
          >
            <CardMedia
              component="img"
              image="/guestImages/Ayo_Oji.png"
              alt="Host Image"
              sx={{ height: 400, borderRadius: 2, position: 'relative', zIndex: 2 }}
            />
            <CardContent sx={{ position: "relative", zIndex: 2 }}>
              <Typography variant="h4">Ayo Oji</Typography>
              <Typography variant="subtitle1">Host & Founder</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Ayo Oji is the visionary host and founder of The Nigerian Prince
                Podcast. With a robust background in computer programming and
                web development, Ayo single-handedly built the podcast's engaging
                website. His passion for storytelling shines through in every
                episode as he navigates through diverse topics that resonate
                deeply with his audience. Ayo's unique approach blends technical
                expertise with a genuine curiosity about the world, creating a
                platform where insightful discussions and inspiring stories come
                to life. Through his podcast, Ayo aims to bridge cultures, inform,
                and entertain, making a lasting impact on his listeners.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h3" align="center" gutterBottom color={white}>
        Our Mission
      </Typography>
      <Typography variant="body1" align="center" paragraph color={white}>
        At The Nigerian Prince Podcast, our mission is to inspire, educate, and
        entertain our audience through diverse and compelling content. We aim to
        create a platform where voices from all walks of life can be heard, and
        where meaningful conversations can take place.
      </Typography>

      <Typography variant="h3" align="center" gutterBottom color={white}>
        Our Vision
      </Typography>
      <Typography variant="body1" align="center" paragraph color={white}>
        Our vision is to be a leading podcast that bridges cultures and brings
        people together through the power of storytelling. We strive to be a
        trusted source of information and inspiration for our listeners.
      </Typography>

      <Typography variant="h3" align="center" gutterBottom color={white}>
        Our Values
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4">Integrity</Typography>
              <Typography variant="body1">
                We are committed to honesty and transparency in everything we
                do.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4">Diversity</Typography>
              <Typography variant="body1">
                We celebrate and respect the diverse backgrounds and
                perspectives of our guests and listeners.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4">Excellence</Typography>
              <Typography variant="body1">
                We strive for excellence in the quality of our content and the
                experience we provide to our listeners.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box component="footer" sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="body2" color={white}>
          &copy; {new Date().getFullYear()} The Nigerian Prince Podcast
        </Typography>
        <Typography variant="body2" color={white} sx={{ mb: 2 }}>
          Built by Ayo Oji
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Link href="https://www.instagram.com/ayo_oji" target="_blank">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FaInstagram />}
              >
                @ayo_oji
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="https://www.instagram.com/nigerianprincepodcast"
              target="_blank"
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FaInstagram />}
              >
                @thenigerianprincepodcast
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AboutPage;
