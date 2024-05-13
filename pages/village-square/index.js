import React from 'react';
import { Grid, Container, Text, Spacer, Card, Button } from '@nextui-org/react';

const VillageSquare = () => {
  const cardStyle = {
    background: 'linear-gradient(45deg, $blue600 -20%, $green400 50%)',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
  };

  const cardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.25)',
  };

  const textStyle = {
    lineHeight: '1.6',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    fontSize: '18px',
  };

  const buttonStyle = {
    background: 'linear-gradient(145deg, #fdcb6e, #e17055)',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
  };

  const buttonHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div className="container mx-auto px-4">
      <Spacer y={1} />

      {/* Header and Welcome Section */}
      <Grid.Container gap={2} justify="center">
       
        <Text   h1 className="text-white text-4xl my-8" weight="bold" css={{ textAlign: "center" }}>
          Welcome to The Village Square 
        </Text>
        
      </Grid.Container>

      {/* Submission Focus Section */}
      <Grid.Container gap={2} justify="center">
        <Grid md={6} xs={12}>
          <Card variant="bordered" css={cardStyle} onMouseOver={e => e.currentTarget.style = cardHoverStyle} onMouseOut={e => e.currentTarget.style = cardStyle}>
            <Card.Body css={{ textAlign: "center", padding: "20px" }}>
              <Text blockquote   size={20}  >
                At The Village Square, your stories bring to light diverse perspectives and unseen narratives. Ayo Oji invites you to share your experiences, insights, and news that resonate with your life and your community. Whether you’re documenting a local event, sharing a cultural insight, or telling a personal story, your contributions are invaluable.
              </Text>
              <Text  css={{ ...textStyle, marginTop: "10px" }}>
                Submissions can be made in various formats—text, audio, video, or images. Each submission is carefully reviewed by Ayo Oji to ensure it aligns with our values of respect, diversity, and authenticity. Stories that meet these criteria will not only be shared on our platform but will also help shape the global narrative and foster a deeper understanding among our listeners.
              </Text>
              <Spacer x={0.5} />
              <Grid.Container justify="center">
              <Button  color="gradient" auto ghost size="lg"  onMouseOver={e => e.currentTarget.style = buttonHoverStyle} onMouseOut={e => e.currentTarget.style = buttonStyle}>
                Submit Your Story
              </Button>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>

      {/* Footer */}
      <Spacer x={5} />
      <footer className="footer">
      
        <Container>
        <Spacer x={5} />
          <Text css={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} The Nigerian Prince Podcast, hosted by Ayo Oji
          </Text>
          {/* Additional footer content like links or social media icons can be added here */}
        </Container>
      </footer>
    </div>
  );
};

export default VillageSquare;
