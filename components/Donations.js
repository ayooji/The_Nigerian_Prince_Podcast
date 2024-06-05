import React from 'react';
import { Container, Text, Button, Input, Spacer } from '@nextui-org/react';
import { FaBitcoin, FaEthereum, FaPaypal } from 'react-icons/fa';

const Donations = () => {
  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Support Us with Your Donations
      </Text>
      <Text css={{ textAlign: 'center', marginBottom: '20px' }}>
        Your donations help us continue producing high-quality content and reach a wider audience. Thank you for your support!
      </Text>

      {/* Fiat Donations */}
      <Text h3 css={{ textAlign: 'center', marginBottom: '10px' }}>
        Donate with PayPal
      </Text>
      <div style={{ textAlign: 'center' }}>
        <Button auto color="gradient" css={{ display: 'block', margin: '0 auto' }} onClick={() => window.open('https://paypal.me/yourpaypal', '_blank')}>
          <FaPaypal style={{ marginRight: '10px' }} />
          Donate with PayPal
        </Button>
      </div>

      <Spacer y={2} />

      {/* Cryptocurrency Donations */}
      <Text h3 css={{ textAlign: 'center', marginBottom: '10px' }}>
        Donate with Cryptocurrency
      </Text>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button auto color="gradient" css={{ display: 'block', margin: '10px auto' }} onClick={() => window.open('bitcoin:yourbitcoinaddress', '_blank')}>
          <FaBitcoin style={{ marginRight: '10px' }} />
          Donate with Bitcoin
        </Button>
        <Button auto color="gradient" css={{ display: 'block', margin: '10px auto' }} onClick={() => window.open('ethereum:yourethereumaddress', '_blank')}>
          <FaEthereum style={{ marginRight: '10px' }} />
          Donate with Ethereum
        </Button>
      </div>

      <Spacer y={2} />

      {/* Custom Donation Amount */}
      <Text h3 css={{ textAlign: 'center', marginBottom: '10px' }}>
        Donate a Custom Amount
      </Text>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Input placeholder="Enter amount" type="number" />
        <Button auto color="gradient" css={{ display: 'block', margin: '10px auto' }}>
          Donate
        </Button>
      </div>
    </Container>
  );
};

export default Donations;
