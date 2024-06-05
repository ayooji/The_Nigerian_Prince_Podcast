import React from 'react';
import { Container, Text, Input, Textarea, Button, Spacer } from '@nextui-org/react';

const ContactForm = () => {
  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Contact Us
      </Text>
      <form>
        <Input fullWidth clearable bordered label="Name" placeholder="Your Name" css={{ marginBottom: '20px' }} />
        <Input fullWidth clearable bordered label="Email" placeholder="Your Email" css={{ marginBottom: '20px' }} />
        <Textarea fullWidth clearable bordered label="Message" placeholder="Your Message" css={{ marginBottom: '20px' }} />
        <Button auto color="gradient" css={{ display: 'block', margin: '0 auto' }}>
          Submit
        </Button>
      </form>
      <Spacer y={2} />
      <Text css={{ textAlign: 'center' }}>Or reach us at: sponsor@thenigerianprincepodcast.com</Text>
      <Text css={{ textAlign: 'center' }}>Phone: (123) 456-7890</Text>
    </Container>
  );
};

export default ContactForm;
