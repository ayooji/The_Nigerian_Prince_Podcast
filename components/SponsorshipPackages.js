import React, { useState } from 'react';
import { Container, Text, Card, Grid, Button, Modal } from '@nextui-org/react';
import ContactForm from './ContactForm'; // Import your ContactForm component

const cardStyles = {
  base: {
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    padding: '20px',
    color: '#000',
  },
  bronze: {
    background: 'linear-gradient(45deg, #cd7f32, #ffcc99)',
  },
  silver: {
    background: 'linear-gradient(45deg, #c0c0c0, #e6e6e6)',
  },
  gold: {
    background: 'linear-gradient(45deg, #ffd700, #ffec8b)',
  },
};

const textStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '10px',
  color: '#000',
};

const buttonStyle = {
  backgroundColor: '#1f8ef1',
  color: '#000',
  borderRadius: '10px',
  padding: '10px 20px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease',
};

const SponsorshipPackages = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleContactClick = (packageType) => {
    setMessage(`I am interested in the ${packageType}`);
    setVisible(true);
  };

  const closeHandler = () => {
    setVisible(false);
    setMessage('');
  };

  return (
    <Container>
      <Text h2 css={{ textAlign: 'center', marginBottom: '20px' }}>
        Sponsorship Packages
      </Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ ...cardStyles.base, ...cardStyles.bronze }}>
            <Card.Header css={{ justifyContent: 'center' }}>
              <Text h3 css={{ color: '#000' }}>Bronze Package</Text>
            </Card.Header>
            <Card.Body>
              <Text css={textStyle}>• Ad Placement: Mention in one episode.</Text>
              <Text css={textStyle}>• Visibility: Logo on the website.</Text>
              <Text css={textStyle}>• Engagement: Social media mention.</Text>
              <Text css={textStyle}>• Price: Contact for pricing</Text>
            </Card.Body>
            <Card.Footer css={{ justifyContent: 'center' }}>
              <Button auto flat css={buttonStyle} onClick={() => handleContactClick('Bronze Package')}>
                Contact Us
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ ...cardStyles.base, ...cardStyles.silver }}>
            <Card.Header css={{ justifyContent: 'center' }}>
              <Text h3 css={{ color: '#000' }}>Silver Package</Text>
            </Card.Header>
            <Card.Body>
              <Text css={textStyle}>• Ad Placement: Mention in three episodes.</Text>
              <Text css={textStyle}>• Visibility: Logo on the website and in show notes.</Text>
              <Text css={textStyle}>• Engagement: Social media mentions and inclusion in a blog post.</Text>
              <Text css={textStyle}>• Customization: Options for ad placement and visibility.</Text>
              <Text css={textStyle}>• Price: Contact for pricing</Text>
            </Card.Body>
            <Card.Footer css={{ justifyContent: 'center' }}>
              <Button auto flat css={buttonStyle} onClick={() => handleContactClick('Silver Package')}>
                Contact Us
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Card css={{ ...cardStyles.base, ...cardStyles.gold }}>
            <Card.Header css={{ justifyContent: 'center' }}>
              <Text h3 css={{ color: '#000' }}>Gold Package</Text>
            </Card.Header>
            <Card.Body>
              <Text css={textStyle}>• Ad Placement: Mention in all episodes for a month.</Text>
              <Text css={textStyle}>• Visibility: Logo on the website, show notes, and dedicated sponsor page.</Text>
              <Text css={textStyle}>• Engagement: Blog post and custom content.</Text>
              <Text css={textStyle}>• Customization: Flexible options to tailor the package.</Text>
              <Text css={textStyle}>• Exclusivity: Limited to 5 sponsors per month.</Text>
              <Text css={textStyle}>• Price: Contact for pricing</Text>
            </Card.Body>
            <Card.Footer css={{ justifyContent: 'center' }}>
              <Button auto flat css={buttonStyle} onClick={() => handleContactClick('Gold Package')}>
                Contact Us
              </Button>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>

      <Modal open={visible} onClose={closeHandler} closeButton>
        <Modal.Header>
          <Text id="modal-title" size={18}>Sponsorships</Text>
        </Modal.Header>
        <Modal.Body>
          <ContactForm preFilledMessage={message} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SponsorshipPackages;
