import React from 'react';
import { Container, Text, Card, Grid } from '@nextui-org/react';

const SponsorshipPackages = () => {
  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Sponsorship Packages
      </Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Gold Package</Text>
            </Card.Header>
            <Card.Body>
              <Text>Includes: Pre-roll ads, mid-roll ads, banner ads, and social media mentions.</Text>
              <Text>Price: $1000/month</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Silver Package</Text>
            </Card.Header>
            <Card.Body>
              <Text>Includes: Mid-roll ads, banner ads, and social media mentions.</Text>
              <Text>Price: $700/month</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Bronze Package</Text>
            </Card.Header>
            <Card.Body>
              <Text>Includes: Banner ads and social media mentions.</Text>
              <Text>Price: $400/month</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default SponsorshipPackages;
