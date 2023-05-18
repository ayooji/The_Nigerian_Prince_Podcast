import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@nextui-org/react';
import LoginModal from './LoginModal';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/router';

const AuthButtons = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const router = useRouter();

  const handleSession = async (session) => {
    console.log("User session:", session);
  
    if (session?.user) {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id);
  
      if (error) {
        console.error("Error fetching profile:", error);
      } else if (profiles.length === 0) {
        router.push('/auth/create-profile');
      } 
    }
  
    // Dispatch the custom event with the session object as the event detail
    const event = new CustomEvent('onAuthStateChanged', { detail: { session } });
    window.dispatchEvent(event);
  };
  useEffect(() => {
    const unsubscribe = supabase.auth.onAuthStateChange((event, session) => {
      handleSession(session);
    });
  
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
    [handleSession]
  }, );

  return (
    <div>
      <Grid.Container gap={1}>
        <Grid>
          <Button
            color="gradient"
            shadow
            auto
            onClick={() => setLoginOpen(true)}
          >
            Login or Sign Up
          </Button>
        </Grid>
        <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      </Grid.Container>
    </div>
  );
};

export default AuthButtons;