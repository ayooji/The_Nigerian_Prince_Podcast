import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  Modal,
  Button,
  Input,
  Text,
  Spacer,
  Row,
  Checkbox,
  Loading,
  Grid
} from "@nextui-org/react";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const signInWithEmail = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
    setIsLoading(false);
    setIsEmailSent(true);
    if (error) {
      console.error(error);
    } else {
      // Handle success or navigate user to the desired page
    }
  };

  return (
    <Modal
      fullWidth
      open={isOpen}
      onClose={onClose}
      closeButton
      aria-labelledby="modal-title"
    >
      <Modal.Header>
        <Text b id="modal-title" size={20}>
          Login or Sign Up
        </Text>
      </Modal.Header>
      <Modal.Body>
        <label className="block">
          Email
          <Spacer />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="mt-1 block w-full"
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
          />
          <Row justify="space-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
          </Row>
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={onClose}>
          Cancel
        </Button>
        <Button shadow auto onPress={signInWithEmail} disabled={isLoading}>
          {isLoading ? (
            <Loading size="xl" color="success" type="spinner" />
          ) : (
            "Send Magic Link"
          )}
        </Button>
      </Modal.Footer>
      <Grid.Container >
      {isEmailSent && (
        < Text b h5 className="text-white">
          A Magic Link has been sent to your email. Please check your inbox and
          click the link to log in or sign up.
        </Text >
      )}
      </Grid.Container>
    </Modal>
  );
};

export default LoginModal;
