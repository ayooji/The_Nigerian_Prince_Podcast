import React from 'react';
import { Container, Typography, Button, Card, CardContent, Grid, Box, IconButton } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { FaCreditCard, FaApplePay, FaGoogleWallet } from 'react-icons/fa';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Donations = () => {
  const handleDonate = async () => {
    const stripe = await stripePromise;

    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const session = await response.json();

    if (session.error) {
      console.error('Error creating checkout session:', session.error);
      return;
    }

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error('Stripe Checkout error:', result.error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography color="white"variant="h4" align="center" gutterBottom>
        Support Us with Your Donations
      </Typography>
      <Typography color="white" variant="body1" align="center" paragraph>
        Your contributions enable us to continue producing high-quality content and reaching a wider audience. Thank you for your generous support!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2, boxShadow: 3, borderRadius: '16px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom align="center">
                Donate Now
              </Typography>
              <Typography variant="body2" align="center" paragraph>
                We accept donations through various payment methods.
              </Typography>
              <Box sx={{ textAlign: 'center', my: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDonate}
                  sx={{
                    background: 'linear-gradient(45deg, #4CAF50, #388E3C)',
                    color: 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #388E3C, #4CAF50)',
                    },
                  }}
                >
                  Donate
                </Button>
              </Box>
              <Box sx={{ textAlign: 'center', my: 2 }}>
                <Typography variant="body2" align="center">
                  We accept:
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <IconButton aria-label="Credit Card" disabled>
                    <FaCreditCard size={30} />
                  </IconButton>
                  <IconButton aria-label="Apple Pay" disabled>
                    <FaApplePay size={30} />
                  </IconButton>
                  <IconButton aria-label="Google Wallet" disabled>
                    <FaGoogleWallet size={30} />
                  </IconButton>
                </Box>
                <Typography variant="body2" align="center">
                  and all major currencies.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Donations;
