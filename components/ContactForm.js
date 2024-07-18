import React, { useState, useEffect } from 'react';
import { Container, Text, Input, Textarea, Button, Spacer, Card, Modal } from '@nextui-org/react';
import { supabase } from '@/lib/supabaseClient';

const ContactForm = ({ preFilledMessage = '' }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: preFilledMessage });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, message: preFilledMessage }));
  }, [preFilledMessage]);

  const closeHandler = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) formErrors.email = 'Email is required';
    if (!formData.message) formErrors.message = 'Message is required';
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

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
      setErrors({});
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
            status={errors.name && 'error'}
            helperText={errors.name}
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
            status={errors.email && 'error'}
            helperText={errors.email}
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
            status={errors.message && 'error'}
            helperText={errors.message}
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
