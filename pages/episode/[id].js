import React from "react";
import { getEpisodeById, getEpisodes } from "../../lib/buzzsprout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "tailwindcss/tailwind.css";
import { Card, Text, Grid, Button } from "@nextui-org/react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "@nextui-org/react";

const EpisodePage = ({ episode }) => {
  const { isDark } = useTheme();

  return (
    <>
      <Head>
        <title>{`${episode.title} - The Nigerian Prince Podcast`}</title>
        <meta name="description" content={episode.description} />
        <meta property="og:title" content={`${episode.title} - The Nigerian Prince Podcast`} />
        <meta property="og:description" content={episode.description} />
        <meta property="og:url" content={`https://www.nigerianprincepodcast.com/episode/${episode.id}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={episode.artwork_url || "https://www.nigerianprincepodcast.com/logo.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${episode.title} - The Nigerian Prince Podcast`} />
        <meta name="twitter:description" content={episode.description} />
        <meta name="twitter:image" content={episode.artwork_url || "https://www.nigerianprincepodcast.com/logo.jpg"} />
      </Head>
      <Grid.Container justify="center" css={{ padding: "20px", backgroundColor: isDark ? "black" : "#ffffff" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Text
            h1
            css={{
              textAlign: "center",
              marginBottom: "20px",
              color: isDark ? "#ffffff" : "#000000",
              fontWeight: "bold",
              textGradient: "45deg, $green500 -20%, $white 10%",
            }}
          >
            {episode.title}
          </Text>
        </motion.div>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card css={{ backgroundColor: isDark ? "#171717" : "#f5f5f5", padding: "20px", textAlign: "center" }}>
                <Card.Body>
                  <Card.Image
                    src={episode.artwork_url || "/logo.jpg"}
                    alt="Episode artwork"
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    css={{ borderRadius: "10px" }}
                  />
                  <AudioPlayer className="w-full mt-4" src={episode.audio_url} style={{ maxWidth: "100%" }} />
                  <Text css={{ marginTop: "20px", color: isDark ? "#cccccc" : "#333333" }}>
                    <div dangerouslySetInnerHTML={{ __html: episode.description }} />
                  </Text>
                </Card.Body>
                <Card.Footer>
                  <Text small color="gray">
                    Published: {new Date(episode.published_at).toLocaleDateString()}
                  </Text>
                </Card.Footer>
              </Card>
            </motion.div>
          </Grid>
        </Grid.Container>
        <Link href="/episode" passHref>
          <Button
            auto
            icon={<FaArrowLeft />}
            css={{
              backgroundColor: "#0dbf0d",
              color: "#000",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#00cc00",
              },
            }}
          >
            Back to Episodes
          </Button>
        </Link>
      </Grid.Container>
      <Footer />
    </>
  );
};

export async function getStaticProps({ params }) {
  const episode = await getEpisodeById(params.id);

  return {
    props: {
      episode,
    },
  };
}

export async function getStaticPaths() {
  const episodes = await getEpisodes();
  const paths = episodes.map((episode) => ({
    params: { id: episode.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default EpisodePage;
