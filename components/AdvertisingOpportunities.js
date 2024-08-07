import React, { useState } from 'react';
import { Container, Text, Card, Grid, Button, Modal } from '@nextui-org/react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm'; // Import your ContactForm component

const AdvertisingOpportunities = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const cardStyle = {
    background: 'black',
    borderRadius: '15px',
    padding: '20px',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #32CD32, #00FF00) 1',
    transition: 'border 0.5s',
  };

  const buttonStyle = {
    display: 'block',
    margin: '0 auto',
    marginTop: '10px',
    background: 'darkgreen',
    color: 'white',
  };

  const hoverEffect = {
    border: '2px solid',
    borderImage: 'linear-gradient(45deg, #00FF00, #32CD32) 1',
  };

  const handleContactClick = (adType) => {
    setMessage(`I am interested in ${adType}`);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    setMessage('');
  };

  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
        Advertising Opportunities
      </Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6} md={4}>
          <motion.div whileHover={hoverEffect}>
            <Card css={cardStyle}>
              <Card.Header>
                <Text h3 css={{ color: 'white' }}>
                  Pre-roll Ads <span role="img" aria-label="microphone">🎤</span>
                </Text>
              </Card.Header>
              <Card.Body>
                <Text css={{ color: 'white' }}>
                  Capture listener attention right from the start with ads played at the beginning of each episode. Ideal for high visibility.
                </Text>
                <Text css={{ color: 'white' }}>Contact us for custom pricing.</Text>
              </Card.Body>
              <Card.Footer>
                <Button auto css={buttonStyle} onClick={() => handleContactClick('Pre-roll Ads')}>
                  Contact Us
                </Button>
              </Card.Footer>
            </Card>
          </motion.div>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <motion.div whileHover={hoverEffect}>
            <Card css={cardStyle}>
              <Card.Header>
                <Text h3 css={{ color: 'white' }}>
                  Mid-roll Ads <span role="img" aria-label="waveform">🌊</span>
                </Text>
              </Card.Header>
              <Card.Body>
                <Text css={{ color: 'white' }}>
                  Reach listeners at the midpoint of their engagement. Ads played in the middle of each episode for steady impact.
                </Text>
                <Text css={{ color: 'white' }}>Contact us for custom pricing.</Text>
              </Card.Body>
              <Card.Footer>
                <Button auto css={buttonStyle} onClick={() => handleContactClick('Mid-roll Ads')}>
                  Contact Us
                </Button>
              </Card.Footer>
            </Card>
          </motion.div>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <motion.div whileHover={hoverEffect}>
            <Card css={cardStyle}>
              <Card.Header>
                <Text h3 css={{ color: 'white' }}>
                  Post-roll Ads <span role="img" aria-label="headphones">🎧</span>
                </Text>
              </Card.Header>
              <Card.Body>
                <Text css={{ color: 'white' }}>
                  Leave a lasting impression with ads played at the end of each episode. Perfect for reinforcing your message.
                </Text>
                <Text css={{ color: 'white' }}>Contact us for custom pricing.</Text>
              </Card.Body>
              <Card.Footer>
                <Button auto css={buttonStyle} onClick={() => handleContactClick('Post-roll Ads')}>
                  Contact Us
                </Button>
              </Card.Footer>
            </Card>
          </motion.div>
        </Grid>
      </Grid.Container>

      <Modal open={visible} onClose={closeHandler} closeButton>
        <Modal.Header>
          <Text id="modal-title" size={18}>Advertising</Text>
        </Modal.Header>
        <Modal.Body>
          <ContactForm preFilledMessage={message} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdvertisingOpportunities;
