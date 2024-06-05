import React from 'react';
import { Grid, Container, Text, Button, Spacer, Card } from '@nextui-org/react';
import { motion } from 'framer-motion';
import AudienceReach from '../components/AudienceReach';
import SponsorshipPackages from '../components/SponsorshipPackages';
import AdvertisingOpportunities from '../components/AdvertisingOpportunities';
import ContactForm from '../components/ContactForm';
import Donations from '../components/Donations';

const SponsorshipPage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <Grid.Container gap={2} justify="center" alignItems="center" css={{ height: '70vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Grid xs={12} sm={8} md={6}>
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
            <Card css={{ width: '100%', marginBottom: '20px' }}>
              <Card.Image src="/sponsorshipImages/heroImage.jpg" objectFit="cover" width="100%" height={300} alt="Hero Image" />
            </Card>
            <Text h1 css={{ color: '#fff' }}>
              Reach Your Audience with The Nigerian Prince Podcast
            </Text>
            <Text h3 css={{ color: '#fff', margin: '20px 0' }}>
              Partner with us to connect with a diverse and engaged audience.
            </Text>
      
          </motion.div>
        </Grid>
      </Grid.Container>

      <Spacer y={2} />

      {/* Audience Reach Section */}
      <AudienceReach />

      <Spacer y={2} />

      {/* Sponsorship Packages Section */}
      <SponsorshipPackages />

      <Spacer y={2} />

      {/* Advertising Opportunities Section */}
      <AdvertisingOpportunities />

      <Spacer y={2} />

      {/* Donations Section */}
      <Donations />

      <Spacer y={2} />

      {/* Call to Action Section */}
      <ContactForm />
    </div>
  );
};

export default SponsorshipPage;
