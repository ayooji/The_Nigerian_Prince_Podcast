import React from 'react';
import { Container, Text, Spacer } from '@nextui-org/react';
import InteractiveMap from './InteractiveMap';

const AudienceReach = () => {
  return (
    <Container>
      <Spacer y={4} />
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Our Audience Reach
      </Text>
      <Text css={{ textAlign: 'center', marginBottom: '10px' }}>
        Our listeners span across the globe, with a strong presence in Nigeria and the USA.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <InteractiveMap />
      </div>
      <Text css={{ textAlign: 'center', marginBottom: '20px' }}>
        Demographics: Age 18-35, 60% Male, 40% Female
      </Text>
    </Container>
  );
};

export default AudienceReach;
