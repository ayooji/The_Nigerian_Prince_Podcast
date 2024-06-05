import React from 'react';
import { Container, Text, Card, Grid } from '@nextui-org/react';

const AdvertisingOpportunities = () => {
  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Advertising Opportunities
      </Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Pre-roll Ads</Text>
            </Card.Header>
            <Card.Body>
              <Text>Ads played at the beginning of each episode.</Text>
              <Text>Price: $200/episode</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Mid-roll Ads</Text>
            </Card.Header>
            <Card.Body>
              <Text>Ads played in the middle of each episode.</Text>
              <Text>Price: $150/episode</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <Card.Header>
              <Text h3>Post-roll Ads</Text>
            </Card.Header>
            <Card.Body>
              <Text>Ads played at the end of each episode.</Text>
              <Text>Price: $100/episode</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default AdvertisingOpportunities;
