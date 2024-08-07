import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ContactForm from '../components/ContactForm';
import Footer from "@/components/Footer"; 

const ContactPage = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h2" align="center" gutterBottom color="white">
        Get in Touch
      </Typography>
      <Typography variant="body1" align="center" paragraph color="white">
        We&apos;d love to hear from you! Whether you have a question about the podcast, sponsorship opportunities, or anything else, our team is ready to answer all your questions.
      </Typography>

      <Box sx={{ my: 4 }}>
        <ContactForm />
      </Box>
      <Footer/>
    </Container>
  );
};

export default ContactPage;
