import React from 'react';
import { Container, Text, Card, Button } from '@nextui-org/react';
import Donations from '../components/Donations';

const DonationsPage = () => {
  return (
    <Container css={{ maxWidth: '800px', margin: '0 auto', padding: '40px 0' }}>
      <Card css={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      
        <Donations />
      </Card>
    </Container>
  );
};

export default DonationsPage;
