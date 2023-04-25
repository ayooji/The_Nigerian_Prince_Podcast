import React, { useState } from 'react';
import { Button , Grid} from '@nextui-org/react';
import LoginModal from './LoginModal';


const AuthButtons = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  

  return (
    <div>
    <Grid.Container gap={1}>
        <Grid >
      <Button  color="gradient" shadow auto onClick={() => setLoginOpen(true)}>Login or Sign Up</Button>
        </Grid>
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
    </Grid.Container>
    </div>
  );
};

export default AuthButtons;


