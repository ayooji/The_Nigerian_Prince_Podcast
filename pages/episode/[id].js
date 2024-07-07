import React from "react";
import { getEpisodeById, getEpisodes } from "../../lib/buzzsprout";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "tailwindcss/tailwind.css";
import { Card, Text, Image, Row, Col, Spacer, Grid, Button } from "@nextui-org/react";
import Head from "next/head";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const EpisodePage = ({ episode }) => {
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
      <Grid.Container className="container mx-auto px-4">
        <Spacer />
        <Grid.Container
          gap={1}
          justify="center"
          alignItems="center"
          direction="column"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.5)",
            textAlign: "center",
          }}
        >
         
          <Text
            b
            h3
            className="text-white text-4xl my-8"
            css={{
              textGradient: "45deg, $green500 -20%, $white 10%",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {episode.title}
          </Text>
        </Grid.Container>
        <Grid.Container
          gap={2}
          justify="center"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <Grid md={5} xs={24} justify="center">
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
              <Card.Footer>
                <Text small color="gray-300" className="mt-2">
                  Published:{" "}
                  {new Date(episode.published_at).toLocaleDateString()}
                </Text>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
        <Link href="/episode" passHref>
            <Button
              auto
              icon={<FaArrowLeft />}
              css={{
                backgroundColor: "#0dbf0d",
                color: "#000",
                mb: 4,
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
