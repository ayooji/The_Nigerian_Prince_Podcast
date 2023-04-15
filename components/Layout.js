import React from "react";
import { Box } from "./Box";
import { Container, Navbar, useTheme } from "@nextui-org/react";
import Head from "next/head";
import Header from "./Header";

const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <>
      <Head>
        <title>The Nigerian Prince Podcast</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="The Nigerian Prince Podcast" />
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <Box
        css={{
          maxW: "100%",
        }}
      >
        <Header />
        <Container>{children}</Container>
      </Box>
    </>
  );
};

export default Layout;
