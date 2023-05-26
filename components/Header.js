import React, { useState, useEffect } from "react";
import {
  Navbar,
  Button,
  Link,
  Image,
  Spacer,
  Text,
  Avatar,
  Dropdown,
} from "@nextui-org/react";
import AuthButtons from "./AuthButtons";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Header = () => {
  const [menuActiveKey, setMenuActiveKey] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const router = useRouter();
  const collapseItems = [
    "Home",
    "Episodes",
    "Village Square",
    "Blogs",
    "Guests",
    "Sponsorship & Ads",
    "Events",
    "About",
    "Shop",
    "Contact",
  ];

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    const onAuthStateChanged = async (event) => {
      const { session } = event.detail;
      setCurrentUser(session?.user);
      
      if (session?.user?.id) {
        const avatarUrl = await fetchAvatarUrl(session.user.id);
        setAvatarUrl(avatarUrl);
      }
    };
    
    window.addEventListener("onAuthStateChanged", onAuthStateChanged);
    return () => {
      window.removeEventListener("onAuthStateChanged", onAuthStateChanged);
    };
  }, []);
  
  const fetchAvatarUrl = async (user_id) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("image_url")
        .eq("user_id", user_id);
  
      if (error) {
        console.error("Error fetching avatar: ", error.message);
        return null;
      }
  
      if (!data || data.length !== 1) {
        console.error("Unexpected number of rows returned for avatar URL");
        return null;
      }
  
      return `https://${publicRuntimeConfig.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/storage/v1/object/public/avatars/${data[0].image_url}`;
    } catch (error) {
      console.error("Error fetching avatar: ", error);
      return null;
    }
  };

  return (
    <Navbar isBordered variant="sticky">
      <Navbar.Brand className="lightingEffect">
        <Navbar.Toggle aria-label="toggle navigation" />
        <Image
          src={"/logo.jpg"}
          alt="The Nigerian Prince Podcast Logo"
          width={35}
          height={31}
        />
        <Spacer />
        <Text b color="inherit" hideIn="xs" style={{ marginRight: "20px" }}>
          The Nigerian Prince Podcast
        </Text>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight hideIn="xs" activecolor="primary">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link isActive href="/episode">
          Episodes
        </Navbar.Link>
        <Navbar.Link b isActive variant="underline" href="/village-square">
          Village Square
        </Navbar.Link>
        <Navbar.Link href="/blog">Blogs</Navbar.Link>
        <Navbar.Link href="/guests">Guests</Navbar.Link>
        <Navbar.Link href="/sponsorship">Sponsorship &amp; Ads</Navbar.Link>
        <Navbar.Link href="/events">Events</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        {currentUser ? (
          <Navbar.Content
            css={{
              "@xs": {
                w: "12%",
                jc: "flex-end",
              },
            }}
          >
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="gradient"
                    size="md"
                    src={avatarUrl || "/avatar-placeholder.png"} // Use avatarUrl here
                    alt="User avatar"
                    zoomed
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="primary"
                onClick={(actionKey) => {
                  // Switch case to handle each dropdown item's action key
                  switch (actionKey) {
                    case "my_profile":
                      router.push("/profile/edit");
                      break;
                    // Add other cases for other dropdown items as needed
                    default:
                      break;
                  }
                }}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {currentUser?.email}
                  </Text>
                </Dropdown.Item>

                <Dropdown.Item key="my_inbox" withDivider>
                  My Inbox
                </Dropdown.Item>
                <Dropdown.Item key="posts" withDivider>
                  Posts
                </Dropdown.Item>
                <Dropdown.Item key="votes">Votes</Dropdown.Item>
                <Dropdown.Item key="comments">Comments</Dropdown.Item>
                <Dropdown.Item key="favorites">Favorite</Dropdown.Item>
                <Dropdown.Item key="ticket_&_rewards" withDivider>
                  Tickets & Rewards
                </Dropdown.Item>

                <Dropdown.Item key="my_cart">My Cart</Dropdown.Item>
                <Dropdown.Item key="my_profile" withDivider>
                  <Link
                    href="/profile/edit"
                    style={{ display: "block", textDecoration: "none" }}
                  >
                    My Profile
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item key="help_and_feedback" withDivider>
                  Help & Feedback
                </Dropdown.Item>
                <Dropdown.Item key="signout" withDivider>
                  <Button color="gradient" onClick={signOut}>
                    Sign Out
                  </Button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        ) : (
          <AuthButtons />
        )}
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem key={item}>
            <Link
              color="inherit"
              css={{
                color: index === collapseItems.length - 6 ? "$primary" : "",

                minWidth: "100%",
              }}
            >
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
