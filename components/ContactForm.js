import React from 'react';
import { Container, Text, Input, Textarea, Button, Spacer, Card } from '@nextui-org/react';

const ContactForm = () => {
  return (
    <Container css={{ maxWidth: '600px', margin: '0 auto', padding: '40px 0' }}>
      <Card css={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
          Contact Us
        </Text>
        <form>
          <Input 
            fullWidth 
            clearable 
            bordered 
            label="Name" 
            placeholder="Your Name" 
            css={{ marginBottom: '20px' }} 
          />
          <Input 
            fullWidth 
            clearable 
            bordered 
            label="Email" 
            placeholder="Your Email" 
            css={{ marginBottom: '20px' }} 
          />
          <Textarea 
            fullWidth 
            clearable 
            bordered 
            label="Message" 
            placeholder="Your Message" 
            rows={6} 
            css={{ marginBottom: '20px' }} 
          />
          <Button 
            auto 
            color="gradient" 
            css={{ display: 'block', margin: '0 auto', background: 'linear-gradient(45deg, #4CAF50, #388E3C)' }}
          >
            Submit
          </Button>
        </form>
      </Card>
      <Spacer y={2} />
      <Text css={{ textAlign: 'center' }}>Or reach us at: sponsor@thenigerianprincepodcast.com</Text>
      <Text css={{ textAlign: 'center' }}>Phone: (123) 456-7890</Text>
    </Container>
  );
};

export default ContactForm;
