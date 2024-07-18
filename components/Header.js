import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, Image } from "react-bootstrap";
import AuthButtons from "./AuthButtons";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { FaDonate } from "react-icons/fa"; // Import the donation icon

const Header = () => {
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

      return data[0].image_url;
    } catch (error) {
      console.error("Error fetching avatar: ", error);
      return null;
    }
  };

  return (
    <Navbar expand="lg" bg="#000000" variant="light" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image
            src="/logo.jpg"
            alt="The Nigerian Prince Podcast Logo"
            width={35}
            height={31}
            className="d-inline-block align-top"
          />
          <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '18px' }}>
            The Nigerian Prince Podcast
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/episodes">Episodes</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
            <Nav.Link href="/village-square">Village Square</Nav.Link>
            <Nav.Link href="/guests">Guests</Nav.Link>
            <Nav.Link href="/sponsorship">Sponsorship & Ads</Nav.Link>
            <Nav.Link href="/donations" className="d-flex align-items-center">
              <FaDonate size={20} style={{ marginRight: '5px' }} />
              Donate
            </Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {currentUser ? (
              <Dropdown align="right">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <Image
                    src={avatarUrl || "/avatar-placeholder.png"}
                    roundedCircle
                    width={30}
                    height={30}
                    alt="User avatar"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile/edit">Edit Profile</Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <AuthButtons />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
