import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, Box } from '@mui/material';
import { motion } from 'framer-motion';
import AudienceReach from '../components/AudienceReach';
import SponsorshipPackages from '../components/SponsorshipPackages';
import AdvertisingOpportunities from '../components/AdvertisingOpportunities';
import ContactForm from '../components/ContactForm';
import Donations from '../components/Donations';

const SponsorshipPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
            <Card sx={{ width: '100%', marginBottom: 2 }}>
              <CardMedia
                component="img"
                image="/sponsorshipImages/heroImage.jpg"
                alt="Hero Image"
                sx={{ height: 300, borderRadius: 2 }}
              />
            </Card>
            <Typography variant="h3" component="h2" color="white" sx={{ mb: 2 }}>
              Reach Your Audience with The Nigerian Prince Podcast
            </Typography>
            <Typography variant="h5" component="h3" color="white" sx={{ mb: 2 }}>
              Partner with us to connect with a diverse and engaged audience.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      <Box sx={{ py: 4 }}>
        {/* Audience Reach Section */}
        <AudienceReach />

        <Box sx={{ py: 4 }}>
          {/* Sponsorship Packages Section */}
          <SponsorshipPackages />
        </Box>

        <Box sx={{ py: 4 }}>
          {/* Advertising Opportunities Section */}
          <AdvertisingOpportunities />
        </Box>

        <Box sx={{ py: 4 }}>
          {/* Donations Section */}
          <Donations />
        </Box>

        <Box sx={{ py: 4 }}>
          {/* Call to Action Section */}
          <ContactForm />
        </Box>
      </Box>
    </Container>
  );
};

export default SponsorshipPage;
