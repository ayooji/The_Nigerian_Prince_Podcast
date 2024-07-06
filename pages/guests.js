import React from "react";
import { Grid, Container, Text, Spacer } from "@nextui-org/react";
import GuestCard from "../components/GuestCard"; // Ensure the correct import path
import guests from "../public/guests.json"; // Importing the guest data
import Head from "next/head";
import Footer from "../components/Footer"; // Ensure the correct import path for the Footer component

const GuestPage = () => {
  return (
    <>
      <Head>
        <title>Meet Our Guests - The Nigerian Prince Podcast</title>
        <meta name="description" content="Meet the diverse and inspiring guests featured on The Nigerian Prince Podcast. Discover their stories and insights." />
        <meta name="keywords" content="Nigerian Prince Podcast, podcast guests, interviews, guest stories, inspiring guests" />
        <meta property="og:title" content="Meet Our Guests - The Nigerian Prince Podcast" />
        <meta property="og:description" content="Meet the diverse and inspiring guests featured on The Nigerian Prince Podcast. Discover their stories and insights." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://www.thenigerianprincepodcast.com/guests" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meet Our Guests - The Nigerian Prince Podcast" />
        <meta name="twitter:description" content="Meet the diverse and inspiring guests featured on The Nigerian Prince Podcast. Discover their stories and insights." />
        <meta name="twitter:image" content="/twitter-image.jpg" />
      </Head>
      <div className="container mx-auto px-4">
        <Spacer y={1} />

        {/* Header */}
        <Grid.Container gap={2} justify="center">
          <Text h1 className="text-white text-4xl my-8" weight="bold" css={{ textAlign: "center" }}>
            Meet Our Guests
          </Text>
        </Grid.Container>

        {/* Guest Cards */}
        <Grid.Container gap={2} justify="center">
          {guests.map((guest, index) => (
            <Grid xs={12} sm={6} md={4} lg={3} key={index}>
              <GuestCard guest={guest} />
            </Grid>
          ))}
        </Grid.Container>

        {/* Footer */}
        <Spacer y={2} />
        <Footer />
      </div>
    </>
  );
};

export default GuestPage;
