import React from "react";
import { getEpisodeById, getEpisodes } from "../../lib/buzzsprout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "tailwindcss/tailwind.css";
import { Card, Text, Image, Row, Col, Spacer, Grid } from "@nextui-org/react";
import Head from "next/head";

const EpisodePage = ({ episode }) => {
  return (
    <>
      <Head>
        <title>{episode.title}</title>
      </Head>
      <div className="container mx-auto px-4">
        <Spacer />
        <Grid.Container gap={1} justify="center">
          <Text b h3 justify="center" className="text-white text-4xl my-8">
            {episode.title}
          </Text>
        </Grid.Container>
        <Grid.Container
          gap={2}
          justify="center"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
        <Grid xs={24} md={9}
        >
          <Card variant="bordered" className="bg-gray-700">
            <Card.Body>
              <Row>
                <Col>
                  <Col>
                    <Card.Image
                      src={episode.artwork_url || "/logo.jpg"}
                      alt="Episode artwork"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Col>
                  <div className="bg-gray-800 rounded-lg p-1 mx-4 h-full">
                    <div className="bg-gray-900 rounded-lg p-4 h-full">
                      <AudioPlayer
                        className="w-full"
                        src={episode.audio_url}
                        style={{ maxWidth: "100%" }}
                      />
                      <div className="mt-4 prose prose-lg text-white">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: episode.description,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        </Grid.Container>
        <Card.Footer>
         
          <Text small color="gray-300" className="mt-2" >
            Published: {new Date(episode.published_at).toLocaleDateString()}
          </Text>
      
        </Card.Footer>
      </div>
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
    fallback: false, // If an episode is not found, show a 404 page
  };
}

export default EpisodePage;
