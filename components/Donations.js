import React from 'react';
import { Container, Text, Button, Input, Spacer, Card, Grid } from '@nextui-org/react';
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

      <Grid.Container gap={2} justify="center">
        {/* Fiat Donations */}
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Text h3 css={{ marginBottom: '10px' }}>Donate with PayPal</Text>
            <Button
              auto
              color="gradient"
              css={{ margin: '0 auto', background: 'linear-gradient(45deg, #0070F3, #0059F2)' }}
              onClick={() => window.open('https://paypal.me/yourpaypal', '_blank')}
            >
              <FaPaypal style={{ marginRight: '10px' }} />
              Donate with PayPal
            </Button>
          </Card>
        </Grid>

        {/* Cryptocurrency Donations */}
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Text h3 css={{ marginBottom: '10px' }}>Donate with Cryptocurrency</Text>
            <Button
              auto
              color="gradient"
              css={{ margin: '10px auto', background: 'linear-gradient(45deg, #FF9900, #FF6600)' }}
              onClick={() => window.open('bitcoin:yourbitcoinaddress', '_blank')}
            >
              <FaBitcoin style={{ marginRight: '10px' }} />
              Donate with Bitcoin
            </Button>
            <Button
              auto
              color="gradient"
              css={{ margin: '10px auto', background: 'linear-gradient(45deg, #6272A4, #506690)' }}
              onClick={() => window.open('ethereum:yourethereumaddress', '_blank')}
            >
              <FaEthereum style={{ marginRight: '10px' }} />
              Donate with Ethereum
            </Button>
          </Card>
        </Grid>

        {/* Custom Donation Amount */}
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Text h3 css={{ marginBottom: '10px' }}>Donate a Custom Amount</Text>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Input placeholder="Enter amount (USD)" type="number" css={{ marginBottom: '10px', width: '100%' }} />
              <Button
                auto
                color="gradient"
                css={{ background: 'linear-gradient(45deg, #4CAF50, #388E3C)', margin: '0 auto' }}
              >
                Donate
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Donations;
