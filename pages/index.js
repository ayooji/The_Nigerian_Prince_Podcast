import React from 'react';
import Head from 'next/head';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box, Link } from '@mui/material';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import BlogList from '@/components/blog/BlogList';
import GuestCard from '../components/GuestCard';
import ContactForm from '../components/ContactForm';
import { getEpisodes } from '../lib/buzzsprout';
import { getAllBlogPosts } from '../lib/supabaseClient';
import guests from '../public/guests.json'; // Ensure this path is correct

const HomePage = ({ episodes, posts }) => {
  return (
    <>
      <NextSeo
        title="The Nigerian Prince Podcast - Engaging Conversations & Insightful Interviews"
        description="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content. Hosted by Ayo Oji"
        openGraph={{
          url: 'https://www.thenigerianprincepodcast.com',
          title: 'The Nigerian Prince Podcast',
          description: 'Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content.',
          images: [
            {
              url: 'https://www.thenigerianprincepodcast.com/heroImage.jpg',
              width: 800,
              height: 600,
              alt: 'The Nigerian Prince Podcast',
            },
          ],
          site_name: 'The Nigerian Prince Podcast',
        }}
        twitter={{
          handle: '@nigerianprincepodcast',
          site: '@nigerianprincepodcast',
          cardType: 'summary_large_image',
        }}
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Head>
          <title>The Nigerian Prince Podcast</title>
          <meta name="description" content="Welcome to The Nigerian Prince Podcast, your go-to source for engaging conversations, insightful interviews, and thought-provoking content." />
        </Head>

        {/* Hero Section */}
        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(/heroImage.jpg)' }}>
          <Grid item xs={12} sm={8} md={6}>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '20px',
                borderRadius: '15px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h2" component="h1" color="white" sx={{ mb: 2 }}>
                The Nigerian Prince Podcast
              </Typography>
              <Typography variant="h5" component="h2" color="white" sx={{ mb: 2 }}>
                Join us for engaging conversations and insightful interviews. Hosted by Ayo oji
              </Typography>
              <Button variant="contained" color="secondary" href="#latest-episodes">
                Listen to Latest Episodes
              </Button>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ py: 4 }} id="latest-episodes">
          {/* Latest Episodes Section */}
          <Typography variant="h4" component="h2" align="center" gutterBottom  color="white">
            Latest Episodes
          </Typography>
          <Grid container spacing={4}>
            {episodes.slice(0, 3).map((episode) => (
              <Grid item xs={12} md={4} key={episode.id}>
                <Card>
                  <CardMedia component="img" image={episode.artwork_url || '/logo.jpg'} alt={episode.title} height="200" />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {episode.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(episode.published_at).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" href="/episodes">
              View All Episodes
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="featured-guests">
          {/* Featured Guests Section */}
          <Typography variant="h4" component="h2" align="center" gutterBottom  color="white">
            Featured Guests
          </Typography>
          <Grid container spacing={4}>
            {guests.slice(0, 3).map((guest, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <GuestCard guest={guest} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" href="/guests">
              Meet All Guests
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="village-square">
          {/* Village Square Section */}
          <Typography variant="h4" component="h2" align="center" gutterBottom  color="white">
            The Village Square
          </Typography>
          <Typography variant="body1" align="center" paragraph  color="white">
            At The Village Square, your stories bring to light diverse perspectives and unseen narratives. Join us in sharing your experiences and insights.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" href="/village-square">
              Visit The Village Square
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="blog-highlights">
          {/* Blog Highlights Section */}
          <Typography variant="h4" component="h2" align="center" gutterBottom  color="white">
            Blog Highlights
          </Typography>
          <BlogList posts={posts.slice(0, 3)} />
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" href="/blog">
              Read All Blog Posts
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }} id="sponsorship">
          {/* Sponsorship Section */}
          <Typography variant="h4" component="h2" align="center" gutterBottom  color="white">
            Sponsorship Opportunities
          </Typography>
          <Typography variant="body1" align="center" paragraph  color="white"> 
            Partner with us to connect with a diverse and engaged audience. Explore our sponsorship packages and advertising opportunities.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button variant="contained" color="primary" href="/sponsorship">
              Learn More
            </Button>
          </Box>
        </Box>

        <Box sx={{ py: 4 }}>
          {/* Contact Section */}
          <ContactForm />
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2"  color="white">
            &copy; {new Date().getFullYear()} The Nigerian Prince Podcast
          </Typography>
          <Typography variant="body2"  color="white" sx={{ mb: 2 }}>
            Built by Ayo Oji
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Link href="https://www.instagram.com/ayo_oji" target="_blank">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FaInstagram />}
                >
                  @ayo_oji
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="https://www.instagram.com/nigerianprincepodcast"
                target="_blank"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FaInstagram />}
                >
                  @thenigerianprincepodcast
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const episodes = await getEpisodes(); // Fetch the latest episodes
  const posts = await getAllBlogPosts(); // Fetch the latest blog posts

  return {
    props: {
      episodes,
      posts,
    },
    revalidate: 60,
  };
}

export default HomePage;
