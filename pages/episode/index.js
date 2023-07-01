import React, { useState, useEffect } from "react";
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
import { Pagination } from "@nextui-org/react";
import GuestButton from "@/components/GuestButton";
import { motion, useMotionValue } from "framer-motion";

const EpisodesPage = ({ episodes, currentPage }) => {
  const [loading, setLoading] = useState(false);
  const [clickedEpisodeId, setClickedEpisodeId] = useState(null);
  const showEpisodesFrom = (currentPage - 1) * 8;
  const showEpisodesTo = showEpisodesFrom + 8;
  const episodesToDisplay = episodes.slice(showEpisodesFrom, showEpisodesTo);
  const [favoriteEpisodes, setFavoriteEpisodes] = useState(new Set());
  const router = useRouter();
  const episodeId = episodes.id;

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
      backgroundColor: "#6EFFA2", // Replace with desired shining green color
      boxShadow: "0px 4px 20px rgba(110, 255, 162, 0.4)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const imageSrc = episodes.artwork_url || "/logo.jpg";
  return (
    <div className="container mx-auto px-4">
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
                          src={imageSrc}
                          alt="Episode artwork"
                          className="object-cover w-full h-mobile md:h-56" // Add the 'h-mobile' class for mobile
                          style={{
                            height: episode.artwork_url ? "250px" : "inherit", // Shrinks image height on mobile if 'artwork_url' is available
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
                            url={`https://nigerianprincepodcast.com/episode/${episode.id}`} // Replace with your website URL
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
                total={100} // Adjust this number to be large enough to cover all potential episode pages
                initialPage={currentPage}
                onChange={handlePageChange}
                color="success"
              />
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
