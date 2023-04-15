import React, { useState, useEffect } from "react";
import { getEpisodes } from "../../lib/buzzsprout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Link from "next/link";
import { Card, Text, Image, Grid, Spacer } from "@nextui-org/react";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { Pagination } from "@nextui-org/react";

const EpisodesPage = ({ episodes, currentPage }) => {
  const showEpisodesFrom = (currentPage - 1) * 8;
  const showEpisodesTo = showEpisodesFrom + 8;
  const episodesToDisplay = episodes.slice(showEpisodesFrom, showEpisodesTo);
  const router = useRouter();
  

  const handlePageChange = (newPage) => {
    const href = `/episode?page=${newPage}`;
    router.push(href, href);
  };

  const handleCardClick = async (episodeId) => {
    setIsLoading(true);
    await router.push(`/episode/${episodeId}`);
    setIsLoading(false);
  };

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
        <Grid.Container
          gap={2}
          justify="center"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {episodesToDisplay.map((episode) => (
            <Grid
              xs={12}
              md={3}
              key={episode.id}
              onClick={() => handleCardClick(episode.id)}
            >
              <div
                key={episode.id}
                className="rounded overflow-hidden shadow-lg bg-gray-700"
              >
                <Card
                  className="card-gradient card-box-shadow card-box-shadow-hover-hover card-active"
                  isHoverable
                  variant="bordered"
                  isPressable
                >
                  <Card.Body>
                    <Image
                      src={episode.artwork_url || "/logo.jpg"}
                      alt="Episode artwork"
                      className="object-cover w-full h-56"
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
                    <Text className="mt-2 p-1" color="gray-300">
                      Published:{" "}
                      {new Date(episode.published_at).toLocaleDateString()}
                    </Text>
                  </Card.Footer>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid.Container>

        <Spacer />
      </div>
      <Grid.Container justify="center">
        <Pagination
          total={100} // Adjust this number to be large enough to cover all potential episode pages
          initialPage={currentPage}
          onChange={handlePageChange}
        />
      </Grid.Container>
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
