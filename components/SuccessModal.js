import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Modal from "react-modal";

const SuccessModal = ({ isOpen }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
  }, [isOpen]);

  
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Profile Created">
      <Confetti width={windowWidth} height={windowHeight} />
      <h2>Profile Created Successfully!</h2>
      <p>Redirecting to the episodes page...</p>
    </Modal>
  );
};
const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "5px", // Add rounded corners
      backgroundColor: "#ffffff", // Change background color to white
      padding: "20px", // Adjust padding
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)", // Darken the overlay
    },
  };
  
  export default SuccessModal;