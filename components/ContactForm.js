import React, { useState } from 'react';
import { Container, Text, Input, Textarea, Button, Spacer, Card, Modal } from '@nextui-org/react';
import { supabase } from '@/lib/supabaseClient';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const { data, error } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (error) {
      console.error('Error submitting contact form:', error.message);
    } else {
      console.log('Contact form submitted successfully:', data);
      setVisible(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <Container css={{ maxWidth: '600px', margin: '0 auto', padding: '40px 0' }}>
      <Card css={{ padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
          Contact Us
        </Text>
        <form onSubmit={handleSubmit}>
          <Input 
            fullWidth 
            clearable 
            bordered 
            label="Name" 
            name="name"
            placeholder="Your Name" 
            value={formData.name}
            onChange={handleChange}
            css={{ marginBottom: '20px' }} 
          />
          <Input 
            fullWidth 
            clearable 
            bordered 
            label="Email" 
            name="email"
            placeholder="Your Email" 
            value={formData.email}
            onChange={handleChange}
            css={{ marginBottom: '20px' }} 
          />
          <Textarea 
            fullWidth 
            clearable 
            bordered 
            label="Message" 
            name="message"
            placeholder="Your Message" 
            rows={6} 
            value={formData.message}
            onChange={handleChange}
            css={{ marginBottom: '20px' }} 
          />
          <Button 
            auto 
            color="gradient" 
            css={{ display: 'block', margin: '0 auto', background: 'linear-gradient(45deg, #4CAF50, #388E3C)' }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Card>
      <Spacer y={2} />
      <Text css={{ textAlign: 'center' }}>Or reach us at: sponsor@thenigerianprincepodcast.com</Text>
      <Text css={{ textAlign: 'center' }}>Phone: (123) 456-7890</Text>

      {/* Success Modal */}
      <Modal open={visible} onClose={closeHandler} closeButton>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Thank You!
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Your message has been sent successfully. We will get back to you soon.</Text>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ContactForm;
