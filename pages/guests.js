import React from "react";
import { Grid, Container, Text, Spacer } from "@nextui-org/react";
import GuestCard from "../components/GuestCard"; // Ensure the correct import path
import guests from "../public/guests.json"; // Importing the guest data


const GuestPage = () => {
  return (
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
      <footer className="footer">
        <Container>
          <Spacer x={5} />
          <Text css={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} The Nigerian Prince Podcast, hosted by Ayo Oji
          </Text>
          {/* Additional footer content like links or social media icons can be added here */}
        </Container>
      </footer>
    </div>
  );
};

export default GuestPage;