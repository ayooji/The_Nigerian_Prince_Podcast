import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, TextField, CardActions } from '@mui/material';
import { FaBitcoin, FaEthereum, FaPaypal } from 'react-icons/fa';

const Donations = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 5 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ffffff' }}>
        Support Us with Your Donations
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ color: '#ffffff', mb: 4 }}>
        Your contributions help us create valuable content and reach a global audience. We appreciate your generosity!
      </Typography>

      <Grid container spacing={4} justifyContent="center">
       
        {/* Cryptocurrency Donations */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#1e1e1e', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>
                Donate with Cryptocurrency
              </Typography>
              <Button
                variant="contained"
                startIcon={<FaBitcoin />}
                fullWidth
                sx={{
                  backgroundColor: '#FF9900',
                  color: '#ffffff',
                  py: 1.5,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#FF6600'
                  }
                }}
                onClick={() => window.open('bitcoin:yourbitcoinaddress', '_blank')}
              >
                Donate with Bitcoin
              </Button>
              <Button
                variant="contained"
                startIcon={<FaEthereum />}
                fullWidth
                sx={{
                  backgroundColor: '#6272A4',
                  color: '#ffffff',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#506690'
                  }
                }}
                onClick={() => window.open('ethereum:yourethereumaddress', '_blank')}
              >
                Donate with Ethereum
              </Button>
            </CardContent>
          </Card>
        </Grid>

         {/* Fiat Donations */}
         <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#1e1e1e', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>
                Donate with PayPal
              </Typography>
              <Button
                variant="contained"
                startIcon={<FaPaypal />}
                fullWidth
                sx={{
                  backgroundColor: '#0070F3',
                  color: '#ffffff',
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: '#0059F2'
                  }
                }}
                onClick={() => window.open('https://paypal.me/yourpaypal', '_blank')}
              >
                Donate with PayPal
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Custom Donation Amount */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: '#1e1e1e', borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>
                Donate a Custom Amount
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Enter amount (USD)"
                type="number"
                fullWidth
                sx={{ mb: 2, backgroundColor: '#2c2c2c', borderRadius: 1, input: { color: '#ffffff' } }}
              />
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#4CAF50',
                  color: '#ffffff',
                  py: 1.5,
                  mx: 2,
                  mb: 2,
                  '&:hover': {
                    backgroundColor: '#388E3C'
                  }
                }}
              >
                Donate
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Donations;
