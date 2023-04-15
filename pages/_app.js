'use client'

import { createTheme, NextUIProvider, useTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

// Call createTheme for light and dark themes, adding color and typography customization

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#008000", // Green
      primaryInverted: "#FFFFFF", // White
      accent1: "#FF0000", // Red
      accent2: "#0000FF", // Blue
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontFamily: "Lora, serif",
      },
      h2: {
        fontFamily: "Lora, serif",
      },
      h3: {
        fontFamily: "Lora, serif",
      },
      h4: {
        fontFamily: "Lora, serif",
      },
      h5: {
        fontFamily: "Lora, serif",
      },
      h6: {
        fontFamily: "Lora, serif",
      },
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#008000", // Green
      primaryInverted: "#FFFFFF", // White
      accent1: "#FF0000", // Red
      accent2: "#0000FF", // Blue
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
      h1: {
        fontFamily: "Lora, serif",
      },
      h2: {
        fontFamily: "Lora, serif",
      },
      h3: {
        fontFamily: "Lora, serif",
      },
      h4: {
        fontFamily: "Lora, serif",
      },
      h5: {
        fontFamily: "Lora, serif",
      },
      h6: {
        fontFamily: "Lora, serif",
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{ 
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
      <DefaultSeo {...SEO} />
         <Layout>
          <Component {...pageProps} />
         </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;