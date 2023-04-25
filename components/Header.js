import React from "react";
import { Navbar, Button, Link, Image, Spacer, Text } from "@nextui-org/react";
import AuthButtons from './AuthButtons';

const Header = () => {
  const collapseItems = [
    "Home",
    "Episodes",
    "Village Square",
    "About",
    "Guests",
    "Sponsorship & Ads",
    "Contact",
  ];

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

      <Navbar.Content hideIn="xs" variant="underline">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/episode">Episodes</Navbar.Link>
        <Navbar.Link isActive href="/village-square">Village Square</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/guests">Guests</Navbar.Link>
        <Navbar.Link href="/sponsorship">Sponsorship &amp; Ads</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
      <AuthButtons />
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
