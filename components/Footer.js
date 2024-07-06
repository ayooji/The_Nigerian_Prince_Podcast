// components/Footer.js

import React from "react";
import { Box, Grid, Typography, Link, IconButton } from "@mui/material";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import { SiSpotify, SiApplepodcasts, SiAmazon, SiDeezer, SiYoutube } from "react-icons/si";

const Footer = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 5,
        py: 4,
        backgroundColor: "#1e1e1e",
        color: "white",
      }}
    >
      <Typography variant="body2" color="white" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} The Nigerian Prince Podcast
      </Typography>
      <Typography variant="body2" color="white" sx={{ mb: 2 }}>
        Built by Ayo Oji
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={3}>
          <Link
            href="https://www.instagram.com/ayo_oji"
            target="_blank"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <IconButton sx={{ color: "#E1306C" }} aria-label="Instagram">
              <FaInstagram size={30} />
            </IconButton>
            <Typography variant="body2" color="white">
              Host Instagram
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link
            href="https://www.instagram.com/nigerianprincepodcast"
            target="_blank"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <IconButton sx={{ color: "#E1306C" }} aria-label="Instagram">
              <FaInstagram size={30} />
            </IconButton>
            <Typography variant="body2" color="white">
              Podcast Instagram
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link
            href="https://www.facebook.com/nigerianprincepodcast"
            target="_blank"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <IconButton sx={{ color: "#1877F2" }} aria-label="Facebook">
              <FaFacebook size={30} />
            </IconButton>
            <Typography variant="body2" color="white">
              Facebook
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link
            href="https://twitter.com/nigerianprincepodcast"
            target="_blank"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <IconButton sx={{ color: "#1DA1F2" }} aria-label="Twitter">
              <FaTwitter size={30} />
            </IconButton>
            <Typography variant="body2" color="white">
              Twitter
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
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
        </Grid>
        <Grid item xs={3}>
          <Link
            href="https://www.youtube.com/channel/UCxyz123456"
            target="_blank"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            <IconButton sx={{ color: "#FF0000" }} aria-label="YouTube">
              <SiYoutube size={30} />
            </IconButton>
            <Typography variant="body2" color="white">
              YouTube
            </Typography>
          </Link>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, flexWrap: "wrap" }}>
        <Link href="/privacy-policy" sx={{ mx: 1, textDecoration: "none" }}>
          <Typography variant="body2" color="white">
            Privacy Policy
          </Typography>
        </Link>
        <Link href="/terms-of-service" sx={{ mx: 1, textDecoration: "none" }}>
          <Typography variant="body2" color="white">
            Terms of Service
          </Typography>
        </Link>
        <Link href="/contact" sx={{ mx: 1, textDecoration: "none" }}>
          <Typography variant="body2" color="white">
            Contact Us
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
