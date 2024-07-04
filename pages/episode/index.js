import React, { useState } from "react";
import { getEpisodes } from "../../lib/buzzsprout";
import "react-h5-audio-player/lib/styles.css";
import Link from "next/link";
import ShareButtons from "../../components/ShareButtons";
import {
  Card,
  Text,
  Image,
  Grid,
  Spacer,
  Loading,
  Row,
} from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { Pagination } from "react-bootstrap";
import GuestButton from "@/components/GuestButton";
import { motion } from "framer-motion";
import Head from "next/head";

const EpisodesPage = ({ episodes, currentPage }) => {
  const [loading, setLoading] = useState(false);
  const [clickedEpisodeId, setClickedEpisodeId] = useState(null);
  const showEpisodesFrom = (currentPage - 1) * 8;
  const showEpisodesTo = showEpisodesFrom + 8;
  const episodesToDisplay = episodes.slice(showEpisodesFrom, showEpisodesTo);
  const router = useRouter();

  const handlePageChange = (newPage) => {
    const href = `/episode?page=${newPage}`;
    router.push(href, href);
  };

  const handleCardClick = async (episodeId) => {
    setClickedEpisodeId(episodeId);
    setLoading(true);
    await router.push(`/episode/${episodeId}`);
    setLoading(false);
  };

  const fadeInUpVariants = (delay) => ({
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: delay,
      },
    },
  });

  const hoverVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#6EFFA2",
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Episodes - The Nigerian Prince Podcast</title>
        <meta name="description" content="Explore all episodes of The Nigerian Prince Podcast, featuring engaging conversations and insightful interviews on various topics." />
        <meta property="og:title" content="Episodes - The Nigerian Prince Podcast" />
        <meta property="og:description" content="Explore all episodes of The Nigerian Prince Podcast, featuring engaging conversations and insightful interviews on various topics." />
        <meta property="og:url" content="https://www.nigerianprincepodcast.com/episodes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.nigerianprincepodcast.com/logo.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Episodes - The Nigerian Prince Podcast" />
        <meta name="twitter:description" content="Explore all episodes of The Nigerian Prince Podcast, featuring engaging conversations and insightful interviews on various topics." />
        <meta name="twitter:image" content="https://www.nigerianprincepodcast.com/logo.jpg" />
      </Head>
      <div className="container mx-auto px-4">
        <Spacer />
        <Grid.Container gap={2} justify="center">
          <Text h1 className="text-white text-4xl my-8">
            Episodes
          </Text>
        </Grid.Container>
        <Spacer />
        <motion.div initial="initial" animate="animate">
          <Grid.Container
            gap={2}
            justify="center"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {episodesToDisplay.map((episode, index) => (
              <Grid
                xs={24}
                md={3}
                key={episode.id}
                onClick={() => handleCardClick(episode.id)}
              >
                <motion.div
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  variants={{
                    ...fadeInUpVariants(index * 0.5),
                    ...hoverVariants,
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div
                    key={episode.id}
                    className="rounded overflow-hidden shadow-lg bg-gray-700 w-full md:w-card-mobile"
                  >
                    {loading && episode.id === clickedEpisodeId && (
                      <Grid.Container
                        justify="center"
                        className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black"
                      >
                        <Loading size="xl" color="success" type="spinner" />
                      </Grid.Container>
                    )}
                    <Card
                      className=" card-gradient card-box-shadow card-box-shadow-hover-hover card-active"
                      isHoverable
                      variant="bordered"
                      isPressable
                    >
                      <Card.Body>
                        <Image
                          src={episode.artwork_url || "/logo.jpg"}
                          alt="Episode artwork"
                          className="object-cover w-full h-mobile md:h-56"
                          style={{
                            height: episode.artwork_url ? "250px" : "inherit",
                          }}
                        />
                      </Card.Body>
                      <Card.Header>
                        <div className="p-6">
                          <Text
                            size="$md"
                            h5
                            className="text-white text-xl overflow-hidden"
                            css={{
                              textGradient: "45deg, $white -5%, $green600 90%",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                            weight="bold"
                          >
                            <Link href={`/episode/${episode.id}`}>
                              <span>{episode.title}</span>
                            </Link>
                          </Text>
                          <Spacer />
                        </div>
                      </Card.Header>
                      <Card.Footer>
                        <Row wrap="wrap" justify="space-between" align="center">
                          <Text className="mt-2 p-1" color="gray-300">
                            Published:{" "}
                            {new Date(
                              episode.published_at
                            ).toLocaleDateString()}
                          </Text>
                          <GuestButton episodeId={episode.id} />
                          <ShareButtons
                            url={`https://nigerianprincepodcast.com/episode/${episode.id}`}
                            title={episode.title}
                          />
                        </Row>
                      </Card.Footer>
                    </Card>
                  </div>
                </motion.div>
              </Grid>
            ))}
            <Spacer y={2} />
            <Grid.Container gap={2} justify="center">
              <Pagination
                style={{
                  backgroundColor: "black",
                  color: "black",
                  borderColor: "black",
                  margin: "0 2px",
                }}
              >
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {[...Array(10).keys()].map((num) => (
                  <Pagination.Item
                    key={num}
                    active={num + 1 === currentPage}
                    onClick={() => handlePageChange(num + 1)}
                  >
                    {num + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                />
                <Pagination.Last onClick={() => handlePageChange(10)} />
              </Pagination>
            </Grid.Container>
          </Grid.Container>
        </motion.div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const currentPage = query?.page || 1;
  const episodes = await getEpisodes(currentPage, 8);

  return {
    props: {
      episodes,
      currentPage: parseInt(currentPage, 10),
    },
  };
}

export default EpisodesPage;
