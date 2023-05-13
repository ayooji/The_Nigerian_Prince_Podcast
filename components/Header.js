import React, { useState, useEffect } from 'react';
import { Navbar, Button, Link, Image, Spacer, Text, Avatar, Dropdown } from '@nextui-org/react';
import AuthButtons from './AuthButtons';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();
  const collapseItems = [
    'Home',
    'Episodes',
    'Village Square',
    'About',
    'Guests',
    'Sponsorship & Ads',
    'Contact',
  ];

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    const onAuthStateChanged = (event) => {
      const { session } = event.detail;
      setCurrentUser(session?.user);
    };
    // Attach the event listener
    window.addEventListener('onAuthStateChanged', onAuthStateChanged);

    // Cleanup
    return () => {
      // Remove the event listener
      window.removeEventListener('onAuthStateChanged', onAuthStateChanged);
    };
  }, []);

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
        <Navbar.Link isActive href="/village-square">
          Village Square
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/guests">Guests</Navbar.Link>
        <Navbar.Link href="/sponsorship">Sponsorship &amp; Ads</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
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
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  zoomed
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="warning"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
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
              <Dropdown.Item key="my_profile">My Profile</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="signout" withDivider>
              <Button color="error" onClick={signOut}>Sign Out</Button>
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