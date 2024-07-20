import React from 'react';
import { Container, Text, Button, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';

const Success = () => {
  const router = useRouter();

  return (
    <Container>
      <Card css={{ padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', marginTop: '20px' }}>
        <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
          Thank You for Your Donation!
        </Text>
        <Text css={{ textAlign: 'center', marginBottom: '20px' }}>
          Your generous donation helps us continue to produce high-quality content and reach a wider audience. We are extremely grateful for your support.
        </Text>
        <Button auto onClick={() => router.push('/')} css={{ marginTop: '20px', background: 'linear-gradient(45deg, #4CAF50, #388E3C)' }}>
          Back to Home
        </Button>
      </Card>
    </Container>
  );
};

export default Success;
