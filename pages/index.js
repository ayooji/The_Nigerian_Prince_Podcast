import React from "react";
import Head from "next/head";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import { Text, Spacer, Row } from "@nextui-org/react";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaRumble,
} from "react-icons/fa";
import { SiSpotify, SiApplepodcasts, SiAmazon, SiDeezer } from "react-icons/si";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BlogList from "@/components/blog/BlogList";
import GuestCard from "../components/GuestCard";
import ContactForm from "../components/ContactForm";
import { getEpisodes } from "../lib/buzzsprout";
import { getAllBlogPosts } from "../lib/supabaseClient";
import guests from "../public/guests.json"; // Ensure this path is correct
import AudienceReach from "../components/AudienceReach";
import Donations from "../components/Donations";
import Footer from "../components/Footer";

const HomePage = ({ episodes, posts }) => {
  const guestSliderSettings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <NextSeo
        title="The Nigerian Prince Podcast - Engaging Conversations & Insightful Interviews"
        description="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content. Hosted by Ayo Oji"
        openGraph={{
          url: "https://www.nigerianprincepodcast.com",
          title: "The Nigerian Prince Podcast",
          description:
            "Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content.",
          images: [
            {
              url: "https://www.nigerianprincepodcast.com/logo.jpg",
              width: 800,
              height: 600,
              alt: "The Nigerian Prince Podcast",
            },
          ],
          site_name: "The Nigerian Prince Podcast",
        }}
        twitter={{
          handle: "@nigerianprincepodcast",
          site: "@nigerianprincepodcast",
          cardType: "summary_large_image",
        }}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Head>
          <title>The Nigerian Prince Podcast</title>
          <meta
            name="description"
            content="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content."
          />
          <meta
            property="og:url"
            content="https://www.nigerianprincepodcast.com"
          />
          <meta
            property="og:image"
            content="https://www.nigerianprincepodcast.com/logo.jpg"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="The Nigerian Prince Podcast - Engaging Conversations & Insightful Interviews"
          />
          <meta
            property="og:description"
            content="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="The Nigerian Prince Podcast - Engaging Conversations & Insightful Interviews"
          />
          <meta
            name="twitter:description"
            content="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content."
          />
          <meta
            name="twitter:image"
            content="https://www.nigerianprincepodcast.com/logo.jpg"
          />
          <meta name="twitter:site" content="@nigerianprincepodcast" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Organization",
              url: "https://www.nigerianprincepodcast.com",
              logo: "https://www.nigerianprincepodcast.com/logo.jpg",
              name: "The Nigerian Prince Podcast",
              sameAs: [
                "https://www.facebook.com/nigerianprincepodcast",
                "https://www.instagram.com/nigerianprincepodcast",
                "https://www.twitter.com/nigerianprincepodcast",
              ],
            })}
          </script>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Head>

        {/* Hero Section */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <Typography
                component="h1"
                sx={{
                  mb: 2,
                  fontSize: "3rem",
                  fontWeight: "bold",
                  background: "linear-gradient(145deg, #00ff00, #ffffff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "rotate 20s infinite linear",
                  "@keyframes rotate": {
                    "20%": { transform: "rotateY(0deg)" },
                    "100%": { transform: "rotateY(360deg)" },
                  },
                }}
              >
                THE NIGERIAN PRINCE PODCAST
              </Typography>
              <Typography
                component="h2"
                sx={{
                  mb: 2,
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                Join us for engaging conversations and insightful interviews.
                Hosted by Ayo Oji
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                href="#latest-episodes"
                sx={{ mb: 2 }}
              >
                Listen to Latest Episodes
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link
                  href="https://open.spotify.com/show/4wV3MdX9bXfmTMsuz8s8Dy"
                  target="_blank"
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  <IconButton sx={{ color: "#1DB954" }} aria-label="Spotify">
                    <SiSpotify size={30} />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Spotify
                  </Typography>
                </Link>
                <Link
                  href="https://podcasts.apple.com/us/podcast/the-nigerian-prince-podcast/id1542551188"
                  target="_blank"
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  <IconButton
                    sx={{ color: "#FA4A1E" }}
                    aria-label="Apple Podcasts"
                  >
                    <SiApplepodcasts size={30} />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Apple
                  </Typography>
                </Link>
                <Link
                  href="https://music.amazon.com/podcasts/27390a77-9142-425d-ade4-700aa00d6c9a/the-nigerian-prince-podcast"
                  target="_blank"
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  <IconButton
                    sx={{ color: "#FF9900" }}
                    aria-label="Amazon Music"
                  >
                    <SiAmazon size={30} />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Amazon
                  </Typography>
                </Link>
                <Link
                  href="https://www.deezer.com/en/show/2031782"
                  target="_blank"
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  <IconButton sx={{ color: "#FEAA2B" }} aria-label="Deezer">
                    <SiDeezer size={30} />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    Deezer
                  </Typography>
                </Link>
                <Link
                  href="https://www.youtube.com/nigerianprincepodcast"
                  target="_blank"
                  sx={{ mx: 1, textDecoration: "none" }}
                >
                  <IconButton sx={{ color: "#FF0000" }} aria-label="YouTube">
                    <FaYoutube size={30} />
                  </IconButton>
                  <Typography variant="body2" color="white">
                    YouTube
                  </Typography>
                </Link>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        <Spacer x={1.5} />
        <Box sx={{ py: 4 }} id="latest-episodes">
          {/* Latest Episodes Section */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="white"
          >
            Latest Episodes
          </Typography>
          <Grid container spacing={4}>
            {episodes.slice(0, 3).map((episode) => (
              <Grid item xs={12} md={4} key={episode.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1e1e1e",
                    color: "white",
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={episode.artwork_url || "/logo.jpg"}
                    alt={episode.title}
                    height="200"
                    sx={{ borderBottom: "2px solid #00FF00" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        fontFamily: "Montserrat",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        marginTop: "10px",
                      }}
                    >
                      {episode.title}
                    </Typography>
                    <Typography variant="body2" color="#cccccc">
                      {new Date(episode.published_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                  <Box sx={{ textAlign: "center", p: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{
                        backgroundColor: "#00FF00",
                        color: "black",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#00cc00",
                        },
                      }}
                      href={`/episode/${episode.id}`}
                    >
                      Listen Now
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" href="/episodes">
              View All Episodes
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="featured-guests">
          {/* Featured Guests Section */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="white"
          >
            Featured Guests
          </Typography>
          <Slider {...guestSliderSettings} style={{ padding: "0 20px" }}>
            {guests.map((guest, index) => (
              <div key={index} style={{ padding: "0 10px" }}>
                <GuestCard guest={guest} />
              </div>
            ))}
          </Slider>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" href="/guests">
              Meet All Guests
            </Button>
          </Box>
        </Box>

        <Box
          sx={{ py: 4, backgroundColor: "#121212", borderRadius: "10px", p: 4 }}
          id="village-square"
        >
          {/* Village Square Section */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="#00FF00"
          >
            The Village Square
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            color="white"
            sx={{ fontSize: "1.2rem", fontFamily: "Roboto, sans-serif" }}
          >
            At The Village Square, your stories bring to light diverse
            perspectives and unseen narratives. Join us in sharing your
            experiences and insights.
          </Typography>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#00FF00",
                color: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#00cc00" },
              }}
              href="/village-square"
            >
              Visit The Village Square
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="blog-highlights">
          {/* Blog Highlights Section */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="white"
          >
            Blog Highlights
          </Typography>
          <BlogList posts={posts.slice(0, 3)} />
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" href="/blog">
              Read All Blog Posts
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }}>
          {/* Audience Reach Section */}
          <AudienceReach />
        </Box>

        <Box sx={{ py: 4 }} id="sponsorship">
          {/* Sponsorship Section */}
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            color="white"
          >
            Sponsorship Opportunities
          </Typography>
          <Typography
            variant="body1"
            align="center"
            paragraph
            color="white"
            sx={{ fontSize: "1.2rem" }}
          >
            Partner with us to connect with a diverse and engaged audience.
            Explore our sponsorship packages and advertising opportunities.
          </Typography>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button variant="contained" color="primary" href="/sponsorship">
              Learn More
            </Button>
          </Box>
        </Box>
        <Box sx={{ py: 4 }}>
          {/* Donations Section */}
          <Donations />
        </Box>

        {/* Host Section */}
        <Grid container spacing={4} justifyContent="center" sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                textAlign: "center",
                boxShadow: 6,
                background: "linear-gradient(145deg, #006400, #000000)",
                borderRadius: 2,
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
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
                sx={{
                  height: 400,
                  borderRadius: 2,
                  position: "relative",
                  zIndex: 2,
                }}
              />
              <CardContent sx={{ position: "relative", zIndex: 2 }}>
                <Typography variant="h4">Ayo Oji</Typography>
                <Typography variant="subtitle1">Host & Founder</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Ayo Oji is the visionary host and founder of The Nigerian
                  Prince Podcast. With a robust background in computer
                  programming and web development, Ayo single-handedly built the
                  podcast&apos;s engaging website. His passion for storytelling
                  shines through in every episode as he navigates through
                  diverse topics that resonate deeply with his audience.
                  Ayo&apos;s unique approach blends technical expertise with a
                  genuine curiosity about the world, creating a platform where
                  insightful discussions and inspiring stories come to life.
                  Through his podcast, Ayo aims to bridge cultures, inform, and
                  entertain, making a lasting impact on his listeners.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="/about"
                    sx={{
                      backgroundColor: "#00FF00",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#00cc00",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ py: 4 }}>
          {/* Contact Section */}
          <ContactForm />
        </Box>

        {/* Footer */}
        <Footer />
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const episodes = await getEpisodes(); // Fetch the latest episodes
  const posts = await getAllBlogPosts(); // Fetch the latest blog posts

  return {
    props: {
      episodes,
      posts,
    },
    revalidate: 60,
  };
}

export default HomePage;
