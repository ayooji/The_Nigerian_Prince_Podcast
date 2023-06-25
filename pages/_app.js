"use client";
import React, { useState, useEffect } from "react";
import { createTheme, NextUIProvider, useTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

// Call createTheme for light and dark themes, adding color and typography customization

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {},
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
    colors: {},
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
  const [user, setUser] = useState(null);
  const router = useRouter();
  const fetchUserProfile = async (userId) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setUser(profile);
    }
  };

  useEffect(() => {
    const sessionListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("User session event:", event);

        if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
          fetchUserProfile(session.user.id);
        } else {
          setUser(null);
        }
      });

    const currentSession = supabase.auth.session;
    if (currentSession) {
      fetchUserProfile(currentSession.user.id);
    }

    return () => {
      if (typeof sessionListener === "function") {
        sessionListener();
      }
    };
  }, [router]);

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
          <Component {...pageProps} user={user} />
        </Layout>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
